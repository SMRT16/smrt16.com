import { React, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import BalanceWidget from "../Widgets/BalanceWidget";
import BuyWidget from "../Widgets/BuyWidget/BuyWidget"


export default function TheirsContent(props) {
    //const context = useContext(SMRT16Context);
    return (
        <>
            <Row>
                <Col sm={12} lg={6} md={12}>
                    <BalanceWidget />
                    <br/>
                </Col>
                <Col sm={12} lg={6} md={12}>
                    <BuyWidget  />
                    <br/>
                </Col>
            </Row>
        </>
    );
}