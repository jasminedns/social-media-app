'use server'

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugify";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";
import uploadImage from "@/utils/supabase/upload-image";

export const EditPost = async ({postId, userData} : {postId:number, userData:z.infer<typeof postSchema>}) => {    
    const parsedData = postSchema.parse(userData)

    const imageFile = userData.image?.get('image')

    let imagePublicUrl;

    if ((typeof imageFile !== "string") && imageFile !== undefined) {
        if (!(imageFile instanceof File) && imageFile !== null) {
            throw new Error("Malformed image file")
        }

        imagePublicUrl = await uploadImage(imageFile!);
    } else {
        imagePublicUrl = imageFile;
    }

    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser();

    const {data: post, error} = await supabase
        .from("post")
        .select("*")
        .eq("id", postId)
        .single()

    if (!user || user.id !== post?.user_id) throw new Error("Not Authorized")

    const {data: updatedPost} = await supabase
        .from("post")
        .update({...parsedData, image: imagePublicUrl, slug: slugify(parsedData.title)})
        .eq("id", postId)
        .select("slug")
        .single()
        .throwOnError()

    if (error) throw error
    
    revalidatePath("/")
    redirect(`/${updatedPost.slug}`)    
}