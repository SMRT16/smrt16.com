import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import { SMRT16Context } from "./SMRT16Context";
import { ethers } from "ethers";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import { TheData, fetcher } from "../data/data";



/**
 * Tasks:
 * 1. Validate the urls(ids) given: 
 *  1.1 show 404 if it's not valid wallet address
 *  1.2 and if there is no such a record in the DB (we might have custom links)
 *  1.3 id='0' - a reserved special id for redirection to the last buyer (usually to find a valid referrer)
 *      1.3.1 if user has a cached referrer value - go there
 *      1.3.2 if user already has a referrer, then lets redirect to its page
 *      1.3.3 default case tocheck DB by APIgetLast0
 *  1.4 id='1' - show my page, do the redirect 
 *      1.4.1 if even MetaMask is not set show page with id=1 as MyPage
 * 2. To cache the referrer link and name in case there is nothing saved yet
 */
export default function RedirectWrapper(props) {
    // localstorage "ref" - the link to buy from - is a wallet id
    const [buyFromLink, setBuyfromLink] = useLocalStorage("ref",'#');
    // localstorage "refname" - helper field to show the name of the referrer
    const [buyFromName, setBuyfromName] = useLocalStorage("refname",TheData.somebody);
    const context = useContext(SMRT16Context);
    const router = useRouter();
    const id = props.id;

    const [is404,setIs404] = useState(false);

    console.log("RedirectWrapper");

    const apiUrl = TheData.APIuser+props.id;
    const { udata, uerror } = useSWR(
        apiUrl,
        fetcher
      );



    useEffect(()=>{
        console.log("RedirectWrapper useEffect");
        switch(id) {

            //p1.3
            case '0': {
                console.log('redirect to a referrer');
                if(context.r.referrer) {
                    //p1.3.2
                    console.log('here is a stable referrer');
                    router.push('/'+context.r.referrer);
                } else if(buyFromLink!='#') {
                    //p1.3.1
                    console.log('here is a cached referrer');
                    router.push('/'+buyFromLink);
                } else  {
                    //p1.3.3
                    console.log('here is a need for DB referrer');
                    axios.get(TheData.APIgetLast0+props.myaddr).then(results=>{
                        const data = results.data;
                        router.push('/'+data.id);
                    });
                }
    
            } break;
    
            //p1.4
            case '1': {
                console.log("redirect to my page");
                if(context.r.addr) {
                    if(context.r.addr!='1') {
                        console.log("if there is MetaMask setup, redirect to MyPage",context.r.addr)
                        router.push('/'+context.r.addr);
                    } else {
                        // Reamain on '1' path
                    }
                } else {
                    //p1.4.1
                    context.SMRT16dispatch({id, addr:id});
                }
            } break;
    
            default: {
                
                
                console.log('1. Lets validate coming id');
                const isAddr = ethers.utils.isAddress(props.id);
                if(isAddr) {
                    
                    //p2.
                    console.log('To cache the referrer link and name in case there is nothing saved yet',buyFromLink,id);
                    if(context.r && context.r.addr && buyFromLink=='#' && id!=context.r.addr) {
                        setBuyfromLink(id);
                        if(udata) {
                            if(udata.name) {
                                setBuyfromName(udata.name);
                            }
                        }

                    }
                } else {
                    // TODO:  1.2 and if there is no such a record in the DB (we might have custom links)
                    // else p1.1 show 404
                    if(props.id) {
                        console.log('TODO: 404',context.r.addr, props.id);
                        setIs404(true);
                    }
                    
                }
                
    
            }
        }
        if(id && context.r.id!=id) {
            console.log("let context to know about the navigation");
            context.SMRT16dispatch({id});
        }
    },[context,udata]);

    return (
        <>
        {props.id? <>
            {!is404 ? props.children : <PageNotFound />}
        </>:<>
            <Skeleton xs={4} />
        </> }
        
        </>
    );
}
