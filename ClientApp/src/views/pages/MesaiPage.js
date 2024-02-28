import React, { useState, useEffect, Fragment, useCallback, useMemo } from "react";
import { Calendar, Views, Navigate, DateLocalizer, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import 'moment/locale/tr';
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes, { element } from 'prop-types'
import { BsArrowDown } from "react-icons/bs";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import {  Card, 
          Container,
          Col,
          Modal,
          ModalBody,
          ModalFooter,
          ModalHeader,
          Button,
          Form,
          FormGroup,
          Label,
          Input, 
          FormFeedback,
          Row,
          Collapse,
          CardBody,
          Accordion, 
          AccordionItem,
          AccordionHeader,
          AccordionBody,
          Table

 } from 'reactstrap'; 

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation } from "react-router-dom";

const MyCalendar = () => {
  const [myEvents, setEvents] = useState([])

  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); 
  const [selectedStartTime, setSelectedStartTime] = useState('09:00'); 
  const [selectedEndTime, setSelectedEndTime] = useState('17:00'); 
  
  const [totalHours, setTotalHours] = useState(0);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

const localizer = momentLocalizer(moment); 
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
    const startOfWeek = localizer.startOfWeek();
  
    const currRange = useMemo(
      () => MyWeek.range(startOfWeek, { localizer }),
      [startOfWeek, localizer]
    );
  }

  useEffect(() => {
 
    calculateTotalHours();
  }, [selectedStartDate, selectedStartTime, selectedEndTime]);
  MyWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
  };
  
  MyWeek.range = (date, { localizer }) => {
    const start = localizer.startOf(date, 'week');
    const end = localizer.endOf(date, 'week');
  
    const range = [];
    let current = start;
  
    while (localizer.lte(current, end)) {
      range.push(current);
      current = localizer.add(current, 1, 'day');
    }
  
    return range;
  };

  const [culture, setCulture] = useState('tr-TR')

  const cultureOnClick = useCallback(
    ({ target: { value } }) => {
      setCulture(value)
    },
    [setCulture]
  )

  const { defaultDate, views, scrollToTime,messages } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(2000, 1, 1, 6),
      views: {
        week: true,
        day: true,
      },
      messages: lang[culture],
    }),
    [culture]
  )

  const event = [
    {
      start: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
      end: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
      title: "Cumple"
    }
  ];

  

  const handleSelectSlot = (slotInfo) => {
    const startDateTimeString = moment(slotInfo.start).format('YYYY-MM-DD HH:mm');
    const endDateTimeString = moment(slotInfo.end).format('YYYY-MM-DD HH:mm');
  
    setSelectedStartDate(moment(slotInfo.start));
    setSelectedStartTime(moment(slotInfo.start).format('HH:mm'));
    setSelectedEndTime(moment(slotInfo.end).format('HH:mm'));
  
    toggle();
  
    calculateTotalHours(startDateTimeString, endDateTimeString);
  };
  

  const calculateTotalHours = (startDateTimeString, endDateTimeString) => {
    console.log('Before calculation:');
    console.log('Selected Start Date:', selectedStartDate);
    console.log('Selected Start Time:', selectedStartTime);
    console.log('Selected End Time:', selectedEndTime);
  
    if (startDateTimeString && endDateTimeString) {
      const startDateTime = moment(startDateTimeString, 'YYYY-MM-DD HH:mm');
      const endDateTime = moment(endDateTimeString, 'YYYY-MM-DD HH:mm');
  
      console.log('After moment conversion:');
      console.log('startDateTime:', startDateTime.format());
      console.log('endDateTime:', endDateTime.format());
  
      if (startDateTime.isValid() && endDateTime.isValid()) {
        const duration = moment.duration(endDateTime.diff(startDateTime));
        const totalHours = duration.asHours();
  
        console.log('After calculation:');
        console.log('Total Hours:', totalHours);
  
        setTotalHours(totalHours);
      } else {
        console.error('Invalid date/time format');
      }
    } else {
      console.error('Some date/time values are missing');
    }
  };
  
  

const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
}

const [description, setDescription] = useState("");

const handleSaveOverTime = async () => {
  try {
    let response = await axios.post("https://localhost:5001/api/CreateWorkerShift", {
      "fromDate": selectedStartDate,
      "startHours": selectedStartTime,
      "endHours": selectedEndTime,
      "description": description,
      "totalHours": totalHours,
      "user": user,
      "pass": pass 
    });

    console.log("Response:", response); 

    if (response && response.status === 200 && response.data.result === true) { 
      toast.success("Mesai'yi kaydettiniz.", {
        position: toast.POSITION.TOP_LEFT
      });
    } else { 
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_LEFT
      });
    }
  } catch (error) {
    console.error("Error:", error); 
    toast.error(error.response.data.message, {
      position: toast.POSITION.TOP_LEFT
    });
  }
}



  return (
    <div style={{ height: 500 }}>
<Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '10px' }}
        culture="tr-TR"
        selectable={true}
        defaultView="week" 
        defaultDate={new Date()}
        onSelectSlot={handleSelectSlot}
        formats={{ 
          dayFormat: 'DD',
          dayRangeHeaderFormat: ({ start, end }) => `${moment(start).format('DD MMM')} - ${moment(end).format('DD MMM')}`,
        }}
        messages={{
          next: 'ileri',
          previous: 'geri',
          today: 'bugün',
          month: 'Ay',
          week: 'Hafta',
          day: 'Gün',
        }}
      />

<Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Mesai Detayları</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="fromDate">Mesai Tarihi</Label>
              <Input
                value={selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD') : ''}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                id="fromDate"
                type="date"
              />
            </FormGroup>
            <FormGroup>
              <Label for="startTime">Başlangıç Saati</Label>
              <Input
                value={selectedStartTime || ''}
                onChange={(e) => setSelectedStartTime(e.target.value)}
                id="startTime"
                type="time"
              />
            </FormGroup>
            <FormGroup>
              <Label for="endTime">Bitiş Saati</Label>
              <Input
                value={selectedEndTime || ''}
                onChange={(e) => setSelectedEndTime(e.target.value)}
                id="endTime"
                type="time"
              />
            </FormGroup>

            <FormGroup>
              <Label for="endTime">Açıklama</Label>
              <Input
                type="Input"
                value={description} onChange={(e)=> setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
    <Label for="totalHours">Total</Label>
    <Input
        value={totalHours}
        id="totalHours"
        readOnly
    />
</FormGroup> 
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveOverTime}>
            İşlem Yap
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            İptal
          </Button>
        </ModalFooter>
      </Modal>

    </div>


  );
};

const MesaiPage = () => {

  const q = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const decryptUserData = async () =>{
    let aes_dec = await CryptoJS.AES.decrypt(q.search.toString().slice(3,q.search.toString().length), "yunusemre").toString(
      CryptoJS.enc.Utf8
    );
    return aes_dec;
  }

  const [date, setDate] = useState(""); //! Liste için yazıldı :) 
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [total, setTotal] = useState("");
  const [desc, setDesc] = useState("");
  const [status] = useState(0);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const getOverTimeList = async (user,pass) => {
    let response =await axios.post("../api/getWorkerShift",
    {"user":user,"pass":pass},{timeout: 50000}).then((res)=>{
      
      if(res.status == 200)
      {
        var data = JSON.parse(JSON.stringify(res.data))
        
        data.map((obj)=> {
          obj.date = obj.date;
          obj.startTime = obj.startTime,
          obj.endTime = obj.endTime;
          obj.total = obj.total,
          obj.desc = obj.desc
          obj.status = obj.status
        })   
      }
    });  
  }

  useEffect(()  => {
    decryptUserData().then((data)=>{
      setUser(data.split(":")[0])
      setPass(data.split(":")[2])
      getOverTimeList(data.split(":")[0],data.split(":")[2]);
    })

    
  },[])
  
          return (
            <>
              <DemoNavbar q={q.search.toString().slice(3, q.search.toString().length)} />
              <main className="profile-page">
                <section className="section-profile-cover section-shaped">
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
                <Row>
                  <Col md="12">
                    <MyCalendar />
                  </Col>
                  <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
      <h5 style={{ color: '#333', marginBottom: '0' }}>
        <strong>Mesai Ayrıntıları</strong>
      </h5>

      <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
      <Button
    color="primary"
    outline
    onClick={toggleOpen}>
        <BsArrowDown />
        </Button>
        <Collapse isOpen={isOpen}>
          <Card style={{width:"100%"}}>
            <CardBody>
            <Table striped style={{width:"100%"}}>
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>
                    Mesai Tarihi
                    </th>
                    <th>
                    Başlangıç Saati
                    </th>
                    <th>
                    Bitiş Saati
                    </th>
                    <th>
                    Total Saat
                    </th>
                    <th>
                     Açıklama
                    </th>
                    <th>
                    Onay Durumu
                    </th>
                    <th>
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      1
                    </th>
                    <td>
                      25.03.2024
                    </td>
                    <td>
                      20.00
                    </td>
                    <td>
                      23.00
                    </td>
                    <td>
                      3.00
                    </td>
                    <td>
                      mesai formu 
                    </td>
                    <td>
                      İş Akışı Tamamlandı.
                    </td>
                    <td>
                    <Button style={{width:"10"}}> Onaya Gönder </Button>
                    </td>
                  </tr>

                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>


                </Row>
              </Card>
            </Container>

              </main>
              <SimpleFooter />
            </>
          );
        }

export default MesaiPage;
