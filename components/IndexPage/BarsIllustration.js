import { Card } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ArcElement,
  } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { useState } from "react";

export default function BarsIllustration(props) {
    const { children, ...otherProps } = props;
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        ArcElement
      );
    
    
      var a = 6;
      var b = 50;
      let income1 = a*b/2;
      let income2 = a*a*b/4;
      let income3 = a*a*a*b/8;
      let income4 = a*a*a*a*b/16;
    
      const [refCount, setRefCount] = useState(a);
      const [refUsd, setRefUsd] = useState(b);
    
      const [dataBars, setDataBars] = useState(
        [income1, income2, income3, income4, income1 + income2 + income3 + income4]
      );
    
    
      const onInputChange = (a,b)=>{
    
        if(a && b) {
          income1 = a*b/2;
          income2 = a*a*b/4;
          income3 = a*a*a*b/8;
          income4 = a*a*a*a*b/16;
          const arr = [income1, income2, income3, income4, income1 + income2 + income3 + income4];
          setDataBars(arr);
        }
          
      }
    
      const options = {
        responsive: true,
        maintainAspectRatio: false
      }
    const totalRefCount = ()=>{
        let x = +refCount;
        return x+x**2+x**3+x**4;
      }
return (

    <div {...otherProps}>
              <Card>
                
                <Card.Body>
                <Card.Title>
                  Assumption caclulator of a possible income
                </Card.Title>
                  <p><u>Try to enter your numbers:</u></p>
                  <div className="cols2"><div>Affiliates number every level</div> 
                    <div>
                      <CurrencyInput style={{width:"60px"}}
                            decimalsLimit={0}
                            defaultValue={a}
                            maxLength={2}
                            onValueChange={(value) => {
                              setRefCount(value);
                            onInputChange(value,refUsd)}} />
                    </div>
                  </div>
                  <div className="cols2"><div>Average purchase USDT</div> 
                    <div>
                      <CurrencyInput style={{width:"60px"}}
                            decimalsLimit={2}
                            defaultValue={b}
                            maxLength={6}
                            prefix="$"
                            onValueChange={(value) => {
                              setRefUsd(value);
                            onInputChange(refCount,value)}} />
                    </div>
                  </div>
                  <br/>
                  <div style={{height:"280px",margin:"6px 0px 40px 0px"}}>
                    <Bar options={options} data={
                      {
                        labels:["Level 1 (50%)","Level 2 (25%)","Level 3 (12.5%)","Level 4 (6.25%)","Total"],
                        datasets: [
                          {
                            label:"USDT",
                            data: dataBars,
                            backgroundColor: ["#2C70F4","#4B85F6", "#83ADFF","#DBE7FF",'#2C70F4']
                          }
                        ]
                      }
                    }/>
                  </div>
                  <p className="indexText">
                    Let's assume that your referrals with do everything the same with you: 
                    invest the same amount and invite the same number of referrals. Then, see the following picture below.
                  </p>
                  <ul>
                  <li>{dataBars[0]} USDT from {refCount} participats on the first level</li>
                  <li>{dataBars[1]} USDT from {refCount**2} participats on the second level</li>
                  <li>{dataBars[2]} USDT from {refCount**3} participats on the third level</li>
                  <li>{dataBars[3]} USDT from {refCount**4} participats on the fourth level</li>
                  </ul>
                  
                  <b>{dataBars[4]} USDT in total  from {totalRefCount()} participats in the structure, who all bring you from 50% to 6.25% of their purcahses</b>
                  <div>
                    {children}
                  </div>
                </Card.Body>
              </Card>

            </div>
);
}