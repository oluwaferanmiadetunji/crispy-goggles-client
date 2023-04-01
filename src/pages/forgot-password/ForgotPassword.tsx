import Layout from 'components/authLayout'
import { Header, SubHeader, FormLabel, Paragraph } from 'components/theme/Text'
import { Input } from 'components/theme/Input'
import { PrimaryButton } from 'components/theme/Buttons'
import { Formik, Form, FormikHelpers } from 'formik'
import { message } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

interface Values {
  email: string
}

const ForgotPassword = () => {
  return (
    <Layout title="Log in">
      <div className="rounded-lg rounded-t-lg rounded-br-xl bg-white p-8 pb-10 sm:p-10 sm:pb-12 w-10/12 max-w-lg">
        <div className="mb-4">
          <Header text="Forgot your password?" style="text-black text-center mb-2" />

          <SubHeader
            text="Enter your email to reset your password."
            style="text-gray-700 text-center mb-5"
          />
        </div>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>,
          ) => {
            setTimeout(() => {
              message.success(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 500)
          }}
        >
          <Form>
            <div className="mb-6">
              <FormLabel
                text="Email Address"
                style="text-black text-center mb-2"
              />

              <Input
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
            </div>

            <div className="pt-2">
              <PrimaryButton text="Reset Password" />
            </div>

            <div className="mt-4 pt-3">
              <Link to={ROUTES.LOGIN}>
                <Paragraph
                  text="Back to login"
                  style="text-center font-bold mb-2 hover:text-[#2e436f]"
                />
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  )
}

export default ForgotPassword
