import React from "react";
import classnames from "classnames";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    Card,
    CardBody,
    DropdownItem,
    NavItem,
    NavLink,
    CardImg,
    Spinner,
    Nav,
    Button,
    Container,
    UncontrolledCarousel,
    TabContent,
    TabPane,
    Row,
    Badge,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    Table,
    InputGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Row2 extends React.Component {
   
    
      getWorkerWithName = (filter) => {
        this.setState({loading: true})
        axios.post("/api/getFindWorkerWithName",{
            "filter":filter,
            "user":this.props.user,
            "pass":this.props.pass
        }).then((res)=>{
            if(res.status==200){
                this.setState({data: res.data})
                this.onClickButton();
            }
        }).catch((e)=>{console.log(e)})
      }
    state = {
        data: [],
        loading: false,
        openModal: false,
        iconTabs: 1,
        plainTabs: 1,
        name:"",
        title:"",
    }
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        })
    };
    routeChange() {
        let path = `/kurumsal/sunum`;
        this.props.history.push(path);
      }
      onClickButton = e => {
        this.setState({openModal: true})
      }
      onCloseModal = () => {
        this.setState({openModal: false})
      }
    render() {
        return (
            <>
                <Modal size="lg" style={{maxWidth: '700px', width: '100%'}} isOpen={this.state.openModal}>
                            <ModalHeader>Arama Sonuçları</ModalHeader>
                            <ModalBody>
                            <Table responsive>
                                <thead>
                                <tr>
                                                    <th>
                                                    AD SOYAD
                                                    </th>
                                                    <th>
                                                    ÜNVANI
                                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((e)=>(
                                 <tr >
                                 <td>
                                 {e.name}
                                 </td>
                                 <td>
                                 {e.affix}
                                 </td>
                                 </tr>
                               ))}
                    </tbody>
                    </Table>
                              
                            </ModalBody>
                            <ModalFooter>
                            <Button color="secondary" onClick={this.onCloseModal}>
                                Kapat
                            </Button>
                            </ModalFooter>
                    </Modal>
                    <ToastContainer />
                    
                <Row className="justify-content-center pt-lg-0 mt-5 m-4">
                        <Col lg="10">
                        <Row className="row-grid">
                                <Col lg="3">
                                    <Card className="card-lift--hover shadow border-0">
                                        <CardBody className="py-7">
                                            <h6 className="text-primary text-uppercase">
                                                Mesai Formu
                                            </h6>
                                            <p className="description mt-3">
                                                18.00'dan sonra yapılan çalışmalarınızı mesai olarak yazabilirsiz.
                                            </p>
                                            <div>
                                                <Badge color="primary" pill className="mr-1">
                                                    İnsan Kaynakları Müdürlüğü
                                                </Badge>
                                                <Badge color="primary" pill className="mr-1">
                                                    Türk Eğitim Vakfı
                                                </Badge>
                                                
                                            </div>
                                            
                                            <Button
                                                className="mt-5"
                                                color="primary"
                                                href = "/uygulamalar/mesailerim"
                                                onClick={this.routeChange}
                                            >
                                              Önizleme
                                            </Button>                 
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="3">
                                    <Card className="card-lift--hover shadow border-0">
                                        <CardBody className="py-7">
                                            
                                            <h6 className="text-primary text-uppercase">
                                               Yemek Bildirim Formu
                                            </h6>
                                            <p className="description mt-3">
                                                Günlük 3 saatten fazla yapılan mesaileriniz için 1 yemek hakedişi olur.
                                            </p>
                                            <div>
                                                <Badge color="primary" pill className="mr-1">
                                                    İnsan Kaynakları Müdürlüğü
                                                </Badge>
                                                <Badge color="primary" pill className="mr-1">
                                                    Türk Eğitim Vakfı
                                                </Badge>
                                            </div>
                                            <Button
                                                className="mt-4"
                                                color="primary"
                                                href="/kurumsal/sunum"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Önizleme
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="3">
                                    <Card className="card-lift--hover shadow border-0">
                                        <CardBody className="py-7">
                                            
                                            <h6 className="text-primary text-uppercase">
                                                Masraf Formu
                                            </h6>
                                            <p className="description mt-3">
                                                Yapmış olduğunuz masrafları ilgili birim yöneticinizden imzalı şekilde Mali İşler Birimine teslim edebilirsiniz.
                                            </p>
                                            <div>
                                                <Badge color="primary" pill className="mr-1">
                                                    Mali İşler Müdürlüğü
                                                </Badge>
                                                <Badge color="primary" pill className="mr-1">
                                                    Türk Eğitim Vakfı
                                                </Badge>
                                            </div>
                                            <Button
                                                className="mt-4"
                                                color="primary"
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Önizleme
                                            </Button>
                                        </CardBody>
                                    </Card>
                            </Col>

                            <Col lg="3">
                                <Card className="card-lift--hover shadow border-0">
                                    <CardBody className="py-7">
                                        <h6 className="text-primary text-uppercase">
                                            Türk Eğitim Vakfı çalışanını arayın!
                                        </h6>
                                        <FormGroup
                                        className={classnames("mt-5", {
                                        focused: this.state.nameFocused
                                        })}
                                    >
                                        <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                            <i className="ni ni-user-run" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Adı Soyadı"
                                            value = {this.state.name}
                                            onChange = {(e)=>{
                                                this.setState({name: e.target.value})
                                            }}
                                            type="text"
                                            onFocus={(e) =>
                                            this.setState({ nameFocused: true })
                                            }
                                            onBlur={(e) =>
                                            this.setState({ nameFocused: false })
                                            }
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup
                                        className={classnames({
                                        focused: this.state.emailFocused
                                        })}
                                    >
                                        <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                            <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Ünvanı"
                                            value = {this.state.title}
                                            onChange = {(e)=>{
                                                this.setState({title: e.target.value})
                                            }}
                                            type="text"
                                            onFocus={(e) =>
                                            this.setState({ emailFocused: true })
                                            }
                                            onBlur={(e) =>
                                            this.setState({ emailFocused: false })
                                            }
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                    
                                    <div>
                                        <Button
                                        onClick = {(e) => {
                                            if(this.state.name != "" || this.state.title != "")
                                            {
                                               if(this.state.name != "" && this.state.title != "")   
                                                    toast.error("Tek bir arama kelimesi üzerinden arama yapabilirsiniz.",{position: toast.POSITION.TOP_LEFT}); 
                                                else{
                                                    if(this.state.name == "")
                                                        this.getWorkerWithName(this.state.title)
                                                    else if(this.state.title == "")
                                                        this.getWorkerWithName(this.state.name)
                                                }
                                            }       
                                            else{
                                             toast.error("Arama yapmak istediğiniz Adı Soyadı veya Ünvanı yazıdınız.",{position: toast.POSITION.TOP_LEFT});   
                                            }

                                        }}
                                        block
                                        className="btn-round"
                                        color="default"
                                        size="lg"
                                        type="button"
                                        >
                                        Ara...
                                        </Button>
                                    </div>
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

export default Row2;