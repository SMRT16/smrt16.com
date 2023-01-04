import { React, useContext } from "react";
import { Col, Row } from "react-bootstrap";


export default function MyContent(props) {
    //const context = useContext(SMRT16Context);
    // TODO: improve how '1' page looks like (it shows 404 for a second)
    return (
        <>
            <Row>
                <Col sm={12} lg={6} md={12}>
                    {"<ProfileWidget id={context.r.addr}/>"}
                    <br/>
                    {"<BalanceWidget id={context.r.addr}/>" }
                    <br/>
                    { "<BuyFromButton myaddr={context.r.addr} />" }
                    <br/>
                </Col>
                <Col sm={12} lg={6} md={12}>
                    {"<SellWidget id={context.r.addr}/>"}
                    <br/>
                    { "<StatWidget />" }
                    <br/>
                </Col>
            </Row>
        </>
    );
}