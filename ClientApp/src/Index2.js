
import React, { useState } from "react";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import Row1 from "components/Body/Row1";
import Row2 from "components/Body/Row2";
import DashboardRow from "components/Body/DashboardRow.js";
import { useEffect } from "react";
import { Spinner,Container,Row,Col } from "reactstrap";
import axios from "axios";



class Index extends React.Component {
  
  constructor(){
    super();
    this.state = {
      loading : true,
      error: false,
      cityName : "İstanbul",
      userData: {
        user:"",
        pass:""
      },
      data:{
       
      }
      
    }
  }
  getHomePageData=async() =>{
    let response = await axios.post("api/getInfo",{},{timeout: 5000}).then((res)=>{
      this.setState({
        loading : false,
        data:JSON.parse(JSON.stringify(res.data))
      });

    }).catch(()=>{window.location.replace('/login');})
  }
  handleStateValues = (user) => {
    
    setTimeout(()=>{
      this.setState({
        
        userData:{user:user.user,pass:user.pass}
      },() => {
        
        this.getHomePageData()
      })
    }, 100)
  }
  
  componentDidMount() {
    const json = '{"user": "Yunus", "pass": "100"}';
    const user = JSON.parse(json);
    
    this.handleStateValues(user);
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    const { userData, loading, error } = this.state;
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
        
              <DemoNavbar />
              <main ref="main">
                  <Row1 cityName =  {this.state.cityName}/>
                  <DashboardRow data = {this.state.data}/>
                  <Row2 />
              </main>
              <CardsFooter />
        </>
      );
    }
    
  }
}

export default Index;
