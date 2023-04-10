import type {UploadProps} from "antd"
import {message, Upload} from "antd"

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

type UploadImage = {
  component: JSX.Element
  callback: (url: string) => void
}

const UploadImage = ({component, callback}: UploadImage) => {
  return (
    <Upload showUploadList={false} {...props}>
      {component}
    </Upload>
  )
}

export default UploadImage
