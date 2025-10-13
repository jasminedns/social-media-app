const ErrorMessage = ({message}:{message:string|undefined}) => {
    return (
        <p className="text-red-500 text-center my-2">{message}</p>
    )
}

export default ErrorMessage;