'use client'

import { CreatePost } from "@/actions/create-post";
import { postSchema, postWithImageSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const createPage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(postWithImageSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div className="p-4 border-2 border-amber-300">
            <form 
                className="p-4 flex flex-col" 
                onSubmit={
                    handleSubmit(values => {
                        let imageForm = new FormData();

                        if(values.image?.length) {
                            imageForm.append("image", values.image[0])
                        }
                        //this if statement runs ONLY if values.image has a length. If it's 0 it's not a length
                        
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
                        className="form-input"
                        {...register('title')} 
                        id="title" 
                        placeholder="Title" 
                    />
                    {errors.title && <ErrorMessage message={errors.title.message!}/>}
                </fieldset>
                <fieldset className="flex items-center ml-4 mb-3">
                    <label htmlFor="content">Content</label>
                    <textarea 
                        {...register('content')}
                        className="form-input" 
                        id="content"
                        placeholder="Content (optional)" 
                    ></textarea>
                    {errors.content && <ErrorMessage message={errors.content.message!}/>}

                </fieldset>
                <fieldset className="ml-4">
                    <input 
                        type="file"
                        accept="image/*"
                        className="mb-4 button-primary rounded-2xl bg-white text-[#5865f2]"
                        {...register('image')} 
                        id="image" 
                    />
                    {errors.image && <ErrorMessage message={errors.image.message!}/>}
                </fieldset>
                <button type="submit" className="button-secondary w-1/2 m-auto hover:bg-gray-200">Create Post</button>
            </form>
        </div>
    )
}

export default createPage;