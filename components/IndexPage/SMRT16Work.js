import { Card } from "react-bootstrap";

export default function SMRT16Work(props) {
  const { children, ...otherProps } = props;

    return (
      <div {...otherProps}>
        <Card>
            <Card.Body>
              <Card.Title as="h1">How does SMRT16 work?</Card.Title>
              <div className="indexText">
              <p>It works as follows: everyone who has ever bought a SMRT16 token through a DApp or directly using the functions of a smart contract becomes a project partner. 
        It is impossible to buy tokens without specifying a referrer. </p>
        <p style={{textAlign:"left"}}>
        After the purchase, your wallet address becomes your referral code at the same time. 
        And if you add smrt16.com/ and your wallet address, you get your referral link.
        <span className="smaller grey">&nbsp;(Example: smrt16.com/<b>0x5c580f5b34f7f7df64f5336f038c8705014a51ee</b>)</span>
        </p>
        </div>
          <div className="shift">
          <p>
          Thus, you become an agent of the project and now you can invite other people to buy SMRT16 tokens. For you - a four-level referral system, in which up to 93.75% of the transaction value is distributed among users directly involved in the transaction. Instant payment of referral bonuses occurs automatically and is guaranteed by a smart contract code on the blockchain.
    </p><p>
The general rule is that each next level of referral bonus has half the amount of bonuses of the previous level, therefore <b>referral rewards</b> of each level are the following:


          </p>
          <ul style={{whiteSpace:"pre"}}>
<li>1st  is <u>50.0%</u> or <b>1/2</b></li>
<li>2nd is <u>25.0%</u> or <b>1/4</b></li>
<li>3rd  is <u>12.5%</u> or <b>1/8</b></li>
<li>4th  is <u>6.25%</u> or <b>1/16</b></li>
of your referral transaction amount.
</ul>
          </div>
          <div className="indexText">
        
<p>
Partners of the SMTR16 project are highly motivated to engage in marketing - after all, referral bonuses are paid instantly. But let's say a user wants to invest, get a few referrals, and then switch to something else. And what? His referral program is not going anywhere. It will work for a year or two and always make a profit, as long as the smart contract on the blockchain works.
</p>
              </div>
            </Card.Body>
            </Card>
      </div>
        
    );
}