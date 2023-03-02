import { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { SMRT16Context } from "./SMRT16Context";
import {addPolygon, addSMRT16, addUSDT} from "./Utils/blockchain"

export default function HelperMenu() {
    const {r}= useContext(SMRT16Context);
    return (
        <Nav>
              <NavDropdown title="MetaMask" id="basic-nav-dropdown" >
                    <NavDropdown.Item href="#addPolygon" onClick={addPolygon} disabled={!r.ethereum}>
                    Add Polygon network 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#addSMRT16" onClick={addSMRT16} disabled={!r.ethereum}>
                    Add SMRT16 token 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#addUSDT" onClick={addUSDT} disabled={!r.ethereum}>
                    Add USDT token 
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/faq#whyMetaMask">
                    Why it requires MetaMask? 
                    </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Text>&nbsp;</Navbar.Text>
              </Nav>
    )
}