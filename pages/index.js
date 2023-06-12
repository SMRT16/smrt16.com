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
import Link from "next/link";
import HeroSection from "../components/IndexPage/HeroSection";


export default function IndexPage() {

  return (
    <>
      <Header />
      <Topbar />
      <HeroSection />
      <Container id="index">

        <Row>
          <Col id="getstarted">
            <h1>What do you need to <b>get started</b>?</h1>
          </Col>
        </Row>

        <Row id="getstarted3">
          <Col sm={12} lg={4} md={12} style={{ display: "flex" }}>
            <Card>
              <Card.Body>
                <div className="index3">1</div>
                <Card.Title>Purchase MATICs and USDT</Card.Title>
                <Link href="/faq#usdt">What is USDT?</Link>
                <Card.Text>The SMRT16 smart contract runs at Polygon, where you need MATIC tokens to pay the transaction fee.
                  And also you get SMRT16 tokens in exchange for USDT, and later you get your referral rewards in this crypto representation of US dollars.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} lg={4} md={12} style={{ display: "flex" }}>
            <Card>
              <Card.Body>
                <div className="index3">2</div>
                <Card.Title>Exchange USDT to SMRT16 tokens</Card.Title>
                <Link href="/faq#smrt16amount">How much SMRT16 tokens do&nbsp;I&nbsp;need?</Link>
                <Card.Text>
                  It can be any amount, no limitation, exchange rate 1:1. The amount of SMRT16 tokens you may need depends on your goals.
                  The website provides a <a href="#assuption">calculator tool</a> to help you estimate potential income and assist in making an informed decision.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} lg={4} md={12} style={{ display: "flex" }}>
            <Card>
              <Card.Body>
                <div className="index3">3</div>
                <Card.Title>Refer friends. Get high revenue in USDT.</Card.Title>
                <Link href="/faq#smrt16work">How does the referral program work?</Link>
                <Card.Text>SMRT16 DApp allows users to acquire SMRT16 tokens through referrals.
                  If a user does not have a referral, the DApp will automatically assign one.
                  It is not possible to purchase SMRT16 tokens without a referral.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>


  

        <Row >
          <Col id="whatsmrt16">
            <h1>What is SMRT16?</h1>
          </Col>
        </Row>

        <Row>
          <Col sm={12} lg={{ span: 6, order: "last" }} md={12}>
            <VideoIllustration />
          </Col>
          <Col sm={12} lg={6} md={12}>
            <WhatsSMRT16 />
          </Col>

        </Row>
        <Row>
          <Col>
            <h3>
              The goal of the SMRT16 project is to demonstrate that fully decentralized organizations
              can be created and operate on the blockchain without the need for human management.
            </h3>
          </Col>
        </Row>

        <Row>
          <Col lg={{ span: 6, order: "last" }}>
            <SMRT16Work />
          </Col>


          <Col sm={{ span: 12 }} md={{ span: 12 }} lg={6}>
            <PieIllustration />

          </Col>

        </Row>
        <Row>
          <Col>
            <Card className="blueBox">
              <Card.Body>
                <div className="indexText">
                  <p><b>Referral links in SMRT16</b> In SMRT16,
                    referral links are used to connect users who have purchased SMRT16 tokens through the DApp
                    or directly using the smart contract functions.
                    It is mandatory to specify a referrer when buying tokens.
                    After the purchase, the user&apos;s wallet address becomes their referral code and they can
                    create a referral link by adding &quot;hrihinvestments.co.za/&quot; followed by their wallet address.
                    <br />
                    <b>Example: <u>hrihinvestments.co.za/</u><u style={{ textDecorationStyle: "dashed" }}>0x0D32886930D0552fa1e2B42BFE5dA66Fd55A147D</u>)</b>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>



        <Row>
          <Col id="assuption">
            <h4 >Calculator of a possible income</h4>
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
