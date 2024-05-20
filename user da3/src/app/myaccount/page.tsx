'use client'
import Input from "antd/es/input/Input"
import { Select, Button } from "antd"

const MyAccount = () => {
   return (  
      <div className="mx-5 my-[35px] flex justify-center">
         <div className="">
            <h1 className="mb-[0px] text-[40px] font-medium">Hello User</h1> <br />
            <p>Tại đây bạn có thể sửa lại thông tin của chính bản thân theo ý của bạn để cập nhật thông tin cá nhân.</p>
            <p>Ấn lưu để lưu thông tin của tài khoản mới chỉnh sửa.</p>
            <div className="my-5">
               <div className="grid grid-cols-2 gap-5 ">
                  <div>
                     <p>Tên: </p>
                     <Input placeholder="" className="px-4 py-2"/>
                  </div>
                  <div>
                     <p>Tên đệm: </p>
                     <Input placeholder="" className="px-4 py-2"/>
                  </div>
               </div>
               <div className="mt-5">
                  <Select className="w-full h-11">
                     <Select.Option value="nam">Nam</Select.Option>
                     <Select.Option value="nu">Nữ</Select.Option>
                  </Select>
               </div>
               <div className=" mt-5">
                  <p>Địa chỉ email: </p>
                  <Input placeholder="" className="px-4 py-2"/>
               </div>
               <div className=" mt-5">
                  <p>Số điện thoại: </p>
                  <Input placeholder="" className="px-4 py-2"/>
               </div>
               <div className="mt-5 flex justify-end">
                  <Button type="primary" className=" bg-blue-500 px-10" htmlType="submit">
                     Cập nhật
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
 
export default MyAccount