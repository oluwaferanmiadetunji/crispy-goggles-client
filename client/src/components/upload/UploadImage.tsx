import {useState} from "react"
import type {UploadProps} from "antd"
import {message, Upload} from "antd"
import {storage} from "utils/firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {ButtonSpinner} from "components/theme/Spinner"

type UploadImage = {
  component: JSX.Element
  callback: (url: string) => void
}

const UploadImage = ({component, callback}: UploadImage) => {
  const [loading, setLoading] = useState(false)

  const props: UploadProps = {
    name: "file",
    action: async (file: any): Promise<any> => {
      try {
        setLoading(true)

        const fileRef = ref(storage, `files/${file.name}`)
        const uploadTask = await uploadBytes(fileRef, file)

        const downloadURL = await getDownloadURL(uploadTask.ref)

        callback(downloadURL)
        setLoading(false)
        message.success("Image uploaded successfully!")
      } catch (error) {
        setLoading(false)
        message.error("Failed to upload image.")
        console.error(error)
      }
    },

    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <Upload showUploadList={false} {...props}>
      {loading ? <ButtonSpinner color="white" size={40} /> : component}
    </Upload>
  )
}

export default UploadImage
