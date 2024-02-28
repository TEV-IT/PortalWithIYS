import React from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import {
    Card,
    CardBody,
    Button,
    Row,
    Badge,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col
} from "reactstrap";

import {
                    Chart as ChartJS,
                    CategoryScale,
                    LinearScale,
                    BarElement,
                    PointElement,
                    LineElement,
                    Title,
                    Tooltip,
                    ArcElement,
                    Legend,
                  } from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { data } from "jquery";

const labels = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz'];

              ChartJS.register(
                    CategoryScale,
                    LinearScale,
                    BarElement,
                    Title,
                    Tooltip,
                    PointElement,
                    LineElement,
                    ArcElement,
                    Legend
                  );

                  export const options = {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Şubelerin Vasiyet Sayıları',
                      },
                    },
                  };
                  export const options1 = {
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Süreli - Sürdürülebilir Fonlar',
                      },
                    },
                  };
                  

class DashboardRow extends React.Component {
  
 
    constructor() {
      super();
        this.routeChange = this.routeChange.bind(this);
      }
      state = {
        iconTabs: 1,
        plainTabs: 1,
       
      }
      routeChange() {
        let path = ``;
        this.props.history.push("/kurumsal/sunum");
      }
      componentDidMount(){
       
        //this.setState({branch:this.props.data.dataList2.map(e=>e.branch)})
      }

    render() {
        return (
            <>      
                <Row className="justify-content-center m-4">
                        <Col lg="10">
                        <Row>
                        <Col className = "mt-3" lg="3">
                                <Card className="card-lift--hover shadow border-0">
                                  <CardBody>
                                    <h6><strong> <center>Sipariş Durumu</center></strong></h6>
                                        <Doughnut data={
                                         {
                                         
                                          labels: ['Açık Sipariş', 'Tahsil Edildi'],
                                          datasets: [
                                            {
                                              label: 'Sipariş',
                                              data: [this.props.data.dataList[0].backOrderCount, this.props.data.dataList[0].collectedCount],

                                              backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                              ],
                                              borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                
                                              ],
                                              borderWidth: 1,
                                            },
                                          ],
                                          }
                                        } />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className = "mt-3" lg="3">
                                    <Card className="card-lift--hover shadow border-0">
                                    <CardBody>
                                      <h6><strong><center>Çalışan Kişi Sayısı</center></strong></h6>
                                        <Doughnut data={
                                          {
 
                                            labels: ["YURTLAR", "TEVİTÖL", "TÜRK EĞİTİM VAKFI", ],
                                            datasets: [
                                              {
                                                
                                                label:'Çalışan Sayısı',
                                                data: this.props.data.dataList13.map(e=>e.message),
                                                backgroundColor: [
                                                  'rgba(255, 99, 132, 0.2)',
                                                  'rgba(54, 162, 235, 0.2)',
                                                  'rgba(54, 42, 235, 0.2)',
                                                  
                                                  
                                                ],
                                                borderColor: [
                                                  'rgba(255, 99, 132, 1)',
                                                  'rgba(255, 99, 132, 1)',
                                                ],
                                                borderWidth: 1,
                                              },
                                            ],
                                          }
                                        } />
                                            
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className = "mt-3" lg="3">
                                    <Card className="card-lift--hover shadow border-0">
                                    <CardBody >
                                      <h6><strong><center>Mülk Durumu</center></strong></h6>
                                        <Pie data={
                                          {
                                            labels: ["Satılamaz","Kiralanamaz","Kiralanabilir","İntifa","Aktif"],
                                            datasets: [
                                              {
                                                label:'Durumu',
                                                data: this.props.data.dataList12.map((e)=> e.message),
                                                backgroundColor: [
                                                  'rgba(25, 199, 132, 0.2)',
                                                  'rgba(54, 162, 235, 0.2)',
                                                  'rgba(54, 42, 235, 0.2)',
                                                  'rgba(124, 13, 25, 0.2)',
                                                  'rgba(14, 100, 135, 0.2)',
                                                ],
                                                borderColor: [
                                                  'rgba(255, 99, 132, 1)',
                                                  'rgba(54, 162, 235, 1)',
                                                ],
                                                borderWidth: 1,
                                              },
                                            ],
                                          }
                                        } />
                                            
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className = "mt-3" lg="3">
                                <Card className="card-lift--hover shadow border-0">
                                  <CardBody>
                                    <h6><strong><center>Toplam Bursiyerler</center></strong></h6>
                                        <Doughnut data={
                                         {
                                         
                                          labels: this.props.data.dataList11.map((e)=> e.branch),
                                          datasets: [
                                            {
                                              label: 'Türü',
                                              data: this.props.data.dataList11.map((e)=> e.message),

                                              backgroundColor: [
                                                'rgba(25, 199, 132, 0.9)',
                                                'rgba(54, 162, 123, 0.2)',
                                                'rgba(5, 42, 235, 0.2)',
                                                'rgba(124, 13, 25, 0.2)',
                                                'rgba(14, 100, 135, 0.2)',
                                              ],
                                              borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                
                                              ],
                                              borderWidth: 1,
                                            },
                                          ],
                                          }
                                        } />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className = "mt-3" lg="6">
                                <Card onClick={()=>this.routeChange()} style={{ cursor: "pointer" }}     className="shadow border-0">
                                <CardBody>
                                        <Bar options={options} data={
                                          {
                                            labels:this.props.data.dataList2.map(e=>e.branch),
                                            datasets: [
                                              {
                                                label: 'Vasiyet',
                                                data: this.props.data.dataList2.map(e=>e.testament),
                                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                              },
                                            ],
                                          }
                                        } />
                                    </CardBody>
                                </Card>
                            </Col>
                                <Col className = "mt-3" lg="6">
                                    <Card className="card-lift--hover shadow border-0">
                                      <CardBody>
                                            
                                        <Line options={options1} data=
                                          {
                                            {
                                              labels:this.props.data.dataList7.map(e=>e.date),
                                              datasets: [
                                                {
                                                  label: "Sürdülürebilir",
                                                  data: this.props.data.dataList7.map(e=>e.totalKml),
                                                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                },
                                                {
                                                  label: "Süreli",
                                                  data: this.props.data.dataList7.map(e=>e.totalSrl),
                                                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                                }
                                              ],
                                            }
                                        } />
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            

                          </Row>
                        </Col>
                    </Row>
            </>
        );
    }
}
export default DashboardRow;