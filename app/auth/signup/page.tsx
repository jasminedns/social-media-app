import Link from "next/link";
import SignupForm from "./SignupForm";

const SignupPage = () => {
    return (
        <div className="border-1 rounded-2xl w-[700px] mx-auto">
            <h2 className="text-3xl text-center my-2">Sign up</h2>
            <SignupForm />
            <div className="text-center my-2">
                Already have an account? Log in <Link className="text-red-500" href="/auth/login">here</Link>
            </div>
        </div>
    )
}

export default SignupPage;