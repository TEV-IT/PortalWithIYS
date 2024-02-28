import React, { useState } from "react";
import classnames from "classnames";

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
                    InputGroup,
                    InputGroupAddon,
                    InputGroupText,
                    Label,
                    Form,
                    FormGroup,
                    CardBody,
                  } from 'reactstrap';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";



export default function SantralTalepPage() {
 
  

 const [user,setUser] = useState("");
 const [pass,setPass] = useState("");
 const [loading, setLoading] = useState(false);
 const [name, setName] = useState("");
 const [workerId, setWorkerId]= useState("");
 const [title,setTitle] = useState("");
 const [findUsers, setFindUsers] = useState([]);

const [modalTalep, setModalTalep] = useState(false);
const [findWorker, setFindWorker] = useState(false);
const [handleRadio, setHandleRadio] = useState(false);

const q = useLocation();

const onClickModalTalep = () => setModalTalep(!modalTalep);
const onClickButton = () => {
  console.log(name)
  setFindWorker(!findWorker);
}
const handleRadioButton = () =>setHandleRadio(!handleRadio);

const getWorkerWithName = (filter) => {
  setLoading(true)
  axios.post("/api/getFindWorkerWithName",{
      "filter":filter,
      "user":user,
      "pass":pass
  }).then((res)=>{
      if(res.status==200){
          var data = JSON.parse(JSON.stringify(res.data))
          data.map((obj)=>{
            setFindUsers(old =>[...old,obj])
          })
          onClickButton()
      }
  }).catch((e)=>{console.log(e)})
}



const decryptUserData = async () =>{
  let aes_dec = await CryptoJS.AES.decrypt(q.search.toString().slice(3,q.search.toString().length), "yunusemre").toString(
    CryptoJS.enc.Utf8
  );
  return aes_dec;
}
useEffect(()  => {
  decryptUserData().then((data)=>{
    setUser(data.split(":")[0])
    setPass(data.split(":")[2])
  })
  
},[])


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
                <Form className = "pb-5" inline onSubmit={(e) => e.preventDefault()}>
                  <Button color="danger" onClick={onClickModalTalep}>
                    YENİ TALEP
                  </Button>
                </Form>

        <Modal isOpen={modalTalep} toggle={onClickModalTalep}>
              <ModalHeader toggle={onClickModalTalep}>Talep Ekranı</ModalHeader>
              <ModalBody>
              <Form>
                        {/* <FormGroup>
                            <Label for="exampledate">
                              Talep Tarihi
                            </Label>
                            <Input valid type = "date"/>
                              <FormFeedback valid>
                                Talep edilen tarihi giriniz.
                              </FormFeedback>
                          </FormGroup> */}

                        <FormGroup>
                          <Label for="exampleContact">
                            Ulaşım Kanalı
                          </Label>
                          <Input valid type = "select">
                              <option>
                              Telefon
                              </option>
                              <option>
                              E-mail
                              </option>                       
                          </Input>
                        </FormGroup>
                          
                        <FormGroup>
                        <Label for="exampleatanan">
                          Telefon Numarası
                        </Label>
                        <Input type="text" />                
                        </FormGroup>

                        <FormGroup>
                          <Label for="exampletext">
                              Açıklama
                          </Label>
                            <Input type="textarea" rows ={3} />
                        </FormGroup>

                        <FormGroup>
                          <Input valid type = "select">
                                <option>
                                  Medium
                                </option>
                                <option>
                                  High
                                </option>                       
                          </Input>
                        </FormGroup> 

                        <FormGroup
                            className={classnames("mt-5", {
                            })}>
                              <label>
                                  Atanacak Kişi:
                              </label>
                            <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-user-run" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Adı Soyadı"
                                value = {name}
                                onChange = {(e)=>{
                                    setName(e.target.value)
                                }}
                                type="text"
                            />
                            </InputGroup>
                        </FormGroup>

                        <div>
                          <Button
                          onClick = {(e) => {
                              if(name.toString() != "")
                              {
                                  setFindUsers([])
                                  getWorkerWithName(name.toString())
                                  setFindWorker(true)                                        
                              }       
                              else{
                                toast.error("Arama yapmak istediğiniz kişini Adını yazınız.",{position: toast.POSITION.TOP_CENTER});   
                              }
                          }}
                          block
                          className="btn-round"
                          color="primary"
                          size="lg"
                          type="button"
                          >
                          Ara
                          </Button>
                      </div>

          </Form>
            </ModalBody>
               <ModalFooter>
                <Button color="primary" onClick ={onClickModalTalep}>
                  Gönder
                </Button>

                <Button color="secondary" onClick={onClickModalTalep}>
                  Vazgeç
                </Button>
              </ModalFooter> 
        </Modal>
                  
                  <h3><strong className="font-weight-bold">TALEPLER</strong></h3>
                  <Table responsive>
                  <thead>
                  <tr>
                                      <th>
                                      Talep Tarihi
                                      </th>
                                      <th>
                                      Ulaşım Kanalı
                                      </th>
                                      <th>
                                      Atanan Kişi
                                      </th>
                                      <th>
                                      Öncelik Durumu
                                      </th>
                                      <th>
                                      Açıklama
                                      </th>
                                      <th>
                                      Talep Durumu
                                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="table-primary">
                  <td>
                  14.12.2022
                  </td>
                  <td>
                  Telefon
                  </td>
                  <td>
                  Buse Sukuşu
                  </td>
                  <td>
                  High
                  </td>
                  <td>
                  test              
                  </td>
                  <td>
                  Beklemede        
                  </td>
                  </tr>
                  <tr className="table-success">
                  <td>
                  08.02.2022
                  </td>
                  <td>
                  Mail
                  </td>
                  <td>
                    Seda Nur Coşgun
                  </td>
                  <td>
                  Medium
                  </td>
                  <td>
                  deneme              
                  </td>
                  <td>
                  İptal Edildi      
                  </td>
                  </tr>
                  <tr className="table-warning">
                  <td>
                  20.02.2023
                  </td>
                  <td>
                  Telefon
                  </td>
                  <td>
                    Yunus Emre Arslan
                  </td>
                  <td>
                  Medium              
                  </td>
                  <td>
                  sgdhdfhfgjfghh          
                  </td>
                  <td>
                  Tamamlandı          
                  </td>
                  </tr>
                  </tbody>
                  </Table>
                </div>
              </Col>
            </Card>
          </Container>

      <Modal size="lg" style={{maxWidth: '700px', width: '100%'}} isOpen={findWorker}>
        <ModalHeader>Arama Sonuçları</ModalHeader>
          <ModalBody>
            <Table responsive>
                <thead>
                <tr>
                  <th>
                    Seç
                  </th>
                  <th>
                  AD SOYAD
                  </th>
                  <th>
                  ÜNVANI
                  </th>
                </tr>
                </thead>
                
                
                <tbody>
                  
                  {findUsers.map((e)=>(
                    <div onClick={()=>{
                      setWorkerId(e.id);
                      setName(e.name);
                      setHandleRadio(!handleRadio);
                    }}> 
                        <tr >
                        <div className="radio">
                          <td>                
                          <Input type="radio" name="nameradio" onChange={handleRadioButton}/> 
                          </td>
                          <td>
                          {e.name}
                          </td>
                          <td>
                            {e.affix}
                          </td>
                          </div>
                        </tr>
                    </div>                
                ))}
             
                </tbody> 
               
            </Table>             
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick = {onClickButton}>
                Tamam
            </Button>
            <Button color="secondary" onClick={onClickButton}>
                Kapat
            </Button>
            </ModalFooter>
      </Modal>
  
      </main>
      <SimpleFooter />
      
    </>
  );
  }              


