'use server';

import { createClient } from "@/utils/supabase/server-client";
import { redirect } from "next/navigation";
import { signUpSchema } from "./schemas";
import z from "zod";

export const SignUp = async (userData:z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userData);
    const supabase = await createClient();

    const {data: {user}, error} = await supabase.auth.signUp(parsedData)

    if (user && user.email) {
        const {data, error} = await supabase
            .from("users") 
            .insert([{id: user.id, email: user.email, username: parsedData.username}])
    }

    if (error) return {error: error.message}

    redirect("/")
}