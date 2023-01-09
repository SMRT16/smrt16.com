import { Card } from "react-bootstrap";
import HoverVideoPlayer from "react-hover-video-player";

export default function VideoIllustration(props) {
    const { children, ...otherProps } = props;

    return (
        <div {...otherProps} style={{maxWidth:"540px"}}>
            <Card>
                <HoverVideoPlayer videoSrc={[
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
                {/* <Card.Img variant="back" src="video.png"></Card.Img>
                <Card.ImgOverlay>
                    <video controls style={{width:"100%"}}>
                        <source src="/SMRT16-index.mp4" type="video/mp4"/>
                    </video>
                </Card.ImgOverlay> */}
                
                
            </Card>
        </div>
        
    );
}