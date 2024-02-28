import React, { useState } from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation } from "react-router-dom";


export default function VizyonMisyonPage() {
     
  const q = useLocation();
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
                    
                    <h3><center><strong className="font-weight-bold">Bu sayfa yapım aşamasındadır.</strong></center></h3>
                  </div>
                </Col>
              </Card>
            </Container>
    
        </main>
        <SimpleFooter />
      </>
    );
}

