import Logo from "../components/Logo";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header className={`flex justify-between items-center pb-4`}>
        <Logo />
      </header>
      {children}
    </>
  )
}

export default AuthLayout;