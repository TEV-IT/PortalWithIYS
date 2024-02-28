import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Container, Row, Col, Table } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js"; 

export default function VakifGirisCikisCopy() {
  const q = useLocation();

  const decryptUserData = async () => {
    let aes_dec = await CryptoJS.AES.decrypt(
      q.search.toString().slice(3, q.search.toString().length),
      "yunusemre"
    ).toString(CryptoJS.enc.Utf8);
    return aes_dec;
  };

  const [transaction, setTransaction] = useState([]); //array olacak.
  const [sortBy, setSortBy] = useState(null); 
  const [sortedData, setSortedData] = useState(transaction); 
  const [searchTerm, setSearchTerm] = useState('');


  const ListSubMenu = useCallback(() => {
    fetch("../api/PersonelGirisCikisView", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTransaction(data);
        setSortedData(data); 
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  }, []);


  useEffect(() => {
    ListSubMenu();
  }, [ListSubMenu]);


  const handleSort = useCallback(
    (key) => {
      if (sortBy === key) {
        setSortedData([...sortedData].reverse());
      } else {
        const newData = [...transaction].sort((a, b) => {
          if (key === 'adi') {
            return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
          }
          else if(key=== 'departman'){
            return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
          }
          else {
            return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
          }
        });
        setSortedData(newData);
        setSortBy(key);
      }
    },
    [sortBy, sortedData, transaction]
  );

  const filteredData = sortedData.filter(item =>
    item.adi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  
  return (
    <>
      <DemoNavbar
        q={q.search.toString().slice(3, q.search.toString().length)}
      />
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
          <div style={{ marginBottom: '20px' }}>
          <form action="/" method="get" style={{ marginTop: '-20px' }}>
             <input
              type="text"
              id="header-search"
              placeholder="Kişi Arayın.."
              name="s"
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
            /> 
<div>

</div>
          </form>
          </div>
            <Col md="12">
              <div>
                <Row className="table-header"  style={{ backgroundColor: "CornSilk" }}>
                  <Col className="btn" onClick={() => handleSort("personelNo")}>
                    <span>Personel No</span>
                  </Col>
                  <Col className="btn" onClick={() => handleSort("adi")}>
                    <span>Ad</span>
                  </Col>
                  <Col className="btn" onClick={() => handleSort("departman")}>
                    <span>Departman</span>
                  </Col>
                  <Col className="btn" onClick={() => handleSort("tarih")}>
                    <span>Tarih</span>
                  </Col>
                  <Col className="btn" onClick={() => handleSort("giris")}>
                    <span>Giriş</span>
                  </Col>
                  <Col className="btn" onClick={() => handleSort("cikis")}>
                    <span>Çıkış</span>
                  </Col>
                  <Col className="btn" onClick={() => handleSort("calismaSuresi")}>
                    <span>Çalışma Süresi</span>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="12">
            {filteredData.map((item, index) => (
  <div key={index}>
    <Row>
      <Col style={{ padding: 0.5 }}>{item.personelNo}</Col>
      <Col md="2">{item.adi}</Col>
      <Col>{item.departman}</Col>
      <Col>{item.tarih.split('-').reverse().join('.')}</Col>
      <Col>{item.giris}</Col>
      <Col>{item.cikis}</Col>
      <Col>{item.calismaSuresi}</Col>
      
    </Row>
    <hr />
  </div>
))}
            </Col>
          </Card>
        </Container>
      </main>
      <SimpleFooter />
    </>
    
  );
  
}


