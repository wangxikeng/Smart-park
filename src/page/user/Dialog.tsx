import {Col, Form, Input, message, Modal, Radio, Row} from "antd";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {addOrEditUserAPI} from "../../API/userList.ts";

interface DialogProps{
    isModalOpen:boolean
    closeDialog:()=>void
    title:string
    refresh:()=>void
}
const Dialog=(props:DialogProps)=>{
    const {isModalOpen,closeDialog,title,refresh}=props
    const [form]=Form.useForm()
    const {userData}=useSelector((state:any)=>state.userListSlice)

    useEffect(() => {
        if(title==='编辑企业'){
            form.setFieldsValue(userData) // 设置表单的值
        }
        else{
            form.resetFields()
        }
    },[isModalOpen]);
// 点击 提交
const onSubmit=()=>{
    form.validateFields().then(async (res)=>{
       await addOrEditUserAPI(res)
       if(title==='新增企业'){
           message.success('新建成功')
       }
       else{
           message.success('编辑成功')
       }
       closeDialog()
        // 刷新表格
        refresh()
       }
    )
}
    return<>
        <Modal title={title} open={isModalOpen} onCancel={closeDialog} onOk={onSubmit}>
          <Form
              form={form}
              labelCol={{span:12}}
              wrapperCol={{span:12}}
          >
              <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item
                          label="客户名称"
                          name="name"
                          rules={[{ required: true, message: "客户名称不能为空" }]}
                      >
                          <Input></Input>
                      </Form.Item>

                  </Col>
                  <Col span={12}>
                      <Form.Item
                          label="联系电话"
                          name="phone"
                          rules={[{ required: true, message: "联系电话不能为空" }]}
                      >
                          <Input></Input>
                      </Form.Item>

                  </Col>
              </Row>
              <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item
                          label="经营状态"
                          name="status"
                          rules={[{ required: true, message: "经营状态不能为空" }]}
                      >
                          <Radio.Group>
                              <Radio value="1">营业中</Radio>
                              <Radio value="2">暂停营业</Radio>
                              <Radio value="3">已关闭</Radio>
                          </Radio.Group>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item
                          label="所属行业"
                          name="business"
                          rules={[{ required: true, message: "所属行业不能为空" }]}
                      >
                          <Input/>
                      </Form.Item>

                  </Col>
              </Row>
              <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item
                          label="法人名"
                          name="legalPerson"
                          rules={[{ required: true, message: "法人名不能为空" }]}
                      >
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item
                          label="统一信用代码"
                          name="creditCode"
                          rules={[{ required: true, message: "统一信用代码不能为空" }]}
                      >
                          <Input/>
                      </Form.Item>
                  </Col>
              </Row>
              <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item
                          label="工商注册号"
                          name="industryNum"
                          rules={[{ required: true, message: "工商注册号不能为空" }]}
                      >
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item
                          label="组织机构代码"
                          name="organizationCode"
                          rules={[{ required: true, message: "组织机构代码不能为空" }]}
                      >
                          <Input/>
                      </Form.Item>
                  </Col>
              </Row>

          </Form>
        </Modal></>

}

export default Dialog
