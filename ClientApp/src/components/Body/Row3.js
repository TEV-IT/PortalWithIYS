import React from "react";
import classnames from "classnames";
import getWeatherApiData from "controllers/getWeatherApiData";
import getPrayerTimeApiData from "controllers/getPrayerTimeApiData";
import conf from 'assets/img/theme/confetti.png';
import ReactCanvasConfetti from "react-canvas-confetti";
import {
    Card,
    CardBody,
    CardHeader,
    CardImgOverlay,
    CardImg,
    CardTitle,
    CardText,
    NavItem,
    NavLink,
    Nav,
    ListGroup,
    Button,
    ListGroupItem,
    Table,
    Container,
    UncontrolledCarousel,
    TabContent,
    TabPane,
    Row,
    Col,
    Spinner,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import ModalFullscreenExample from "../widgets/announcementWidget";
const items = [
   
    {
        src: require("assets/img/theme/page1.jpg"),
        altText: "",
        caption: "",
        header: ""
    },
    {
        src: require("assets/img/theme/page2.jpg"),
        altText: "",
        caption: "",
        header: ""
    },
    {
        src: require("assets/img/theme/page3.jpg"),
        altText: "",
        caption: "",
        header: ""
    }
];

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };


class Row1 extends React.Component {
   
   
    constructor(){
        super()
        this.isAnimationEnabled = false;
        this.animationInstance = null;
        this.intervalId = null;
        this.state = {
            openModal: false,
            title: "",
            subtitle:"",
            modal: true,
            iconTabs : 1,
            iconTabs2: 1,
            plainTabs : 1,
            temp: 0,
            cityName: "",
            weatherIcon : "",
            weatherText : "",
            weatherData: [],
            prayerTimes: [],
            sabah:"",
            ogle:"",
            ikindi:"",
            aksam:"",
            yatsi:"",
        }
      }
      onClickButton = e => {
        
        this.setState({openModal: true})
      }
      onCloseModal = () => {
        this.setState({openModal: false})
      }

      toggle = () => {
        this.setState({modal: !this.state.openModal})
        };

    componentWillUnmount() {
        this.isAnimationEnabled = false;
        this.intervalId && clearInterval(this.intervalId);
      }

      getAnimationSettings = (originXA, originXB) => {
        return {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
          particleCount: 150,
          origin: {
            x: randomInRange(originXA, originXB),
            y: Math.random() - 0.2
          }
        };
      };
    
      nextTickAnimation = () => {
        this.animationInstance &&
          this.animationInstance(this.getAnimationSettings(0.1, 0.3));
        this.animationInstance &&
          this.animationInstance(this.getAnimationSettings(0.7, 0.9));
      };
    
      startAnimation = () => {
        if (!this.isAnimationEnabled) {
          this.isAnimationEnabled = true;
          this.intervalId = setInterval(this.nextTickAnimation, 400);
        }
      };
    
      pauseAnimation = () => {
        this.isAnimationEnabled = false;
        return this.intervalId && clearInterval(this.intervalId);
      };
    
      stopAnimation = () => {
        this.isAnimationEnabled = false;
        this.animationInstance && this.animationInstance.reset();
        return this.intervalId && clearInterval(this.intervalId);
      };
    
      getInstance = (instance) => {
        this.animationInstance = instance;
      };
    
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        })
    };
    toggleNavs2 = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        })
    }
    componentDidMount(){
        this.stopAnimation();
        getWeatherApiData(this.props.cityName).then(res => {
            this.setState({temp:res.current.temp_c,
                    weatherIcon:res.current.condition.icon,
                    weatherText:res.current.condition.text,
                    cityName:res.location.name,
                    weatherData:res.current})
          })
          getPrayerTimeApiData(this.props.cityName).then(res => {
            this.setState({
                sabah:res.timings.Fajr,
                ogle:res.timings.Dhuhr,
                ikindi:res.timings.Asr,
                aksam:res.timings.Maghrib,
                yatsi:res.timings.Isha,
            })
          })

          if(this.props.birthdays.dataList5 != {})
          {
            this.startAnimation();
          setTimeout(()=> {
            this.stopAnimation();
          },2000)
          }
    }

    
    
    render() {
        return (
            <>
                        <Modal size="lg" style={{maxWidth: '700px', width: '100%'}} isOpen={this.state.openModal} fullscreen>
                            <ModalHeader>{this.state.title}</ModalHeader>
                            <ModalBody>
                                {this.state.subtitle}
                            </ModalBody>
                            <ModalFooter>
                            <Button color="secondary" onClick={this.onCloseModal}>
                                Kapat
                            </Button>
                            </ModalFooter>
                        </Modal>
                <section className="section section-shaped section-hero">
                    <Row className="justify-content-center m-4">
                        <div className="shape shape-style-1 shape-default">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                            
                        
                        <Col className = "my-mb" lg="10">
                            <Row className="row-grid">
                            <Col className = "my-mb" lg="4">
                                    <Container className="py-md">
                                        <Row className="justify-content-between align-items-center">
                                            <Col className="mb-lg-auto" lg="12">
                                                <div className="rounded shadow-lg">
                                                    <Container className="py-md mt-3">
                                                        <Row className="justify-content-between align-items-center">
                                                            <Col className="mb-lg-auto" lg="12">
                                                                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                                                                <UncontrolledCarousel items={items} />
                                                                </div>
                                                            </Col>
                                                            <Col className=" mb-lg-0" lg="12">
                                                                <h2 className="text-white font-weight-light">
                                                                Bu afetten bir ders çıkaralım.
                                                                </h2>
                                                                <p className="lead text-white">
                                                                Yıkılan hayalleri hep birlikte inşa edelim.<br/>
                                                                #YarıdaKalmasın
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col className = "my-mb" lg="4">
                                    <Container className="py-md">
                                        <Row className="justify-content-between align-items-center">
                                            <Col className="mb-lg-auto" lg="12">
                                                <Row className="mb-lg-auto" lg="12">
                                                <i className="icon icon-sm ni ni-atom" />
                                                    <Col className = "text-center text-md-left ">
                                                        <CardText className="text-white font-weight-light mt-1" tag = "h3">
                                                            Duyurular
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                                <Card className = "opacity-9">
                                                    <CardBody>
                                                        {this.props.announcements.map((e)=>{
                                                            return (
                                                            <>
                                                            <div onClick={()=> {
                                                                this.setState({title:e.title,subtitle:e.subTitle})
                                                                this.onClickButton();
                                                            }}>
                                                            <CardText className=" font-weight-light">
                                                               <a>{e.title}</a>
                                                            </CardText>

                                                            </div>
                                                            <hr className="dropdown-divider"/>
                                                            </>
                                                        )
                                                        })}
                                                    </CardBody>
                                                    </Card>
                                                    <Row className="mb-lg-auto" lg="12">
                                                        <Col className = "text-md-right ">
                                                            <CardText className="text-white font-weight-light mt-1" tag = "h6">
                                                                Tüm Duyurular
                                                            </CardText>
                                                        </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col className = "opacity-9 my-mb" lg="4">
                                    <div className="nav-wrapper">
                                        <Nav
                                            className="nav-fill"
                                            id="tabs-icons-text"
                                            pills
                                            role="tablist"
                                        >
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.iconTabs === 1}
                                                    className={classnames("mb-sm-3 mb-md-3", {
                                                        active: this.state.iconTabs === 1
                                                    })}
                                                    onClick={(e) => this.toggleNavs(e, "iconTabs", 1)}
                                                    href="#"
                                                    role="tab"
                                                >
                                                    <i className="ni ni-cloud-upload-96 mr-2" />
                                                    Hava Durumu
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.iconTabs === 2}
                                                    className={classnames("mb-sm-3 mb-md-3", {
                                                        active: this.state.iconTabs === 2
                                                    })}
                                                    onClick={(e) => this.toggleNavs(e, "iconTabs", 2)}
                                                    href="#"
                                                    role="tab"
                                                >
                                                    <i className="ni ni-bell-55 mr-2" />
                                                    Namaz Vakitleri
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.iconTabs === 3}
                                                    className={classnames("mb-sm-3 mb-md-3", {
                                                        active: this.state.iconTabs === 3
                                                    })}
                                                    onClick={(e) => this.toggleNavs(e, "iconTabs", 3)}
                                                    href="#"
                                                    role="tab"
                                                >
                                                    {}
                                                    <i className="ni ni-calendar-grid-58 mr-2" />
                                                    İşe Başlayanlar
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <Card className="shadow opacity-9">
                                        <CardBody style={{ display:'flex', justifyContent:'center' }}>
                                            <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                                                <TabPane  tabId="iconTabs1">

                                                <h4>{this.state.cityName}</h4>
                                                    <p className="description">
                                                    
                                                        {this.state.temp}°
                                                        <img className="ml-1 mr-1"
                                                                    alt="..."
                                                                    src= {this.state.weatherIcon}
                                                                    />
                                                                    {this.state.weatherText}

                                                    </p>
                                                </TabPane>
                                                <TabPane tabId="iconTabs2">
                                                <Table borderless>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b>{this.state.cityName}</b>
                                                            </td>
                                                            <td></td>
                                                            <td>
                                                                İkindi
                                                            </td>
                                                            <td>
                                                                <b>{this.state.ikindi}</b>
                                                            </td>
                                                            
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Sabah
                                                            </td>
                                                            <td>
                                                                <b>{this.state.sabah}</b>
                                                            </td>
                                                            <td>
                                                                Akşam
                                                            </td>
                                                            <td>
                                                                <b>{this.state.aksam}</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                        <td>
                                                                Öğle
                                                            </td>
                                                            <td>
                                                                <b>{this.state.ogle}</b>
                                                            </td>
                                                            <td>
                                                                Yatsı
                                                            </td>
                                                            <td>
                                                                <b>{this.state.yatsi}</b>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    </Table>
                                                    
                                                </TabPane>
                                                <TabPane tabId="iconTabs3">
                                                <tbody>
                                                        {this.props.startDates.map((e)=>{
                                                            return (
                                                            <>
                                                                <tr>
                                                                <td>
                                                                    <b>{e.message}</b>
                                                                </td>
                                                            </tr>
                                                            </>

                                                        )
                                                        })}
                                                    </tbody>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                    <div className="nav-wrapper mr--200">
                                        <Nav
                                            className="nav-fill"
                                            id="tabs-icons-text"
                                            pills
                                            role="tablist"
                                        >
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.iconTabs2 === 1}
                                                    className={classnames("mb-sm-3 mb-md-3", {
                                                        active: this.state.iconTabs2 === 1
                                                    })}
                                                    onClick={(e) => this.toggleNavs2(e, "iconTabs2", 1)}
                                                    href="#"
                                                    role="tab"
                                                >
                                                    <i className="ni ni-cloud-upload-96 mr-2" />
                                                    Doğum Günü Olanlar
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.iconTabs2 === 2}
                                                    className={classnames("mb-sm-3 mb-md-3", {
                                                        active: this.state.iconTabs2 === 2
                                                    })}
                                                    onClick={(e) => this.toggleNavs2(e, "iconTabs2", 2)}
                                                    href="#"
                                                    role="tab"
                                                >
                                                    <i className="ni ni-bell-55 mr-2" />
                                                    İzinde Olanlar
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <Card className="shadow opacity-9">
                                        <CardBody style={{ display:'flex', justifyContent:'center' }}>
                                            <TabContent activeTab={"iconTabs2" + this.state.iconTabs2}>
                                                <TabPane  tabId="iconTabs21">
                                                <tbody>
                                                        {this.props.birthdays.map((e)=>{
                                                            return (
                                                            <>
                                                                <tr>
                                                                <td>
                                                                    <b>{e.message}</b>
                                                                </td>
                                                            </tr>
                                                            </>

                                                        )
                                                        })}
                                                    </tbody>
                                                    <ReactCanvasConfetti
                                                    refConfetti={this.getInstance}
                                                    style={canvasStyles}
                                                    />
                                                </TabPane>
                                                <TabPane tabId="iconTabs22">
                                                    <tbody>
                                                        {this.props.offDays.map((e)=>{
                                                            return (
                                                            <>
                                                                <tr>
                                                                <td>
                                                                    <b>{e.message}</b>
                                                                </td>
                                                            </tr>
                                                            </>
                                                        )
                                                        })}
                                                    </tbody>
                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                                
                            </Row>
                        </Col>
                    </Row>
                </section>
            </>
        );
    }
}
export default Row1;