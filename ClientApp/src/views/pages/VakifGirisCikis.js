import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Container, Row, Col, Table, Label, Input, FormGroup, InputGroup, InputGroupText } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js"; 

export default function VakifGirisCikis() {
  
  const q = useLocation();

  const decryptUserData = async () => {
    let aes_dec = await CryptoJS.AES.decrypt(
      q.search.toString().slice(3, q.search.toString().length),
      "yunusemre"
    ).toString(CryptoJS.enc.Utf8);
    return aes_dec;
  };

  const [transaction, setTransaction] = useState([]);
  const [departman, setDepartman] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [maxPageNumbersDisplay] = useState(5); 
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPersons();
    fetchDepartman();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await fetch(`../api/PersonelGirisCikisView`);
      const data = await response.json();
      setTransaction(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const fetchDepartman = async () => {
    try {
      const response = await fetch(`../api/PersonelDepartman`);
      const data = await response.json();
      setDepartman(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filterBySearchTerm = (item) => {
    return item.adi.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const currentItems = transaction
    .filter(filterBySearchTerm) 
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPageNumbers = Math.ceil(
    transaction.filter(filterBySearchTerm).length / itemsPerPage 
  );

  let startPageNumber = currentPage - Math.floor(maxPageNumbersDisplay / 2);
  startPageNumber = Math.max(startPageNumber, 1);
  startPageNumber = Math.min(startPageNumber, totalPageNumbers - maxPageNumbersDisplay + 1);

  let endPageNumber = startPageNumber + maxPageNumbersDisplay - 1;
  endPageNumber = Math.min(endPageNumber, totalPageNumbers);

  const pageNumbers = [];
  for (let i = startPageNumber; i <= endPageNumber; i++) {
    pageNumbers.push(i);
  }

  const sortByAd = () => {
    const sortedItems = [...transaction].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.adi.localeCompare(b.adi); 
      } else {
        return b.adi.localeCompare(a.adi); 
      }
    });
  
    setTransaction(sortedItems);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value); 
    setCurrentPage(1); 
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

    <div>
      <Container>
      <Card className="card-profile shadow mt--300 pt-5 pb-5">

      <Col md="12">
        <Row>
      <Col md="6">

      <InputGroup>
    <InputGroupText>
      Kişi Ara
    </InputGroupText>
    <Input type="text"       
          value={searchTerm}
          onChange={handleSearchInputChange}/>
  </InputGroup>

        {/* <FormGroup>
            <Input
          type="text"
          placeholder="Arama yap..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        </FormGroup> */}
      </Col>
        <Col md="6">

        <InputGroup>
    <InputGroupText>
      Departman Bazlı Ara
    </InputGroupText>
    
    <Input
          id="exampleSelect"
          name="select"
          type="select"
        >
          {departman.map((item, index) =>(
        <option key={index}>
         {item.departman}
      </option>
          ))}
 
      </Input>
  </InputGroup>
  </Col>
  </Row>
              <div>
                <Row className="table-header"  style={{ backgroundColor: "CornSilk" }}>
                  <Col className="btn">
                    <span>Personel No</span>
                  </Col>
                  <Col className="btn" onClick={sortByAd}>
                    <span>Ad</span>
                  </Col>
                  <Col className="btn" >
                    <span>Departman</span>
                  </Col>
                  <Col className="btn" >
                    <span>Tarih</span>
                  </Col>
                  <Col className="btn" >
                    <span>Giriş</span>
                  </Col>
                  <Col className="btn" >
                    <span>Çıkış</span>
                  </Col>
                  <Col className="btn">
                    <span>Çalışma Süresi</span>
                  </Col>
                </Row>
              </div>
            </Col>
      <Col md="12">
        {currentItems.map((item, index) => (
          <div key={index}>
            <Row>
              <Col style={{ padding: 0.5 }}>{item.personelNo}</Col>
              <Col md="2">{item.adi} </Col>
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={prevPage} disabled={currentPage === 1}>Önceki</Button>
          {startPageNumber > 1 && <Button disabled>...</Button>}
          {pageNumbers.map(number => (
            <div key={number} style={{ margin: '0 5px' }}>
              <Button
                onClick={() => handlePageClick(number)}
                color={currentPage === number ? 'primary' : 'secondary'}
              >
                {number}
              </Button>
            </div>
          ))}
          {endPageNumber < totalPageNumbers && <Button disabled>...</Button>}
          <Button onClick={nextPage}>İleri</Button>
        </div>

        </Card>
      </Container>
      

    </div>
    </main>
    <SimpleFooter />
    </>
  );
};
