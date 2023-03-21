import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function HeroSection(props) {

    return (
        <div className="HeroSection">
            {/* <section className="hero">
                <Container>
                    <Row className="align-items-center">
                        <Col className="hero-text" sm={12} lg={6} md={12}>
                            <h1>Join the Future of Referral Marketing with SMRT16</h1>
                            <p>The Decentralized Affiliate Multilevel Marketing Program on the Polygon Blockchain!</p>
                            <Link href="/1" className="btn btn-primary btn-lg">Get started</Link>
                        </Col>
                        <Col className="hero-image" sm={12} lg={6} md={12}>
                            <Image src="smrt16-hero-image.png" alt="SMRT16 Hero Image" />
                        </Col>
                    </Row>
                </Container>
            </section> */}
            <section className="wrapper image-wrapper bg-auto no-overlay text-center py-14 py-md-16 bg-map">
      <div className="container py-0 py-md-17">
        <div className="row">
          <div className="col-lg-6 col-xl-5 mx-auto">
            <h2 className="display-4 mb-3 text-center">Join Our Community</h2>
            <p className="lead mb-5 px-md-16 px-lg-3">We are trusted by over 5000+ clients. Join them by using our services and grow your business.</p>
            <Link href="/1" className="btn btn-primary btn-lg">Get started</Link>
          </div>
        </div>
      </div>
    </section>
        </div>

    );
}