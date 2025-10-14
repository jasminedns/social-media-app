'use server'

import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache";

export const DeleteComment = async (commentId: number) => {
    const supabase = await createClient();
    await supabase
        .from('comment')
        .delete()
        .eq('id', commentId)
        .throwOnError()

    revalidatePath(`/`)
    
}