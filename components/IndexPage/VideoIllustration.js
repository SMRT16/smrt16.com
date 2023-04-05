import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import HoverVideoPlayer from "react-hover-video-player";

export default function VideoIllustration(props) {
    const { children, ...otherProps } = props;

    return (
        <div {...otherProps} className="notvideoIllustration">

                {/* <HoverVideoPlayer videoSrc={[
                    {src:"/SMRT16-index.webm",type:"video/webm"},
                    {src:"/SMRT16-index.mp4",type:"video/mp4"}
                ]}
                pausedOverlay={
                    <img
                      src="/video.png"
                      alt=""
                      style={{
                        // Make the image expand to cover the video's dimensions
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  }
                /> 
                <ul>
                  <li>Spend USDT, receive USDT</li>
                  <li>It&apos;s Polygon main net USDT</li>
                  <li>You earn with the referral program</li>
                  <li>Money from token sale goes for referral program payments</li>
                  <li>No rules change, no price change, all is constant</li>
                  <li>There is no minimum or maximum amount to come with</li>
                  <li>But maximum amount you receive is limited to your SMRT16 balance</li>
                  <li>You spend SMRT16 by receiving referral rewards</li>
                </ul>

                <div style={{margin:"auto",textAlign:"center"}}>
                <h4>Designed for those who have friends with whom they can share their love of crypto</h4>
                  <Button as="a" href="/0">Just try it out! You’ll fall in love</Button>
                </div>
                
                */}

                <Image fluid src="/tree-illustration.svg" height={600} width={600} />
        </div>
        
    );
}