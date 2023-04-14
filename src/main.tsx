import React, {Suspense} from "react"
import ReactDOM from "react-dom/client"
import "antd/dist/reset.css"
import router from "./App"
import "./index.css"
import {RouterProvider} from "react-router-dom"
import {Provider} from "react-redux"
import store from "components/redux"
import {getItem} from "utils/storage"
import jwtDecode from "jwt-decode"
import axios from "axios"
import {setDetails, setLoginStatus} from "components/redux/user"
import {ROUTES} from "utils/constants"
import {getUserData} from "components/api/user"

const token = getItem("auth")

if (token) {
  const decodedToken: any = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(setLoginStatus(false))
    store.dispatch(setDetails({}))
    window.location.href = ROUTES.LOGIN
  } else {
    axios.defaults.headers.common["Authorization"] = token
    store.dispatch(setLoginStatus(true))
    store.dispatch(getUserData())
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
)
