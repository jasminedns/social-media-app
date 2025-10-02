'use client'

import { signUpSchema } from "@/actions/schemas";
import { SignUp } from "@/actions/sign-up";
import ErrorMessage from "@/app/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const SignupForm = () => {

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver:zodResolver(signUpSchema)
    })

    const {mutate, error} = useMutation({
        mutationFn: SignUp
    })

    return (
        <div>
            <form 
                className="p-4 flex flex-col" 
                onSubmit={handleSubmit(values => mutate(values))}
            >
                <fieldset className="ml-4">
                    <label htmlFor="email">Email</label>
                    <input 
                    className="ml-2 mb-4" 
                    id="email" 
                    {...register("email")} 
                    placeholder="Enter your email..." 
                    />
                </fieldset>
                { errors.email && <ErrorMessage message={errors.email.message!}/>}
                <fieldset className="ml-4">
                    <label htmlFor="username">Username</label>
                    <input 
                    className="ml-2 mb-4" 
                    id="username"  
                    {...register("username")}
                    placeholder="Enter your username..."
                     />
                </fieldset>
                { errors.username && <ErrorMessage message={errors.username.message!}/>}
                <fieldset className="ml-4 mb-3">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    className="ml-2 mb-4" id="password" 
                    {...register("password")}
                    placeholder="Enter your password..." 
                    />
                </fieldset>
                    { errors.password && <ErrorMessage message={errors.password.message!}/>}
                <button className="button-secondary w-1/2 m-auto hover:bg-gray-200">Submit</button>
            </form>
            {error && <ErrorMessage message={error.message}/>}
        </div>
    )
}

export default SignupForm;