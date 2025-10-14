'use client'

import { DeleteComment } from "@/actions/delete-comment";
import { User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { XCircle } from "lucide-react";
import { toast } from "sonner";

type CommentType = {
  id: number;
  text: string;
  user_id: string;
  users: {
    username: string;
  };
};

const SingleComment = ({comment, user, postAuthor}: {comment: CommentType, user:User | null, postAuthor:boolean}) => {
    const isCommentAuthor = comment.user_id === user?.id ? true : false;

    const {mutate} = useMutation({
        mutationFn: DeleteComment,
        onSettled: () => toast.success("Comment Deleted!")
    })

    return (
        <div key={comment.id} className="flex justify-between gap-2 border-1 my-4 p-2 rounded-2xl">
            <div className="flex gap-2">
                <h2 className="font-bold">{comment.users.username}:</h2>
                <div>
                    {comment.text}
                </div>
            </div>
            {(isCommentAuthor || postAuthor === true) &&
                <div className="cursor-pointer">
                    <XCircle onClick={() => mutate(comment.id)}/>
                </div>
            }
        </div>
    )
}

export default SingleComment