import {ROUTES} from "utils/constants"
import {Link} from "react-router-dom"
import {DingtalkOutlined} from "@ant-design/icons"

const Logo = () => {
  return (
    <Link to={ROUTES.HOME}>
      <div className="flex items-center">
        <div className="w-full">
          <DingtalkOutlined style={{fontSize: "30px", color: "#f4f4f4"}} />
        </div>
      </div>
    </Link>
  )
}

export default Logo
