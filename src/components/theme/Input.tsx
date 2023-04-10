import {Field} from "formik"

type InputProps = {
  required?: boolean
  type?: string
  style?: string
  name?: string
  id?: string
  placeholder?: string
  as?: string
  rows?: number
}

export const Input = ({
  required = true,
  name,
  style,
  type = "text",
  id,
  placeholder,
  as = "input",
  rows,
}: InputProps) => {
  return (
    <Field
      className={`py-2 pr-2 md:py-3 md:pr-4 rounded-xs bg-gray-200 text-gray-900 text-base w-full outline-none font-bold font-display pl-3 md:pl-4 ${style}`}
      name={name}
      required={required}
      type={type}
      id={id}
      placeholder={placeholder}
      as={as}
      rows={rows}
    />
  )
}
