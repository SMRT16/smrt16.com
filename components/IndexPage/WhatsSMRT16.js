import { Card } from "react-bootstrap";


export default function WhatsSMRT16(props) {
  const { children, ...otherProps } = props;

    return (<div {...otherProps}>
        
        <div className="sText">
                <p >
                SMRT16 is a crypto token that adheres to the ERC20 standard and operates on the Polygon network. 
                </p>
                <p style={{fontWeight:"500", color:"black"}}>
                You may be interested in purchasing SMRT16 due to the properties of this token.
                </p>
                <p>
                  It features a four-level referral program built into its Smart Contract token sale, which aims to decentralize project marketing. The token operates on-chain, with no external management involvement. The goal of the project is to attract attention and generate financial benefits for token holders through funding from token sales and marketing bonuses.
                </p>
                <p>
                The project&apos;s objective is to get people&apos;s attention, which will then be capitalized on for ongoing financial advantage for the token holders. 
                SMRT16 generates its funding from token sales, rewarding participants through marketing bonuses.
                </p>
                
              </div>
        
    </div>);
}