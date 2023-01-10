import { Button, Card } from "react-bootstrap";

export default function SMRT16Work(props) {
  const { children, ...otherProps } = props;

    return (
      <div {...otherProps}>
        <h1>How does SMRT16 work?</h1>
        <div className="indexText">
          <p>
          By regestering in the SMART16 Contract and holding SMRT16 tokens, you become an agent of the project and now you can invite other people to buy SMRT16 tokens. For you - a four-level referral system, in which up to 93.75% of the transaction value is distributed among users directly involved in the transaction. Instant payment of referral bonuses occurs automatically and is guaranteed by a smart contract code on the blockchain.
          </p>
          <p>
          The general rule is that each next level of referral bonus has half the amount of bonuses of the previous level, therefore <b>referral rewards</b> of each level are the following:
          </p>
          <ul style={{whiteSpace:"pre"}}>
            <li>1st  is <u>50.0%</u> or <b>1/2</b></li>
            <li>2nd is <u>25.0%</u> or <b>1/4</b></li>
            <li>3rd  is <u>12.5%</u> or <b>1/8</b></li>
            <li>4th  is <u>6.25%</u> or <b>1/16</b></li>
            of your referral transaction amount.&nbsp;<Button variant="link">Read more</Button>
          </ul>
          <p>
          Partners of the SMTR16 project are highly motivated to engage in marketing - after all, 
          referral bonuses are paid instantly. 
          But let's say a user wants to invest, get a few referrals, and then switch to something else. 
          And what? His referral program is not going anywhere. 
          It will work for a year or two and always make a profit, as long as the smart contract on the blockchain works.
          </p>
        </div>
        
        
      </div>
        
    );
}