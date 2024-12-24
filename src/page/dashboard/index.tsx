import {Card, Col, Row} from "antd";
import { RadarChartOutlined,DollarOutlined, LaptopOutlined,SnippetsOutlined } from '@ant-design/icons';
import './index.scss'
import ReactECharts from 'echarts-for-react'
import {useEffect, useState} from "react";
import {getEnergyListAPI} from "../../API/dashboard.ts";

const Dashboard=()=>{
    const [energyList,setEnergyList]=useState<any>({})
    const energyOption = {
        title: {
            text: '当日能源消耗'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
        ]
    };
    const option2 = {
        legend:{

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['2014', '2016', '2018', '2020', '2022', '2024', ]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'科技企业',
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar'
            },
            {
                name:'高新企业',
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar'
            }, {
                name:'国营企业',
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar'
            }
        ]
    };
    useEffect(()=>{
        getEnergyData()
    },[])
    // 获取能源消耗数据
    const getEnergyData=async()=>{
         const {data}=await getEnergyListAPI()
        const template=data.map((item:any)=>{
            return {
                name:item.name,
                stack: 'Total',
                type: 'line',
                data:item.data
            }
        })
        const result={
            ...energyOption,
            legend:{
             data:data.map((item:any)=>item.name)
            },
            series:template
        }
        console.log(result)
        setEnergyList(result)
    }
    return <>
       <div className="dashboard">
           <Row gutter={16}>
               <Col span={6}>
                   <Card >
                       <div className='dashboardCard'>
                           <div className='info'>
                               <div className='title'>12345</div>
                               <div className='described'>园区总面积(平方米)</div>
                           </div>
                           <div className="icon">
                               <RadarChartOutlined/>
                           </div>
                       </div>
                   </Card>
               </Col>
               <Col span={6}>
                   <Card >
                       <div className='dashboardCard'>
                           <div className='info'>
                               <div className='title'>12345</div>
                               <div className='described'>园区总面积(平方米)</div>
                           </div>
                           <div className="icon">
                               <DollarOutlined />
                           </div>
                       </div>
                   </Card>
               </Col>
               <Col span={6}>
                   <Card >
                       <div className='dashboardCard'>
                           <div className='info'>
                               <div className='title'>12345</div>
                               <div className='described'>园区总面积(平方米)</div>
                           </div>
                           <div className="icon">
                               <LaptopOutlined />
                           </div>
                       </div>
                   </Card>
               </Col>
               <Col className="gutter-row" span={6}>
                   <Card >
                       <div className='dashboardCard'>
                           <div className='info'>
                               <div className='title'>12345</div>
                               <div className='described'>园区总面积(平方米)</div>
                           </div>
                           <div className="icon">
                               <SnippetsOutlined/>
                           </div>
                       </div>
                   </Card>
               </Col>
           </Row>
           <Row className='mt' gutter={16}>
               <Col span={12}>
                   <Card title='能源消耗状况'>
                       <ReactECharts option={energyList} />
                   </Card>
               </Col>
               <Col span={12}>
                   <Card title='企业资质情况状况'>
                       <ReactECharts option={option2} />
                   </Card>
               </Col>
           </Row>
       </div>
    </>
}
export default Dashboard
