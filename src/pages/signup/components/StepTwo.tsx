import {useState} from "react"
import {FormLabel, Paragraph} from "components/theme/Text"
import {Input} from "components/theme/Input"
import {PrimaryButton} from "components/theme/Buttons"
import {Formik, Form, FormikHelpers} from "formik"
import {Link} from "react-router-dom"
import {ROUTES} from "utils/constants"
import type {DatePickerProps} from "antd"
import {DatePicker, message} from "antd"
import {makePostReq} from "utils/api"
import {useNavigate} from "react-router-dom"
import {getItem} from "utils/storage"

interface Values {
  username: string
}

const StepTwo = () => {
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDateOfBirth(new Date(dateString).toISOString())
  }

  const disabledDate = (current: any) => {
    // Calculate the date 18 years ago from today
    const minDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 18)

    // Disable dates that are less than 18 years ago
    return current && current.valueOf() > minDate.valueOf()
  }

  return (
    <Formik
      initialValues={{
        username: "",
      }}
      onSubmit={async (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
        setLoading(true)
        const user = getItem("signup")

        const {data, error} = await makePostReq({
          payload: {...values, dateOfBirth, id: user?.id},
          url: "/users/finish-register",
        })
        setSubmitting(false)
        setLoading(false)

        if (error) {
          message.error(data.message)
        } else {
          message.success(data.message)
          setTimeout(() => {
            navigate(ROUTES.LOGIN)
          }, 1000)
        }
      }}
    >
      <Form>
        <div className="mb-6">
          <FormLabel text="Username" style="text-black text-center mb-2" />

          <Input id="username" name="username" placeholder="johnDoe" type="text" />
        </div>

        <div className="mb-6">
          <FormLabel text="Date Of Birth" style="text-black text-center mb-2" />

          <DatePicker
            onChange={onChange}
            format="MMM DD, YYYY"
            className="py-2 pr-2 md:py-3 md:pr-4 rounded-xs bg-gray-200 text-gray-900 text-base w-full outline-none font-bold font-display pl-3 md:pl-4"
            disabledDate={disabledDate}
          />
        </div>

        <div className="pt-2">
          <PrimaryButton text="Submit" loading={loading} disabled={!dateOfBirth} />
        </div>

        <div className="mt-4 pt-3">
          <Link to={ROUTES.LOGIN}>
            <Paragraph
              text="Already have an account? Login"
              style="text-center font-bold mb-2 hover:text-[#2e436f] text-[#060a15]"
            />
          </Link>
        </div>
      </Form>
    </Formik>
  )
}

export default StepTwo
