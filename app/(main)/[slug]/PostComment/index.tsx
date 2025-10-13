import { getPostComment } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import CommentForm from "../CommentForm";

const PostComment = async ({postId, slug}:{postId:number, slug:string}) => {
    const supabase = await createClient();
    const {data, error} = await getPostComment(postId)
    
    return (
        <div>
            <div>
                {data?.length 
                    ? 
                    (
                        data?.map(comment => (
                            <div key={comment.id}>
                                <h2>{comment.users.username} says:</h2>
                                <div>
                                    {comment.text}
                                </div>
                            </div>
                        ))
                    )
                    : (<p>No comment yet</p>)
                }
            </div>
            <div>
                <CommentForm postId={postId} slug={slug}/>
            </div>
        </div>
    )
}

export default PostComment