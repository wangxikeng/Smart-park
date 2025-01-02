import {DialogProps} from "../type";
import {Col, Form, Input, Modal, Radio, Row,message} from "antd";
import {useEffect} from "react";
import {editTenementAPI} from "../../../API/tenementList.ts";



const TenementDialog=(props:DialogProps)=>{
    const [form] = Form.useForm();
    const {isOpen,closeDialog,detailList,refreshUserList}=props


    useEffect(() => {
        loadData()
    }, [detailList]);
    const handleCancel = () => {
        closeDialog()
    };
    // 填充表单
    const loadData=()=>{
        form.setFieldsValue(detailList)
    }
    // 修改表单
    const onSubmit=()=>{
        form.validateFields().then(async (res)=>{
           const {message:msg}= await editTenementAPI(res)
            message.success(msg)
             refreshUserList()
            closeDialog()
        })
    }
    return (
        <div>
            <Modal title='编辑' open={isOpen} onOk={onSubmit} onCancel={handleCancel}>
               <Form
                   labelCol={{span:12}}
                   wrapperCol={{span:12}}
                   form={form}
               >
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            label='楼宇名称'
                            name='name'
                            rules={[{ required: true, message: "楼宇名称不能为空" }]}
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='负责人'
                            name='person'
                            rules={[{ required: true, message: "楼宇名称不能为空" }]}
                        >
                            <Input></Input>
                        </Form.Item>
                    </Col>
                </Row>
                   <Row gutter={12}>
                       <Col span={12}>
                           <Form.Item
                               label='使用状态'
                               name='status'
                               rules={[{ required: true, message: "使用状态不能为空" }]}
                           >
                          <Radio.Group>
                              <Radio value='1'>建设中</Radio>
                              <Radio value='2'>已竣工</Radio>
                              <Radio value='3'>使用中</Radio>
                           </Radio.Group>
                           </Form.Item>
                       </Col>
                       <Col span={12}>
                           <Form.Item
                               label='负责人电话'
                               name='tel'
                               rules={[{ required: true, message: "负责人电话不能为空" }]}
                           >
                               <Input></Input>
                           </Form.Item>
                       </Col>
                   </Row>
               </Form>
            </Modal>
        </div>
    )
}

export default TenementDialog
