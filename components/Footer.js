import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Telegram, EnvelopeHeart, Github, Code, Bug, HouseHeart, LayerBackward, LayoutWtf, ShieldCheck } from 'react-bootstrap-icons';
import { TheData } from "../data/data.js";
import { SMRT16Context } from "./SMRT16Context";
import { Container } from "react-bootstrap";
import { FormatQuote, LegendToggle, ManageHistory, Money, QuestionAnswer } from "@mui/icons-material";
import HelperMenu from "./HelperMenu.js";
import Image from "next/image.js";
import Link from "next/link.js";
import { TheLang } from "../data/lang.js";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";



const Footer = () => {

  const context = useContext(SMRT16Context)


  return (
    <footer>
      <Container>
        <Row style={{margin:"32px 0px"}}>
          <Col>
            <Link href="/" id="#footer"><Image src="/white-logo137x49.png" width={137} height={49} alt="SMRT16" /></Link>
          </Col>
          
          <Col>
          <HelperMenu />
          </Col>
        </Row>
        <Row>

        <Col sm={12} md={5} lg={5}>
          
          
          <p>
            <strong>{TheLang.projInfo.diclimerBottomline}</strong>
          </p>
          <p>{TheLang.projInfo.diclimer}</p>
        </Col>
        <Col lg={1} md={1}>&nbsp;</Col>

        <Col sm={12} md={3} lg={3}>
          
          <div>
            <div>
              <ReactMarkdown>{TheLang.license}</ReactMarkdown>
              <Link href="https://github.com/SMRT16/smrt16.com" target="_blank"><Github/>&nbsp;SMRT16 DApp sources</Link>
            </div>
            
            <div>
              <Link href="https://polygonscan.com/address/0x1b605deaedc71f1a764e572b1ca68b5060978753#code" target="_blank"><Code/>&nbsp;SMRT16 Smart Contract sources</Link>
            </div>
            <hr/>
            <div><Link  href="https://github.com/SMRT16/smrt16.com/blob/master/TERMS.md" 
              target="_blank"><ShieldCheck />&nbsp;Terms of Service</Link></div>
            <div><Link  href="/faq#bug"><Bug />&nbsp;How to report a bug</Link></div>
            <div><ManageHistory style={{width:16,height:16}}/>&nbsp;DApp version: {TheData.version}</div>
            
          </div>
          

        </Col>

        <Col sm={12} md={3} lg={3}>
          <div>
            <div>
                <Link href="https://t.me/+toXd6a6bF9QzM2Q0" target="_blank"><Telegram/>&nbsp;SMRT16.com Community</Link>
            </div>

            <div>
                <Link href="mailto:dev@smrt16.com" target="_blank"><EnvelopeHeart/>&nbsp;dev@smrt16.com</Link>
            </div>
            <hr/>
            <div><Link href="/faq"><QuestionAnswer style={{width:16,height:16}}/>&nbsp;FAQ</Link></div>
            <div><Link href="/0"><Money style={{width:16,height:16}}/>&nbsp;Random referrer</Link></div>
            <div><Link href="/1"><HouseHeart style={{width:16,height:16}}/>&nbsp;Client area</Link></div>
            
          </div>
        </Col>

        </Row>
      </Container>
      
    </footer>
  );
};

export default Footer;
