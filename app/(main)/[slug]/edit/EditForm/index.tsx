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
        <div className="p-4 flex justify-center items-center">
            <form
                className="p-10 flex flex-col border-1 rounded-2xl border-white md:w-1/2"
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
                <fieldset className="fieldset-primary">
                    <label htmlFor="title">Title</label>
                    <input 
                        {...register("title")}
                        className="form-input min-w-[232px]"
                        id="title" 
                        placeholder="Title" 
                    />
                </fieldset>
                <fieldset className="fieldset-primary">
                    <label htmlFor="content">Content</label>
                    <textarea 
                        {...register("content")}
                        className="form-input min-w-[232px]" 
                        id="content"
                        placeholder="Content (optional)"
                    ></textarea>
                </fieldset>
                <fieldset className="fieldset-primary">
                    {defaultValues.image 
                        && 
                            <img src={defaultValues.image} alt="post image" className="rounded-2xl"/>
                    } 
                        <div>
                            <input 
                                type="file"
                                accept="image/*"
                                className="min-w-[232px] my-4 button-primary rounded-2xl bg-white text-[#5865f2]"
                                {...register('image')} 
                                id="image" 
                            />
                        </div>
                </fieldset>
                <fieldset>
                    <button 
                        className="button-secondary min-w-[232px] m-auto hover:bg-gray-200">Update</button>
                </fieldset>
                {error && <ErrorMessage message={error.message}/>}
            </form>
        </div>
    )
}

export default EditForm;