import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <div className="border-1 rounded-2xl w-[700px] mx-auto">
            <h2 className="text-3xl text-center my-2">Log In!</h2>
            <LoginForm />
            <div className="text-center my-2">
                Don't have an account? Sign up <Link className="text-red-500" href="/auth/signup">here</Link>
            </div>
        </div>
    )
}

export default LoginPage;