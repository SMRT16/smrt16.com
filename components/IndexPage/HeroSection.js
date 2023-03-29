import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";
import { TheLang } from "../../data/lang";

export default function HeroSection(props) {

    return (
        <div className="HeroSection">
            <section className="wrapper image-wrapper bg-auto no-overlay text-center py-14 py-md-16 bg-map">
                <div className="container py-0 py-md-17">
                    <div className="row">
                        <div className="col-lg-6 col-xl-6 mx-auto">
                            <h2 className="display-4 mb-3 text-center">{TheLang.callToAction}</h2>
                            <p className="lead mb-5 px-md-16 px-lg-3">{TheLang.slug}</p>
                            <Link href="/1" className="btn btn-primary btn-lg">{TheLang.callToActionBtn}</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}