import {makeGetReq} from "utils/api"
import {Dispatch} from "redux"
import {setDetails} from "components/redux/user"

export const getUserData = () => async (dispatch: Dispatch) => {
  const {data, error} = await makeGetReq("/user")

  if (!error) {
    dispatch(setDetails(data?.data))
  }
}
