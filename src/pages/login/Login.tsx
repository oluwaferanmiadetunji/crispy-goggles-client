import {useState} from "react"
import Layout from "components/authLayout"
import {Header, SubHeader, FormLabel, Paragraph} from "components/theme/Text"
import {Input} from "components/theme/Input"
import {PrimaryButton} from "components/theme/Buttons"
import {Formik, Form, FormikHelpers} from "formik"
import {message} from "antd"
import {Link} from "react-router-dom"
import {ROUTES} from "utils/constants"
import {makePostReq} from "utils/api"
import {useNavigate} from "react-router-dom"
import {saveItem, getItem} from "utils/storage"

interface Values {
  email: string
  password: string
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
            email: "",
            password: "",
          }}
          onSubmit={async (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
            setLoading(true)
            const {data, error} = await makePostReq({
              payload: values,
              url: "/auth/signin",
            })
            setSubmitting(false)
            setLoading(false)

            if (error) {
              message.error(data.message)
            } else {
              const redirect = getItem("path") || ROUTES.HOME
              message.success(data.message)
              saveItem("auth", data.data)
              setTimeout(() => {
                navigate(redirect)
              }, 1000)
            }
          }}
        >
          <Form>
            <div className="mb-6">
              <FormLabel text="Email Address" style="text-black text-center mb-2" />

              <Input id="email" name="email" placeholder="john@doe.com" type="email" />
            </div>

            <div className="mb-6">
              <FormLabel text="Password" style="text-black text-center mb-2" />

              <Input id="password" name="password" type="password" />
            </div>

            <div className="pt-2">
              <PrimaryButton text="Log in" loading={loading} />
            </div>

            <div className="mt-4 pt-3">
              <Link to={ROUTES.SIGNUP}>
                <Paragraph
                  text="Don't have an account? Sign up"
                  style="text-center font-bold mb-2 hover:text-[#2e436f] text-[#060a15]"
                />
              </Link>

              <Link to={ROUTES.FORGOT_PASSWORD}>
                <Paragraph
                  text="Forgot Password?"
                  style="text-center font-bold hover:text-[#2e436f] text-[#060a15]"
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
