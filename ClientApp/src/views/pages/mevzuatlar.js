import React, { useState, useEffect} from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation } from "react-router-dom";


export default function mevzuatlar() {
     
  const q = useLocation();
  const [description, setdDescription] = useState([]);
  const {filePath, setFilePath} = useState("");
  const [id, setId] = useState(0);

  const folder = '/folder.png'
  const refreshList = () => {
    fetch("/api/GetAllPdfByContentId", {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setdDescription(data);
        console.log(data); 
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
    <h2>
      <center> MEVZUATLAR</center>
    </h2>
    <Col md="12">
      <div className="pl-md-5">
      <table class="table table-borderless" style={{ backgroundColor: 'white' }}>
      <tbody>
  {description.map((item, index) => (
    index % 3 === 0 ? (
      <tr key={item.id}>
        {[0, 1, 2].map(i => (
          index + i < description.length ? (
            <td key={description[index + i].id} style={{ fontSize: '16px' }}>
              <Card className="card-lift--hover shadow border-0">
                <a href={description[index + i].filePath} style={{ display: 'block', textAlign: 'center' }}>
                  <img src={folder} alt="Folder" style={{ width: '50px', height: '50px', marginBottom: '5px' }} />
                </a>
                <center> {description[index + i].description} </center>
              </Card>
            </td>
          ) : <td key={i}></td>
        ))}
      </tr>
    ) : null
  ))}
</tbody>

</table>

      </div>
    </Col>
  </Card>
</Container>

  
      </main>
      <SimpleFooter />
    </>
  );
}

