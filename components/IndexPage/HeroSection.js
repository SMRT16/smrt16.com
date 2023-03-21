import { Col, Container, Image, Row } from "react-bootstrap";

export default function HeroSection(props) {

    return (
        <div className="HeroSection">
            <section class="hero">
                <Container>
                    <Row className="align-items-center">
                        <Col className="hero-text" sm={12} lg={6} md={12}>
                            <h1>Join the Future of Referral Marketing with SMRT16</h1>
                            <p>The Decentralized Affiliate Multilevel Marketing Program on the Polygon Blockchain!</p>
                            <a href="#features" class="btn btn-primary btn-lg">Get started</a>
                        </Col>
                        <Col className="hero-image" sm={12} lg={6} md={12}>
                            <Image src="smrt16-hero-image.png" alt="SMRT16 Hero Image" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>

    );
}