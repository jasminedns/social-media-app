'use client'

import DeletePost from "@/actions/delete-post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteButton = ({postId}:{postId:number}) => {

    const {mutate, error} = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting your post..."),
        onSettled: () => toast.success("Post Deleted!")
    })

    return (
        <div>
            <button 
                className="button-secondary"
                onClick={() => DeletePost(postId)}
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteButton;