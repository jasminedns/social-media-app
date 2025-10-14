import { getPostComment } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import CommentForm from "../CommentForm";
import SingleComment from "../SingleComment";

const PostCommentList = async ({postId, slug, postAuthor}:{postId:number, slug:string, postAuthor:boolean}) => {
    const supabase = await createClient();
    const {data : {user}} = await supabase.auth.getUser();
    const {data, error} = await getPostComment(postId)

    return (
        <div className="w-full">
            <div>
                {data?.length 
                    ? 
                    (data?.map(comment => 
                        <SingleComment key={comment.id} comment={comment} user={user} postAuthor={postAuthor}/>
                    ))
                    : (<p>No comments yet</p>)
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

export default PostCommentList;