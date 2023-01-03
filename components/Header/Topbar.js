import React, {  useState } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import MyPageButton from "./MyPageButton";


export const TopbarContext = React.createContext();

export default function Topbar(props) {
  const [openSetup, setOpenSetup] = useState(false);

  return (
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/"><Image
                        src="/assets/smrt16-with-text-logo.png"
                        alt="SMRT16"
                        layout="fixed"
                        width={140}
                        height={50}
                    /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto cmenu">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/#getstarted">Get Started</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
                

                
              </Nav>
              <Nav>
              <NavDropdown title="MetaMask" id="basic-nav-dropdown" >
                    <NavDropdown.Item href="#addPolygon">
                    Add Polygon network 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#addSMRT16">
                    Add SMRT16 token 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#addUSDT">
                    Add USDT token 
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#mypage">
                  <MyPageButton />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );

}
