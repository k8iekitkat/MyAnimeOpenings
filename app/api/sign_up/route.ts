import { supabase } from '@/lib/supabase'

type SignupBody = {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    let body: SignupBody;

    try {
        body = await request.json();
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

   const { error } = await supabase
        .from('users')
        .insert({username: body.username, password: body.password})

    if (error!.code == "23505") {
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

