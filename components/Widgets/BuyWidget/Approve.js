import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { Stack } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { Skeleton } from "@mui/material";
import { TheData } from "../../../data/data";


/**
 * 
 * @param {onResult,  bdata} props 
 * onResult - callback to return an error or success operation status
 * bdata - blockchain data 
 */
export default function Approve(props) {

    const [allowanceAmount, setAllowanceAmount] = useState(0);
    const [amount, setAmount] = useLocalStorage("amountBuy",16);

    // it's internal substeps: approve, approving
    const [substep, setSubstep] = useState('approve');

    // format: {to, from, contractAddress, transactionIndex, gasUsed, logsBloom, blockHash, 
    // transactionHash, logs, blockNumber, confirmations, cumulativeGasUsed, effectiveGasPrice, status, type, byzantium}
    const [tx, setTx] = useState('');
    const [hash, setHash] = useState('');

    // {hash, type, accessList, blockHash, blockNumber, transactionIndex, confirmations, from, gasPrice, maxPriorityFeePerGas, 
    // maxFeePerGas, gasLimit, to, value, nonce, data, r, s, v, creates, chainId, wait}
    const [receipt, setReceipt] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    // returning results
    const handleApproveContinue = ()=> {
        console.log('onResult',props.onResult);
        if(props.onResult) {
            props.onResult("approved", amount);
        } 
    }

    
    const handleApproveBack = ()=> {
        console.log('handleApproveBack');
        setSubstep('approve');
    }

    const handleTryAgain = ()=> {
        setErrorMessage("");
        setTx('');
        setReceipt('');
        setSubstep('approve');
    }

    const handleActionApprove = async e => {
        setTx('');
        setReceipt('');
        setSubstep('approving');
        const r = props.bdata;
        console.log('handleActionApprove',r);
        let finalAmount = amount*10**r.usdtDecimals;
        
        let approvedAmount = 0;
        try {
            console.log("r.addr,r.smrt16ContractAddr",r.addr,r.smrt16ContractAddr);
            const allowance = await r.contractUSDT.allowance(r.addr, r.smrt16ContractAddr);
            console.log("r.bdata.allowance", allowance);
            approvedAmount = +allowance.toString();
            console.log("approvedAmount", approvedAmount);
            
        } catch(ex) {
            console.log("Checking approvement",ex);
        }

        console.log("finalAmount",finalAmount);
        if(finalAmount<=approvedAmount) {
            setReceipt({status:"ok", message: "Already have enough allowance to continue"});
            setTx({status:"ok",hash:""});
        } else {
            try {

                const estimatedGasLimitA = await r.contractUSDT.estimateGas.approve(r.smrt16ContractAddr, finalAmount); 
                const approveTxUnsignedA = await r.contractUSDT.populateTransaction.approve(r.smrt16ContractAddr, finalAmount);
                approveTxUnsignedA.chainId = 137; // chainId 137 for Matic
                approveTxUnsignedA.gasLimit = estimatedGasLimitA;
                approveTxUnsignedA.gasPrice = await r.provider.getGasPrice();
                approveTxUnsignedA.nonce = await r.provider.getTransactionCount(r.addr);
                
                setTx(approveTxUnsignedA);
                console.log("before sendTransaction");
                r.signer.sendTransaction(approveTxUnsignedA).then(async (submittedTxA)=>{
                    setHash(submittedTxA.hash);
                    console.log("then sendTransaction, before submittedTxA.wait - need to show - sending transaction ",submittedTxA, submittedTxA.hash);
                    submittedTxA.wait().then(async (approveReceipt)=>{
                        console.log('approveReceipt', approveReceipt);
                        if (approveReceipt.status === 0) {
                            setErrorMessage("Approve transaction failed");
                        }
                        
                        setReceipt(approveReceipt);
    
                    }).catch((err)=>{
                        setErrorMessage(err.reason);
                        setSubstep("error");
                    });
                }).catch((err)=>{
                    setErrorMessage(err.reason);
                });
                
    
            } catch(ex) {
                console.log("handleActionApprove exception", ex);
                if(!errorMessage) {
                    setErrorMessage(ex.message);
                }
            }
        } 

    }


    const asyncLoader = async ()=> {
       
    }

    useEffect(()=>{
        asyncLoader();
    },[]);
//First, you must give permission to the smart contract to perform an operation with your USDTs. According to the algorithm, the purchase amount is divided into 1/2, 1/4,1/8 and 1/16 and goes to referral payments.
    return (
        <>
            <div>
            {{  approve: 
                    <Stack gap={2}>
                        <div className="actionExplanation">
                            Approve amount of USDT to spend:
                        </div>
                        <CurrencyInput
                            style={{margin:"15px"}}
                            id="amount"
                            disableGroupSeparators={true}
                            decimalSeparator="."
                            name="amount"
                            placeholder="Please enter a number"
                            defaultValue={amount}
                            decimalsLimit={2}
                            onValueChange={(value) => setAmount(value)}
                        />
                        <button
                            className="btn btn-primary btncenter"
                            onClick={handleActionApprove}
                            // disabled={!props.bdata.can}
                            >
                            Approve
                        </button>
                    </Stack>,
                approving: 
                    <Stack gap={2}>
                        <div className="actionExplanation">
                            Approving:
                            <p>
                            {amount} <span className="pageinfo">S16</span>
                            </p>
                        </div>

                        <div><b>Status:&nbsp;</b><span className="grey smaller">
                            {errorMessage?"Error":
                                <>
                                    {!receipt?
                                        <>
                                            {tx? <>
                                                {!hash?<>Communicating to the wallet</>:<>Waiting for transaction confirmation
                                                <br/>
                                                Approval Transaction Hash: <u><a title="Opens in a new window" target="_blank" 
                                                                                    href={TheData.txScan+hash}>{hash}</a></u>
                                                </>}
                                                <br/><Skeleton/></> : <>Prepare transaction
                                                <br/><Skeleton/></>  }
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
                                                        className="btn btn-outline-secondary btncenter" onClick={handleApproveBack}  >
                                                        Back
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-success btncenter" onClick={handleApproveContinue}  >
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
                                        </Stack></>
                                    }
                            </>}
                            </span>
                        </div>
                    </Stack>
            }[substep]}
            </div>
            
            <div >
                {errorMessage?<>
                    <p className="error reverted">
                    {errorMessage}
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