import Logo from 'components/logo'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <main className="h-screen w-screen auth_layout_container overflow-hidden grid place-items-center relative">
      <div className="absolute top-5 left-10">
        <Logo />
      </div>

      {children}
    </main>
  )
}

export default Layout
