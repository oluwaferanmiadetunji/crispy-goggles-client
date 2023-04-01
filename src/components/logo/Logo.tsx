import logo from 'assets/svg/logo-white.svg'
import { ROUTES } from 'utils/constants'
import { Link } from 'react-router-dom'
import { DingtalkOutlined } from '@ant-design/icons'

const Logo = () => {
  return (
    <Link to={ROUTES.HOME}>
      <div className="flex items-center">
        <DingtalkOutlined style={{ fontSize: '30px', color: '#f4f4f4' }} />
        <img src={logo} className="w-20 ml-2" />
      </div>
    </Link>
  )
}

export default Logo
