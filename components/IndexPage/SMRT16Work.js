import { useState } from "react";
import { Button, Card, Collapse } from "react-bootstrap";

export default function SMRT16Work(props) {
  const { children, ...otherProps } = props;
  const [open, setOpen] = useState(false);

    return (
      <div {...otherProps}>
        <h1>How does SMRT16 work?</h1>
        <div className="indexText">
          <p>
          By registering on the SMRT16 Contract and holding SMRT16 tokens, users become agents of 
          the project and can invite others to buy SMRT16 tokens. The project offers a four-level 
          referral system in which up to 93.75% of the transaction value is distributed among users directly 
          involved in the transaction. 
          Referral bonuses are paid out instantly and automatically, guaranteed by the smart contract code on the blockchain.</p>
          <p>
          The referral rewards decrease with each level, following this general rule: each next level of referral bonus has half 
          the amount of bonuses of the previous level. Therefore, the referral rewards of each level are as follows:
          </p>
          <ul style={{whiteSpace:"pre"}}>
            <li>1st  is <u>50.0%</u> or <b>1/2</b></li>
            <li>2nd is <u>25.0%</u> or <b>1/4</b></li>
            <li>3rd  is <u>12.5%</u> or <b>1/8</b></li>
            <li>4th  is <u>6.25%</u> or <b>1/16</b></li>
            of your referral transaction amount.&nbsp;<Button variant="link" 
            onClick={() => setOpen(!open)}
            aria-controls="w-collapse-text"
            hidden={open}
            aria-expanded={open}>Read more</Button>
          </ul>
          <Collapse in={open}>
            <div id="w-collapse-text">
              <b>
              Referral bonuses are paid instantly.
              </b>
              <p>
              The SMRT16 project rewards its partners through guaranteed instant referral bonuses, 
              which provides a strong motivation for them to actively participate in marketing the project. 
              Even if a user decides to invest, acquire a few referrals and move on to something else, 
              their referral program will still continue to operate and generate profits as long as the smart contract on the blockchain remains active. The smart contract guarantees that referral bonuses will continue to be paid out as long as someone buys through the referral links, regardless of the level of referral. This gives users the assurance that their investment will continue to generate revenue even if they are not actively involved. It is important to note that the more active a user is in promoting and bringing in new referrals, the greater the potential rewards they can earn through the referral program.
              </p>
            </div>
          </Collapse>
          
        </div>
        
        
      </div>
        
    );
}