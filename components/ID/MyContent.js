import { React, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import BalanceWidget from "../Widgets/BalanceWidget";
import BuyFromButton from "../Widgets/BuyFromButton";


export default function MyContent(props) {
    //const context = useContext(SMRT16Context);
    // TODO: improve how '1' page looks like (it shows 404 for a second)
    return (
        <>
            <Row>
                <Col sm={12} lg={6} md={12}>
                    <BalanceWidget />
                    <BuyFromButton />
                </Col>
                <Col sm={12} lg={6} md={12}>
                    {"<ProfileWidget id={context.r.addr}/>"}
                    <br/>
                    {"<SellWidget id={context.r.addr}/>"}
                    <br/>
                    { "<StatWidget />" }
                    <br/>
                </Col>
            </Row>
        </>
    );
}