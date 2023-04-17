import { useState } from 'react'
import Layout from 'components/authLayout'
import { Header, SubHeader } from 'components/theme/Text'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'

const Signup = () => {
  const [step, setStep] = useState(1)

  const next = () => {
    setStep(step + 1)
  }

  return (
    <Layout title="Create Account">
      <div className="rounded-lg rounded-t-lg rounded-br-xl bg-white p-8 pb-10 sm:p-10 sm:pb-12 w-10/12 max-w-lg">
        <div className="mb-4">
          <Header text="Create Account" style="text-black text-center mb-2" />

          <SubHeader
            text="Join us! Please, enter your details."
            style="text-gray-700 text-center mb-5"
          />
        </div>

        {step === 1 && <StepOne next={next} />}
        {step === 2 && <StepTwo />}
      </div>
    </Layout>
  )
}

export default Signup
