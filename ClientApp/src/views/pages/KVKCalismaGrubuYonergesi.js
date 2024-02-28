import React, { useState,Component } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import FileViewer from 'react-file-viewer';
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
export default function KVKCalismaGrubuYonergesi() {
  const q = useLocation();
  const [filePath, setFile] = useState("");
  const [contentId, setContentId] = useState(41);
  const [type, setType] = useState("");
  
  const getPdf = async () => {
    try {
      const res = await axios.get('/api/GetFile', { params: { "contentId": contentId } });
      console.log(res);

      if (res.data) { // Assuming the response has a property 'data' that contains the actual data
        setFile(res.data.filePath);
        setType(res.data.fileType);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., set some error state)
    }
  };

  useEffect(() => {
    getPdf();
  }, [contentId]);


  
    return (
      <>
        <DemoNavbar q={q.search.toString().slice(3,q.search.toString().length)}/>
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
              <Card className="card-profile shadow mt--300" style={{ height: '1000px' }}>
              <div className="mt-1 py-1 border-top text-left pr-5">
              <Button color="danger"> 
              <a href={filePath} target="_blank" download/> İndir </Button>
              </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                      <div>
                       
                          <iframe title="PDF Viewer" width="100%" height="1000px" src={filePath} />
                      
                      </div>
                          {console.log(filePath)}
                      </Col>
                    </Row>
                  </div>
              </Card>
            </Container>
    
        </main>
        <SimpleFooter />
      </>
    );
}
