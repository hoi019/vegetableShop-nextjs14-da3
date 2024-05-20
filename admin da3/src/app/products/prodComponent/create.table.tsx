import { handleCreateProductAction } from '@/actions/product'
import { handleGetManufactureData } from '@/actions/manufacture'
import { handleGetAllCategoryAction } from '@/actions/category'
import {
   Modal, Input, Form, Row, Col, message, Select, Upload, Button
} from 'antd'
import { useEffect, useState } from 'react'
import { UploadOutlined} from '@ant-design/icons'
import Image from 'next/image'
import ImageUpload from '@/components/upload/Upload'


interface IProps {
   isCreateModalOpen: boolean;
   setIsCreateModalOpen: (v: boolean) => void
}

const CreateProduct = (props: IProps) => {
   const { isCreateModalOpen, setIsCreateModalOpen } = props
   const [imageUrl, setImageUrl] = useState<string>('')
   const [imageFile, setImageFile] = useState(null)
   const [manufactures, setManufactures] = useState<any[]>([])
   const [categories, setCategories] = useState<any[]>([])

   const [form] = Form.useForm()

   const handleGetManufacture = async () => {
      const res = await handleGetManufactureData()
      setManufactures(res)
   }

   const handleGetCategory = async () => {
      const res = await handleGetAllCategoryAction()
      setCategories(res)
   }

   useEffect(() => {
      handleGetManufacture()
      handleGetCategory()
   }, [])

   const handleCloseCreateModal = () => {
      form.resetFields()
      setIsCreateModalOpen(false)
      setImageUrl('')
   }

   const handleUploadChange = (info: any) => {
      if (info.file.status === 'done') {
         console.log(info.file.name)
         console.log(info.file.originFileObj)
         setImageFile(info.file.originFileObj)  
         const reader = new FileReader()
         reader.onload = (e: any) => {
            setImageUrl(e.target.result)
         }
         console.log(reader)
         
         reader.readAsDataURL(info.file.originFileObj)
      } else if (info.file.status === 'error') {
         message.error(`${info.file.name} upload thất bại.`)
      }
   }

   const onFinish = async (values: any) => {
      // await handleCreateProductAction({...values, image: imageUrl})
      handleCloseCreateModal() 
      console.log(imageUrl)
      console.log(values)
      message.success("Thêm thành công!")
   }

   return (
      <Modal
         title="Thêm mới"
         open={isCreateModalOpen}
         onOk={() => form.submit()}
         onCancel={() => handleCloseCreateModal()}
         maskClosable={false}
         okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
      >
         <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            form={form}
         >
            <Row gutter={[15, 0]}>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Tên"
                     name="name"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input placeholder='Nhập tên...'/>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Ảnh"
                     name="image"
                     // rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
                  >
                     <Upload
                        action="http://localhost:3001/products"
                        listType="picture"
                        onChange={handleUploadChange}
                     >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                     </Upload>          
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Nhà cung cấp"
                     name="manufacture_id"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Select
                        placeholder="Chọn nhà cung cấp"
                        style={{ width: '100%' }}
                     >
                        {manufactures && manufactures.length > 0 ? (
                           manufactures.map((item: any) => (
                              <Select.Option key={item.id} value={item.id}> {/* Sử dụng value là ID của nhà cung cấp */}
                                 {item.name}
                              </Select.Option>
                           ))
                        ) : (
                           <Select.Option value="">Không có dữ liệu</Select.Option>
                        )}
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Danh mục"
                     name="category_id"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Select
                        placeholder="Chọn danh mục"
                        style={{ width: '100%' }}
                     >
                        {categories && categories.length > 0 ? (
                           categories.map((item: any) => (
                              <Select.Option key={item.id} value={item.id}> {/* Sử dụng value là ID của danh mục */}
                                 {item.name}
                              </Select.Option>
                           ))
                        ) : (
                           <Select.Option value="">Không có dữ liệu</Select.Option>
                        )}
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Số lượng"
                     name="quantity"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input placeholder='Nhập số lượng...'/>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Giá thành"
                     name="price"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input placeholder='Nhập giá thành...'/>
                  </Form.Item>
               </Col> 
            </Row>
         </Form>
      </Modal>
   )
}

export default CreateProduct
