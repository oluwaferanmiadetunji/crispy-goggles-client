import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {UserDetailsType} from "components/types/user"
import {RootState} from "./index"

const initialState = {
  details: {} as UserDetailsType,
  isLogged: false,
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<UserDetailsType>) => {
      state.details = action.payload
    },
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload
    },
    logout: (state) => {
      state.details = initialState.details
      state.isLogged = false
    },
    updateDetails: (state, action: PayloadAction<UserDetailsType>) => {
      state.details = {...state.details, ...action.payload}
    },
  },
})

export const {setDetails, setLoginStatus, logout, updateDetails} = UserSlice.actions

export const selectUserState = (state: RootState) => state.user

export default UserSlice.reducer
