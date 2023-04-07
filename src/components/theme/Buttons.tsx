import {LoadingOutlined} from "@ant-design/icons"

type ButtonProps = {
  type?: "submit" | "button" | "reset" | undefined
  style?: string
  text: string
  disabled?: boolean
  loading?: boolean
}

export const PrimaryButton = ({
  style,
  type = "submit",
  text,
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`disabled:opacity-75 disabled:cursor-not-allowed text-center whitespace-no-wrap rounded-t rounded-br w-full flex flex-col md:flex-row items-center justify-center py-4 px-10 font-display text-sm md:text-md uppercase bg-[#060a15] hover:bg-[#1c2744] font-bold text-white" ${style}`}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? <LoadingOutlined /> : `${text}`}
    </button>
  )
}
