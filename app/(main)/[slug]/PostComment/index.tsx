import { getPostComment } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import CommentForm from "../CommentForm";

const PostComment = async ({postId, slug}:{postId:number, slug:string}) => {
    const supabase = await createClient();
    const {data : {user}} = await supabase.auth.getUser();
    const {data, error} = await getPostComment(postId)
    
    return (
        <div className="w-full">
            <div>
                {data?.length 
                    ? 
                    (
                        data?.map(comment => (
                            <div key={comment.id} className="flex gap-2 border-1 my-4 p-2 rounded-2xl">
                                <h2 className="font-bold">{comment.users.username}:</h2>
                                <div>
                                    {comment.text}
                                </div>
                            </div>
                        ))
                    )
                    : (<p>No comment yet</p>)
                }
            </div>
            {user && 
                <div className="flex justify-center">
                    <CommentForm postId={postId} slug={slug}/>
                </div>
            }
        </div>
    )
}

export default PostComment