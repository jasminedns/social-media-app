import {  getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import PostCommentList from "./PostCommentList"

const singlePost = async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePost(slug)

    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    const isAuthor = user?.id === data?.user_id ? true : false

    return (
        <div className="flex grow ">
            {data && 
                <div className="flex flex-col items-center justify-between m-5 w-full">
                    <div className="w-full m-2">
                        <div className="m-2">
                            <span>By {data.users?.username}</span>
                        </div>
                        <div className="ml-3">
                            <h2 className="font-bold text-xl md:text-3xl">{data.title}</h2>
                            <p className="mt-5">{data.content}</p>
                        </div>
                        {data.image && (
                            <img src={data.image} alt={`${data.title} image`} className="my-4 mx-auto rounded-2xl" />
                        )}
                    </div>
                    <PostCommentList postId={data.id} slug={slug} postAuthor={isAuthor}/>
                    { isAuthor &&
                        <div className="flex items-center gap-x-4 justify-end">
                            <DeleteButton postId={data.id} />
                            <EditButton slug={slug}/>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default singlePost;