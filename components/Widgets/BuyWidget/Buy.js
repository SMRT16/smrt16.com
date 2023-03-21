import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { Stack } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import { Skeleton } from "@mui/material";
import { saveDBRecord } from "../../Utils/user";
import { TheData } from "../../../data/data";


/**
 * 
 * @param {onResult,  bdata, referrer} props 
 * onResult - callback to return an error or success operation status
 * bdata - blockchain data 
 * referrer - id of the referrer
 */
export default function Buy(props) {

    // localstorage "amountBuy" - last buy/approve operation amount
    const [amount, setAmount] = useLocalStorage("amountBuy",TheData.defaultAmountToBuy);

    // localstorage "ref" - the link to buy from - is a wallet id
    const [buyFromLink, setBuyfromLink] = useLocalStorage("ref",'#');
    // localstorage "refname" - helper field to show the name of the referrer
    const [buyFromName, setBuyfromName] = useLocalStorage("refname",TheData.somebody);

    // it's internal steps: buy, buying, error, ready
    const [substep, setSubstep] = useState('buy');

    // format: {to, from, contractAddress, transactionIndex, gasUsed, logsBloom, blockHash, 
    // transactionHash, logs, blockNumber, confirmations, cumulativeGasUsed, effectiveGasPrice, status, type, byzantium}
    const [tx, setTx] = useState('');
    const [hash, setHash] = useState('');

    // {hash, type, accessList, blockHash, blockNumber, transactionIndex, confirmations, from, gasPrice, maxPriorityFeePerGas, 
    // maxFeePerGas, gasLimit, to, value, nonce, data, r, s, v, creates, chainId, wait}
    const [receipt, setReceipt] = useState('');

    const [errorMessage, setErrorMessage] = useState('');


    const handleTryAgain = ()=> {
        setErrorMessage("");
        setTx('');
        setReceipt('');
        setSubstep('buy');
    }

    const handleActionBuy = async e => {
        setTx('');
        setReceipt('');
        
        const r = props.bdata;
        r.referrer = buyFromLink+'';
        console.log("Buying from r.referrer",r.referrer);
        setSubstep('buying');

        let finalAmount = amount*10**r.usdtDecimals;
        console.log("USDT Buy Amount", amount, r.addr);

        let estimatedGasLimitB = BigNumber.from('210000');
        try {
            estimatedGasLimitB = await r.contractSMRT.estimateGas.buyFor(r.addr, finalAmount, r.referrer);
        } catch(ee){
            console.log("Manual gas estimation mode", ee);
        }
        
        try {
            console.log("estimatedGasLimitB",estimatedGasLimitB);
            const buyTxUnsignedB = await r.contractSMRT.populateTransaction.buyFor(r.addr, finalAmount, r.referrer);
            buyTxUnsignedB.chainId = 137; // chainId 137 for Matic
            buyTxUnsignedB.gasLimit = estimatedGasLimitB;
            buyTxUnsignedB.gasPrice = await r.provider.getGasPrice();
            buyTxUnsignedB.nonce = await r.provider.getTransactionCount(r.addr);
            buyTxUnsignedB.maxPriorityFeePerGas = null;
            buyTxUnsignedB.maxFeePerGas = null;
            console.log("Showong communicating to the wallet",buyTxUnsignedB);
            setTx(buyTxUnsignedB);
            r.signer.sendTransaction(buyTxUnsignedB).then((submittedTxB)=>{
                console.log("Now we can show Tx hash",submittedTxB);
                setHash(submittedTxB.hash)
                submittedTxB.wait().then(async (buyReceipt)=>{
                    console.log('submittedTxB.wait buyReceipt', buyReceipt);
                    if (buyReceipt.status === 0) {
                        setErrorMessage("Send transaction failed");
                    }
                    setReceipt(buyReceipt);
                    if(await saveDBRecord(r.addr, {lastVisit:serverTimestamp(), referrer:(''+r.referrer).toLowerCase()}, (m)=>{
                        console.log("saveDBRecord",m);
                    })) {
                        console.log("User "+r.addr+" is updated");
                    }
                    // TODO: use U7SWTMJ26QKE1ZWB7ZFVP7Z46WNKP2WS2K
                    //https://ethereum.stackexchange.com/a/119897/34820
                    /*
                    contract.events.allEvents()
                    .on('data', (event) => {
                        console.log(event);
                    })
                    .on('error', console.error);
                    */
                    if(await saveDBTxs(r.addr, {
                        myaddr:r.addr, 
                        referrer:r.referrer,
                         amount:finalAmount,

                        }, (m)=>{
                        console.log("Yet dont make setErrorMessage", m);
                    })) {
                        console.log("User "+r.addr+" is updated");
                    }

                }).catch((err)=>{
                    console.log(" submittedTxB.wait()",err);
                    setErrorMessage(err.reason);
                    // 
                });
            }).catch((err)=>{
                console.log("signer.sendTransaction catch",err);
                setErrorMessage(err.reason);
                // 
            });
        
            

        } catch(ex) {
            console.log("handleActionBuy",ex);
            if(!errorMessage) {
                setErrorMessage(ex.message);
            }
            
            //setStep('error');
        }

    }


    const handleBack = ()=> {
        console.log('handleBack');
        props.onResult("approved", "back");
    }


    const handleBuyContinue = ()=> {
        console.log('onResult',props.onResult);
        if(props.onResult) {
            props.onResult("bought", hash);
        } 
    }


    const asyncLoader = async ()=> {
       
    }

    useEffect(()=>{
        console.log("Buy useEffect referrer", buyFromLink);
        asyncLoader();
    },[]);

    return (
        <>
            {{
                buy:
                    <Stack gap={2}>
                        <div className="actionExplanation">
                            <b>{TheData.whyToSend}</b>
                            <p>
                                Amount: {amount} <span>[S16]</span>
                                <br/>
                                <span title={buyFromName}>Referr: {props.bdata.referrer || <u title={buyFromName}>{buyFromLink}</u>}</span>    
                            </p>
                        </div>
                        <Stack direction="horizontal" >
                            <button
                                className="btn btn-outline-secondary btncenter" 
                                onClick={handleBack} >
                                Back
                            </button>
                            <button 
                                className="btn btn-primary btncenter"
                                onClick={handleActionBuy}
                                >
                                Send transaction
                            </button>
                        </Stack>
                    </Stack>,
                buying:
                    <Stack gap={2}>
                        <div className="actionExplanation">
                            <b>Sending SMRT16 bonuses to the referrals network</b>
                            <p>
                                Amount: {amount} <span>[S16]</span>
                                <br/>
                                Referr: <span title={buyFromName}>{buyFromLink}</span>   
                            </p>
                        </div>

                        <div><b>Status:&nbsp;</b><span className="grey smaller">
                            {errorMessage?"Error":
                                <>
                                    {!receipt?
                                        <>
                                            {tx? <>
                                                {hash?<>
                                                    Transaction sent to the blockchain
                                                    <br/>
                                                    Transaction Hash: <u><a title="Opens in a new window" target="_blank" 
                                                                            href={TheData.txScan+hash}>{hash}</a></u>
                                                    </>:
                                                    <>Communicating to the wallet
                                                        <br/><Skeleton/></>}
                                                </> 
                                                : <>Prepare transaction
                                                <br/><Skeleton/></> }
                                        </>
                                        :<>Ready
                                            <Stack gap={3}>
                                                
                                                {receipt.status? <>
                                                    {receipt.message?<>
                                                        <span className="successful">{receipt.message}</span> 
                                                        </>:<>
                                                        <span className="successful">Transaction is successful</span> 
                                                        
                                                    </>}
                                                    
                                                    <Stack direction="horizontal" >
                                                        <button 
                                                            className="btn btn-outline-secondary btncenter" onClick={handleBack}  >
                                                            Back
                                                        </button>
                                                        <button 
                                                            className="btn btn-outline-success btncenter" onClick={handleBuyContinue}  >
                                                            Continue
                                                        </button>

                                                    </Stack>
                                                </>
                                                : 
                                                <>
                                                    <span className="reverted">Transaction was reverted</span>
                                                    <br/>
                                                    <button 
                                                        className="btn btn-outline-danger btncenter" onClick={handleTryAgain} >
                                                        Try again
                                                    </button>
                                                </>
                                                }
                                            </Stack>
                                        </>
                                    }
                                </>
                            }
                        </span></div>

                        

                    </Stack>
            }[substep]}
            
            <div >
                {errorMessage?<>
                    <p className="error reverted">
                    {errorMessage}{props.bdata && props.bdata.matic && +props.bdata.matic<0.2? ". Possibly low MATICs balance":<a title="Opens in a new window" target="_blank" 
                                                                            href={TheData.txScan+hash}>{hash}</a>}
                    </p>
                    <button 
                        className="btn btn-outline-danger btncenter" onClick={handleTryAgain} >
                        Try again
                    </button>
                </>:<>
                </>}
            </div>
        </>
    );
}