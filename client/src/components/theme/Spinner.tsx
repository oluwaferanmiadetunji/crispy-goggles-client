import {LoadingOutlined} from "@ant-design/icons"
import {Spin} from "antd"

type ButtonSpinnerProps = {
  color: string
  size: number
}

export const ButtonSpinner = ({color, size}: ButtonSpinnerProps) => (
  <Spin indicator={<LoadingOutlined style={{fontSize: size, color}} spin />} />
)
