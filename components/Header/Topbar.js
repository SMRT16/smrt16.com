import React, {  useContext, useState } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import MyPageButton from "./MyPageButton";
import {addPolygon, addSMRT16, addUSDT} from "../Utils/blockchain"
import { SMRT16Context } from "../SMRT16Context";

export const TopbarContext = React.createContext();

export default function Topbar(props) {
  const {r}= useContext(SMRT16Context);

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
            <Navbar.Collapse id="basic-navbar-nav" style={{background: "white"}} >
              <Nav className="me-auto cmenu">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/#getstarted">Get Started</Nav.Link>
                <Nav.Link href="/faq">FAQ</Nav.Link>
                

                
              </Nav>
              <Nav>
              <NavDropdown title="MetaMask" id="basic-nav-dropdown" >
                    <NavDropdown.Item href="#addPolygon" onClick={addPolygon} disabled={!r.ethereum}>
                    Add Polygon network 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#addSMRT16" onClick={addSMRT16} disabled={!r.ethereum}>
                    Add SMRT16 token 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#addUSDT" onClick={addUSDT} disabled={!r.ethereum}>
                    Add USDT token 
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/faq#whyMetaMask">
                    Why it requires MetaMask? 
                    </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Text>&nbsp;</Navbar.Text>
                <MyPageButton />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );

}
