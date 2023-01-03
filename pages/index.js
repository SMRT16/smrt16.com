import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BarsIllustration from "../components/IndexPage/BarsIllustration";
import GetStarted from "../components/IndexPage/GetStarted";
import PieIllustration from "../components/IndexPage/PieIllustration";
import SMRT16Work from "../components/IndexPage/SMRT16Work";
import WhatsSMRT16 from "../components/IndexPage/WhatsSMRT16";
import Footer from "../components/Footer";
import VideoIllustration from "../components/IndexPage/VideoIllustration";
import Header from "../components/Header/Header";
import Topbar from "../components/Header/Topbar";


export default function IndexPage() {
  
  return (
    <>
      <Header />
      <Topbar />
      <Container id="index">
        <Row>
          <Col sm={12} lg={6} md={12}>
            <WhatsSMRT16 />
          </Col>

          <Col>
            <VideoIllustration />
          </Col>
        </Row>

        <Row>
          <Col lg={{span:6, order:"last"}}>
            <SMRT16Work />
          </Col>


          <Col sm={{span:12}} md={{span:12}} lg={6}>
            <PieIllustration />
            
          </Col>

        </Row>


        <Row>
          <Col sm={12} lg={6} md={12}>
            <GetStarted />
          </Col>
          <Col sm={12} lg={6} md={12}>
            
            <BarsIllustration />
          </Col>
        </Row> 
      </Container>
      <Footer />
    </>
  );
}
