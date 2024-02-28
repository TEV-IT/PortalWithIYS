import React, { useState } from "react";

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
                  } from 'reactstrap';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation } from "react-router-dom";


export default function MesaiPage() {
 
  const [loading, setLoading] = useState(false);
    const [workerData,setWorkerData] = useState([]);

    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [confirmedTime, setconfirmedTime] = useState(0.0);
    const [hrApprove, setHrApprove] = useState(0);
    const [mngApprove,setMngApprove] = useState(0);
    const [shiftRate, setshiftRate] = useState(0);

    const [state, setState] = useState(0);
    const [myEvents, setEvents] = useState([])



    const [typeDayOff, setTypeDayOff]= useState(0);
    const [recId, setRecId] = useState("");
    const [totalDayOff, setTotalDayOff] = useState(0);


    const [modalHoliday, setModalHoliday] = useState(false);
    const [modalAllHoliday, setModalAllHoliday] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggleHoliday = () => setModalHoliday(!modalHoliday);
    const toogleAllHoliday =() => setModalAllHoliday(!modalAllHoliday)
    const changeUnmountOnClose = (e) => {
      let { value } = e.target;
      setUnmountOnClose(JSON.parse(value));
    };
    const q = useLocation();

    
    return (
      <>
        <DemoNavbar q={q.search.toString().slice(3,q.search.toString().length)}/>
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
          YENİ MESAİ
        </Button>

        
      </Form>
      <Modal isOpen={modalHoliday} toggle={toggleHoliday}>
        <ModalHeader toggle={toggleHoliday}>Mesai Oluştur</ModalHeader>
        <ModalBody>
        <Form>

          <FormGroup>
            <Label for="tarih">
            Mesai Tarihi
            </Label>
            <Input valid type= "date"/>
            <FormFeedback valid>
              Mesai Tarihini Giriniz.
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="exampleTime">Başlama Saati</Label>
            <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" />
          </FormGroup>

          <FormGroup>
            <Label for="exampleTime">Bitiş Saati</Label>
            <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" />
        </FormGroup>

        <FormGroup className="position-relative">
            <Label for="aciklama">
                Açıklama
            </Label>
            <Input type="textarea"/>
          </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleHoliday}>
            Kayıt
          </Button>{' '}
          <Button color="secondary" onClick={toggleHoliday}>
            Vazgeç
          </Button>
        </ModalFooter>
      </Modal>
      {/* <Modal isOpen={modalAllHoliday} toggle={toogleAllHoliday}>
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
      </Modal> */}
    </div>
    <Row className="justify-content-center">
                    
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center" >
                      <div className="card-profile-actions py-4 mt-lg-5">
                        <h6><strong className="font-weight-bold float-right">Toplam Mesai: 15 </strong></h6>
                      </div>
                    </Col>
                    <Col lg="2">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                        <h3><strong className="font-weight-bold">MESAİLERİM</strong></h3>
                        </div>
                      </div>
                    </Col>
                  </Row>

                    <Table responsive>
                    <thead>
                    <tr>
                        <th>
                        Başlangıç Saati
                        </th>
                        <th>
                        Bitiş Saati
                        </th>
                        <th>
                        Mesai Tarihi
                        </th>
                        <th>
                        Açıklama
                        </th>
                        <th>
                        Durumu
                        </th>
                        <th>
                        
                        </th>
                        <th>
                        Onaylayan
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="table-primary">
                    <td>
                    18.00
                    </td>
                    <td>
                    19.30
                    </td>
                    <td>
                    15.12.2022
                    </td>
                    <td>
                    mesai işlemleri
                    </td>
                    <td>
                    Onay Bekliyor     
                    </td>
                    <td>
                    </td>
                    <td>
                      XXXXXXX                             
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

