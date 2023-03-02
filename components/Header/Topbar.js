import React, {  useContext, useState } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { SMRT16Context } from "../SMRT16Context";
import { TheLang } from "../../data/lang.js";

export const TopbarContext = React.createContext();

export default function Topbar(props) {
  const {r}= useContext(SMRT16Context);

  return (
      <header>
        <Navbar expand="lg">
          <Container style={{padding:"0px 12px"}}>
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
                <Nav.Link href="/">{TheLang.Topbar.home}</Nav.Link>
                <Nav.Link href="/#getstarted">{TheLang.Topbar.getstarted}</Nav.Link>
                <Nav.Link href="/faq">{TheLang.Topbar.faq}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );

}
