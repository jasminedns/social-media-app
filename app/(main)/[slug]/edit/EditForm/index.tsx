'use client'

import { EditPost } from "@/actions/edit-post";
import { postSchema, postWithImageSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Tables } from "@/utils/supabase/database-types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const EditForm = ({postId, defaultValues}: {postId:number, defaultValues : Pick<Tables<"post">, "title" | "content" | "image">}) => {
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(postWithImageSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
            image: defaultValues.image
        }
    })

    const {mutate, error} = useMutation({
        mutationFn: EditPost
    })

    return (
        <form
            onSubmit = {
                handleSubmit(values => {
                    let imageForm = undefined;

                    if(values.image?.length && typeof values.image !== "string") {
                        imageForm = new FormData()
                        imageForm.append("image", values.image[0])
                    }
                    //this if statement runs ONLY if values.image has a length. If it's 0 it's not a length
                    
                    mutate({
                        postId, 
                        userData: {
                            title: values.title,
                            content: values.content,
                            image: imageForm
                        }
                    })
                })
            }
        >
            <fieldset className="ml-4">
                <label htmlFor="title">Title</label>
                <input 
                    {...register("title")}
                    className="ml-2 mb-4"
                    id="title" 
                    placeholder="Title" 
                />
            </fieldset>
            <fieldset className="flex ml-4 mb-3">
                <label htmlFor="content">Content</label>
                <textarea 
                    {...register("content")}
                    className="ml-2 mb-4" 
                    id="content"
                    placeholder="Content (optional)"
                ></textarea>
            </fieldset>
            <fieldset>
                {defaultValues.image 
                    && 
                        <img src={defaultValues.image} alt="post image" />
                } 
                    <div>
                        <input 
                            type="file"
                            accept="image/*"
                            className="mb-4 button-primary"
                            {...register('image')} 
                            id="image" 
                        />
                    </div>
            </fieldset>
            <fieldset>
                <button className="button-secondary">Update</button>
            </fieldset>
            {error && <ErrorMessage message={error.message}/>}
        </form>
    )
}

export default EditForm;