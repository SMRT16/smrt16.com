import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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
            <h1>What is SMRT16</h1>
          </Col>
          </Row>
          <Row>
          <Col sm={12} lg={{span:6, order:"last"}} md={12}>
            <VideoIllustration />
          </Col>
          <Col sm={12} lg={6} md={12}>
            <WhatsSMRT16 />
          </Col>

        </Row>
        <Row>
          <Col>
            <h3>
                The mission of the SMRT16 project is to show that entire decentralized organizations can exist on the blockchain that do not require human management.
            </h3>
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
          <Col>
            <Card className="blueBox">
              <Card.Body>
                <div className="indexText">
                  <p><b>Referral links in SMRT16 works as follows:</b> everyone who has ever bought a SMRT16 token through a DApp or directly using the functions of a smart contract becomes a project partner. 
                  It is impossible to buy tokens without specifying a referrer. </p>
                  <p>
                  After the purchase, your wallet address becomes your referral code at the same time. 
                  And if you add smrt16.com/ and your wallet address, you get your referral link.
                  <br/>
                  <b>Example: <u>smrt16.com/</u><u style={{textDecorationStyle: "dashed"}}>0x5c580f5b34f7f7df64f5336f038c8705014a51ee</u>)</b>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col id="getstarted">
          <h1>What do you need to <b>get started</b>?</h1>
          </Col>
        </Row>
        <Row id="getstarted3">
          <Col sm={12} lg={4} md={12} style={{display:"flex"}}>
            <Card>
              <Card.Body>
                <div className="index3">1</div>
                <Card.Title>Purchase MATICs and USDT</Card.Title>
                <a href="/faq#usdt">What is USDT?</a>
                <Card.Text>The SMRT16 smart contract runs at Polygon, where you need MATIC tokens to pay the transaction fee.
                  And also you get SMRT16 tokens in exchange for USDT, and later you get your referral rewards in this crypto representation of US dollars.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={12} lg={4} md={12} style={{display:"flex"}}>
          <Card>
              <Card.Body>
                <div className="index3">2</div>
                <Card.Title>Exchange USDT to SMRT16 tokens</Card.Title>
                <a href="/faq#smrt16amount">How much SMRT16 tokens do&nbsp;I&nbsp;need?</a>
                <Card.Text>
                  It can be any amount, no limitation, exchange rate 1:1. You need to make decision based on your targets. 
                  Please, use <b>Assumption calculator of possible income</b> down below on this page.  
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} lg={4} md={12} style={{display:"flex"}}>
            <Card>
              <Card.Body>
                <div className="index3">3</div>
                <Card.Title>Refer friends. Get high revenue in USDT.</Card.Title>
                <a href="/faq#smrt16work">How does the referral program work?</a>
                <Card.Text>Here in SMRT16 DApp you always get SMRT16 tokens with a referral.  
                  If you don't have any, the app can find you one automatically, 
                  but purchasing without any is not possible.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col id="assuption">
            <h4 >Assumption calculator of a possible income</h4>
          </Col>
        </Row>

        <Row>
          <BarsIllustration />
        </Row> 

      </Container>
      <Footer />
    </>
  );
}
