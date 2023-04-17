import React from "react"
import {ROUTES} from "utils/constants"
import {Navigate} from "react-router-dom"
import {useAppSelector} from "components/hooks/redux"
import {selectUserState} from "components/redux/user"

const AuthRoutes = ({children}: {children: React.ReactNode}): any => {
  const {isLogged} = useAppSelector(selectUserState)

  return isLogged ? <Navigate to={ROUTES.HOME} replace /> : children
}

export default AuthRoutes
