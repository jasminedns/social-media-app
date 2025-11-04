import Logo from "../components/Logo";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header className={`flex justify-center md:justify-between items-center p-8 md:pb-4`}>
        <Logo />
      </header>
      {children}
    </>
  )
}

export default AuthLayout;