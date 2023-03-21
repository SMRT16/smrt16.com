import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Collapse, Stack } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { TheData } from "../../data/data";
import { TheLang } from "../../data/lang";
import { SMRT16Context } from "../SMRT16Context";


/**
 * 
 * @param {*} props 
 * @returns 
 */
export default function SellWidget(props) {
    const context = useContext(SMRT16Context);
    const refLink = TheData.siteBase+context.r.addr;
    let componentRef = useRef();
    const [openQR, setOpenQR] = useState(false);


    return (
        <Card title="Sell Widget">
            <Card.Body>
                <Card.Title>{TheLang.sellTitle}</Card.Title>
                {context.r.ethereum && context.r.pcontract!='0x0000000000000000000000000000000000000000'?
                <Stack gap={4}>
                    <div style={{textAlign:"right"}}>
                        <CopyToClipboard text={refLink} onCopy={() => setCopyText(TheLang.copiedToClipboad)} >
                            <button style={{fontSize:'66%'}} title={TheLang.copyToClipboard}
                                className="btn btn-sm btn-outline-secondary smaller">{TheLang.copyToClipboard}</button>
                        </CopyToClipboard>&nbsp;
                        <button style={{fontSize:'66%'}} 
                                className="btn btn-sm btn-outline-secondary smaller" 
                                onClick={() => setOpenQR(!openQR)}
                                aria-controls="collapse-qr"
                                aria-expanded={openQR}
                        >
                            {openQR?TheLang.hideQRcode:TheLang.showQRcode}
                        </button>&nbsp;
                        
                    </div>
                    <Stack gap={4} ref={el => (componentRef = el)}>
                        <div>
                        
                        <p><a className="smaller" 
                            target="_blank"
                            href={refLink} >{refLink}</a></p>
                            {TheLang.yourReferralLinkExpl}
                        </div>  
                        
                        <Collapse in={openQR}>
                            <Stack gap={3} id="collapse-qr" className="qrcode">
                                <div>Scan me!</div>
                                <QRCode
                                style={{display:"block",margin:"auto"}}
                                    size={256}
                                    value={refLink}
                                    viewBox={`0 0 256 256`}
                                />
                                <ReactToPrint trigger={() => {
                                        return (<button style={{fontSize:'66%'}} 
                                                className="btn btn-sm btn-outline-secondary smaller" 
                                                >{TheLang.printQRcode}</button>);
                                    }} content={() => componentRef} />
                            </Stack>
                        </Collapse>
                    </Stack>
                </Stack>
                :<>
                <p>{TheLang.youDontHaveLink}</p>
                <p>{TheLang.youNeedToBuy}</p>
                <p></p>
                </>}
            </Card.Body>
        <Card.Footer>{TheLang.sellFooter}</Card.Footer>
    </Card>
        
    );
}