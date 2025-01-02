import {Button, Card, Form, Input, Pagination, PaginationProps, Table, Tag,Popconfirm,message } from "antd";
import './index.scss'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {deleteBatchUserAPI, deleteUserAPI, userListAPI} from "../../API/userList.ts";
import {ColumnsType} from "antd/es/table";
import {DataType, SearchType} from "./type";
import Dialog from "./Dialog.tsx";
import {useDispatch} from "react-redux";
import {setUserData} from "../../store/user/userListSlice.ts";


const User=()=>{
    const [userList,setUserList]=useState([])
    const [pageSize,setPageSize]=useState(10)
    const [pageNum,setPageNum]=useState(1)
    const [total,setTotal]=useState(0)
    const [form] = Form.useForm();
    const [isLoading,setLoading]=useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen,setIsModalOpen]=useState<boolean>(false)
    const [title,setTitle]=useState('')
    const dispatch=useDispatch()
    const disabled=useMemo(()=>{
        return selectedRowKeys.length === 0
    },[selectedRowKeys])
    useEffect(() => {
        getUserList({name:'',contact:'',phone:'',pageNum,pageSize})
    },[pageNum,pageSize]);
    // 列配置
    const columns:ColumnsType<DataType> = [
        {
            title: 'No.',
            dataIndex: 'index',
            align: 'center',  // 居中对齐
            render(text,record,index){
                return index+1
            }
        },
        {
            title: '客户名称',
            align: 'center',  // 居中对齐
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '经营状态',
            align: 'center',  // 居中对
            dataIndex: 'status',
            render(value){
                switch (value){
                    case '1':
                        return <Tag color="green">营业中</Tag>
                    case '2':
                        return  <Tag color="#f50">暂停营业</Tag>
                    case '3':
                        return <Tag color="red">已关闭</Tag>
                    default:
                        return '未知'
                }
            }
        },
        {
            title: '联系电话',
            align: 'center',  // 居中对齐
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '所属行业',
            align: 'center',  // 居中对齐
            dataIndex: 'business',
            key: 'business',
        },
        {
            title: '统一信用代码',
            align: 'center',  // 居中对齐
            width: '11%',  // 设置每列宽度
            dataIndex: 'creditCode',
            key: 'creditCode',
        },
        {
            title: '工商注册号',
            align: 'center',  // 居中对齐
            width: '10%',  // 设置每列宽度
            dataIndex: 'industryNum',
            key: 'industryNum',
        },
        {
            title: '组织结构代码',
            align: 'center',  // 居中对
            dataIndex: 'organizationCode',
            key: 'organizationCode',
        },
        {
            title: '法人名',
            align: 'center',  // 居中对齐
            dataIndex: 'legalPerson',
            key: 'legalPerson',
        },
        {
            title: '操作',
            align: 'center',  // 居中对齐
            width: '20%',  // 设置每列宽度
            key: 'operate',
            render(value,record){
                return<>
                    <Button type='primary' onClick={()=>editUserDialog(record)}>编辑</Button>
                    <Popconfirm
                        title="删除操作"
                        description="是否要删除?"
                        onConfirm={()=>confirm(record.id)}
                        okText="是"
                        cancelText="否"
                    >
                        <Button type='primary' danger className='ml'>删除</Button>
                    </Popconfirm>

                </>
            }
        },
    ];

    // 获取用户列表
    const getUserList= async(params:SearchType)=>{
        setLoading(true)
        const {data}= await userListAPI(params)
        setUserList(data.list)
        setTotal(data.total)
        setLoading(false)
    }

    // 点击提交
    const onFinish=(values:{name:string,contact:string,phone:string})=>{
      const params={
          ...values,
          pageSize,
          pageNum
      }
        getUserList(params)
    }

    // 点击重置
    const onReset=()=>{
        form.resetFields()
        setSelectedRowKeys([])
        setPageNum(1)
        setPageSize(10)
        getUserList({name:'',contact:'',phone:'',pageNum:1,pageSize:10})
    }

    // 点击翻页
    const onChange: PaginationProps['onChange'] = (pageNumber,page) => {
        setPageSize(page)
        setPageNum(pageNumber)
    };

    // 选择行配置
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[] ) => {
            setSelectedRowKeys(selectedRowKeys);  // 更新选中的行
        },
    };
    // 点击删除
    const confirm= async (id:string)=>{
        const {message: msg } = await deleteUserAPI(id);
        message.success(msg)
        getUserList({name:'',contact:'',phone:'',pageNum,pageSize})
    }
    // 批量删除
    const onDeleteBatch= async()=>{
        const {message: msg } = await deleteBatchUserAPI(selectedRowKeys);
        message.success(msg)
        getUserList({name:'',contact:'',phone:'',pageNum,pageSize})
    }
    // 新增企业
    const openAddDialog=()=>{
        setIsModalOpen(true)
        setTitle('新增企业')
    }

    // 编辑企业
    const editUserDialog=(record:DataType)=>{
        setIsModalOpen(true)
        setTitle('编辑企业')
        dispatch(setUserData(record))
    }
    // 关闭弹窗(需要缓存)
    const closeDialog=useCallback(()=>{
        setIsModalOpen(false)
    },[])
    // 刷新用户数据
    const refreshUserList= async()=>{
        setLoading(true)
        const {data}= await userListAPI({name:'',contact:'',phone:'',pageNum,pageSize})
        setUserList(data.list)
        setTotal(data.total)
        setLoading(false)
    }
    return <>
        <div className='userList'>
            <MyDialog isModalOpen={isModalOpen} closeDialog={closeDialog} title={title} refresh={refreshUserList}></MyDialog>
            <Card>
                <Form
                    layout='inline'
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item label="企业名称：" name='name'>
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="联系人：" name='contact'>
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="联系电话：" name='phone'>
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className='mr' htmlType="submit">查询</Button>
                        <Button onClick={onReset}>重置</Button>
                    </Form.Item>
                </Form>

            </Card>
            <Card className='mt'>
                <Button type="primary" className='mr' onClick={openAddDialog}>新增企业</Button>
                <Button disabled={disabled} onClick={onDeleteBatch}>批量删除</Button>
            </Card>
            <Card className='mt'>
                <Table
                    dataSource={userList}
                    columns={columns}
                    loading={isLoading}
                    rowKey={(record)=>record.id}
                    scroll={{y:400}}
                    pagination={false}
                    rowSelection={rowSelection} />
                <Pagination
                    current={pageNum}
                    pageSize={pageSize}
                    className='mt'
                    showTotal={(total) => `共 ${total} 条`}
                    align="start"
                    total={total}
                    onChange={onChange}>
                </Pagination>
            </Card>
        </div>
    </>
}
// 缓存组件
const MyDialog=React.memo(Dialog)
export default User
