import React, { useState,useEffect } from "react";

import {
                    Card,
                    Row,
                    Col,
                    Table, 
                    Container,
                    Button,
                    Modal,
                    ModalHeader,
                    ModalBody,
                    ModalFooter,
                    FormText,
                    FormFeedback,
                    Input,
                    Label,
                    Form,
                    FormGroup,
                    Spinner
                  } from 'reactstrap';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";

function getWorkerDayOff2(){
  const [workerDaysOff,setWorkerDaysOff] = useState([])
  useEffect(() => {
    fetch("api/GetWorkerDaysOff")
			.then((response) => response.json())
			.then((data) => {
				setWorkerDaysOff(data)
			})
  },[])
  return workerDaysOff
}

export default function IzinlerimPage() {
    const daysOff = getWorkerDayOff2()
    const [loading, setLoading] = useState(false);
    const [workerData,setWorkerData] = useState([]);
    const [modalHoliday, setModalHoliday] = useState(false);
    const [modalAllHoliday, setModalAllHoliday] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

  
  useEffect(()  => {
   
    //getWorkerDayOff();
  },[])

    

    const toggleHoliday = () => setModalHoliday(!modalHoliday);
    const toogleAllHoliday =() => setModalAllHoliday(!modalAllHoliday)
    const changeUnmountOnClose = (e) => {
    let { value } = e.target;
      setUnmountOnClose(JSON.parse(value));
    };
   
    const getWorkerDayOff = async () => {
      let response =await axios.post("api/GetWorkerDaysOff").then((res)=>{
        setLoading(false);
      });
      setWorkerData(response);
      


    }
    if(loading){
      
      return (
          <>
             <div className=" d-flex align-items-center justify-content-center">
                <div className=" d-flex align-items-center" style={{ height: "100vh" }}>
                  <Spinner/>
              </div>
            </div>
      </>
      );      
  
  }else{
    
      return (
        <>
          <DemoNavbar />
          <main className="profile-page">
            <section className="section-profile-cover section-shaped">
              {/* Circles background */}
              <div className="shape shape-style-1 shape-default alpha-4">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
          
              <Container>
                <Card className="card-profile shadow mt--300 pt-5 pb-5">
                <Col md="12">
                    <div className="pl-md-3 pr-md-3">
                    <div>
        <Form className = "pb-5" inline onSubmit={(e) => e.preventDefault()}>
          <Button color="danger" onClick={toggleHoliday}>
            YENİ İZİN
          </Button>

          <Button color="danger" onClick={toogleAllHoliday}>
            DEPARTMAN İZİNLERİ
          </Button>
        </Form>
        <Modal isOpen={modalHoliday} toggle={toggleHoliday}>
          <ModalHeader toggle={toggleHoliday}>İzin Oluştur</ModalHeader>
          <ModalBody>
            {
              daysOff.map((item)=> (
                <li>
                  <h2>item.note</h2>
                </li>
              ))
            }
          <Form>
                      <FormGroup>
                      <Label for="exampleEmail">
                      Başlangıç Tarihi
                      </Label>
                      <Input valid type = "date"/>
                      <FormFeedback valid>
                      İzin Başlangıç Tarihinizi Giriniz.
                      </FormFeedback>
                      
                      </FormGroup>
                      <FormGroup>
                      <Label for="exampleEmail">
                      Bitiş Tarihi
                      </Label>
                      <Input valid type= "date"/>
                      <FormFeedback valid>
                      İzin Bitiş Tarihini Giriniz.
                      </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label for="examplePassword">
                      İzin Tipi
                      </Label>
                      <Input valid type = "select">
                      
                                          <option>
                                          YILLIK
                                          </option>
                                          <option>
                                          İDARİ
                                          </option>
                                          

                      </Input>
                      <FormFeedback>
                      Oh noes! that name is already taken
                      </FormFeedback>
                      <FormText>
                      Example help text that remains unchanged.
                      </FormText>
                      </FormGroup>
                      <FormGroup className="position-relative">
                      <Label for="exampleEmail">
                      Valid input
                      </Label>
                      <Input valid />
                      <FormFeedback
                      tooltip
                      valid
                      >
                      Sweet! that name is available
                      </FormFeedback>
                      <FormText>
                      Example help text that remains unchanged.
                      </FormText>
                      </FormGroup>
                      <FormGroup className="position-relative">
                      <Label for="examplePassword">
                      Invalid input
                      </Label>
                      <Input invalid />
                      </FormGroup>
                      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleHoliday}>
              Gönder
            </Button>{' '}
            <Button color="secondary" onClick={toggleHoliday}>
              Vazgeç
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalAllHoliday} toggle={toogleAllHoliday}>
          <ModalHeader toggle={toogleAllHoliday}>Modal title</ModalHeader>
          <ModalBody>
            <Input
              type="textarea"
              placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
              rows={5}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toogleAllHoliday}>
              Kapat
            </Button>
          </ModalFooter>
        </Modal>
      </div>
                      
                      <h3><strong className="font-weight-bold">İZİNLERİM</strong></h3>
                      <Table responsive>
                      <thead>
                      <tr>
                                          <th>
                                          İzin Tipi
                                          </th>
                                          <th>
                                          Başlangıç Tarihi
                                          </th>
                                          <th>
                                          Bitiş Tarihi
                                          </th>
                                          <th>
                                          Gün
                                          </th>
                                          <th>
                                          Talep Tarihi
                                          </th>
                                          <th>
                                          Açıklama
                                          </th>
                                          <th>
                                          Durumu
                                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="table-primary">
                      <td>
                      YILLIK
                      </td>
                      <td>
                      14.12.2022
                      </td>
                      <td>
                      15.12.2022
                      </td>
                      <td>
                      1
                      </td>
                      <td>
                      14.12.2022               
                      </td>
                      <td>
                      İzin İstiyorum          
                      </td>
                      <td>
                      İptal Edildi           
                      </td>
                      </tr>
                      <tr className="table-success">
                      <td>
                      YILLIK
                      </td>
                      <td>
                      08.02.2022
                      </td>
                      <td>
                      10.02.2022
                      </td>
                      <td>
                      2
                      </td>
                      <td>
                      14.12.2022               
                      </td>
                      <td>
                      Merhaba Ailevi nedenlerden dolayı izin istiyorum.       
                      </td>
                      <td>
                      Onaylandı           
                      </td>
                      </tr>
                      <tr className="table-warning">
                      <td>
                      İDARİ
                      </td>
                      <td>
                      14.12.2022
                      </td>
                      <td>
                      15.12.2022
                      </td>
                      <td>
                      5
                      </td>
                      <td>
                      14.12.2022               
                      </td>
                      <td>
                      İzin İstiyorum          
                      </td>
                      <td>
                      Onayda           
                      </td>
                      </tr>
                      </tbody>
                      </Table>
                    </div>
                  </Col>
                </Card>
              </Container>
      
          </main>
          <SimpleFooter />
        </>
      );
  }
}

