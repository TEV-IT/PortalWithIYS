import React, { useState,useEffect ,Fragment, useCallback, useMemo } from "react";
import { Calendar,Views, Navigate, DateLocalizer, momentLocalizer } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid"
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes, { element } from 'prop-types'
import * as dates from 'date-arithmetic'


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

require('globalize/lib/cultures/globalize.culture.tr-TR')
const cultures = ['en', 'tr-TR']

const lang = {
  en: null,
  tr: {
    week: 'Hafta',
    work_week: 'Hafta İçi',
    day: 'Gün',
    month: 'Ay',
    previous: 'Geri',
    next: 'İleri',
    today: 'Bugün',
    agenda: 'Ajanda',

    showMore: (total) => `+${total} gün`,
  },
}

function MyWeek({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, { localizer }),
    [date, localizer]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

MyWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

MyWeek.range = (date, { localizer }) => {
  const start = date
  const end = dates.add(start, 2, 'day')

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = (date) => {
  return `My awesome week: ${date.toLocaleDateString()}`
}

const event = [
  {
    start: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
    end: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
    title: "Cumple"
  }
];


export default function IzinlerimPage({localizer}) {
    const [loading, setLoading] = useState(false);
    const [workerData,setWorkerData] = useState([]);
    const [modalHoliday, setModalHoliday] = useState(false);
    const [modalAllHoliday, setModalAllHoliday] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [myEvents, setEvents] = useState([])

  
  
  useEffect(()  => {
    getWorkerDayOff();
  },[])
  const eventPropGetter = useCallback(
    (event, start, end, isSelected,hrapprove) => ({
      
      ...(event.state == 0 && {
        style: {
          backgroundColor: '#312cd1',
        },
      }),
      ...(event.state == 1 && {
        style: {
          backgroundColor: '#1cd9a0',
        },
      }),
      ...(event.state == 2 && {
        style: {
          backgroundColor: '#d9aa1c',
        },
      }),
      ...(event.state == 9 && {
        style: {
          backgroundColor: '#d12c37',
        },
      }),
      ...(event.state == 7 && {
        style: {
          backgroundColor: '#56a861',
        },
      }),
    }),
    []
  )
    

    const toggleHoliday = () => {
      setModalHoliday(!modalHoliday);
    };
    const toogleAllHoliday =() =>{
      setModalAllHoliday(!modalAllHoliday)
    } 
    const changeUnmountOnClose = (e) => {
    let { value } = e.target;
      setUnmountOnClose(JSON.parse(value));
    };
   
    const getWorkerDayOff = async () => {
      let response =await axios.post("api/GetWorkersDayOffFilter",{"user":"","pass":""},{timeout: 5000}).then((res)=>{
        setLoading(false);
        if(res.status == 200)
        {
          var data = JSON.parse(JSON.stringify(res.data))
          data.map((obj)=> {
            obj.title = obj.name
            obj.allDay = true,
            obj.end = new Date(obj.end.slice(0,4),obj.end.slice(5,7)-1,obj.end.slice(8,10))
            obj.start = new Date(obj.start.slice(0,4),obj.start.slice(5,7)-1,obj.start.slice(8,10))
            setEvents(old=>[...old,obj])})
            
        }
      });
    }


    
    const handleSelectEvent = useCallback(
      (event) => window.alert(event.hrapprove),
      []
    )
    const [culture, setCulture] = useState('tr-TR')

    const cultureOnClick = useCallback(
      ({ target: { value } }) => {
        // really better to useReducer for simultaneously setting multiple state values
        setCulture(value)
      },
      [setCulture]
    )
    const handleSelectSlot = useCallback(
      ({ start, end }) => {
        //const title = window.prompt('New Event name')
        setFromDate(new Date(start).toISOString().slice(0,10))
        setToDate(new Date(end).toISOString().slice(0,10))
        
        toggleHoliday()
        if (title) {
          setEvents((prev) => [...prev, { start, end, title }])
        }
      },
      [setEvents]
    )
    const { defaultDate, views, scrollToTime,messages } = useMemo(
      () => ({
        defaultDate: new Date(),
        scrollToTime: new Date(2000, 1, 1, 6),
        views: {
          month: true,
          //week: MyWeek,
        },
        messages: lang[culture],
      }),
      [culture]
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
                <Modal isOpen={modalHoliday} toggle={toggleHoliday}>
                  <ModalHeader toggle={toggleHoliday}>İzin Oluştur</ModalHeader>
                 
                  <Form>
                      <FormGroup>
                      <Label for="exampleEmail">
                      Başlangıç Tarihi
                      </Label>
                      <Input value = {fromDate} onChange = {e => setFromDate(e.target.value)} id="fromDate" valid type = "date"/>
                      <FormFeedback valid>
                      İzin Başlangıç Tarihinizi Giriniz.
                      </FormFeedback>
                      
                      </FormGroup>
                      <FormGroup>
                      <Label for="exampleEmail">
                      Bitiş Tarihi
                      </Label>
                      <Input value = {toDate} onChange = {e => setToDate(e.target.value)} id="toDate" valid type= "date"/>
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
                      Bugün dahil hesaplama yapılacaktır.
                      </FormFeedback>
                    
                      </FormGroup>
                      <FormGroup className="position-relative">
                      <Label for="exampleEmail">
                      Açıklama
                      </Label>
                      <Input valid />
                      </FormGroup>
                      </Form>
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
                      <h3><strong className="font-weight-bold">İZİN İŞLEMLERİ</strong></h3>
                      <Fragment>
                      <div style={{height: "80vh"}}>
                        <Calendar
                          culture={culture}
                          defaultDate={defaultDate}
                          defaultView={Views.MONTH}
                          showAllEvents={true}
                          events={myEvents}
                          localizer={localizer}
                          eventPropGetter={eventPropGetter}
                          messages={messages}
                          views={views}
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

