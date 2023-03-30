import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";
import { TheLang } from "../../data/lang";

export default function HeroSection(props) {

    return (
        <div className="HeroSection">
            <section className="container-fluid wrapper image-wrapper bg-auto no-overlay text-center py-14 py-md-16 bg-map">
                <div className="row h-100 align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="col-lg-8 col-xl-8 mx-auto">
                        <h2 className="display-6 mb-4 text-center">{TheLang.callToAction}</h2>
                        <p className="lead mb-5 px-md-16 px-lg-4">{TheLang.slug1} {TheLang.slug2}</p>
                        <p className="lead mb-5 px-md-16 px-lg-4"></p>
                        <Link href="/1" className="btn btn-primary btn-lg">{TheLang.callToActionBtn}</Link>
                    </div>
                </div>
            </section>
        </div>

    );
}