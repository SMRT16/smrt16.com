import React, { Suspense, useContext, useEffect, useState } from "react";
import { HouseHeart } from "react-bootstrap-icons";
import { SMRT16Context } from "../SMRT16Context";

// Component which appears in the menu and shows a link "My Page" || "Install MetaMask"
export default function MyPageButton(props) {
    const { children, ...otherProps } = props;

    const [myButton, setMyButton] = useState('');
    const context = useContext(SMRT16Context);

    useEffect(() => {
        if(context && context.r) {
            if(context.r.ethereum) {
                if(context.r.addr) {
                    if(context.r.isMyPage) {
                        setMyButton(<HouseHeart size={30} color="silver"/>);
                        
                    } else {
                        setMyButton(<a 
                            title={context.r.addr}
                            href={'/'+context.r.addr}
                            className="btn btn-primary">My Page</a>);
                    }
                } else {
                    if(context.r.errors.length){
                        if(context.r.errors[context.r.errors.length-1].code=="-32002") {
                            setMyButton(<>Please, unlock MetaMask</>);
                            context.SMRT16dispatch({error:"error",reason:"MetaMask is locked."});
                        } else {
                            setMyButton(<>{context.r.errors[context.r.errors.length-1].reason}</>);
                        }
                        
                    } else {
                        setMyButton(<>{context.r.myPageBtnMsg}</>);
                    }
                        
                }
               
            } else {
                setMyButton(<a className="btn btn-secondary"
                    href="https://metamask.io/"
                    target="_blank"
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title={"metamask.io"}>Get MetaMask</a>);
            }
        }
        
    },[context]);

    return (
        <span {...otherProps} className="myPageButton">
            <Suspense fallback={`Detecting MetaMask...`} >
                {myButton}
            </Suspense>
        </span>
        
    );
}