import { Skeleton } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Accordion, Card, Stack } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import { SMRT16Context } from "../SMRT16Context";
import { fetcher, TheData } from "../Utils/data";
import useSWR from "swr";
import moment from "moment";

/**
 * 
 * @param {id} props 
 * id - address of my wallet 
 * 
 */
export default function BalanceWidget(props) {

    //APIgetWalletTokenTransfers


    const context = useContext(SMRT16Context);
    const refLink = TheData.addrScan + (props.id || context.r.addr);
    const apiUrl = TheData.APIgetWalletTokenTransfers + (props.id || context.r.addr);
    const { data, error, isLoading } = useSWR(
        apiUrl,
        fetcher
    );

    const [userMATIC, setUserMatic] = useLocalStorage("userMATIC", 0);
    const [userUSDT, setUserUsdt] = useLocalStorage("userUSDT", 0);
    const [userSMRT16, setUserSmrt16] = useLocalStorage("userSMRT16", 0);
    const [trCount, setTrCount] = useLocalStorage("trCount", '...');


    const handleRefresh = async () => {
        setUserMatic(0);
        setUserUsdt(0);
        setUserSmrt16(0);
        context.SMRT16dispatch({ balance: "update" });
    }

    useEffect(() => {
        console.log("balance update effect", context.r.matic);
        if (context.r.matic) setUserMatic(context.r.matic);
        if (context.r.usdt) setUserUsdt(context.r.usdt);
        if (context.r.smrt16) setUserSmrt16(context.r.smrt16);
        if (data && data.result) {
            setTrCount(data.data.total);
        }
        console.log("apiUrl", apiUrl, data?.data);
    }, [context, data]);


    const formatData = (item) => {
        let inOut = (item.from_address == context.r.addr) ? "Out" : "In";
        let name = "Tokens";
        let value = +item.value;
        if(TheData.smrt16ContractAddr.toLocaleLowerCase() == item.address.toLocaleLowerCase()) {
            name = "S16";
            value /= 1000000;
        }
        if(TheData.usdtContractAddr.toLocaleLowerCase() == item.address.toLocaleLowerCase()) {
            name = "USDT";
            value /= 1000000;
        } 
        
        return <>
                {inOut}&nbsp;
                {value} <b>{name}</b>
                &nbsp;<a href={TheData.txScan + item.transaction_hash} title={"Hash: "+item.transaction_hash} target="_blank">
                
                {moment(item.block_timestamp).fromNow()}
                </a> 
            
        </>;
    }

    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Your balances</Accordion.Header>
                    <Accordion.Body>
                                <div>
                                    <Stack gap={2}>
                                        {context.r.ethereum ? <div style={{ textAlign: "right" }}>
                                            <a href={refLink}
                                                style={{ fontSize: '66%' }}
                                                className="btn btn-sm btn-outline-secondary smaller"
                                                target="_blank">View on PolygonScan</a>&nbsp;<button
                                                    style={{ fontSize: '66%' }}
                                                    onClick={handleRefresh}
                                                    className="btn btn-sm btn-outline-secondary smaller"
                                                    target="_blank">Refresh</button>
                                        </div> : <><br /></>}
                                        <Stack direction="horizontal" gap={3}>

                                            <div>
                                                <p>MATIC:</p>
                                                <p>USDT:</p>
                                                <p>SMRT16:</p>
                                            </div>
                                            <div>
                                                <p>{userMATIC || <Skeleton style={{ minWidth: "100px" }} />}</p>
                                                <p>{userUSDT || <Skeleton style={{ minWidth: "100px" }} />}</p>
                                                <p>{userSMRT16 || <Skeleton style={{ minWidth: "100px" }} />}</p>
                                            </div>
                                            {/* <div className="smaller">
                        <p><button className="btn btn-sm btn-outline-secondary" style={{fontSize:'66%'}}>Add network</button></p>
                        <p><button className="btn btn-sm btn-outline-secondary" style={{fontSize:'66%'}}>Add asset</button></p>
                        <p><button className="btn btn-sm btn-outline-secondary" style={{fontSize:'66%'}}>Add asset</button></p>
                    </div> */}
                                        </Stack>
                                        {context.r.ethereum ? <>
                                            {userUSDT == '0.0' ? <p><b>Seems like you need to top up your USDT balance.</b></p> : <></>}
                                            {userMATIC == '0.0' ? <p><b>Seems like you have to refill your MATIC balance first.</b></p> : <></>}
                                        </> : <>
                                            <p>Wallet is not connected</p>
                                        </>}

                                    </Stack>
                                </div>

                            
                                {context.r.pcontract && <span className="smaller grey">
                                    {/* <div title="pcontract">" {context.r.pcontract}"</div> */}
                                    {context.r.pcontract != '0x0000000000000000000000000000000000000000' ?

                                        <span title={context.r.pcontract}>
                                            Your referrer is fixed to:&nbsp;
                                            {context.r.referrer ?
                                                <a href={'/' + context.r.referrer}>{context.r.referrer}</a>
                                                :
                                                <Skeleton />
                                            }
                                        </span>

                                        :
                                        <>You don't have a fixed referrer yet.</>
                                    }
                                </span>}

                          
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Your Transactions &nbsp;<span className="smaller grey">{trCount}</span> </Accordion.Header>
                    <Accordion.Body>
                        {isLoading ? <Skeleton /> : <>
                            {error ? <>
                                Error fetching transactions: {error + ""}
                            </> : <>
                                <ol>
                                    {data && data.data.result.map((item, idx) =>
                                        <li key={idx}>
                                            {formatData(item)}
                                        </li>)}
                                </ol>
                            </>}

                        </>}

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>


    );
}