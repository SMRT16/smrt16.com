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
import { TheLang } from "../../data/lang";

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
          <h5>{TheLang.BarsIllustration.tryYourNumbers}</h5>
          <Row>
            <Col>
              <label htmlFor="Average">{TheLang.BarsIllustration.everagePurchase}</label>
              <br/>
              <CurrencyInput
                decimalsLimit={2}
                defaultValue={b}
                maxLength={6}
                disableGroupSeparators={true}
                decimalSeparator="."
                id="Average"
                prefix="$"
                onValueChange={(value) => {
                  setRefUsd(value);
                  onInputChange(refCount, value)
                }} />
            </Col>
            <Col>
              <label htmlFor="Affiliates">{TheLang.BarsIllustration.affiliatesNumber}</label>
              <br/>
              <CurrencyInput
                decimalsLimit={0}
                defaultValue={a}
                maxLength={2}
                disableGroupSeparators={true}
                decimalSeparator="."
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
          {TheLang.BarsIllustration.participantDescription}
          </p>
          <ul>
            <li>{dataBars[0]} {TheLang.BarsIllustration.USDTfrom} {refCount}      {TheLang.BarsIllustration.participant1st}</li>
            <li>{dataBars[1]} {TheLang.BarsIllustration.USDTfrom} {refCount ** 2} {TheLang.BarsIllustration.participant2nd}</li>
            <li>{dataBars[2]} {TheLang.BarsIllustration.USDTfrom} {refCount ** 3} {TheLang.BarsIllustration.participant3rd}</li>
            <li>{dataBars[3]} {TheLang.BarsIllustration.USDTfrom} {refCount ** 4} {TheLang.BarsIllustration.participant4th}</li>
          </ul>

          <b>{dataBars[4]} {TheLang.BarsIllustration.inTotalFrom} {totalRefCount()} {TheLang.BarsIllustration.whoBrought}</b>
          <div>
            {children}
          </div>
        </div>
      </Col>
    </>
  );
}