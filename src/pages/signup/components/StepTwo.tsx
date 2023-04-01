import { FormLabel, Paragraph } from 'components/theme/Text'
import { Input } from 'components/theme/Input'
import { PrimaryButton } from 'components/theme/Buttons'
import { Formik, Form, FormikHelpers } from 'formik'
import { message } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

interface Values {
  username: string
  dateOfBirth: string
}

const StepTwo = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        dateOfBirth: '',
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
          message.success(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 500)
      }}
    >
      <Form>
        <div className="mb-6">
          <FormLabel text="Username" style="text-black text-center mb-2" />

          <Input
            id="username"
            name="username"
            placeholder="johnDoe"
            type="text"
          />
        </div>

        <div className="mb-6">
          <FormLabel text="Date Of Birth" style="text-black text-center mb-2" />

          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="12-12-12"
            type="text"
          />
        </div>

        <div className="pt-2">
          <PrimaryButton text="Submit" />
        </div>

        <div className="mt-4 pt-3">
          <Link to={ROUTES.LOGIN}>
            <Paragraph
              text="Already have an account? Login"
              style="text-center font-bold mb-2 hover:text-[#2e436f]"
            />
          </Link>
        </div>
      </Form>
    </Formik>
  )
}

export default StepTwo
