import {
    Badge,
    Button,
    Card,
    Form,
    Input,
    message,
    Pagination,
    PaginationProps,
    Popconfirm,
    Progress,
    Table,
    Tag
} from "antd";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {TenementSearchForm, TenementType} from "./type";
import {deleteTenementAPI, tenementListAPI} from "../../API/tenementList.ts";
import TenementDialog from "./components/TenementDialog.tsx";


    const TenementInfo=()=>{
    const [isLoading,setLoading]=useState<boolean>(false)
    const [pageSize,setPageSize]=useState(10)
    const [pageNum,setPageNum]=useState(1)
    const [total,setTotal]=useState(0)
    const [tenementList,setTenementList]=useState<TenementType[]>([])
    const [isOpen,setIsOpen]=useState<boolean>(false)
    const [detailList,setDetailList]=useState<TenementType>()
    // 表头信息
    const columns:ColumnsType<TenementType>=[
            {
                title: 'No.',
                dataIndex: 'index',
                align: 'center',  // 居中对齐
                render(text,record,index){
                    return index+1
                }
            },
            {
                title: '楼宇名称',
                dataIndex: 'name',
                align: 'center',  // 居中对齐
                key: 'name',
            },
            {
                title: '负责人',
                dataIndex: 'person',
                align: 'center',  // 居中对齐
                key: 'person',
            },
            {
                title: '负责人电话',
                dataIndex: 'tel',
                align: 'center',  // 居中对齐
                key: 'tel',
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                align: 'center',  // 居中对齐
                render(value){
                    switch (value){
                        case '1':
                            return  <Tag color="#f50">建设中</Tag>
                        case '2':
                            return <Tag color="#2db7f5">已竣工</Tag>
                        default:
                            return <Tag color="#87d068">使用中</Tag>
                    }
                }
            },
            {
                title: '空置率',
                dataIndex: 'vacancyRate',
                align: 'center',  // 居中对齐
                render(value){
                    return <Progress percent={value} status="active" />
                }
            },
            {
                title: '物业费率',
                dataIndex: 'propertyFee',
                align: 'center',  // 居中对齐
                render(value){
                    return <Badge color="#f50" text={value} />
                },
            },
            {
                title: '操作',
                dataIndex: 'propertyFee',
                align: 'center',  // 居中对齐
                render(record) {
                    return <>
                        <Button type='primary' className='mr' onClick={()=>addTenementList(record)}> 编辑</Button>
                        <Popconfirm
                            title="删除操作"
                            description="是否要删除?"
                            onConfirm={()=>confirm(record.id)}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type='primary' danger>删除</Button>
                        </Popconfirm>
                    </>
                }
            }
        ]
    // 获取表格实例
   const [form1]=Form.useForm();

    useEffect(() => {
        getTenementList({name:'',person:'',pageNum,pageSize})
    }, [pageNum,pageSize]);

    const getTenementList= async(params:TenementSearchForm)=>{
        setLoading(true)
        const {data}= await tenementListAPI(params)
        console.log(data.list)
        setTenementList(data.list)
        setTotal(data.total)
        setLoading(false)
    }



    // 点击翻页
    const onChange: PaginationProps['onChange'] = (pageNumber,page) => {
        setPageSize(page)
        setPageNum(pageNumber)
    };

    // 点击提交
    const onFinish = async(values: TenementSearchForm) => {
      await getTenementList({...values,pageNum,pageSize})
    };

    // 点击重置
    const reset=()=>{
       form1.resetFields()
    }
    // 关闭弹窗
     const closeDialog=()=>{
       setIsOpen(false)
    }
    // 点击编辑
     const addTenementList=(detail:TenementType)=>{
         setIsOpen(true)
         setDetailList(detail)
     }
      // 刷新用户数据
      const refreshUserList= async()=>{
          setLoading(true)
          const {data}= await tenementListAPI({name:'',person:'',pageNum,pageSize})
          console.log(data.list)
          setTenementList(data.list)
          setTotal(data.total)
          setLoading(false)
     }
     // 点击删除
     const confirm= async(id:string)=>{
         const {message: msg } = await deleteTenementAPI(id);
         message.success(msg)
        await getTenementList({name:'',person:'',pageNum,pageSize})
     }
    return <>
        <div className='tenement'>
            <Card>
                <Form
                    form={form1}
                    layout='inline'
                    onFinish={onFinish}
                >
                    <Form.Item label='楼宇名称' name='name'>
                        <Input placeholder="请输入" >
                        </Input>
                    </Form.Item>
                    <Form.Item label='负责人' name='person'>
                        <Input placeholder="请输入" >
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Button className='mr' type='primary' htmlType="submit">查询</Button>
                        <Button onClick={reset}>重置</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className='mt'>
                <Table
                    dataSource={tenementList}
                    pagination={false}
                    columns={columns}
                    loading={isLoading}
                    rowKey={(record)=>record.id}
                    scroll={{y:500}}
                >
                </Table>
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
        <TenementDialog isOpen={isOpen} closeDialog={closeDialog} detailList={detailList} refreshUserList={refreshUserList} />
    </>
}
export default TenementInfo
