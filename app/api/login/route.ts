import { supabase } from '@/lib/supabase'
import argon2 from 'argon2'
import {NextResponse } from "next/server";
import crypto from 'crypto'

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
    const res = NextResponse.json({ ok: true});
    try {
        if (!await argon2.verify(data[0].password, password)) {
            return Response.json(
                {error: "Invalid Username or Password"},
                {status: 401}
            )
        }
        
        const sessionToken = crypto.randomUUID(); 
        const { error } = await supabase.from('sessions').insert({cookie_id: sessionToken, username: username});

        if (error) return Response.json( {error: error}, { status: 500});
        res.cookies.set("session", sessionToken, {
            httpOnly: true,
            path: "/",
            maxAge: 60*60*24*7,
            sameSite: "lax"
        });
    } catch (err) {
        return Response.json(
            {error: err},
            {status: 500}
        )

    }

    return res;
}