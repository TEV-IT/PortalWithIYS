import React from "react";

import {    
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Row,
    Col,
    Popover,
    PopoverHeader,
    PopoverBody,
    Table,
    Form,
    FormGroup,
    FormFeedback,
    Label,       
    Spinner,
    FormText,
    InputGroupText,
    InputGroupAddon,
    InputGroup,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { BiPlay,BiPause,BiMicrophone,BiMicrophoneOff, BiCamera,BiCameraOff } from "react-icons/bi";



class EntegrasyonPage extends React.Component {
    constructor(){
        super();
        this.state ={
            isRelease: true,
            notes:"",
            isUploadTxt: false,
            streamCamera: null,
            stream: null,
            audioLevel: 0,
            audio: new Audio('/ses.mp3'),
            isPause: false,
            isCamera: false,
            isMicrofon: false,
            fileContents: '',
            serialNumCanvas: false,
            barcode:"",
            deviceType:0,
            brandName:"",
            deviceModel:"",
            deviceSerialNum:"",
            ram:"",
            hdd:"",
            cpu:"",
            battery:50,
            adaptorStatus:0,
            cameraStatus:0,
            micStatus:0,
            wifiStatus:0,
            result:0,
            saveButton: false,
            loading : false,
            error: false,
        };
        this.handleFileSelect = this.handleFileSelect.bind(this);   
        this.playSound = this.playSound.bind(this);
        this.videoRef = React.createRef();
        this.stopSound = this.stopSound.bind(this);
        this.audioContextRef = React.createRef();
    }
    getDeviceType = (deviceType) =>{
        switch(deviceType){
            case 0:
                return "Bilinmiyor"
                break;
                
            case 1:
                return "Laptop"
                break;

            case 2: 
                return "Tablet"
                break;
                
                default:
                    return "Bilinmiyor"
        }
    }

    startCamera = async () => {
        try {
          const streamCamera = await navigator.mediaDevices.getUserMedia({ video: true });
          this.setState({ streamCamera });
          this.videoRef.current.srcObject = streamCamera;
          this.videoRef.current.play();
        } catch (error) {
          console.error(error);
        }
    };

    stopCamera = () => {
        const { streamCamera } = this.state;
        if (streamCamera) {
            streamCamera.getTracks().forEach((track) => track.stop());
            this.setState({ streamCamera: null });
            this.videoRef.current.srcObject = null;
        }
      };
    

    playSound() {
        this.state.audio.play();
    }
    
      stopSound() {
        const audio = this.state.audio;
        audio.pause();
        audio.currentTime = 0;
      }

      startMicrophone = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.setState({ stream });
          this.audioContextRef.current = new AudioContext();
          const source = this.audioContextRef.current.createMediaStreamSource(stream);
          const analyser = this.audioContextRef.current.createAnalyser();
          source.connect(analyser);
          const intervalId = setInterval(() => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            const audioSum = dataArray.reduce((acc, curr) => acc + curr, 0);
            const audioAvg = audioSum / dataArray.length;
            this.setState({ audioLevel: audioAvg });
          }, 50);
          this.cleanup = () => {
            clearInterval(intervalId);
            this.audioContextRef.current.close();
          };
        } catch (error) {
          console.error(error);
        }
      };

      stopMicrophone = () => {
        const { stream } = this.state;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          this.setState({ stream: null, audioLevel: 0 });
          this.audioContextRef.current.close();
        }
      };


    handleFileSelect(event) {
        const reader = new FileReader();
        this.setState({"fileContents":""})
        this.setState({"isUploadTxt": true})
        reader.onload = (event) => {
          const contents = event.target.result;
          // Parse the contents of the file here and update the state accordingly
          const lines = contents.split('\n');
          const updatedState = lines.map((line) => {

            switch(line.split('=')[0]) {
                case 'cpu_name':
                    this.setState({'cpu':line.split('=')[1]})
                  break;
                case 'device_model':
                    this.setState({'deviceModel':line.split('=')[1]})
                  break;
                case 'system_manufacturer':
                    this.setState({'brandName':line.split('=')[1]})
                  break;
                case 'serial_number':
                    this.setState({'deviceSerialNum':line.split('=')[1]})
                  break;
                case 'capacity_percentage':
                    parseInt(line.split('=')[1])>100?this.setState({'battery':100}):this.setState({'battery':parseInt(line.split('=')[1])})
                  break;
                case 'total_physical_memory':
                    this.setState({'ram':line.split('=')[1]})
                  break;
                case 'totalDiskCapacity':
                    parseInt(line.split('=')[1])>256 ? this.setState({'hdd':"512 GB"}):this.setState({'hdd':"256 GB"})
                  break;
                default:
                  // code block
              }
            this.setState({'deviceType':1})
            line.trim()
            console.log(line.split('=')[1])
          });
          this.setState({
            fileContents: updatedState,
          });
        };
        /*
        const keyValuePairs = updatedState.split('\n').map((line) => {
            const [key, value] = line.split('=');
            return { [key]: value };
          });
          const keyValueObject = Object.assign({}, ...keyValuePairs);
          console.log(keyValueObject); */

        reader.readAsText(event.target.files[0]);
      }

      componentWillUnmount() {
        if (this.cleanup) {
          this.cleanup();
        }
      }
    getBatteryNoYes = (battery) =>{
        switch(battery){
              
            case 0:
                return "Hayır"
                break;

            case 1: 
                return "Evet"
                break;
                
                default:
                    return "Bilinmiyor"
        }
    }

    

    getCameraNoYes = (cameraStatus) =>{
        switch(cameraStatus){             
            case 0:
                return "Hayır"
                break;
            case 1: 
                return "Evet"
                break;               
                default:
                    return "Bilinmiyor"
        }
    }
    
    getMicNoYes = (micStatus) =>{
        switch(micStatus){             
            case 0:
                return "Hayır"
                break;
            case 1: 
                return "Evet"
                break;               
                default:
                    return "Bilinmiyor"
        }
    }

    getWifiNoYes = (wifiStatus) =>{
        switch(wifiStatus){             
            case 0:
                return "Hayır"
                break;
            case 1: 
                return "Evet"
                break;               
                default:
                    return "Bilinmiyor"
        }
    }

    getResult = (result) =>{
        switch(result){             
            case 0:
                return ""
                break;
            case 1: 
                return "Uygun"
                break;
            case 2:
                return "Uygun Değil"
                break;

            default:
                return "Bilinmiyor"
        }
    }

    getResult = (brandName) =>{
        switch(result){             
            case 0:
                return "Dell"
                break;
            case 1: 
                return "Asus"
                break;
            case 2:
                return "Hp"
                break;
            case 3:
                return "Casper"
                break;
            case 4:
                return "Apple"
                break;

            case 5:
                return "Samsung"
                break;  
            default:
                return "Bilinmiyor"
        }
    }

    onClickSaveButton = () => {
        this.setState({saveButton: true})
      }
      onCloseButton = () =>{
        this.setState({saveButton: false})
      }

      toogleSerialNumCanvas = () =>{
        this.setState({serialNumCanvas: !this.state.serialNumCanvas})
      }

    saveDevice= async()=>{
        if(this.state.isRelease)
        {
            if(this.state.barcode != ""&&
        this.state.brandName != ""&&
        this.state.deviceModel != ""&&
        this.state.deviceTechSpec != ""&&
        this.state.deviceSerialNum != ""&&
        this.state.battery != 0
        )
        {
            
            await axios.post("/api/CreateDeviceInfo", 
            { 
                "CompScholarshipId":this.state.barcode,
                "DeviceType":parseInt(this.state.deviceType),
                "DeviceBrandName": this.state.brandName,
                "DeviceModel":this.state.deviceModel,
                "DeviceTechSpecs": this.state.cpu + " CPU; " + this.state.ram + " RAM; "+ this.state.hdd+ " DISK",
                "DeviceSerialNumber":this.state.deviceSerialNum,
                "DeviceBatteryLife":parseInt(this.state.battery),
                "DeviceAdapterIsOK":parseInt(this.state.adaptorStatus),
                "DeviceCameraIsOK":parseInt(this.state.cameraStatus),
                "DeviceMicIsOK":parseInt(this.state.micStatus),
                "DeviceWifiIsOK":parseInt(this.state.wifiStatus),
                "notes":this.state.notes
            }).catch((err)=>{
                console.log(err)
                this.setState({openModalContract: false})
                toast.error("Kayıt edilemedi", {position: toast.POSITION.TOP_CENTER})
                }).then((response)=>{
                    if(response.status ==200 && response.data.result  == true)
                    {
                        toast.success(response.data.message,{position: toast.POSITION.TOP_CENTER});
                        
                        this.setState({saveButton: false})
                        this.setState({barcode:""})
                        this.setState({deviceType:0})
                        this.setState({brandName:""})
                        this.setState({deviceModel:""})
                        this.setState({deviceTechSpec:""})
                        this.setState({deviceSerialNum:""})
                        this.setState({battery:0})
                        this.setState({adaptorStatus:0})
                        this.setState({cameraStatus:0})
                        this.setState({micStatus:0})
                        this.setState({wifiStatus:0})
                        setTimeout(()=>window.location.reload(false),5000)
                        
                    }
                    else{
                      toast.error(response.data.message,{position: toast.POSITION.TOP_CENTER})
                    }
              })
        }else{
            toast.error("Eksik bilgileri tamamlayınız",{position:toast.POSITION.TOP_CENTER});
        }
        }else{
            toast.error("Sistem Test Ortamında Çalışıyor.",{position: toast.POSITION.TOP_LEFT});
        }

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
            <main className="profile-page">
            <section className="section-shaped">
                
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
            <Container>
          <ToastContainer />
          
          <Card className="shadow pt-5 pb-5">
            <CardBody className="px-lg-5 py-lg-5">
              
                  <div className="pl-md-3 pr-md-3">
                        <CardHeader className="bg-white">
                        <div className="text-muted text-center mb-3">
                    
                          <div className="card-profile-stats d-flex justify-content-center">
                            <div>
                            <h3><strong className="font-weight-bold">Cihaz Bilgisi Giriş Ekranı</strong></h3>
                            </div>
                          </div>
                          <Link to={"/device.bat.txt"} target="_blank" download>Bat Dosyasını İndir</Link>
                          <div><Link to={"/TEV.bat.txt"} target="_blank" download>Yeni Bat Dosyasını İndir</Link></div>
                          <div><Link to={"/Bursiyer Ekran Koruyucu.jpg"} target="_blank" download>Walpaper İndir</Link></div>
                        </div>
                        </CardHeader>
                        

                      <Form style={{width: '100%'}} >

                      <FormGroup>
                            <Label for="example">
                                Dosya Yükle
                            </Label>
                        <Popover
                            isOpen={this.state.serialNumCanvas}
                            flip = {false}
                            target="Popover1"
                            toggle={this.toogleSerialNumCanvas}
                        >
                        <PopoverHeader>
                            Popover Title
                        </PopoverHeader>
                        <PopoverBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis in nisl eu euismod. Suspendisse consectetur nibh rhoncus consectetur commodo. Suspendisse vitae quam posuere, interdum dolor lacinia, eleifend nisl. Donec ut pharetra ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec in rhoncus diam. Morbi convallis justo lorem, non pharetra dolor ullamcorper id. Sed metus purus, tincidunt a iaculis in, egestas non sapien. Nam diam lectus, vehicula scelerisque turpis ac, bibendum tempor risus. Sed rutrum semper commodo. Sed et est ac justo accumsan porttitor. Fusce cursus lorem et ante vehicula lacinia. Donec tincidunt tellus eros, id eleifend nisl vestibulum eu. Vestibulum ac lobortis turpis. Nulla cursus pellentesque turpis vitae blandit. Vestibulum diam turpis, cursus sed dignissim nec, eleifend vel urna.
                            Vivamus ante libero, volutpat id mi lacinia, blandit blandit nisi. Mauris dictum magna faucibus, egestas magna sed, eleifend metus. Nam auctor orci vitae felis porta porttitor. Cras varius purus at felis mollis ornare. Donec euismod turpis mi, sit amet fermentum libero imperdiet sit amet. Nam consequat dictum magna. Etiam nisl justo, ultrices at enim sollicitudin, egestas auctor est. Aliquam placerat turpis nec nunc volutpat, eu efficitur ligula vestibulum. Maecenas accumsan nisi vel quam eleifend, at iaculis mi interdum. Aenean massa lectus, rhoncus et ante sed, viverra lacinia ante.
                        </PopoverBody>
                        </Popover>
                            <InputGroup>
                                <Input type= "file" onChange={this.handleFileSelect}  required />                    
                            </InputGroup>
                            {this.state.fileContents}
                        </FormGroup>

                        <FormGroup>
                            <Label for="example">
                                Barkod Kodu
                            </Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>TEV</InputGroupText>
                                </InputGroupAddon>
                                <Input type= "text" placeholder = "0001" value = {this.state.barcode} onChange = {(e)=> this.setState({barcode:e.target.value})}  maxLength="4" pattern="[0-9]{4}" required />                    
                            </InputGroup>
                            <FormText>
                                TEV yazısından sonra olan 4 haneli numarayı giriniz. 
                            </FormText>

                        </FormGroup>

                            <FormGroup>
                            <Label for="deviceType">
                                Ürün Türü
                            </Label>
                            {this.state.isUploadTxt ? <Input type = "text" value = {"Laptop"} disabled></Input>:
                              <Input value = {this.state.deviceType} onChange={e => this.setState({deviceType: e.target.value})} type= "select" required > 
                              <option value={0}>
                                  Bilinmiyor
                              </option>
                              <option value={1}>
                                  Laptop
                              </option>
                              <option value={2}>
                                  Tablet
                              </option>   
                          </Input>
                            }
                               
                            </FormGroup>

                            <FormGroup>
                                <Label for="brand">
                                    Marka
                                </Label>
                                
                                {this.state.isUploadTxt?<Input type = "text" value = {this.state.brandName} disabled></Input>:
                                <Input type= "select" onChange={e => {
                                    this.setState({brandName: e.target.value})
                                    if(e.target.value=="Samsung")
                                    {
                                        this.setState({deviceSerialNum: "R52m70b"})
                                    }

                                }}  required >
                                <option value={"DELL"}>
                                        DELL
                                    </option>
                                    <option value={"Asus"}>
                                        Asus
                                    </option>
                                    <option value={"HP"}>
                                        HP
                                    </option> 
                                    <option value={"CASPER"}>
                                        Casper
                                    </option>
                                    <option value={"LENOVO"}>
                                        Lenovo
                                    </option>
                                    <option value={"APPLE"}>
                                        Apple
                                    </option>
                                    <option value={"Samsung"}>
                                        Samsung
                                    </option>
                                </Input>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label for="model">
                                    Model
                                </Label>
                                {this.state.isUploadTxt ? <Input type = "text" value = {this.state.deviceModel} disabled></Input>:
                                 <Input value = {this.state.deviceModel} onChange = {(e)=> this.setState({deviceModel: e.target.value})} type= "text" required />
                                }
                               
                            </FormGroup>
                            <FormGroup>
                                <Label for="modelspech">
                                   <strong>ÖZELLİKLER</strong> 
                                </Label>  
                            </FormGroup>

                            

                <Table responsive>
                    <thead>
                    <tr>
                        <th>
                        <FormGroup>
                            <Label for="cpu">
                                İşlemci
                            </Label>
                               {this.state.isUploadTxt ? <Input type= "text" value = {this.state.cpu} disabled></Input>:
                                <Input type= "select" onChange = {(e)=> this.setState({cpu: e.target.value})}  required >
                                <option value={"i7"}>
                                    i7
                                </option>
                                <option value={"i5"}>
                                    i5
                                </option>
                                <option value={"Arm"}>
                                    Arm
                                </option>
                                <option value={"i9"}>
                                    i9
                                </option>
                                <option value={"i3"}>
                                    i3
                                </option>
                                <option value={"Intel Pentium"}>
                                    Intel Pentium
                                </option>
                                
                            </Input>
                               }
                            </FormGroup>
                        </th>
                        <th>

                        <FormGroup>
                            <Label for="ram">
                                Ram
                            </Label>
                                {this.state.isUploadTxt? <Input type= "text" value = {this.state.ram} disabled></Input>:
                                <Input type= "select" onChange = {(e)=> this.setState({ram: e.target.value})}  required >
                                    <option value={"4GB"}>
                                        4GB
                                    </option>
                                    <option value={"8GB"}>
                                        8GB
                                    </option>
                                    <option value={"16GB"}>
                                        16GB
                                    </option>
                                    <option value={"32GB"}>
                                        32GB
                                    </option>
                                    <option value={"64GB"}>
                                        64GB
                                    </option>
                                </Input>}
                               
                            </FormGroup>

                        </th>
                        <th>
                        <FormGroup>
                            <Label for="hdd">
                                DİSK
                            </Label>
                            {this.state.isUploadTxt ? <Input type = "text" value = {this.state.hdd} disabled></Input>:
                            <Input type= "select"  onChange = {(e)=> this.setState({hdd: e.target.value})} required >
                            <option value={"1TB"}>
                                1TB
                            </option>
                            <option value={"2TB"}>
                                2TB   
                            </option>
                            <option value={"4TB"}>
                                4TB
                            </option>
                            <option value={"6TB"}>
                                6TB   
                            </option>
                            <option value={"8TB"}>
                                8TB
                            </option>
                            </Input>
                            }
                                
                            </FormGroup>
                        </th>
                    </tr>
                    </thead>
                        </Table>

                        <Popover
                            isOpen={this.state.serialNumCanvas}
                            flip = {false}
                            target="Popover1"
                            toggle={this.toogleSerialNumCanvas}
                        >
                            <PopoverHeader>
                            Popover Title
                            </PopoverHeader>
                            <PopoverBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis in nisl eu euismod. Suspendisse consectetur nibh rhoncus consectetur commodo. Suspendisse vitae quam posuere, interdum dolor lacinia, eleifend nisl. Donec ut pharetra ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec in rhoncus diam. Morbi convallis justo lorem, non pharetra dolor ullamcorper id. Sed metus purus, tincidunt a iaculis in, egestas non sapien. Nam diam lectus, vehicula scelerisque turpis ac, bibendum tempor risus. Sed rutrum semper commodo. Sed et est ac justo accumsan porttitor. Fusce cursus lorem et ante vehicula lacinia. Donec tincidunt tellus eros, id eleifend nisl vestibulum eu. Vestibulum ac lobortis turpis. Nulla cursus pellentesque turpis vitae blandit. Vestibulum diam turpis, cursus sed dignissim nec, eleifend vel urna.
                            Vivamus ante libero, volutpat id mi lacinia, blandit blandit nisi. Mauris dictum magna faucibus, egestas magna sed, eleifend metus. Nam auctor orci vitae felis porta porttitor. Cras varius purus at felis mollis ornare. Donec euismod turpis mi, sit amet fermentum libero imperdiet sit amet. Nam consequat dictum magna. Etiam nisl justo, ultrices at enim sollicitudin, egestas auctor est. Aliquam placerat turpis nec nunc volutpat, eu efficitur ligula vestibulum. Maecenas accumsan nisi vel quam eleifend, at iaculis mi interdum. Aenean massa lectus, rhoncus et ante sed, viverra lacinia ante.
                            </PopoverBody>
                        </Popover>
                            <FormGroup>
                                <Label for="serialNum">
                                    Cihaz Seri No 
                                    <Button id="Popover1" outline onClick = {()=>this.toogleSerialNumCanvas()}>?</Button>
                                </Label>
                                {this.state.isUploadTxt ? <Input type = "text" value = {this.state.deviceSerialNum} disabled></Input>:
                                 <Input value = {this.state.deviceSerialNum} onChange = {(e)=> this.setState({deviceSerialNum: e.target.value})} type= "text" required />
                                }

                               
                            </FormGroup>

                            <FormGroup>
                            <Label for="example">
                               Pil Ömrü
                            </Label>
                            <InputGroup>

                                
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>%</InputGroupText>
                                </InputGroupAddon>
                                {this.state.isUploadTxt ? <Input type = "text" value = {this.state.battery} disabled></Input>:
                                <Input value = {this.state.battery} onChange = {(e)=> this.setState({battery: e.target.value})} type= "text" required />}
                                
                            </InputGroup>
                        </FormGroup>

                            <FormGroup>
                            <Label for="battery">
                                Batarya Çalışıyor mu?
                            </Label>
                                <Input onChange={e => this.setState({adaptorStatus: e.target.value})} type= "select" required >
                                    <option value={0}>
                                        Hayır
                                    </option>
                                    <option value={1}>
                                        Evet
                                    </option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="camera">
                                Kamera Çalışıyor mu? <Button onClick={()=>{
                                    this.setState({isCamera: !this.state.isCamera})
                                    this.state.isCamera?this.stopCamera():this.startCamera()
                                }} outline> {this.state.isCamera==true?<BiCamera/>:<BiCameraOff/> }</Button>
                            </Label>
                                {this.state.isCamera?<video ref={this.videoRef} width="640" height="480" />:<p></p>}
                                <Input onChange={e => this.setState({cameraStatus: e.target.value})} type= "select" required >
                                    <option value={0}>
                                        Hayır
                                    </option>
                                    <option value={1}>
                                        Evet
                                    </option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                            <Label for="microfon">
                                Mikrofon Çalışıyor mu? <Button onClick={()=>{
                                    this.setState({isMicrofon: !this.state.isMicrofon})
                                    this.state.isMicrofon?this.stopMicrophone():this.startMicrophone()
                                }} outline> {this.state.isMicrofon==true?<BiMicrophone/>:<BiMicrophoneOff/> }</Button>
                                {this.state.isMicrofon? <h6>Ses DÜzeyi: {this.state.audioLevel}</h6>: <p></p>}
                            </Label>
                                <Input onChange={e => this.setState({micStatus: e.target.value})} type= "select" required >
                                    <option value={0}>
                                        Hayır
                                    </option>
                                    <option value={1}>
                                        Evet
                                    </option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                            <Label for="wifi">
                                Hoparlör Çalışıyor mu? <Button onClick={()=>{
                                    this.setState({isPause: !this.state.isPause})
                                    this.state.isPause?this.stopSound():this.playSound()
                                }} outline> {this.state.isPause==true?<BiPause/>:<BiPlay/> }</Button>
                            </Label>
                                <Input onChange={e => this.setState({wifiStatus: e.target.value})} type= "select" required >
                                    <option value={0}>
                                        Hayır
                                    </option>
                                    <option value={1}>
                                        Evet
                                    </option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Not Ekle</Label>
                                    <Input value = {this.state.notes} onChange = {(e)=> this.setState({notes: e.target.value})} type="textarea" id="exampleText" />
                                </FormGroup>
                            <FormGroup>
                            <Button onClick={this.saveDevice} color= "danger"> Bilgileri Kaydet</Button>  {' '}
                            </FormGroup>
                        </Form>
                    </div>
                
                </CardBody>
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


export default EntegrasyonPage;