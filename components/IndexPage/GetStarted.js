import { Card } from "react-bootstrap";

export default function GetStarted(props) {
    const { children, ...otherProps } = props;
return (
    <div {...otherProps} id="getstarted">
        <Card>
            <Card.Body>
              <Card.Title as="h1">What do you need to <b>get started</b>?</Card.Title>
              <div className="indexText">
                <ol className="indexList">
                    <li><b>Purchase MATICs and USDT.</b> <a href="/faq#usdt">What&nbsp;is&nbsp;USDT?</a>
                      <p>
                        The SMRT16 smart contract runs at Polygon, where you need MATIC tokens to pay the transaction fee.
                          And also you get SMRT16 tokens in exchange for USDT, and later you get your referral rewards in this crypto representation of US dollars.
                      </p>
                    </li>
                    <li>Exchange USDT to SMRT16 tokens. <a href="/faq#smrt16amount">How much SMRT16 tokens do&nbsp;I&nbsp;need?</a>
                      <p>
                        You can enter any amount to be exchanged with the constant rate&nbsp;of&nbsp;1:1.
                      </p>
                    </li>
                    <li>Refer friends. Get high revenue in USDT. <a href="/faq#smrt16work">How does the referral program work?</a>
                      <p>
                        Here in SMRT16 DApp you always get SMRT16 tokens with a referral.  If you don't have any, the app can find you one automatically, but purchasing without any is not possible.
                      </p>
                    </li>
                </ol>
              </div>
            </Card.Body>
        </Card>
    </div>
    
);

}