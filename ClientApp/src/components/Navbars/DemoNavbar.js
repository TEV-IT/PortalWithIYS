import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  Dropdown,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavLink,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { Navigate } from "react-big-calendar";

class DemoNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user:"",
      pass:"",
      data:{},
      category:[],
      subCategoryList:[],
      categoryUrl: [],
      id: 0
    }
  
  }
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    console.log("evet");
    this.refreshList();
    console.log("bitti");
}


refreshList = () => {
    
    fetch("/api/GetCategoryList", {
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
        
        this.setState({ category: data }); 
       
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });
    console.log("after fetch")
}

  
  state = {
    dropdownOpen: false,
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  toggle() {
    window.location.replace("/login")
  }
  render() {
    const data = this.state.data;
    return (
      <>
         <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
                <NavbarBrand className="mr-lg-5 my-mb" to={`/?q=${this.props.q}`} tag={Link}>
                    <h1 className = "heading text-neutral mb-md-1">TÜRK EĞİTİM VAKFI</h1>
                </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                        <Link to={`/?q=${this.props.q}`}>
                            <h1 className = "heading text-primary mb-md-1" >TÜRK EĞİTİM VAKFI</h1>
                        </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>

                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                      {this.state.category.map(item => (
                        <UncontrolledDropdown nav key={item.id}>
                          <DropdownToggle nav>
                            <i className="ni ni-collection d-lg-none mr-1" />
                            <span className="nav-link-inner--text">{item.category}</span>
                          </DropdownToggle>
                          
                          <DropdownMenu>
                            
                            {item.subCategoryList && item.subCategoryList.map(subItem => (                              
                               <DropdownItem key={subItem.id} onClick={() => {window.location.href = `${subItem.categoryUrl}?q=${this.props.q}`; }}>
                                
                               {subItem.category}
                             </DropdownItem>                             
                            ))}
                          </DropdownMenu>
                          
                        </UncontrolledDropdown>
                      ))}
                  </Nav>

              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>

      </>
    );
  }
}

export default DemoNavbar;