import { handleUpdateProductAction } from '@/actions/product'
import { handleGetManufactureData } from '@/actions/manufacture'
import { UploadOutlined} from '@ant-design/icons'
import {
   Modal, Input, Upload, Image,
   Form, Row, Col, message, Select
} from 'antd'
import { useState, useEffect } from 'react'
import { handleGetAllCategoryAction } from '@/actions/category'
import { formatPrice } from '@/utils/formatPrice'

interface IProps {
   isUpdateModalOpen: boolean
   setIsUpdateModalOpen: (v: boolean) => void
   dataUpdate: any
   setDataUpdate: any
}

const UpdateProduct = (props: IProps) => {
   const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props

   const [form] = Form.useForm()

   const [manufactures, setManufactures] = useState<any[]>([])
   const [categories, setCategories] = useState<any[]>([])

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

   useEffect(() => {
      if (dataUpdate) {
         form.setFieldsValue({
            name: dataUpdate.name,
            image: `http://localhost:3001/products/${dataUpdate.image}`,
            quantity: formatPrice(dataUpdate.quantity),
            price: formatPrice(dataUpdate.price),
            category_id: dataUpdate.category.name,
            manufacture_id: dataUpdate.manufacture.name,
         })
      }
   }, [dataUpdate])

   const handleCloseUpdateModal = () => {
      form.resetFields()
      setIsUpdateModalOpen(false)
      setDataUpdate(null)
   }

   const onFinish = async (values: any) => {
      const { name, image, quantity, price, category_id, manufacture_id } = values
      if (dataUpdate) {
         const data = {
            id: dataUpdate.id, 
            name,
            image,
            quantity,
            price, 
            category_id,
            manufacture_id, 
         }
         await handleUpdateProductAction(data)         
         handleCloseUpdateModal()
         message.success("Sửa thành công!")
      }
   }

   return (
      <Modal
         title="Cập nhật"
         open={isUpdateModalOpen}
         onOk={() => form.submit()}
         onCancel={() => handleCloseUpdateModal()}
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
                     <Input />
                  </Form.Item>
               </Col>
               {/* <Col span={48} md={24}>
                  <Form.Item
                     label="Ảnh"
                     name="image"
                     rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
                  >
                     <Upload
                        fileList={form.getFieldValue('image')}
                        listType='picture'
                        action={'http://localhost:3001/products/'}
                        onChange={(info) => {
                           form.setFieldsValue({ image: info.fileList });
                        }}
                     >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                     </Upload>
                  </Form.Item>
               </Col> */}
               <Col span={48} md={24}>
                  <Form.Item
                     label="Ảnh"
                     name="image"
                     rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
                  >
                     <Image 
                        width={150}
                        height={100}
                        src={dataUpdate?.image}
                     />
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
                              <Select.Option key={item.id} value={item.name}>
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
                              <Select.Option key={item.id} value={item.name}>
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
                     <Input />
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Giá thành"
                     name="price"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input />
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default UpdateProduct
