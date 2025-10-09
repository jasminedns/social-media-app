import { z } from "zod";

export const logInSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password has to be a minimum of 6 characters")
})

export const signUpSchema = z.object({
    email: z.email(),
    username: z.string().min(3, "Username has to be a minimum of 3 characters"),
    password: z.string().min(6, "Password has to be a minimum of 6 characters")
})

export const postSchema = z.object({
    title: z.string().min(3, "Titles must be at least 3 characters long"),
    content: z.string().optional(),
    image: z.instanceof(FormData).optional()
})

export const postWithImageSchema = postSchema.omit({image: true}).extend({image: z.unknown().transform(value => {
    return value as FileList
}).optional()})