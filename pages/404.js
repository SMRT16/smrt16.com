import Image from "next/image";
import { React } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import Topbar from "../components/Header/Topbar";


export default function PageNotFound(props) {


    return (<>
        <Header/>
        <Topbar/>
        <Container>
            <Row style={{ justifyContent: "space-between" }} >
                <Col md={6} className="no-overflow">
                    <div className="h-100 middle-center">
                        <div className="text-center">
                            <h1>Oops!</h1>
                            <h2>404 Not Found</h2>
                            <p className="error-details">
                                Requested page not found!
                            </p>
                        </div>
                        
                    </div>
                </Col>
                <Col  md={6} className="no-overflow">
                    <Image
                        src="/assets/404error.svg"
                        alt="404"
                        layout="fixed"
                        width={300}
                        height={300}
                    />
                </Col>
            
            </Row>
        </Container>
        <Footer/>
    </>);
}