import axios from "axios"

type MakePostReqType = {
  url: string
  payload: any
}

export const makePostReq = async ({url, payload}: MakePostReqType) => {
  try {
    const response = await axios.post(url, payload)

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

export const makeGetReq = async (url: string) => {
  try {
    const response = await axios.get(url)

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

export const makePatchReq = async ({url, payload}: MakePostReqType) => {
  try {
    const response = await axios.patch(url, payload)

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
