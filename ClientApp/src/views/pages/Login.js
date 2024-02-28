import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Label,
  FormFeedback,
  FormText,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Spinner,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Redirect } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const token =
  "MRsXLqhhd75fnqxKMk58yZSBTWL8yNsWvuKSuDLxmGpyGKUjGPgQrKgUySDVwUHC";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      q:"",
      redirect: false,
      email: '',
      password: '',
      validate: {
        emailState: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  hidePassword = (event) =>{
    var x = document.getElementById("examplePassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

   handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.submitForm();
    }
  };


  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

   aes = (data, key) => {
   
    const t1 = performance.now();
    var aes_enc = CryptoJS.AES.encrypt(data, key);
    const t2 = performance.now();
   

    const t3 = performance.now();
    var aes_dec = CryptoJS.AES.decrypt(aes_enc.toString(), key).toString(
      CryptoJS.enc.Utf8
    );
    const t4 = performance.now();
  };

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }
  encryptUserData = async () =>{
    console.log("encrypt")
    let date = new Date().toLocaleDateString();
    var aes_enc = CryptoJS.AES.encrypt(`${this.state.email.split("@")[0]}:${date.toString()}:${this.state.password}`, "yunusemre");
    console.log(aes_enc.toString());
    return aes_enc.toString();
  }
  submitForm =  async (e) => {
    
  
    if(this.state.email.length >0 && this.state.password.length>0)
    {
      this.setState({
        loading:true
      })
      
      await axios.post("/api/Validate",{
        "user":this.state.email.split("@")[0],
        "pass":this.state.password
      }).then((res)=>{
        console.log(res);
        if(res.status == 200 && res.data.result == true)
        {
          
          this.encryptUserData().then((data)=>{
            if(data != "")
            {
              window.location.replace(`/?q=${data.toString()}`)
             //setTimeout(()=> window.location.replace(`/${data.toString()}`),1000);
            }else{
              console.log(data)
            }
            
          });
        }
        else{
          this.setState({loading:false})
          toast.error("Servislere erişim reddedildi",{position: toast.POSITION.TOP_LEFT})
        }
      }).catch(()=>{
        this.setState({loading:false});
        toast.error("Kullanıcı Adı veya Şifre Hatalı",{position: toast.POSITION.TOP_LEFT})
      })
    }
    else{
      toast.error("Email ve Şifre girişi yapılmalı",{position: toast.POSITION.TOP_LEFT})
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    const { email, password, loading,redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/${this.state.q}`}/>;
    }


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
          <main ref="main">
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 bg-primary">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="pt-lg-1">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white">
                        <div className="text-muted text-center mb-3">
                        <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/apple-icon.png")}
                            />
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        
                          <FormGroup>
                            <Label>EMail</Label>
                            <Input
                              type="email"
                              name="email"
                              id="exampleEmail"
                              placeholder="ornek@tev.org.tr"
                              valid={this.state.validate.emailState === "has-success"}
                              invalid={this.state.validate.emailState === "has-danger"}
                              value={email}
                              onChange={(e) => {
                                this.validateEmail(e);
                                this.handleChange(e);
                              }}
                            />
                            <FormFeedback>
                              Görünüşe göre mail adresinde bir sorun var lütfen kontrol ediniz!
                            </FormFeedback>
                            <FormFeedback valid>
                              
                            </FormFeedback>
                            <FormText>Kullanıcı adınızın sonrasında @tev.org.tr olmalı :)</FormText>
                          </FormGroup>
                          <FormGroup>
                            <Label for="examplePassword">Şifre</Label>
                            <Input
                              type="password"
                              name="password"
                              id="examplePassword"
                              placeholder="********"
                              value={password}
                              onChange={(e) => this.handleChange(e)}
                              onKeyPress={(e) => this.handleKeyPress(e)}
                            />
                          </FormGroup>
                          <FormGroup>

                          <FormGroup>
                          <Input type="checkbox" onChange={(e) => this.hidePassword(e)}/>
                          <Label check>
                              Şifreyi Göster
                            </Label>
                            </FormGroup>
                            
                          <Button type="submit"  color="btn btn-success" onClick = {
                            ()=> {this.submitForm()}
                          }
                          
                          >Giriş Yap</Button>
                          
                         <Link to="/EntegrasyonPage">
                          <Button>
                          Bilgisayar Desteği Formu

                          </Button>
                            </Link>
                                
                              
                            
                          </FormGroup>
                          
                      </CardBody>
                    </Card>
                  
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <CardsFooter />
        </>
      );
    }
  }
}

export default Login;
