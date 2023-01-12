import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { SMRT16Context } from "../../SMRT16Context";
import { TheData } from "../../Utils/data";
import Approve from "./Approve";
import Buy from "./Buy";


/**
 * 
 * @param { myrefferer,  bdata} props 
 * myrefferer - address of a wallet which will be specified as referrer
 * bdata - blockchain data 
 */
export default function BuyWidget(props) {
    const context = useContext(SMRT16Context);
    const myreferrer = context.r.referrer;
    const bdata = context.r;

    const [allowanceAmount, setAllowanceAmount] = useState(0);

    // TODO: seems can be optimized/moved to Approve
    const [amount, setAmount] = useState(TheData.defaultAmountToBuy);

    // approve, buy, results
    const [step, setStep] = useState('approve');

    // format: {to, from, contractAddress, transactionIndex, gasUsed, logsBloom, blockHash, 
    // transactionHash, logs, blockNumber, confirmations, cumulativeGasUsed, effectiveGasPrice, status, type, byzantium}
    const [tx, setTx] = useState('');

    // {hash, type, accessList, blockHash, blockNumber, transactionIndex, confirmations, from, gasPrice, maxPriorityFeePerGas, 
    // maxFeePerGas, gasLimit, to, value, nonce, data, r, s, v, creates, chainId, wait}
    const [receipt, setReceipt] = useState('');

    const [errorMessage, setErrorMessage] = useState('');





    const getAllowance = async () => {
        bdata.allowance = await context.r.contractUSDT.allowance(context.r.addr, context.r.smrt16ContractAddr);
        console.log("getAllowance", bdata.allowance, bdata.allowance.toString());
        return bdata.allowance.toString();
    }

    const asyncLoader = async () => {
        const allowance = await getAllowance();
        console.log("Got allowance", allowance);
        setAllowanceAmount(allowance);
    }

    const onApproveResult = (arg1, arg2) => {
        console.log("onApproveResult - set next step", arg1, arg2);
        setAmount(arg2);
        setStep('buy');
        return;
    }

    const onBuyResult = (arg1, arg2) => {
        console.log("onBuyResult", arg1, arg2);
        if ("approved" == arg1 && "back" == arg2) {
            setStep('approve');
        } else {
            setStep('results');
            setTx(arg2);
            //bought 0xac3bfab82772e2f0e7770d88d706a81fc97cb25bcf20cc4ff3a413332f271552
        }
    }

    useEffect(() => {
        asyncLoader();
    }, [allowanceAmount]);

    //First, you must give permission to the smart contract to perform an operation with your USDTs. According to the algorithm, the purchase amount is divided into 1/2, 1/4,1/8 and 1/16 and goes to referral payments.
    return (
        <Card title="Buy Widget">
            <Card.Body>
                <Card.Title>Buy SMRT16 Tokens</Card.Title>
                <div>
                    {step && TheData['BuyWidgetT' + step]}
                    <hr />
                </div>
                {!step ? <Skeleton count={4} /> : <>

                    {{
                        approve: <Approve onResult={onApproveResult} bdata={bdata} />,
                        buy: <Buy onResult={onBuyResult} bdata={bdata} />,
                        results: <>
                            {tx ?
                                <div>
                                    Transaction Hash: <u><a title="Opens in a new window" target="_blank"
                                        href={TheData.txScan + tx}>{tx}</a></u>
                                </div>
                                :
                                <div>
                                    <a href='/1'>Go to "My page" to see how to sell</a>
                                </div>
                            }
                        </>
                    }[step]
                    }

                </>}

            </Card.Body>

        </Card>
    );
}