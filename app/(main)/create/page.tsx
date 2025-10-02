'use client'

import { CreatePost } from "@/actions/create-post";
import { postSchema, postWithImageSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const createPage = () => {

    const {register, handleSubmit} = useForm({
        resolver: zodResolver(postWithImageSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div className="p-4">
            <form 
                className="p-4 flex flex-col" 
                onSubmit={
                    handleSubmit(values => {
                        const imageForm = new FormData();

                        if(values.image) {
                            imageForm.append("image", values.image[0])
                        }

                        mutate({
                            title: values.title,
                            content: values.content,
                            image: imageForm
                        })
                    })
                }
            >
                <fieldset className="ml-4">
                    <label htmlFor="title">Title</label>
                    <input 
                        className="ml-2 mb-4"
                        {...register('title')} 
                        id="title" 
                        placeholder="Title" 
                    />
                </fieldset>
                <fieldset className="flex ml-4 mb-3">
                    <label htmlFor="content">Content</label>
                    <textarea 
                        {...register('content')}
                        className="ml-2 mb-4" 
                        id="content"
                        placeholder="Content (optional)" 
                    ></textarea>
                </fieldset>
                <fieldset className="ml-4">
                    <input 
                        type="file"
                        accept="image/*"
                        className="mb-4 button-primary"
                        {...register('image')} 
                        id="image" 
                    />
                </fieldset>
                <button type="submit" className="button-secondary w-1/2 m-auto hover:bg-gray-200">Create Post</button>
            </form>
        </div>
    )
}

export default createPage;