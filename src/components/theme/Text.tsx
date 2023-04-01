type TextProps = {
  text: string
  style?: string
}
export const Header = ({ text, style }: TextProps) => (
  <h1 className={`text-xl md:text-2xl font-bold font-display ${style}`}>
    {text}
  </h1>
)

export const SubHeader = ({ text, style }: TextProps) => (
  <h3 className={`text-sm font-body text-center ${style}`}>{text}</h3>
)

export const FormLabel = ({ text, style }: TextProps) => (
  <div className="mb-2">
    <label className={`text-sm leading-loose font-bold font-display ${style}`}>
      {text}
    </label>
  </div>
)

export const Paragraph = ({ text, style }: TextProps) => (
  <p className={`text-sm font-body text-[#060a15] font-display ${style}`}>
    {text}
  </p>
)
