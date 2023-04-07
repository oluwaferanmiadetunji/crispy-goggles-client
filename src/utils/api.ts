import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

type MakePostReqType = {
  url: string
  payload: any
}

export const makePostReq = async ({url, payload}: MakePostReqType) => {
  try {
    const response = await axios.post(`${API_URL}${url}`, payload)

    const status = response.status
    const data = response.data

    return Object.freeze({
      status,
      data,
      error: false,
    })
  } catch (err) {
    const error: any = err
    const status = error.response.status
    const data = error.response.data

    return Object.freeze({
      status,
      data,
      error: true,
    })
  }
}
