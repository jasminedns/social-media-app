'use client'

import { CommentPost } from "@/actions/comment-post";
import { commentSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

type CommentFormData = z.infer<typeof commentSchema>

const CommentForm = ({ postId, slug } : { postId: number, slug:string }) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CommentFormData>({
        resolver:zodResolver(commentSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: (values:CommentFormData) => CommentPost(slug, postId, values),
        onSuccess: () => {reset()}
    })

    return (
        <div className="p-3 md:p-8 w-full md:w-1/2">
            <form 
                className="p-4 flex flex-col" 
                onSubmit={handleSubmit((values) => mutate(values))}
            >
                <fieldset className="fieldset-primary">
                    <input 
                        className="form-input"
                        {...register("comment")}
                        id="email" 
                        placeholder="Comment..." 
                    />
                </fieldset>
                {errors.comment && <ErrorMessage message={errors.comment.message}/>}
                <button type="submit" className="button-secondary min-w-[231px] m-auto hover:bg-gray-200">Post</button>
            </form>
        </div>

    )
}

export default CommentForm;