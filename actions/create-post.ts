'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import uploadImage from "@/utils/supabase/upload-image"

export const CreatePost = async (userData:z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(userData)
    const slug = slugify(parsedData.title);

    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    if(!user) {throw new Error("Not Authorized")}

    const imageFile = userData.image?.get('image')

    if(!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("Malformed image file")
    }
    const imagePublicUrl = imageFile ? await uploadImage(imageFile): null

    const userId = user.id;

    const {data, error} = await supabase
        .from('post')
        .insert([{user_id: userId, slug: slug, ...parsedData, image: imagePublicUrl}])

    if(error) return {error: error.message}

    revalidatePath("/")
    redirect(`/${slug}`)
}