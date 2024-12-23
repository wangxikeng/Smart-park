import {Card, Col, Row} from "antd";
import { RadarChartOutlined } from '@ant-design/icons';
import './index.scss'

const Dashboard=()=>{
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
                               <RadarChartOutlined/>
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
                               <RadarChartOutlined/>
                           </div>
                       </div>
                   </Card>
               </Col>
           </Row>
       </div>
    </>
}
export default Dashboard
