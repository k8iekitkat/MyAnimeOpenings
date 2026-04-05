import { supabase } from '@/lib/supabase'
import argon2 from 'argon2'

type LoginBody = { submitted_username: string, sumbitted_password: string }

export async function GET(request: Request) {
    let body: LoginBody;
    try {
        const formData = await request.formData()

        body = {
        submitted_username: String(formData.get('username') ?? ''),
        sumbitted_password: String(formData.get('password') ?? ''),
        }
    } catch {
        return Response.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const { submitted_username, sumbitted_password } = body;

    if (!submitted_username || !sumbitted_password) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

     // SELECT username, possword FROM users WHERE username = username
    const {data, error} = await supabase.from('users').select('username, password').eq('username', submitted_username)

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
        if (!await argon2.verify(data[0].password, sumbitted_password)) {
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