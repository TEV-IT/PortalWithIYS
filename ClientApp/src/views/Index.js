import React, { useState } from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import Row1 from "components/Body/Row1";
import Row2 from "components/Body/Row2";
import DashboardRow from "components/Body/DashboardRow.js";
import { useEffect } from "react";
import { Spinner,Container,Row,Col } from "reactstrap";
import axios from "axios";
import CryptoJS from "crypto-js";



class Index extends React.Component {
  
  constructor(){
    super();

    this.state = {
      loading : true,
      error: false,
      desc:"",
      cityName : "",
      user:"",
      pass:"",
      data:{}
    }
  }
  getHomePageData=async(user,pass) =>{
    this.setState({user:user,pass:pass})
    let response = await axios.post("api/getInfo",{"user":user,"pass":pass}).catch((err)=>{
     
      this.setState({loading: false})
      window.location.replace('/login');
    })
    if(response.status == 200)
      {
        console.log(JSON.parse(JSON.stringify(response.data)))
        this.setState({
          loading : false,
          data:JSON.parse(JSON.stringify(response.data))
        });
      }
  }
  handleStateValues = (user) => {
    this.getHomePageData(user)
  }

  
  decryptUserData = async () =>{
   
    let aes_dec = await CryptoJS.AES.decrypt(this.props.location.search.toString().slice(3,this.props.location.search.toString().length), "yunusemre").toString(
      CryptoJS.enc.Utf8
    );
    return aes_dec;
  }
  
  
  componentDidMount() {
    this.setState({loading:true})
    
    
    /
    this.decryptUserData().then((data)=>{
        this.getHomePageData(data.split(":")[0],data.split(":")[2])
      
    });
    
    //this.getHomePageData(aes_dec.split(":")[0],aes_dec.split(":")[1])
    
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    
  }
  render() {
    const { userData, loading, error,desc } = this.state;
    
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
              <DemoNavbar q = {this.props.location.search.toString().slice(3,this.props.location.search.toString().length)}/>
              <main ref="main">
                  <Row1 birthdays = {this.state.data.dataList5} startDates={this.state.data.dataList10} offDays= {this.state.data.dataList9} announcements = {this.state.data.dataList4} cityName =  {this.state.data.dataList3[0].branch} workerLeave = {this.state.data.dataList14}/>
                  <DashboardRow data = {this.state.data}/>
                  <Row2 user = {this.state.user} pass = {this.state.pass} />
              </main>
              <CardsFooter />
        </>
      );
    }
    
  }
}

export default Index;
