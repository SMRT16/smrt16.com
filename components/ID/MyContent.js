import { React, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import BalanceWidget from "../Widgets/BalanceWidget";
import BuyFromButton from "../Widgets/BuyFromButton";
import ProfileWidget from "../Widgets/ProfileWidget";
import SellWidget from "../Widgets/SellWidget";
import StatWidget from "../Widgets/StatWidget";


export default function MyContent(props) {
    //const context = useContext(SMRT16Context);
    // TODO: improve how '1' page looks like (it shows 404 for a second)
    return (
        <>
            <Row>
                <Col sm={12} lg={{span:6, order:"last"}} md={12}>
                    {/* <ProfileWidget /> */}
                    <BuyFromButton />
                </Col>
                <Col sm={12} lg={6} md={12}>
                    <BalanceWidget />
                    <SellWidget />
                    <StatWidget />
                </Col>
                
            </Row>
        </>
    );
}