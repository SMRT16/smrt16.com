import { Col, Row } from "react-bootstrap";
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
  let income1 = a * b / 2;
  let income2 = a * a * b / 4;
  let income3 = a * a * a * b / 8;
  let income4 = a * a * a * a * b / 16;

  const [refCount, setRefCount] = useState(a);
  const [refUsd, setRefUsd] = useState(b);

  const [dataBars, setDataBars] = useState(
    [income1, income2, income3, income4, income1 + income2 + income3 + income4]
  );


  const onInputChange = (a, b) => {

    if (a && b) {
      income1 = a * b / 2;
      income2 = a * a * b / 4;
      income3 = a * a * a * b / 8;
      income4 = a * a * a * a * b / 16;
      const arr = [income1, income2, income3, income4, income1 + income2 + income3 + income4];
      setDataBars(arr);
    }

  }

  const options = {
    responsive: true,
    maintainAspectRatio: false
  }
  const totalRefCount = () => {
    let x = +refCount;
    return x + x ** 2 + x ** 3 + x ** 4;
  }
  return (
    <>
      <Col sm={12} lg={6} md={12} {...otherProps}>
        <div id="inputHolder">
          <h5>Try to enter your numbers:</h5>
          <Row>
            <Col>
              <label htmlFor="Average">Average purchase USDT</label>
              <br/>
              <CurrencyInput
                decimalsLimit={2}
                defaultValue={b}
                maxLength={6}
                id="Average"
                prefix="$"
                onValueChange={(value) => {
                  setRefUsd(value);
                  onInputChange(refCount, value)
                }} />
            </Col>
            <Col>
              <label htmlFor="Affiliates">Affiliates number every level</label>
              <br/>
              <CurrencyInput
                decimalsLimit={0}
                defaultValue={a}
                maxLength={2}
                id="Affiliates"
                onValueChange={(value) => {
                  setRefCount(value);
                  onInputChange(value, refUsd)
                }} />
            </Col>
          </Row>
          
        </div>
        <div style={{ height: "280px", margin: "6px 0px 40px 0px" }}>
          <Bar options={options} data={
            {
              labels: ["Level 1 (50%)", "Level 2 (25%)", "Level 3 (12.5%)", "Level 4 (6.25%)", "Total"],
              datasets: [
                {
                  label: "USDT",
                  data: dataBars,
                  backgroundColor: ["#2C70F4", "#4B85F6", "#83ADFF", "#DBE7FF", '#2C70F4']
                }
              ]
            }
          } />
        </div>
      </Col>
      <Col sm={12} lg={6} md={12} {...otherProps}>
        <div id="barstext">
          <p className="indexText">
          Let's assume that your referrals with do everything the same as you: invest the same amount and invite the same number of referrals. Then, see the following data
          </p>
          <ul>
            <li>{dataBars[0]} USDT from {refCount} participats on the first level</li>
            <li>{dataBars[1]} USDT from {refCount ** 2} participats on the second level</li>
            <li>{dataBars[2]} USDT from {refCount ** 3} participats on the third level</li>
            <li>{dataBars[3]} USDT from {refCount ** 4} participats on the fourth level</li>
          </ul>

          <b>{dataBars[4]} USDT in total  from {totalRefCount()} participats in the structure, who all bring you from 50% to 6.25% of their purcahses</b>
          <div>
            {children}
          </div>
        </div>
      </Col>
    </>
  );
}