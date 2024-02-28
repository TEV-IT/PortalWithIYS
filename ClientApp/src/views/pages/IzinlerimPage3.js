import React, { useState,useEffect ,Fragment, useCallback, useMemo } from "react";
import { Calendar,Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


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
import events from '../../assets/resources/events'

const localizer = momentLocalizer(moment);

const event = [
  {
    start: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
    end: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
    title: "Cumple"
  }
];

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

export default function IzinlerimPage3() {
    const daysOff = getWorkerDayOff2()
    const [loading, setLoading] = useState(false);
    const [workerData,setWorkerData] = useState([]);
    const [modalHoliday, setModalHoliday] = useState(false);
    const [modalAllHoliday, setModalAllHoliday] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const [myEvents, setEvents] = useState(events)

  
  useEffect(()  => {
    
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
    const { defaultDate, scrollToTime } = useMemo(
      () => ({
        defaultDate: new Date(2015, 3, 12),
        scrollToTime: new Date(1970, 1, 1, 6),
      }),
      []
    )
    const handleSelectEvent = useCallback(
      (event) => window.alert(event.title),
      []
    )
    const handleSelectSlot = useCallback(
      ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title) {
          setEvents((prev) => [...prev, { start, end, title }])
        }
      },
      [setEvents]
    )

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
                      <Fragment>
                          <div className="height600">
                          <Calendar
                            defaultDate={defaultDate}
                            defaultView={Views.MONTH}
                            events={myEvents}
                            localizer={localizer}
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                            selectable
                            scrollToTime={scrollToTime}
                          />
                      </div>
                    </Fragment>
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

