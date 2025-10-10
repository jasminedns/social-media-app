import Link from "next/link";
import SignupForm from "./SignupForm";

const SignupPage = () => {
    return (
        <div className="flex flex-col justify-center items-center m-auto grow w-full">
            <h2 className="text-3xl text-center my-4 uppercase">Sign up</h2>
            <SignupForm />
            <div className="text-center my-4">
                Already have an account? Log in <Link className="text-red-500" href="/auth/login">here</Link>
            </div>
        </div>
    )
}

export default SignupPage;