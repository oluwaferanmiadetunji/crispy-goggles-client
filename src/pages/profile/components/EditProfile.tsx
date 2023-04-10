import {useState} from "react"
import {Button, Modal, DatePicker, Space, Tag} from "antd"
import {
  EditOutlined,
  CloseOutlined,
  CameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import {user} from "utils/__dummy"
import {UploadImage} from "components/upload"
import {FormLabel} from "components/theme/Text"
import {Input} from "components/theme/Input"
import {Formik, Form, FormikHelpers} from "formik"
import type {DatePickerProps} from "antd"
import dayjs from "dayjs"
import {ButtonSpinner} from "components/theme/Spinner"
import EditProfileLinks from "./EditProfileLinks"

interface Values {
  name: string
  bio: string
  location: string
}

const EditProfile = () => {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleHeaderImageUpload = (url: string) => {}

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const [image, setImage] = useState(user?.img)
  const [headerImage, setHeaderImage] = useState(user?.header_img)
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateofbirth)
  const [links, setLinks] = useState(user?.links)

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
    <div>
      <Button
        icon={<EditOutlined style={{color: "white", marginRight: "5px"}} />}
        className="absolute left-auto right-0 top-0 bg-[#00AB55] hover:bg-[#007B55] flex text-center items-center text-white hover:text-white font-bold py-2 px-4 rounded-md focus:outline-none h-10"
        style={{color: "white", border: "1px solid transparent"}}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </Button>

      <Modal
        centered
        open={open}
        onOk={handleOpen}
        onCancel={handleClose}
        closable={false}
        footer={null}
        className="edit-profile"
        width={650}
      >
        <Formik
          initialValues={{
            name: user?.name,
            bio: user?.bio,
            location: user?.location,
          }}
          onSubmit={async (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
            setLoading(true)
            console.log({values})
            setLoading(false)
          }}
        >
          <Form>
            <div className="w-full h-full mb-5">
              <div className="flex justify-between w-full items-center px-5 py-5">
                <div className="flex items-center">
                  <Button
                    className="flex items-center text-center"
                    onClick={handleClose}
                    style={{
                      border: "1px solid transparent",
                      color: "white",
                      background: "black",
                    }}
                  >
                    <CloseOutlined size={20} />
                  </Button>

                  <p className=" text-lg ml-2 font-bold text-white">Edit Profile</p>
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
                  <img src={headerImage} className="w-full h-44" />

                  <div className="flex absolute edit-profile-header-button-overlay">
                    <UploadImage
                      component={
                        <button className="edit-profile-header-button">
                          <CameraOutlined />
                        </button>
                      }
                      callback={handleHeaderImageUpload}
                    />

                    <button className="edit-profile-header-button">
                      <DeleteOutlined />
                    </button>
                  </div>

                  <div className="edit-profile-img">
                    <img src={image} />

                    <div className="flex absolute edit-profile-header-button-overlay">
                      <UploadImage
                        component={
                          <button className="edit-profile-header-button">
                            <CameraOutlined />
                          </button>
                        }
                        callback={handleHeaderImageUpload}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 px-6">
                  <div className="mb-3">
                    <FormLabel text="Name" style="text-white text-center mb-2" />

                    <Input id="name" name="name" type="text" />
                  </div>

                  <div className="mb-3">
                    <FormLabel text="About" style="text-white text-center mb-2" />

                    <Input id="bio" name="bio" type="text" as="textarea" rows={4} />
                  </div>

                  <div className="mb-3">
                    <FormLabel text="Location" style="text-white text-center mb-2" />

                    <Input id="location" name="location" type="text" />
                  </div>

                  <div className="mb-3">
                    <FormLabel text="Date Of Birth" style="text-white text-center mb-2" />

                    <DatePicker
                      onChange={onChange}
                      format="MMM DD, YYYY"
                      className="py-2 pr-2 md:py-3 md:pr-4 rounded-xs bg-gray-200 text-gray-900 text-base w-full outline-none font-bold font-display pl-3 md:pl-4"
                      disabledDate={disabledDate}
                      value={dayjs(dateOfBirth)}
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
    </div>
  )
}

export default EditProfile
