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

    const {mutate, isPending, data, error} = useMutation({
        mutationFn: LogIn
    })

    return (
        <div className="p-3 md:p-8 border-1 rounded-2xl w-full md:w-1/2">
            <form 
                className="p-4 flex flex-col" 
                onSubmit={handleSubmit(values => mutate(values))}>
                <fieldset className="fieldset-primary">
                    <label htmlFor="email">Email</label>
                    <input 
                        className="form-input"
                        {...register('email')} 
                        id="email" 
                        placeholder="Enter your email..." 
                    />
                    { errors.email && <ErrorMessage message={errors.email.message!}/>}
                </fieldset>
                <fieldset className="fieldset-primary">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        {...register('password')}
                        className="form-input" 
                        id="password"
                        placeholder="Enter your password..." 
                    />
                    { errors.password && <ErrorMessage message={errors.password.message!}/>}
                </fieldset>
                <button type="submit" className="button-secondary min-w-[231px] m-auto hover:bg-gray-200">{isPending ? "Logging you in!" : "Submit"}</button>
            </form>
            {data?.error && <ErrorMessage message={data.error}/>}
        </div>
    )
}

export default LoginForm;