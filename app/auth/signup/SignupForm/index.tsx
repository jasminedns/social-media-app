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

    const {mutate, data, error} = useMutation({
        mutationFn: SignUp
    })

    return (
        <div className="relative z-99 flex flex-col justify-center items-center grow bg-white text-black p-3 md:p-8 rounded-t-2xl w-full md:w-1/2">
            <h2 className="text-2xl text-center my-4 capitalize font-bold">Sign up</h2>
            <form 
                className="p-4 flex flex-col" 
                onSubmit={handleSubmit(values => mutate(values))}
            >
                <fieldset className="fieldset-primary">
                    <label htmlFor="email">Email Address</label>
                    <input 
                    className="form-input" 
                    id="email" 
                    {...register("email")} 
                    placeholder="mario.rossi@example.com" 
                    />
                </fieldset>
                { errors.email && <ErrorMessage message={errors.email.message!}/>}
                <fieldset className="fieldset-primary">
                    <label htmlFor="username">Username</label>
                    <input 
                        className="form-input" 
                        id="username"  
                        {...register("username")}
                        placeholder="Banana420"
                    />
                </fieldset>
                { errors.username && <ErrorMessage message={errors.username.message!}/>}
                <fieldset className="fieldset-primary">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    className="form-input" id="password" 
                    {...register("password")}
                    placeholder="********" 
                    />
                </fieldset>
                    { errors.password && <ErrorMessage message={errors.password.message!}/>}
                <button className="button-tertiary min-w-[231px] m-auto hover:bg-gray-200">Submit</button>
            </form>
            {data?.error && <ErrorMessage message={data.error}/>}
        </div>
    )
}

export default SignupForm;