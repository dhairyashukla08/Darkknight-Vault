import React from 'react';
import {Line, Pie} from "@ant-design/charts";
import "./ChartComponent.css"


const ChartComponent = ({sortedTransactions}) => {
    const lineData = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

     const spendingData = sortedTransactions
    .filter((trans) => trans.type === "expense")
    .reduce((acc, obj) => {
      let found = acc.find((item) => item.tag === obj.tag);
      if (found) {
        found.amount += obj.amount;
      } else {
        acc.push({ tag: obj.tag, amount: obj.amount });
      }
      return acc;
    }, []);

 const lineConfig = {
    data: lineData,
    xField: "date",
    yField: "amount",
    theme: "dark",
    color: "#fff",
    point: { size: 5, shape: "diamond" },
    autoFit: false,
    width:1000,
    height:400
  };

  const pieConfig = {
    data: spendingData,
    angleField: "amount",
    colorField: "tag",
    width: 350, 
    height: 500,
    radius: 0.8,
    theme: "dark",
    legend: { position: "bottom" },
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: { fontSize: 14, textAlign: "center" },
    },
  };

  let chart;
  return (
  <div className="charts-row">
      <div className="chart-card line-chart">
        <h2 className="chart-title">Financial Statistics</h2>
        <Line {...lineConfig} />
      </div>

      <div className="chart-card pie-chart">
        <h2 className="chart-title">Total Spendings</h2>
        {spendingData.length > 0 ? (
          <Pie {...pieConfig} />
        ) : (
          <div className="no-data-msg">No Expenses Found</div>
        )}
      </div>
    </div>
  )
}

export default ChartComponent