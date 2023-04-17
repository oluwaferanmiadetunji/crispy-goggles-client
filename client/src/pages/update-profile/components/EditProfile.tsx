import {useState} from "react"
import {Button, Modal, DatePicker} from "antd"
import {CloseOutlined, CameraOutlined, DeleteOutlined} from "@ant-design/icons"
import {UploadImage} from "components/upload"
import {FormLabel} from "components/theme/Text"
import {Input} from "components/theme/Input"
import {Formik, Form, FormikHelpers} from "formik"
import type {DatePickerProps} from "antd"
import dayjs from "dayjs"
import {ButtonSpinner} from "components/theme/Spinner"
import EditProfileLinks from "./EditProfileLinks"
import {ROUTES} from "utils/constants"
import {useAppSelector, useAppDispatch} from "components/hooks/redux"
import {selectUserState} from "components/redux/user"
import NoImg from "assets/img/no-img.png"
import {updateUserData} from "components/api/user"

interface Values {
  name: string
  bio: string | undefined
  location: string | undefined
  username: string | undefined
}

const EditProfile = () => {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)

  const user = useAppSelector(selectUserState)

  const [image, setImage] = useState(user?.details?.Img)
  const [headerImage, setHeaderImage] = useState(user?.details?.HeaderImage)
  const [dateOfBirth, setDateOfBirth] = useState(user?.details?.DateOfBirth)
  const [links, setLinks] = useState(user?.details?.Links)

  const handleUpdateLinks = (links: string[]) => {
    setLinks(links)
  }

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDateOfBirth(new Date(dateString).toISOString())
  }

  const disabledDate = (current: any) => {
    const minDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 18)
    return current && current.valueOf() > minDate.valueOf()
  }

  return (
    <Modal
      centered
      open
      closable={false}
      footer={null}
      className="edit-profile"
      width={650}
    >
      <Formik
        initialValues={{
          name: user?.details?.Name,
          bio: user?.details?.Bio,
          location: user?.details?.Location,
          username: user?.details?.Username,
        }}
        onSubmit={async (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
          setLoading(true)

          dispatch(
            updateUserData({
              ...user.details,
              Name: values.name,
              Bio: values.bio,
              Location: values.location,
              Username: values.username,
              DateOfBirth: dateOfBirth,
              Img: image,
              HeaderImage: headerImage,
            })
          )

          setLoading(false)
        }}
      >
        <Form>
          <div className="w-full h-full mb-5">
            <div className="flex justify-between w-full items-center px-5 py-5">
              <div className="flex items-center">
                <Button
                  className="flex items-center text-center"
                  style={{
                    border: "1px solid transparent",
                    color: "white",
                    background: "black",
                  }}
                  type="link"
                  href={ROUTES.PROFILE}
                >
                  <CloseOutlined size={20} />
                </Button>

                <p className=" text-lg ml-2 font-bold text-white">Update Profile</p>
              </div>

              <Button
                className="text-black font-bold flex items-center text-center"
                style={{border: "1px solid white", color: "white"}}
                htmlType="submit"
                disabled={loading}
              >
                {loading ? <ButtonSpinner color="white" size={20} /> : "Save"}
              </Button>
            </div>

            <div className="edit-profile-content">
              <div className="relative">
                {headerImage ? (
                  <img src={headerImage} className="w-full h-44" />
                ) : (
                  <div className="h-44 w-full bg-[#161c24]" />
                )}

                <div className="flex absolute edit-profile-header-button-overlay">
                  <UploadImage
                    component={
                      <button className="edit-profile-header-button" type="button">
                        <CameraOutlined />
                      </button>
                    }
                    callback={(url: string) => setHeaderImage(url)}
                  />

                  <button className="edit-profile-header-button">
                    <DeleteOutlined />
                  </button>
                </div>

                <div className="edit-profile-img">
                  <img src={image || NoImg} />

                  <div className="flex absolute edit-profile-header-button-overlay">
                    <UploadImage
                      component={
                        <button className="edit-profile-header-button" type="button">
                          <CameraOutlined />
                        </button>
                      }
                      callback={(url: string) => setImage(url)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 px-6">
                <div className="mb-3">
                  <FormLabel text="Name" style="text-white text-center mb-2" />

                  <Input id="name" name="name" type="text" required />
                </div>

                <div className="mb-3">
                  <FormLabel text="About" style="text-white text-center mb-2" />

                  <Input id="bio" name="bio" type="text" as="textarea" rows={4} />
                </div>

                <div className="mb-3">
                  <FormLabel text="Username" style="text-white text-center mb-2" />

                  <Input id="username" name="username" type="text" required />
                </div>

                <div className="mb-3">
                  <FormLabel text="Location" style="text-white text-center mb-2" />

                  <Input id="location" name="location" type="text" required={false} />
                </div>

                <div className="mb-3">
                  <FormLabel text="Date Of Birth" style="text-white text-center mb-2" />

                  <DatePicker
                    onChange={onChange}
                    format="MMM DD, YYYY"
                    className="py-2 pr-2 md:py-3 md:pr-4 rounded-xs bg-gray-200 text-gray-900 text-base w-full outline-none font-bold font-display pl-3 md:pl-4"
                    disabledDate={disabledDate}
                    value={dateOfBirth ? dayjs(dateOfBirth) : null}
                  />
                </div>

                <div className="mb-3">
                  <FormLabel text="Links" style="text-white text-center mb-2" />

                  <EditProfileLinks links={links} setLinks={handleUpdateLinks} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}

export default EditProfile
