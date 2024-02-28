
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h3 className=" text-primary font-weight-light mb-2">
                  Destekleriniz için teşekkür ederiz.
                </h3>
                <h4 className=" mb-0 font-weight-light">
                  Bizi sosyal medyadan takip edin.
                </h4>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="6">
                <Button
                  className="btn-icon-only rounded-circle"
                  color="twitter"
                  href="https://twitter.com/TEVKurumsal"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-twitter" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/TurkEgitimVakfi"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-facebook-square" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="dribbble"
                  href="https://www.instagram.com/turkegitimvakfi/"
                  id="tooltip829810202"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-dribbble" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip829810202">
                  Follow us
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href=""
                    target="_blank"
                  >
                    Türk Eğitim Vakfı Bilgi İşlem Müdürlüğü
                  </a>
                  .
                </div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="https://www.tev.org.tr/anasayfa/tr"
                      target="_blank"
                    >
                      Türk Eğitim Vakfı
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.tev.org.tr/kurumsal/tr/1/Hakkimizda"
                      target="_blank"
                    >
                      Kurumsal
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.google.com/maps/place/T%C3%BCrk+E%C4%9Fitim+Vakf%C4%B1+Genel+M%C3%BCd%C3%BCrl%C3%BCk/@41.0673682,28.968926,14z/data=!4m10!1m2!2m1!1zdMO8cmsgZcSfaXRpbSB2YWtmxLEgYWRyZXM!3m6!1s0x14cab656c013cba9:0x2ec61cf493016fb6!8m2!3d41.0673682!4d29.0039449!15sChp0w7xyayBlxJ9pdGltIHZha2bEsSBhZHJlcyIFSAGIAQFaFiIUdMO8cmsgZcSfaXRpbSB2YWtmxLGSAR1ub25fZ292ZXJubWVudGFsX29yZ2FuaXphdGlvbpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSQ2VEbHVURUpCRUFF4AEA!16s%2Fg%2F1tl5_pp6"
                      target="_blank"
                    >
                      Konum
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
