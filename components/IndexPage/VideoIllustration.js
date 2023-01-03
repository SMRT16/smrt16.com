import { Card } from "react-bootstrap";

export default function VideoIllustration(props) {
    const { children, ...otherProps } = props;

    return (
        <div {...otherProps}>
            <Card>
                <Card.Header>...</Card.Header>
                <Card.Img variant="top" src="video.png"></Card.Img>
            </Card>
        </div>
        
    );
}