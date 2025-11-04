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
        <div className="relative z-99 flex flex-col justify-center items-center grow bg-white text-black p-3 md:p-8 rounded-t-2xl w-full md:w-1/2">
            <h2 className="text-2xl text-center my-4 capitalize font-bold">Welcome Back</h2>
            <form 
                className="p-4 flex flex-col" 
                onSubmit={handleSubmit(values => mutate(values))}>
                <fieldset className="fieldset-primary">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        className="form-input"
                        {...register('email')} 
                        id="email" 
                        placeholder="mario.rossi@example.com" 
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
                        placeholder="********" 
                    />
                    { errors.password && <ErrorMessage message={errors.password.message!}/>}
                </fieldset>
                <button type="submit" className="button-tertiary min-w-[231px] m-auto hover:bg-gray-200">{isPending ? "Logging you in!" : "Submit"}</button>
            </form>
            {data?.error && <ErrorMessage message={data.error}/>}
        </div>
    )
}

export default LoginForm;