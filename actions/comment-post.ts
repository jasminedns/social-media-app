'use server'

import { createClient } from "@/utils/supabase/server-client"
import z from "zod";
import { commentSchema } from "./schemas";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const CommentPost = async (slug:string, postId:number, userData:z.infer<typeof commentSchema>) => {
    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser();
    if(!user) {throw new Error("Not Authorized")};

    console.log("SLug:", slug)
    console.log("comment:", userData.comment)

    const {data, error} = await supabase   
        .from("comment")
        .insert([{post_id: postId, text: userData.comment, user_id: user.id}])
        .select()

    if (error) throw error

    revalidatePath(`/`)
}
