import { type QueryData } from "@supabase/supabase-js"
import { createClient } from "./browser-client"

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase
        .from("post")
        .select('*, users("username")')
        .order('created_at', {ascending:false})

}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>

export const getSinglePost = async (slug:string) => {
    const supabase = createClient();

    return await supabase
        .from('post')
        .select('*, users("username")')
        .eq('slug', slug)
        .single()
}

export const getSearchPosts = async (searchTerm: string) => {
    const supabase = createClient();

    return await supabase
        .from('post')
        .select('title, slug')
        .ilike('title', `${searchTerm}%`)
}

export type singlePostType = QueryData<ReturnType<typeof getSinglePost>>
