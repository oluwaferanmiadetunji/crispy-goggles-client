import {useEffect} from "react"
import Sidebar from "components/layout/components/sidebar"
import {useLocation} from "react-router-dom"
import {saveItem} from "utils/storage"

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout = ({children}: LayoutProps) => {
  const location = useLocation()

  useEffect(() => {
    saveItem("page", location.pathname)
  }, [location.pathname])

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />

      <main>{children}</main>
    </div>
  )
}

export default Layout
