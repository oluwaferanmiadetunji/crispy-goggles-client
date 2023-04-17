import {Button} from "antd"
import {PictureOutlined} from "@ant-design/icons"

const MakePost = () => {
  return (
    <div className="w-full">
      <textarea
        placeholder="Share what you are thinking here ..."
        className="border border-solid border-gray-600 border-opacity-32 w-full bg-transparent rounded-lg p-5 text-white focus:border-gray-600"
        rows={4}
      />

      <div className="w-full justify-between flex mt-5">
        <Button
          icon={
            <PictureOutlined style={{color: "rgb(0, 171, 85)", marginRight: "5px"}} />
          }
          className="bg-[#919EAB14] hover:bg-[#919EAB3D] flex text-center items-center text-white hover:text-white font-bold py-2 px-4 rounded-md focus:outline-none h-11"
          style={{color: "white", border: "1px solid transparent"}}
        >
          Image/Video
        </Button>

        <Button
          className="bg-[#00AB55] hover:bg-[#007B55] flex text-center items-center text-white hover:text-white font-bold py-2 w-24 px-4 rounded-md focus:outline-none h-11"
          style={{color: "white", border: "1px solid rgb(0, 171, 85)"}}
        >
          Post
        </Button>
      </div>
    </div>
  )
}

export default MakePost
