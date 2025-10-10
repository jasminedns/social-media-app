import Link from "next/link";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center m-auto grow w-full">
            <h2 className="text-3xl text-center my-4 uppercase">Log In</h2>
            <LoginForm />
            <div className="text-center my-4">
                Don't have an account? Sign up <Link className="text-red-500" href="/auth/signup">here</Link>
            </div>
        </div>
    )
}

export default LoginPage;