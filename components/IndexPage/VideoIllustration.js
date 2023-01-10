import { Card } from "react-bootstrap";
import HoverVideoPlayer from "react-hover-video-player";

export default function VideoIllustration(props) {
    const { children, ...otherProps } = props;

    return (
        <div {...otherProps} className="videoIllustration">

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

        </div>
        
    );
}