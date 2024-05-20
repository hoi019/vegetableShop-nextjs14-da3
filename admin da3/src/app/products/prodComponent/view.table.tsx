import {
   Modal, Input, Upload, Button,
   Form, Row, Col, Select, Image
} from 'antd'
import { useEffect } from 'react'
import { formatPrice } from '@/utils/formatPrice'

interface IProps {
   isViewModalOpen: boolean
   setIsViewModalOpen: (v: boolean) => void
   dataView: any
   setDataView: any
}

const ViewProduct = (props: IProps) => {
   const {
      isViewModalOpen, setIsViewModalOpen,
      dataView, setDataView
   } = props

   const [form] = Form.useForm()

   useEffect(() => {
      if (dataView) {
         form.setFieldsValue({
            name: dataView.name,
            image: `http://localhost:3001/products/${dataView.image}`,
            quantity: formatPrice(dataView.quantity),
            price: formatPrice(dataView.price),
            category_id: dataView.category.name,
            manufacture_id: dataView.manufacture.name,
         })
      }
   }, [dataView])

   const handleCloseUpdateModal = () => {
      form.resetFields()
      setIsViewModalOpen(false)
      setDataView(null)
   }

   return (
      <Modal
         title="Cập nhật"
         open={isViewModalOpen}
         onCancel={() => handleCloseUpdateModal()}
         onOk={() => handleCloseUpdateModal()}
         maskClosable={false}
         okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
      >
         <Form
            name="basic"
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
                     <Input readOnly />
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Ảnh"
                     name="image"
                     rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
                  >
                     <Image 
                        width={150}
                        height={100}
                        src={dataView?.image}
                     />
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Nhà cung cấp"
                     name="manufacture_id"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input readOnly/>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Danh mục"
                     name="category_id"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input readOnly/>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Số lượng"
                     name="quantity"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input readOnly/>
                  </Form.Item>
               </Col>
               <Col span={48} md={24}>
                  <Form.Item
                     label="Giá thành"
                     name="price"
                     rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                  >
                     <Input readOnly/>
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default ViewProduct
