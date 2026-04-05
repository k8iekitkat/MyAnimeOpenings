import { supabase } from '@/lib/supabase'
import argon2 from 'argon2'

type SignupBody = {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    let body: SignupBody;

    try {
        const formData = await request.formData()

        body = {
        username: String(formData.get('username') ?? ''),
        password: String(formData.get('password') ?? ''),
        }
    } catch {
        return Response.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const { username, password } = body;

    if (!username || !password) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return Response.json(
            { error: "Password must be at least 8 characters" },
            { status: 400 }
        );
    };

   // TODO: check DB, hash password, create user 
   let passwordHash;
   try {
    passwordHash = await argon2.hash(password, {
        type: argon2.argon2id,
    })
   }
   catch {
    return Response.json(
        { error: "Password hashing broken" },
        { status: 500 }
    );
   };

   const { error } = await supabase
        .from('users')
        .insert({username: body.username, password: passwordHash})

    if (error?.code == "23505") {
        return Response.json(
            { error: "Username already exists" },
            { status: 409 }
        );
    }

   return Response.json(
    { message: "User created" },
    { status: 201 }
   );

}

