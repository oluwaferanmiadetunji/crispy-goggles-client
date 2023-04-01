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
  password: string
}

const Login = () => {
  return (
    <Layout title="Log in">
      <div className="rounded-lg rounded-t-lg rounded-br-xl bg-white p-8 pb-10 sm:p-10 sm:pb-12 w-10/12 max-w-lg">
        <div className="mb-4">
          <Header text="Login" style="text-black text-center mb-2" />

          <SubHeader
            text="Welcome back! Please, enter your details."
            style="text-gray-700 text-center mb-5"
          />
        </div>

        <Formik
          initialValues={{
            email: '',
            password: '',
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
                placeholder="john@doe.com"
                type="email"
              />
            </div>

            <div className="mb-6">
              <FormLabel text="Password" style="text-black text-center mb-2" />

              <Input id="password" name="password" type="password" />
            </div>

            <div className="pt-2">
              <PrimaryButton text="Log in" />
            </div>

            <div className="mt-4 pt-3">
              <Link to={ROUTES.SIGNUP}>
                <Paragraph
                  text="Don't have an account? Sign up"
                  style="text-center font-bold mb-2 hover:text-[#2e436f]"
                />
              </Link>

              <Link to={ROUTES.FORGOT_PASSWORD}>
                <Paragraph
                  text="Forgot Password?"
                  style="text-center font-bold hover:text-[#2e436f]"
                />
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  )
}

export default Login
