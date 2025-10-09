import { getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

const singlePost = async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data, error} = await getSinglePost(slug)

    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    const isAuthor = user?.id === data?.user_id ? true : false
    return (
        <div>
            {data && 
                <div className="m-5">
                    <div className="my-2">
                        <span>By {data.users?.username}</span>
                    </div>
                    <div>
                        <h2 className="font-bold text-3xl">{data.title}</h2>
                        <p className="mt-5">{data.content}</p>
                    </div>
                    {data.image && (
                        <img src={data.image} alt={`${data.title} image`} className="my-4 rounded-2xl" />
                    )}
                    { isAuthor &&
                        <div className="flex items-center gap-3 justify-end">
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