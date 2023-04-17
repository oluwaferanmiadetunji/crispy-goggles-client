import {getItem} from "utils/storage"
import {Dispatch} from "redux"
import {ROUTES} from "utils/constants"
import {setAuthorizationHeader} from "utils/helpers"
import {setDetails, setLoginStatus} from "components/redux/user"
import {NavigateFunction} from "react-router-dom"
import {UserDetailsType} from "components/types/user"

type LoginUserProps = {
  navigate: NavigateFunction
  Token: string
  User: UserDetailsType
}

export const loginUser = ({navigate, User, Token}: LoginUserProps) => (
  dispatch: Dispatch
) => {
  const redirect = getItem("path") || ROUTES.HOME

  setAuthorizationHeader(Token)
  dispatch(setDetails(User))
  dispatch(setLoginStatus(true))

  setTimeout(() => {
    navigate(redirect)
  }, 1000)
}
