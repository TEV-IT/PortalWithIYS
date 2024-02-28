import React from "react";

import {    Card,
            Container,
            CardImg,
            Row,
            Col,
            Table,

} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
class IzinTalepFormu extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,
            data:{},
            user:"",
            pass:"",
            recId:"",
            id: "",
            affix: "",
            tcIdNumber: "",
            department: "",
            startDate:"",
            dayscount: 0,
            end: "",
            startDate: "",
            start: "",
            note: "",
            type: 0,
                }
    }


    getType = (type) => {
        switch(type){
            case 0: 
                return "YILLIK"
                break;

            case 1:
                return "İDARİ"
                break;

            case 2:
                return "DOĞUMGÜNÜ"
                break;

            case 3:
                return "EVLİLİK"
                break;

            case 4:
                return "DOĞUM İZNİ"
                break;

            case 5:
                return "ÖLÜM İZNİ"
                break;

            case 6:
                return "MAZERET"
                break;

            case 7:
                return "BABALIK İZNİ"
                break;
    
            default:
                return "Bilinmiyor"
        }
    }


    
    componentDidMount(){

        this.setState({loading: true});
        this.decryptUserData().then((data)=>{
            console.log(data);
            const searchParams = this.props.location.search.split("=");
            let index;
            if (searchParams.length === 5) {
                index = 4;
            } else if (searchParams.length === 3) {
                index = 2;
            } else {
                return;
            }
            const dataParams = data.split(":");
            const firstValue = dataParams[0];
            const thirdValue = dataParams[2];
            const fourthValue = searchParams[index];
            this.getDayOffFormData(firstValue, thirdValue, fourthValue);
        });

    }

    decryptUserData = async () =>{
        console.log(this.props.location.search.toString().split("&")[0].slice(3,this.props.location.search.toString().length))
        let aes_dec = await CryptoJS.AES.decrypt(this.props.location.search.toString().split("&")[0].slice(3,this.props.location.search.toString().length), "yunusemre").toString(
          CryptoJS.enc.Utf8
        );
        return aes_dec;
      }
    getDayOffFormData = async(user, pass, recId) => {

        await axios.post("uygulamalar/api/getWorkerDayOffForm",{
            "user": user,
            "pass": pass,
            "recId": parseInt(recId),
        }).then((res)=>{
            if(res.status == 200 )
            {
                console.log(res.data);
                console.log(res.data.id);
                console.log(res.data.affix);
                console.log(res.data.type);
                this.setState({
                    loading: false,
                    data: JSON.parse(JSON.stringify(res.data))
                    
                })
                console.log()
            }

        }).catch((err)=>{

        })
    }

    render(){
       
        const data = this.state.data;
        return(
            <>

          <Container>
            <Row className="justify-content-center">
                <Col xs="5" sm="4" md="3" lg="3" xl="3"
                style={{ margin: "0 10px 10px 0" }}>
                
                    <Card style={{ border: "1px solid white" }}>
                        <CardImg top height="100%"
                        src={require("assets/img/theme/TEV_logo.jpg")}/>

                    </Card>
                    
                </Col>
            </Row>
            <Row className="justify-content-center">
            <h2>İzin Talep Formu</h2>
            </Row>
        </Container>


          <Container>
          <Row className="justify-content-center">
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>İzin İsteminde Bulunan Çalışanın</h4>

            <Table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Sicil Numarası</th>
                        <th>{this.state.data.id}</th>
                    </tr>
                </thead>
                
                    <thead>
                    <tr>
                        <th>TC Kimlik Numarası</th>
                        <th> {this.state.data.tcIdNumber}</th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                    <th>Adı ve Soyadı</th>
                        <th> {this.state.data.name}</th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                    <th>Çalıştığı Birim</th>
                        <th>{this.state.data.department}</th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                        <th>Unvan</th>
                        <th>{data.affix}</th>
                    </tr>
                    </thead>

                    {/* <thead>
                    <tr>
                        <th>İşe Giriş Tarihi</th>
                        <th>{this.state.data.startDate?.toString().slice(0,10).split("-")[2]}.{this.state.data.startDate?.toString().slice(0,10).split("-")[1]}.{this.state.data.startDate?.toString().slice(0,10).split("-")[0]}</th>
                    </tr>
                    </thead> */}
                
            </Table>

            
        </div>
        </Row>

        <Row className="justify-content-center">
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>Kullanılacak İzin</h4>

            <Table class="table table-borderless">
                <thead>
                    <tr>
                        <th>Türü</th>
                        <th> {this.getType(this.state.data.type)} </th>
                    </tr>
                </thead>
                
                    <thead>
                    <tr>
                        <th>Nedeni</th>
                        <th> {this.state.data.note} </th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                    <th>Süresi (Gün)</th>
                        <th> {this.state.data.dayscount} </th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                    <th>İzine Çıkış Tarihi</th>
                        <th> {this.state.data.start?.toString().slice(0,10).split("-")[2]}.{this.state.data.start?.toString().slice(0,10).split("-")[1]}.{this.state.data.start?.toString().slice(0,10).split("-")[0]}</th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                        <th>İşe Dönüş Tarihi</th>
                        <th>{this.state.data.end?.toString().slice(0,10).split("-")[2]}.{this.state.data.end?.toString().slice(0,10).split("-")[1]}.{this.state.data.end?.toString().slice(0,10).split("-")[0]} </th>
                    </tr>
                    </thead>

                
            </Table>

            <Table borderless>
                <thead>
                    <tr>
                        <th>Çalışan Adı Soyadı</th>
                        <th> İlgili Müdür / Yönetici Adı Soyadı </th>
                    </tr>
                </thead>
                
                    <thead>
                    <tr>
                        <th>İmza</th>
                        <th>İmza  </th>
                    </tr>
                    </thead>

                    <thead>
                    <tr>
                    <th>../../20</th>
                        <th>../../20 </th>
                    </tr>
                    </thead>

                
                
            </Table>

            
        </div>
        </Row>

        </Container>   
            </>
        )
    }
    

}
export default IzinTalepFormu;