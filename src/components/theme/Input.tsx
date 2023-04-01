import { Field } from 'formik'

type InputProps = {
  required?: boolean
  type?: string
  style?: string
  name?: string
  value?: string | number
  id?: string
  placeholder?: string
}

export const Input = ({
  required = true,
  value,
  name,
  style,
  type = 'text',
  id,
  placeholder,
}: InputProps) => {
  return (
    <Field
      className={`py-2 pr-2 md:py-3 md:pr-4 rounded-xs bg-gray-200 text-gray-900 text-base w-full outline-none font-bold font-display pl-3 md:pl-4 ${style}`}
      name={name}
      required={required}
      type={type}
      value={value}
      id={id}
      placeholder={placeholder}
    />
  )
}
