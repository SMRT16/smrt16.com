import React, { useContext, useState } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { SMRT16Context } from "../SMRT16Context";
import { TheLang } from "../../data/lang.js";
import ConnectWalletButton from "../ConnectWalletButton";
import NoSSR from "react-no-ssr";

export const TopbarContext = React.createContext();

export default function Topbar(props) {
  const { r } = useContext(SMRT16Context);

  return (
    <header>
      <Navbar expand="lg">
        <Container style={{ padding: "0px 12px" }}>
          <Nav >
            <Navbar.Brand href="/"><Image
              src="/assets/smrt16-with-text-logo.png"
              alt="SMRT16"
              layout="fixed"
              width={140}
              height={50}
            /></Navbar.Brand>
          </Nav>

          <Navbar.Collapse id="top-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link href="/">{TheLang.Topbar.home}</Nav.Link>
              <Nav.Link href="/#getstarted">{TheLang.Topbar.getstarted}</Nav.Link>
              <Nav.Link href="/faq">{TheLang.Topbar.faq}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="top-navbar-nav" />
          <Nav className="justify-content-end" >
            <Nav.Item>
          
              <NoSSR><ConnectWalletButton /></NoSSR>
            </Nav.Item>
          </Nav>

          
        </Container>
      </Navbar>
    </header>
  );

}
