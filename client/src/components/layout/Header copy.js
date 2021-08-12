import React from "react";
import { connect } from "react-redux";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import {Link,RoutedLinkContainer } from "react-router"

export const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>


      {/* <LinkContainer to="/home" exact> */}
        <Navbar.Brand>
          <i class="fas fa-blog">ASIA</i>
        </Navbar.Brand>
      {/* </LinkContainer> */}

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">


        <RoutedLinkContainer link="/cart" displayText="Cart" >
          {/* <i className="fas fa-user"> Login</i> */}
          <i className="fas fa-shopping-cart"> Cart</i>

              </RoutedLinkContainer>


          {/* <LinkContainer to="/cart" >
            <Nav.Link>
              <i className="fas fa-shopping-cart"> Cart</i>
            </Nav.Link>
          </LinkContainer> */}

          <RoutedLinkContainer link="/login" displayText="Login" >
          <i className="fas fa-user"> Login</i>
              </RoutedLinkContainer>

          {/* <LinkContainer to="/login" >
            <Nav.Link>
              <i className="fas fa-user"> Login</i>
            </Nav.Link>
          </LinkContainer> */}
          
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
