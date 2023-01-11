import { Card } from "react-bootstrap";
import { Pie } from "react-chartjs-2";


export default function PieIllustration(props) {
  const { children, ...otherProps } = props;
    const data = {
        labels: ['1/2', '1/4', '1/8', '1/16', '1/16'],
        datasets: [
          {
            label: '%',
            data: [50.00, 25.00, 12.50, 6.25, 6.25,  ],
            backgroundColor: ["#2C70F4","#4B85F6", "#83ADFF","#DBE7FF",'#FFFFFF'],
            borderColor: '#9dc4ee',
            borderWidth: 2,
          },
        ],
      };
    return(
        <div {...otherProps}>
          <h4>93.75% of the token sales paid out as referral bonuses</h4>

              <Pie style={{maxWidth:"400px",maxHeight:"400px",margin:"32px auto", width:"100%", height:"100%"}} data={data} />
              <div className="levels">
                &nbsp;<span style={{color:"#2C70F4"}}>&#11044;</span>Level&nbsp;1&nbsp;
                &nbsp;<span style={{color:"#4B85F6"}}>&#11044;</span>Level&nbsp;2&nbsp;
                &nbsp;<span style={{color:"#83ADFF"}}>&#11044;</span>Level&nbsp;3&nbsp;
                &nbsp;<span style={{color:"#DBE7FF"}}>&#11044;</span>Level&nbsp;4&nbsp;
                &nbsp;<span style={{color:"#DBE7FF"}}>&#9711;</span>Remains&nbsp;SMRT16&nbsp;
              </div>
              
              
            </div>
    );
}