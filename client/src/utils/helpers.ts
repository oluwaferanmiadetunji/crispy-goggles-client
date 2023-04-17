import dayjs from "dayjs"
import axios from "axios"
import {clearStorage, saveItem} from "utils/storage"
import {logout} from "components/redux/user"
import {ROUTES} from "utils/constants"
import {Dispatch} from "redux"

export const formatDate = (date: any, format = "MMM DD, YYYY") =>
  dayjs(date).format(format)

export const getLink = (allLinks: string[] | null | undefined, linkType: string) => {
  try {
    return allLinks ? allLinks.find((oneLink) => oneLink.includes(linkType)) : ""
  } catch (err) {
    return ""
  }
}

export const formatThousands = (value: any) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value)

export const shortenString = (name: string, length = 40) => {
  if (name && name.length > length) {
    return `${name.slice(0, length)}...`
  }

  return name
}

export const setAuthorizationHeader = (token: string) => {
  const IdToken = `Bearer ${token}`
  saveItem("auth", IdToken)
  axios.defaults.headers.common["Authorization"] = IdToken
}

export const logoutUser = () => (dispatch: Dispatch) => {
  clearStorage()
  delete axios.defaults.headers.common["Authorization"]
  dispatch(logout())
  window.location.href = ROUTES.LOGIN
}
