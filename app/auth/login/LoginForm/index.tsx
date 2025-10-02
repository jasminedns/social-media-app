'use client'

import { LogIn } from "@/actions/log-in";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "@/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {

    const { 
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate, isPending ,error} = useMutation({
        mutationFn: LogIn
    })

    return (
        <div className="p-4">
            <form 
                className="p-4 flex flex-col" 
                onSubmit={handleSubmit(values => mutate(values))}>
                <fieldset className="ml-4">
                    <label htmlFor="email">Email</label>
                    <input 
                        className="ml-2 mb-4"
                        {...register('email')} 
                        id="email" 
                        placeholder="Enter your email..." 
                    />
                    { errors.email && <ErrorMessage message={errors.email.message!}/>}
                </fieldset>
                <fieldset className="ml-4 mb-3">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        {...register('password')}
                        className="ml-2 mb-4" 
                        id="password"
                        placeholder="Enter your password..." 
                    />
                    { errors.password && <ErrorMessage message={errors.password.message!}/>}
                </fieldset>
                <button type="submit" className="button-secondary w-1/2 m-auto hover:bg-gray-200">{isPending ? "Logging you in!" : "Submit"}</button>
            </form>
            {error && <ErrorMessage message={error.message}/>}
        </div>
    )
}

export default LoginForm;