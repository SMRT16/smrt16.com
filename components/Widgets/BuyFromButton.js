import { useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import { Button, Card, Collapse } from "react-bootstrap";
import { TheData } from "../Utils/data";
import { SMRT16Context } from "../SMRT16Context";
import { Info, InfoCircle } from "react-bootstrap-icons";

/**
 * 
 * @param {buyFromLink, buyFromName, myaddr} props 
 * has the first priority and overrides the rest of the options.
 * You shoud use props on the referrals pages!
 * Without params, it forstly check the local storage war and 
 * next: searches for the last paid user from the DB
 */
export default function BuyFromButton(props) {
    const context = useContext(SMRT16Context);
    // reset collapse
    const [open, setOpen] = useState(false);

    // in case if did not find referrer yet
    const [btnDisabled, setBtnDisabled] = useState(true);

    // default url
    const [btnLink, setBtnLink] = useState('/0');

    // default title (tooltip)
    const [btnTitle, setBtnTitle] = useState(TheData.buyFrom+' '+TheData.somebody); 

    // localstorage "ref" - the link to buy from - is a wallet id
    const [buyFromLink, setBuyfromLink] = useLocalStorage("ref",'#');
    // localstorage "refname" - helper field to show the name of the referrer
    const [buyFromName, setBuyfromName] = useLocalStorage("refname", TheData.somebody);

    const handleReset = (e)=> {
        setBuyfromLink('#');
        setBuyfromName(TheData.somebody);
    } 
    
    
    const asyncLoader = async ()=> {
        if(props.buyFromLink) {
            console.log('BuyFromButton: We have props, so, lets apply them');
            setBtnLink(TheData.siteBase+props.buyFromLink);
            if(props.buyFromName) setBtnTitle(TheData.buyFrom+' '+props.buyFromName);
            setBtnDisabled(false);
        } else 
        if(buyFromLink!='#') {
            if(props.myaddr==buyFromLink) {
                setBuyfromLink('#');
                setBtnLink(TheData.siteBase+'0');
                setBtnTitle(TheData.buyFrom+' '+buyFromName);
            } else {
                console.log("BuyFromButton: No, we don't have props, but local storage has something");
                setBtnLink(TheData.siteBase+buyFromLink);
                if(buyFromName) setBtnTitle(TheData.buyFrom+' '+buyFromName);
                setBtnDisabled(false);
            }
        } else {
            console.log('BuyFromButton: Props and local storage is empty, lets ask API');
            axios.get(TheData.APIgetLast0+context.r.addr).then(results=>{
                const data = results.data;
                console.log('BuyFromButton: API data',data);
                setBtnLink(TheData.siteBase+data.id);
                if(data.name) setBtnTitle(TheData.buyFrom+' '+data.name);
                setBtnDisabled(false);
            });
        }
    }

    useEffect(()=>{
        asyncLoader();
    },[]);

    return (
        <Card title="Buy From Button">
        <Card.Body>
            <Card.Title>Keep your SMRT16 balance hight</Card.Title>
            <Card.Text>
                Every time you receive your referral reward, a small amount of smrt16 tokens is burned from your balance.
                The size of your referral reward is limited by the size of your smrt16 tokens balance.
            </Card.Text>
            
            <Button
                title={btnTitle}
                disabled={btnDisabled}
                href={btnLink}>
                Buy SMRT16
            </Button>
            
            <div className="smaller" style={{marginTop:"16px"}} >
                <button onClick={() => setOpen(!open)} title={TheData.rememberingRefLink}
                    className="btn btn-sm light"><InfoCircle/> Cached referral link</button> 
                <div id="resetLink" style={!open?{display:"none"}:{display:"block"}}>
                    {buyFromLink} &nbsp;<a href="#" onClick={handleReset}>reset</a> 
                </div>
            </div>
            
            
        </Card.Body>
        
        </Card>

    );
}