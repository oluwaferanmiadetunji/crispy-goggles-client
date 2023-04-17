import {makeGetReq, makePatchReq} from "utils/api"
import {Dispatch} from "redux"
import {setDetails, updateDetails} from "components/redux/user"
import {UserDetailsType} from "components/types/user"
import {message} from "antd"

export const getUserData = () => async (dispatch: Dispatch) => {
  const {data, error} = await makeGetReq("/user")

  if (!error) {
    dispatch(setDetails(data?.data))
  }
}

export const updateUserData = (payload: UserDetailsType) => async (
  dispatch: Dispatch
) => {
  const {data, error} = await makePatchReq({
    payload,
    url: "/user",
  })

  if (error) {
    message.error(data.message)
  } else {
    message.success("Profile updated successfully")
    dispatch(updateDetails(data?.data))
  }
}
