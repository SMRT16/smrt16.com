import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { SMRT16Context } from "./SMRT16Context";

export default function ErrorsDisplay () {
 
    const {r,SMRT16dispatch} = useContext(SMRT16Context);

    const dismissError = (item) =>{
        console.log("dismissError",item);
        SMRT16dispatch({error:"dismiss",item});
    }

    useEffect(()=>{
        console.log('---------------')
    },[r,SMRT16dispatch]);

    return (
    
    <div className="errors">

              {r.errors.map((item,index)=>{
                return (
                <Alert key={index} variant="danger" onClose={()=>{dismissError(item)}} dismissible>
                    {item.reason || item.message}
                </Alert>
              );
              })}
    </div>);
}