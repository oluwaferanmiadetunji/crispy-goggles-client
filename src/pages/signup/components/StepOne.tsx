import { FormLabel, Paragraph } from 'components/theme/Text'
import { Input } from 'components/theme/Input'
import { PrimaryButton } from 'components/theme/Buttons'
import { Formik, Form, FormikHelpers } from 'formik'
import { Link } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

interface Values {
  name: string
  password: string
  email: string
}

const StepOne = ({ next }: { next: () => void }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        email: '',
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        next()
      }}
    >
      <Form>
        <div className="mb-6">
          <FormLabel text="Full Name" style="text-black text-center mb-2" />

          <Input id="name" name="name" placeholder="John Doe" type="text" />
        </div>

        <div className="mb-6">
          <FormLabel text="Email Address" style="text-black text-center mb-2" />

          <Input
            id="email"
            name="email"
            placeholder="john@doe.com"
            type="email"
          />
        </div>

        <div className="mb-6">
          <FormLabel text="Password" style="text-black text-center mb-2" />

          <Input id="password" name="password" type="password" />
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

export default StepOne
