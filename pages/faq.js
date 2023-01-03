import { React, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import Footer from "../components/Footer.js";
import Header from "../components/Header/Header.js";
import Topbar from "../components/Header/Topbar.js";

import { Card, Col, Row } from "react-bootstrap";
import { TheData } from "../components/Utils/data.js";

import { SMRT16Context } from "../components/SMRT16Context.js";
import { Skeleton } from "@mui/material";
import { Masonry } from "@mui/lab";

export default function FAQPage() {
    const context = useContext(SMRT16Context);
    const [data, setData] = useState(null)
    useEffect(()=>{
        context.SMRT16dispatch({id:"faq"});
        fetch('/api/faq')
        .then((res) => res.json())
        .then((data) => {
            setData(data);
        })
    },[]);
  
  return (

    <>
      <Header />
      <Container>
        <Topbar id="faq" />
            <h3 className="text-center mb-4 pb-2 text-primary fw-bold">{TheData.faqTitle}</h3>
            <p className="text-center mb-5">
                <strong>{TheData.faqSubtitle}</strong>
            </p>
        
            <Row style={{ justifyContent: "space-between" }} >
                <Col>
                
                {data?<>
                <Masonry columns={{ xs: 1, sm: 2, lg:3, xl:4 }} spacing={2}>
                    {data.map((item, index) => (
                        <div key={index} className="no-overflow" id={item.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.question}</Card.Title>
                                    <Card.Text>{item.answer}</Card.Text>
                                </Card.Body>
                            </Card>

                        </div>
                    ))}
                </Masonry>
                </>:<>
                    <Skeleton />
                </>}
                </Col>
            </Row>
        
      </Container>
      <Footer />
    </>
  );
}
