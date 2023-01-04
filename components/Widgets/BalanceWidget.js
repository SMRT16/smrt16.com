import { Skeleton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Card, Stack } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import { SMRT16Context } from "../SMRT16Context";
import { TheData } from "../Utils/data";




/**
 * 
 * @param {id} props 
 * id - address of my wallet 
 * 
 */
export default function BalanceWidget(props) {
    
    const context = useContext(SMRT16Context);
    const refLink = TheData.addrScan+(props.id || context.r.addr);

    const [userMATIC, setUserMatic] = useLocalStorage("userMATIC",0);
    const [userUSDT, setUserUsdt] = useLocalStorage("userUSDT",0);
    const [userSMRT16, setUserSmrt16] = useLocalStorage("userSMRT16",0);


    const handleRefresh = async ()=>{
        setUserMatic(0);
        setUserUsdt(0);
        setUserSmrt16(0);
        context.SMRT16dispatch({balance:"update"});
    }

    useEffect(()=>{
        console.log("balance update effect",context.r.matic);
        if(context.r.matic)setUserMatic(context.r.matic);
        if(context.r.usdt)setUserUsdt(context.r.usdt);
        if(context.r.smrt16)setUserSmrt16(context.r.smrt16);
    },[context]);

    return (
        <Card title="Balance Widget">
        <Card.Body>
        <Card.Title>Your available balances</Card.Title>
        <div>
            <Stack gap={2}>
                <div style={{textAlign:"right"}}>
                    <a href={refLink} 
                        style={{fontSize:'66%'}}
                        className="btn btn-sm btn-outline-secondary smaller"
                        target="_blank">View on PolygonScan</a>&nbsp;<button
                        style={{fontSize:'66%'}}
                        onClick={handleRefresh}
                        className="btn btn-sm btn-outline-secondary smaller"
                        target="_blank">Refresh</button>
                </div>
                <Stack direction="horizontal" gap={3}>
                
                    <div>
                        <p>MATIC:</p>
                        <p>USDT:</p>
                        <p>SMRT16:</p>
                    </div>
                    <div>
                        <p>{userMATIC || <Skeleton style={{minWidth:"100px"}}/>}</p>
                        <p>{userUSDT || <Skeleton style={{minWidth:"100px"}}/>}</p>
                        <p>{userSMRT16 || <Skeleton style={{minWidth:"100px"}}/>}</p>
                    </div>
                    {/* <div className="smaller">
                        <p><button className="btn btn-sm btn-outline-secondary" style={{fontSize:'66%'}}>Add network</button></p>
                        <p><button className="btn btn-sm btn-outline-secondary" style={{fontSize:'66%'}}>Add asset</button></p>
                        <p><button className="btn btn-sm btn-outline-secondary" style={{fontSize:'66%'}}>Add asset</button></p>
                    </div> */}
                </Stack>
                {userUSDT=='0.0'?<p><b>Seems like you need to top up your USDT balance.</b></p>:<></>}
                {userMATIC=='0.0'?<p><b>Seems like you have to refill your MATIC balance first.</b></p>:<></>}
            </Stack>
            

            
        </div>
        {context.r.pcontract && <p className="smaller grey">
                    {/* <div title="pcontract">" {context.r.pcontract}"</div> */}
            {context.r.pcontract!='0x0000000000000000000000000000000000000000' ?
            
            <span title={context.r.pcontract}>
                Your referrer is:&nbsp; 
                    {context.r.referrer? 
                        <a  href={'/'+context.r.referrer}>{context.r.referrer}</a>
                        :
                        <Skeleton />
                    }
                </span>
            
            :
            <>You don't have a referrer yet.</>
            }
        </p>}
        
    </Card.Body>
        
    </Card>
        
    );
}