
import { Calendar,Views, Navigate, DateLocalizer, momentLocalizer } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid"
import moment from "moment";
import 'moment/locale/tr';
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes, { element } from 'prop-types'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import { render } from "react-dom";
import {  useState,
          useEffect,
          useCallback,
          useMemo,
          Fragment } from "react";

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

    showMore: (total) => `+${total} gün`,
  },
}

const formats = {
  weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
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
  );
}

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



const event = [
  {
    start: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
    end: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
    title: "Cumple"
  }
];
function checkDateRangesOverlap(s1,e1,s2,e2) {
  

  const startDate1 = new Date(s1);
  const endDate1 = new Date(e1);
  const startDate2 = new Date(s2);
  const endDate2 = new Date(e2);

  return (startDate1 < endDate2 && endDate1 > startDate2);
}

export default function IzinlerimPage({localizer}) {
    const [loading, setLoading] = useState(false);
    const [workerData,setWorkerData] = useState([]);
    const [modalHoliday, setModalHoliday] = useState(false);
    const [modalAllHoliday, setModalAllHoliday] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);
    const [dayOffType, setDayOffType] = useState(0);
    const [description, setDescription] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);
    const[openmodal, setopenmodal] = useState(false);
    const[notes, setnotes] = useState("");


    const range1 = { start: '2022-01-01', end: '2022-03-31' };
    const range2 = { start: '2022-02-01', end: '2022-04-30' };

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [myEvents, setEvents] = useState([])

    // İzin görüntüleme
    const [dateFrom,setDateFrom] = useState(new Date());
    const [dateTo,setDateTo] = useState(new Date())
    const [hrApprove, setHrApprove] = useState(0);
    const [mngApprove,setMngApprove] = useState(0);
    const [state, setState] = useState(0);
    const [typeDayOff, setTypeDayOff]= useState(0);
    const [countDay, setCountDay] = useState(0.0);
    const [dayDescription,setDayDescription] = useState("");
    const [recId, setRecId] = useState("");
    const [totalDayOff, setTotalDayOff] = useState(0);

    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");

    const [halfTimeType, sethalfTimeType] = useState(0);
    const [buttonVisible, setButtonVisible] = useState(true);

    const q = useLocation();
  
  useEffect(()  => {
    decryptUserData().then((data)=>{
      setUser(data.split(":")[0])
      setPass(data.split(":")[2])
      getWorkerDayOff(data.split(":")[0],data.split(":")[2]);
    })

    
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
      ...(event.state == 3 && {
        style: {
          backgroundColor: '#3d4038',
        },
      }),
    }),
    []
  )
  const setIsAcceptedPost = async () => {
    console.log("clicked");
    await axios.post("../api/setIsAccepted",{
      "user":user,
      "pass":pass
    }).then((res)=>{        
        onClose(); 
        setopenmodal(openmodal); 
        setButtonVisible(true);     
        console.log(res.data) ; 
    })        
  }

  const onClose = () => {

    setIsAccepted(!isAccepted);
    setopenmodal(!openmodal);
    setButtonVisible(false);
  }
  const toggleClose = () => {
    setopenmodal(!openmodal);
  }

    // İzin Oluşturma Fonksiyon
    const createDayOffWorker = async () => {
      let check = false;
      
      if (new Date(fromDate) > new Date(toDate)) {
        toast.error("İzine çıkış Tarihi, izin dönüş tarihinden küçük olamaz.", {
          position: toast.POSITION.TOP_LEFT
        });
        return;
      }

      if (!description) {
        toast.error("Lütfen açıklama alanını doldurun.", {
          position: toast.POSITION.TOP_LEFT
        });
        return;
      }
    
      
        setLoading(true);
        const diffTime = Math.abs(new Date(toDate) - new Date(fromDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let dayCount = diffDays;
        const holidays = ['2024-01-01', '2024-04-10', '2024-04-11', '2024-04-12', '2024-04-23', '2024-05-01', '2024-05-19', '2024-06-16', '2024-06-17', '2024-06-18', '2024-06-19', '2024-07-15', '2024-08-30', '2024-10-29'];
        
        // Yeni eklenen tatil günler
        const additionalHolidays = ['2024-04-09'];
        
        for (let i = 0; i < diffDays; i++) {
          const day = new Date(new Date(fromDate).getTime() + i * 24 * 60 * 60 * 1000);
          const format = day.toISOString().substring(0, 10);
        
          if (day.getDay() === 6 || day.getDay() === 0 || holidays.includes(format) || additionalHolidays.includes(format)) {
            if (additionalHolidays.includes(format)) {
              dayCount -= 0.5;  
            } else {
              dayCount--; 
            }
          }
        }
            
        const dayoff = dayCount === 0 ? 0.5 : dayCount;
        
        let response = await axios.post("../api/CreateWorkerDaysOff",{
          "description":description,
          "fromDate":`${fromDate.toString().split("-")[2]}.${fromDate.toString().split("-")[1]}.${fromDate.toString().split("-")[0]}`,
          "toDate":`${toDate.toString().split("-")[2]}.${toDate.toString().split("-")[1]}.${toDate.toString().split("-")[0]}`,
          "dayOffTypes":parseInt(dayOffType),
          "daysCount":dayoff,
          "halfTimeType": parseInt(halfTimeType),
          "user":user,
          "pass":pass
        }).catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_LEFT
          });
          
          setLoading(false);
          toggleHoliday();
          toogleAllHoliday();
          window.location.replace("/login");
        }).then((res) => {
          if ( res.status == 200 && res.data.result == true) { 
              toast.success("İzin girişi yapılmıştır, lütfen izin formunu çıktı alınız.", {
              position: toast.POSITION.TOP_LEFT
            });
             toggleHoliday();
             setLoading(false);
            window.location.reload();
          } else { 
            toggleHoliday();
            setLoading(false);
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_LEFT
            });
          }
          //window.location.reload(false);
        });
      
    }
    const createDayOffNotes = async () => {

          let response = await axios.post("/api/CreateDayOffNotification",{
            "description":notes, 
            "user":user,
            "pass":pass
          }).catch((err)=> {
        
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_LEFT
            });                
            window.location.replace("/login");
          }).then((res) => {
      
            if(res.status == 200 && res.data.result == true)
            {
                setLoading(false);        
                toast.success(res.data.message,{
                position: toast.POSITION.TOP_LEFT
              });
            
            }else{ 
              
              setLoading(false);
              toast.error(res.data.message,{
                position: toast.POSITION.TOP_LEFT
              })
            }
        
          })
          setopenmodal(false); 
    }

    const toggleHoliday = () => {
      setModalHoliday(!modalHoliday);
    };
    const toggleIsAccepted = () => {
      setIsAccepted(false);
    };
    
    const toogleAllHoliday =() =>{

        setModalAllHoliday(!modalAllHoliday)

    } 
    const changeUnmountOnClose = (e) => {
    let { value } = e.target;
      setUnmountOnClose(JSON.parse(value));
    };

    const getWorkerDayOff = async (user,pass) => {
      setLoading(true);
      let response =await axios.post("../api/GetWorkersDayOffFilter",
      {"user":user,"pass":pass},{timeout: 50000}).then((res)=>{
        setLoading(false);
        
        if(res.status == 200)
        {
          var data = JSON.parse(JSON.stringify(res.data))
          
          data.map((obj)=> {
            obj.title = obj.name
            obj.allDay = true,
            obj.state = obj.isUser == user ? obj.state : 3,
            obj.end = new Date(obj.end.slice(0,4),obj.end.slice(5,7)-1,obj.end.slice(8,10))
            obj.start = new Date(obj.start.slice(0,4),obj.start.slice(5,7)-1,obj.start.slice(8,10))
            setEvents(old=>[...old,obj])
            setTotalDayOff(obj.totaldaysoff)
            obj.isaccepted ==  0 ? setIsAccepted(true): setIsAccepted(false);
            
          })   
        }
      });  
    }

    const decryptUserData = async () =>{
      let aes_dec = await CryptoJS.AES.decrypt(q.search.toString().slice(3,q.search.toString().length), "yunusemre").toString(
        CryptoJS.enc.Utf8
      );
      return aes_dec;
    }
    
    const handleSelectEvent = useCallback(
      (event) => {
        setCountDay(event.dayscount);
        setDateTo(new Date(event.end).toISOString().slice(0,10));
        setDateFrom(new Date(event.start).toISOString().slice(0,10));
        setHrApprove(event.hrapprove);
        setMngApprove(event.managerapp);
        setState(event.state);
        setDayDescription(event.note);
        setTypeDayOff(event.title);
        setRecId(event.recid);
        toogleAllHoliday();
      },
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
        setFromDate(new Date(start).toISOString().slice(0,10))
        setToDate(new Date(end).toISOString().slice(0,10))
        
        toggleHoliday()
        /*
        if (title) {
          setEvents((prev) => [...prev, { start, end}])
        }
        */
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

    const diffTime = Math.abs(new Date(toDate) - new Date(fromDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let dayCount = diffDays;
    const holidays = ['2024-01-01', '2024-04-10', '2024-04-11', '2024-04-12', '2024-04-23', '2024-05-01', '2024-05-19', '2024-06-16', '2024-06-17', '2024-06-18', '2024-06-19', '2024-07-15', '2024-08-30', '2024-10-29'];
    
    const additionalHolidays = ['2024-04-09']; // arefe. 
    
    for (let i = 0; i < diffDays; i++) {
      const day = new Date(new Date(fromDate).getTime() + i * 24 * 60 * 60 * 1000);
      const format = day.toISOString().substring(0, 10);
    
      if (day.getDay() === 6 || day.getDay() === 0 || holidays.includes(format) || additionalHolidays.includes(format)) {
        if (additionalHolidays.includes(format)) {
          dayCount -= 0.5; 
        } else {
          dayCount--; 
        }
      }
    }
    
    const dayoff = dayCount === 0 && diffDays !== 0 ? 0 : (dayCount === 0 ? 0.5 : dayCount);
    

    
      return (
        <>
          <DemoNavbar q= {q.search.toString().slice(3,q.search.toString().length)} />
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
              <ToastContainer />
                <Card className="card-profile shadow mt--300 pt-5 pb-5">
                <Col md="12">
                    <div className="pl-md-3 pr-md-3">
                    <div>
                      <Modal isOpen={modalHoliday} toggle={toggleHoliday}>
                        <ModalHeader toggle={toggleHoliday}>İzin Oluştur</ModalHeader>
                        <ModalBody>
                        <Form>
                                    <FormGroup>
                                    <Label for="exampleEmail">
                                     İzine Çıkış Tarihi
                                    </Label>
                                    <Input value = {fromDate}
                                     onChange = {e => setFromDate(e.target.value)}
                                      id="fromDate"
                                      type = "date"
                                      
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="exampleEmail">
                                    İzin Dönüş Tarihi
                                    </Label>
                                    <Input value = {toDate} onChange = {e => setToDate(e.target.value)} id="toDate" type= "date"/>
                                    <FormFeedback >
                                    İşe başlayacak olduğunuz tarihi giriniz
                                    </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="examplePassword">
                                    İzin Tipi
                                    </Label>
                                    <Input onChange= {e=> setDayOffType(e.target.value)} type = "select">
                                    
                                                        <option value={0}>
                                                            YILLIK
                                                        </option>
                                                        <option value={3}>
                                                            EVLİLİK
                                                        </option>
                                                        <option value={2}>
                                                            DOĞUM GÜNÜ
                                                        </option>
                                                        <option value={5}>
                                                            ÖLÜM
                                                        </option>
                                                        <option value={6}>
                                                            MAZERET
                                                        </option>
                                                        <option value={7}>
                                                            BABALIK İZNİ
                                                        </option>
                                                        

                                    </Input>
                                   
                                    <FormText>
                                      İzin almak istediğiniz türü seçiniz.
                                    </FormText>
                                    </FormGroup>
                                    <FormGroup className="position-relative">
                                    <Label for="exampleEmail">
                                      Açıklama
                                    </Label>
                                    <Input type="textarea" value = {description}   onChange = {e => setDescription(e.target.value)} require />
                                    </FormGroup>

                                    <FormGroup>
                                    <Label for="yarimgun">
                                    Yarım Gün ise Ne zaman?
                                    </Label>
                                    <Input onChange= {e=> {
                                       const value = e.target.value;
                                       const halfTimeType = dayCount === 0 ? 1 : value;
                                       sethalfTimeType(halfTimeType);
                                    }} type = "select" >
                                    
                                    <option value={0}>
                                        Yok
                                      </option>
                                      <option value={1} selected={dayCount === 0}>
                                        Sabahtan
                                      </option>
                                      <option value={2}>
                                        Öğleden sonra
                                      </option>
         
                                    </Input>
                                    </FormGroup>

                                    <Label for="count">
                                        Toplam İzin Gün:
                                    </Label>
                                    <Input type="text" id="daycount" readOnly value={dayoff}>  </Input>
                                    
                                    </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={createDayOffWorker}>
                            Gönder
                          </Button>{' '}
                          <Button color="secondary" onClick={toggleHoliday}>
                            Vazgeç
                          </Button>
                        </ModalFooter>
                      </Modal>
                      

                     
                      <Modal isOpen={isAccepted}>
                        
                        <ModalBody>
                          <div> <h4> <center> <b>YILLIK İZİN MUTABAKATI </b></center></h4></div>
                          İnsan Kaynakları tarafından sisteme girilen izin gün sayınız: <br/>
                          <b>{totalDayOff}</b> gündür. <br/>
                          Bunun doğruluğunu kabul ediyor musunuz? <br/>
                          Hata olduğunu düşünüyorsanız İnsan Kaynaklarıyla İletişime geçiniz..
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={setIsAcceptedPost}>
                            Kabul Et
                          </Button>{' '}
                          <Button color="secondary" onClick={onClose}>
                            Reddet
                          </Button>
                        </ModalFooter>
                      </Modal> 
                      
                         
                    </div>
                    <Row className="justify-content-center">
                    
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <h6><strong className="font-weight-bold float-right">KALAN İZİN GÜN : {totalDayOff}</strong></h6>
                      </div>
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <h6> 
                          { buttonVisible &&
                        <Button color="primary" onClick={toggleHoliday} id="izin">
                            İZİN GİRİŞİ YAP
                          </Button> }
                          {' '}
                         
                        </h6>
                      </div>
                      <Modal isOpen={modalAllHoliday} toggle={toogleAllHoliday}>
                        <ModalHeader toggle={toogleAllHoliday}>İzin Çıktısı Al</ModalHeader>
                        <ModalFooter>
                           <Link to={{pathname: "/izinTalepFormu", search:`${q.search.toString()}&recId=${recId}`}}>
                          <Button color="danger">
                           Çıktı Al
                          </Button>
                            </Link>  
                          <Button color="secondary" onClick={toogleAllHoliday}>
                            Kapat
                          </Button>
                        </ModalFooter>
                      </Modal>

                      <Modal size="lg" style={{maxWidth: '500px', width: '100%'}} isOpen={openmodal}>
                <ModalBody>
                  <Form>
                    <FormGroup className="position-relative">
                        <Label for="exampleEmail">
                            Reddetme Sebebiniz: 
                      </Label>
                              <Input type="textarea" rows ={3} value={notes}  
                              onChange= {e=> {
                                      setnotes(e.target.value) }}/>
                    </FormGroup>
                  </Form>
                </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={createDayOffNotes}>     
                      Gönder </Button>
                    <Button color="secondary" onClick={toggleClose}>
                      Kapat </Button>
                  </ModalFooter>
              </Modal> 

                    </Col>
                    <Col lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <h3><strong className="font-weight-bold">İZİN İŞLEMLERİ</strong></h3>
                        </div>
                      </div>
                    </Col>
                  </Row>
                      <Fragment>
                      <div style={{height: "80vh"}}>
                        <Calendar
                          culture="tr-TR"
                          defaultDate={defaultDate}
                          defaultView={Views.MONTH}
                          showAllEvents={true}
                          events={myEvents}
                          localizer={localizer}
                          eventPropGetter={eventPropGetter}
                          messages={lang.tr}
                          views={views}
                          onSelectEvent={handleSelectEvent}
                          //selectable={true}
                          onSelectSlot={handleSelectSlot}                     
                          formats={formats}
                          
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

