import React from "react";

// reactstrap components
import {  
          Input,
          Button,
          Card,
          Container,
          Row,
          Col,
          Spinner,
          Table,
          Form,
          FormGroup,
          Label,       
          Modal,
          ModalHeader,
          ModalBody,
          ModalFooter,  
        FormText
      } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

class Profile extends React.Component {

  constructor(){
    super();

    this.state = {
      loading : true,
      error: false,
      openModalNotification:false,
      openModalContract:false,
      user:"",
      pass:"",
      data:{},
      data2:{},
      desc: "",
      name: "",
      TCIDNumber: "",
      phone: "",
      blood: 0,
      gender:0,
      piType:0,
      month:0,
      day:0,
      years:0
    }
  }

createNotification=async() =>{

  if(this.state.desc.toString().length != 0)
  {
    await axios.post("/api/CreateNotification",{"user":this.state.user, "pass":this.state.pass, "description":this.state.desc}).catch((err)=>{
      this.setState({openModalNotification: false})
      toast.error("Kayıt edilemedi..", {position: toast.POSITION.TOP_LEFT})
    }).then((response)=>{
      if(response.status ==200)
      {
        this.setState({openModalNotification: false})
        toast.success(response.data.message,{position: toast.POSITION.TOP_LEFT});
        this.setState({desc:""})
      }
    })
  }else{
    toast.error("Boş bırakılamaz..",{position: toast.POSITION.TOP_LEFT})
  }
}

createWorkerContract = async () => {
  if (this.state.TCIDNumber.toString().length != 11 || this.state.phone.toString().length != 11 ) { 
    toast.error("TC  / Telefon 11 Haneli Olmalı. Lütfen kontrol ediniz.", {
      position: toast.POSITION.TOP_LEFT
    });
    return;
  }

  if(this.state.name.toString().length == "" )
  {
    toast.error("İsim alanı boş geçilemez.", {
      position: toast.POSITION.TOP_LEFT
    });
    return;
  }

  if (this.state.TCIDNumber.toString() === "11111111111" ||
  this.state.TCIDNumber.toString() === "00000000000") {
  toast.error("TC'yi  yanlış girdiniz.", {
      position: toast.POSITION.TOP_LEFT
  });
  return
}

if (this.state.phone.toString() === "11111111111" ||
  this.state.phone.toString() === "00000000000") {
  toast.error("Telefon numarasını yanlış girdiniz.", {
      position: toast.POSITION.TOP_LEFT
  });
  return
}

  try {
    const response = await axios.post("/api/createWorkerContract", {
      "user": this.state.user,
      "pass": this.state.pass,
      "name": this.state.name,
      "TCIDNumber": this.state.TCIDNumber,
      "piType": parseInt(this.state.piType),
      "phone": this.state.phone,
      "gender": parseInt(this.state.gender),
      "blood": parseInt(this.state.blood)
    });

    if (response.status === 200 && response.data.result === true) {
      console.log(response.data);
      this.setState({
        openModalContract: false,
        name: "",
        TCIDNumber: "",
        piType: "",
        phone: "",
        gender: "",
        blood: ""
      });
      toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });
    } else {
      toast.error("Kayıt edilemedi", { position: toast.POSITION.TOP_CENTER });
    }
  } catch (error) {
    console.log(error);
    this.setState({ openModalContract: false });
    toast.error("Kayıt edilemedi", { position: toast.POSITION.TOP_CENTER });
  }
}         
  

  getProfilePageData=async(user,pass) =>{
    this.setState({user:user,pass:pass})
    let response = await axios.post("/api/getProfileDataList",{"user":user,"pass":pass}).catch((err)=>{
      this.setState({loading: false})
      //window.location.replace('/login');
    })
    if(response.status == 200)
      {
        this.setState({
          data:JSON.parse(JSON.stringify(response.data)),
        });
        this.setState({loading:false})
      }   
  }


  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.decryptUserData().then((data)=>{
      console.log(data)
      this.getProfilePageData(data.split(":")[0],data.split(":")[2]);
    });
  }

 
  getBloodType = (blood) =>{
    switch(blood) {
      case 1:
        return "A+"
        break;
      case 2:
        return "A-"
        break;
      case 3:
        return "B+"
        break;
      case 4:
        return  "B-"
        break;
      case 5:
        return  "0+"
        break;
      case 6:
        return  "0-"
        break;
      case 7:
        return  "AB+"
        break;
      case 8:
        return  "AB-"
        break;
      case 0:
        return  "Bilinmiyor"
        break;
      default:
        return "Bilinmiyor"
    }
  }

  getType = (type) =>{
    switch(type) {
      case 1:
        return "Kendisi"
        break;
      case 2:
        return "Eşi"
        break;
      case 3:
        return "Annesi"
        break;
      case 4:
        return  "Babası"
        break;
      case 5:
        return  "Çocuk-1"
        break;
      case 6:
        return  "Çocuk-2"
        break;
      case 7:
        return  "Çocuk-3"
        break;
      case 8:
        return  "Çocuk-4"
        break;
      case 9:
        return  "Çocuk-5"
        break;
      default:
        return "Bilinmiyor"
    }
  }

  getGender = (gender) =>{
    if(gender == 1)
        return "Erkek"
    else if(gender == 2)
        return "Kadın"
    else
        return "Bilinmiyor"
  }

  onClickButton = () => {
    this.setState({openModalNotification: true})
  }
  onCloseModal = () =>{
    this.setState({openModalNotification: false})
  }

  onClickToggle = () => {
    this.setState({openModalContract:true})
  }

  onCloseToggle = () => {
    this.setState({openModalContract: false})
  }

  
  decryptUserData = async () =>{
    let aes_dec = await CryptoJS.AES.decrypt(this.props.location.search.toString().slice(3,this.props.location.search.toString().length), "yunusemre").toString(
      CryptoJS.enc.Utf8
    );
    return aes_dec;
  }
  
  render() {
    const { data, loading, error } = this.state;
    if(loading){
      return (
          <>
             <div ref="main" className=" d-flex align-items-center justify-content-center">
                <div className=" d-flex align-items-center" style={{ height: "100vh" }}>
                  <Spinner/>
              </div>
            </div>
      </>
      );
  }else{
    return (
      <>
      <ToastContainer />
        <DemoNavbar q = {this.props.location.search.toString().slice(3,this.props.location.search.toString().length)}/>
        <main className="profile-page" >
          <section className="section-profile-cover section-shaped my-0">
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
          <section className="section">
            <Container>     
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                     <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          
                        </a>
                      </div>
                    </Col> 
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                        <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="float-right"
                          color="danger"
                          onClick={this.onClickButton}                       
                        >Bildir </Button>
                      </div> 

                      <Modal size="lg" style={{maxWidth: '700px', width: '100%'}} isOpen={this.state.openModalNotification}>
                <ModalBody>
                  <Form>
                    <FormGroup className="position-relative">
                        <Label for="exampleEmail">
                            Açıklama
                      </Label>
                              <Input type="textarea" value = {this.state.desc} rows ={6} onChange = {e => this.setState({desc:e.target.value})} />
                    </FormGroup>
                  </Form>
                </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.createNotification}>     
                      Gönder </Button>
                    <Button color="secondary" onClick={this.onCloseModal}>
                      Kapat </Button>
                  </ModalFooter>
              </Modal> 
   
                      
                    </Col>
                     <Col className="order-lg-1" lg="4">
                        <div className="card-profile-stats d-flex ">
                        <div>
                       
                          <span className="heading">{data.profileData[0].years}</span>
                          <span className="description">YIL</span>
                          
                        </div>
                        <div>
                          <span className="heading">{data.profileData[0].month}</span>
                          <span className="description">AY</span>
                        </div>
                        <div>
                          <span className="heading">{data.profileData[0].day}</span>
                          <span className="description">GÜN'DÜR  <b> TEVLİ</b></span>
                        </div>

                      </div>  
                      {/* <div className="justify-content-left" style={{paddingTop: "50px;"}}>
                       <div>
                          <span className="heading"> <b> TEVLİ</b></span>
                        </div>
                        </div> */}
                    </Col> 
                  </Row>
                  <div className="text-center mt-5">

                    <h3>
                      {data.profileData[0].id}{" "}
                      <span className="font-weight-light">, {data.profileData[0].name}</span>
                    </h3>
                    <h3>
                      {data.profileData[0].affix}{" "}
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {data.profileData[0].phone}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {data.profileData[0].email}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {data.profileData[0].birthDate.toString().slice(0,10).split("-")[2]}{"."}
                      {data.profileData[0].birthDate.toString().slice(0,10).split("-")[1]}{"."}
                      <span className="font-weight-light">{data.profileData[0].birthDate.toString().slice(0,10).split("-")[0]}</span>
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          {data.profileData[0].street}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="4">
                      <div className="card-profile-image">
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                        <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="float-right"
                          color="danger"
                          onClick={this.onClickToggle}>                 
                          Aile Bireylerini Ekle</Button> 
                      </div> 
   
                      
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                        <h3><strong className="font-weight-bold">YAKINLARIM</strong></h3>
                        </div>
                      </div>
                    </Col>
                  </Row>

   
                <div className="card-profile-actions py-4 mt-lg-0">
        
                </div>
                    <Modal size="lg" style={{maxWidth: '500px', width: '500%'}} isOpen={this.state.openModalContract}>
                          <ModalBody>
                              <Form>
                                <FormGroup className="position-relative">
                                      <Label for="name">
                                          Ad Soyad:
                                      </Label>
                                      <Input type="text" value = {this.state.name} onChange = {e => this.setState({name:e.target.value})} />
                                      
                                      <Label for="TC">
                                          TC:
                                      </Label>
                                      <Input type="text" value = {this.state.TCIDNumber} onChange = {e => this.setState({TCIDNumber:e.target.value})} placeholder="XXXXXXXXXXX"/>
                                      
                                      <Label for="GSM">
                                          Telefon Numarası:
                                      </Label>
                                      
                                      <Input type="text" value = {this.state.phone} onChange = {e => this.setState({phone:e.target.value})} placeholder="(05XX)XXXXXXX" />
                                      <FormText>
                                        Telefon numarasının başına 0 koymayı unutmayın.
                                    </FormText>
                                      <Label for="blood">
                                          Kan Grubu:
                                      </Label>
                                      
                                      <Input onChange= {e=> this.setState({blood: e.target.value})} type = "select">
                                        <option value={0}>
                                            Bilinmiyor
                                        </option>
                                        <option value={1}>
                                            A +
                                        </option>
                                        <option value={2}>
                                            A -
                                        </option> 
                                        <option value={3}>
                                            B +
                                        </option>
                                        <option value={4}>
                                            B -
                                        </option>
                                        <option value={5}>
                                            0 +
                                        </option>
                                        <option value={6}>
                                            0 -
                                        </option>
                                        <option value={7}>
                                            AB +
                                        </option>
                                        <option value={8}>
                                            AB -
                                        </option>                  
                                      </Input>

                                      <Label for="gender">
                                          Cinsiyet:
                                      </Label>
                                      <Input onChange= {e=> this.setState({gender: e.target.value})} type = "select">                                   
                                            <option value={0}>
                                                Bilinmeyen
                                            </option>
                                            <option value={1}>
                                                Erkek
                                            </option>
                                            <option value={2}>
                                                Kadın
                                            </option>                     
                                          </Input>
                                        
                                      <Label for="type">
                                          Yakınlık Derecesi:
                                      </Label>
                                        <Input onChange= {e=> this.setState({piType:e.target.value})} type = "select">                                 
                                              <option value={1}>
                                                Kendisi
                                              </option>
                                              <option value={2}>
                                                Eşi
                                              </option>
                                              <option value={3}>
                                                Anne
                                              </option> 
                                              <option value={4}>
                                                Baba
                                              </option>
                                              <option value={5}>
                                                İlk Çocuk  
                                              </option>
                                              <option value={6}>
                                                İkinci çocuk
                                              </option> 
                                              <option value={7}>
                                                Üçüncü Çocuk:
                                              </option>
                                              <option value={8}>
                                                Dördüncü Çocuk:
                                              </option>
                                              <option value={9}>
                                                Beşinci Çocuk:
                                              </option>
                                              <option value={10}>
                                                Altıncı Çocuk:
                                              </option>


                                          </Input>

                                    </FormGroup>
                                </Form>

    <Form>

    <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleCity">
          İlçe
        </Label>
        <Input
          id="exampleCity"
          name="city"
        />
      </FormGroup>
    </Col>
    <Col md={4}>
      <FormGroup>
        <Label for="exampleState">
          Sokak
        </Label>
        <Input
          id="exampleState"
          name="state"
        />
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <Label for="exampleZip">
          No
        </Label>
        <Input
          id="exampleZip"
          name="zip"
        />
      </FormGroup>
    </Col>
  </Row>

  <Row>
    <Col md={6}>
      <FormGroup>
        <Label for="exampleEmail">
          Koordinat Enlem
        </Label>
        <Input
          id="exampleEmail"
          placeholder="Koordinat bilgisini giriniz."

        />
      </FormGroup>
    </Col>
    <Col md={6}>
      <FormGroup>
        <Label for="examplePassword">
          Koordinat Boylam
        </Label>
        <Input
          id="examplePassword"
          placeholder="Koordinat bilgisini giriniz."
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md={5}>
      <FormGroup>
        <Label for="exampleCity">
          İlaç kullanıyor mu?
        </Label>
        <Input  type = "select">                                   
                <option value={0}>
                    Bilinmiyor
                </option>
                <option value={1}>
                    evet
                </option>
                <option value={2}>
                    hayır
                </option>                     
              </Input>
      </FormGroup>
    </Col>

    <Col md={7}>
      <FormGroup>
        <Label for="exampleZip">
          Varsa isimleri neler?
        </Label>
        <Input
          id="exampleZip"
          name="zip"
        />
      </FormGroup>
    </Col>
  </Row>

</Form>

                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" onClick={this.createWorkerContract}>     
                                Gönder </Button>
                                <Button color="secondary" onClick={this.onCloseToggle}>
                                    Kapat </Button>
                                </ModalFooter>
                            </Modal> 
                    <Table responsive>
                    <thead>
                    <tr>
                                        <th>
                                        AD SOYAD
                                        </th>
                                        <th>
                                        TC NUMARASI
                                        </th>
                                        <th>
                                        GSM
                                        </th>
                                        <th>
                                        KAN GRUBU
                                        </th>
                                        <th>
                                        CİNSİYET
                                        </th>
                                        <th>
                                        TİPİ
                                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.contractData.map((e)=>(
                      <tr >
                      <td>
                      {e.name}
                      </td>
                      <td>
                      {e.tcnumber}
                      </td>
                      <td>
                      {e.phone}
                      </td>
                      <td>
                      {this.getBloodType(e.blood)}
                      </td>
                      <td>
                      {this.getGender(e.gender)}
                      </td>
                      <td>
                      {this.getType(e.type)}
                      </td>
                      </tr>
                    ))}
                    
                    </tbody>
                    </Table>
              </Card>
              
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}
}

export default Profile;
