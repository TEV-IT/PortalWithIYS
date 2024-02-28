

import React from "react";

// reactstrap components
import { Spinner } from "reactstrap";

class CSpinner extends React.Component {
  render() {
    return (
      <>
        <section
          className="section section-components pb-0"
          id="section-components"
        >
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                  <Spinner/>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default CSpinner;
