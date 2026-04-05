import { supabase } from '@/lib/supabase'
import argon2 from 'argon2'

type LoginBody = { username: string, password: string }

export async function POST(request: Request) {
    let body: LoginBody;
    try {
        // TODO: change to form data, currently JSON for testing purposes
        // const formData = await request.formData()

        // body = {
        // username: String(formData.get('username') ?? ''),
        // password: String(formData.get('password') ?? ''),
        // }
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

     // SELECT username, possword FROM users WHERE username = username
    const {data, error} = await supabase.from('users').select('username, password').eq('username', username)

    if (error) {
        return Response.json(
            {error: error},
            {status: 500}
        )
    }
   
    if (!data || data.length === 0) {
        return Response.json(
            {error: "Invalid Username or Password"},
            {status: 401}
        )
    }

    try {
        if (!await argon2.verify(data[0].password, password)) {
            return Response.json(
                {error: "Invalid Username or Password"},
                {status: 401}
            )
        }
    } catch (err) {
        return Response.json(
            {error: err},
            {status: 500}
        )

    }
    
    return Response.json(
        {message: "Login successful"},
        {status: 200}
    );
}