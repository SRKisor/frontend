import React from 'react'
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const Report = () => {

var data = useSelector(state => state.dataPerMenuItem.bills.content.report);

  var report = [];

    data.map(item => {
    let temp = []

      temp[0] = new Date(item.date).getTime();
      temp[1]= item.count

      report.push(temp);
    });

    report.sort()

    return (
      <Chart
        options={{
          xaxis: {
            type: "datetime",
            tickAmount: 6
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
          tooltip: {
            x: {
              format: "dd MMM yyyy"
            }
          },
          markers: {
            size: 0,
            style: "hollow"
          },
          dataLabels: {
            enabled: true
          }
        }}
        type="area"
        series={[
          {
            data: report
          }
        ]}
      />
    );
}

export default Report
