import React, { useState } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col, Table} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function VizyonMisyonPage() {
     
  const q = useLocation();
  const [caption, setcaption] = useState("");
  const [content, setContent] = useState("");

  const refreshList = () => {
    fetch("/api/GetContent/19", {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return response.text(); // Fetch response as text
      })
      .then(data => {
        try {
          const jsonData = JSON.parse(data);
          setContent(jsonData[0].body);
          setcaption(jsonData[0].caption)
          console.log(jsonData);
        } catch (error) {
          console.error('Error parsing JSON response:', error.message);
          console.log('Raw response text:', data);
          throw new Error('Error parsing JSON response');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
      });
  }
  
  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
      <DemoNavbar q={q.search.toString().slice(3,q.search.toString().length)} />
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
                <div className="pl-md-5">
                  
                  <h3><strong className="font-weight-bold"> {caption} </strong></h3>

                  <div dangerouslySetInnerHTML={{ __html: content }} />

               
                </div>
              </Col>
            </Card>
          </Container>
  
      </main>
      <SimpleFooter />
    </>
  );
}

