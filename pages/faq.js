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
import { useRouter } from "next/router.js";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useSWR from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FAQPage() {
    const context = useContext(SMRT16Context);
    //const [data, setData] = useState(null);
    const router = useRouter();
    //const [anc,setAnc] = useState('');

    const { data, errorFaqs } = useSWR(
        (TheData.APIfaq),
        fetcher
      );

    useEffect(()=>{
        context.SMRT16dispatch({id:"faq"});
        setHash(router.asPath.split('#')[1]);
        
    },[]);

  const [anc, setHash] = useState('')

  const updateHash = (str) => {
    if (!str) return
    setHash(str.split('#')[1])
  }

  useEffect(() => {
    const onWindowHashChange = () => updateHash(window.location.hash)
    const onNextJSHashChange = (url) => updateHash(url)

    router.events.on('hashChangeStart', onNextJSHashChange)
    window.addEventListener('hashchange', onWindowHashChange)
    window.addEventListener('load', onWindowHashChange)
    return () => {
      router.events.off('hashChangeStart', onNextJSHashChange)
      window.removeEventListener('load', onWindowHashChange)
      window.removeEventListener('hashchange', onWindowHashChange)
    }
  }, [router.asPath, router.events])


  
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
                        <div key={index} className="no-overflow" id={item.id} title={"#"+item.id} >
                            <Card style={anc==item.id?{background:"#2C70F433"}:{background:"white"}}>
                                <Card.Body>
                                    <Card.Title>{item.question}</Card.Title>
                                    <ReactMarkdown children={item.answer} remarkPlugins={[remarkGfm]} />
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
