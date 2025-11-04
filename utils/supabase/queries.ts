import { type QueryData } from "@supabase/supabase-js"
import { createClient } from "./browser-client"

export const getUserInfo = async (supabase: ReturnType<typeof createClient>, userId: string) => {
    return await supabase
        .from("users")
        .select('*')
        .eq('id', userId)
        .single()
}

export type UserInfoTypes = QueryData<ReturnType<typeof getUserInfo>>

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return await supabase
        .from("post")
        .select('*, users("username")')
        .order('created_at', {ascending:false})
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>

export const getPostComment = async (postId:number) => {
    const supabase = createClient()
    
    return await supabase
        .from("comment")
        .select('*, users("username")')
        .eq("post_id", postId)
        .order('created_at', {ascending:true})
}

export type PostCommentType = QueryData<ReturnType<typeof getPostComment>>


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
