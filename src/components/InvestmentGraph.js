import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './InvestmentGraph.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function InvestmentGraph({ data, amountInvested, amountReturned, percentageIncrease }) {
  const chartData = {
    labels: data.map(point => point.date),
    datasets: [
      {
        label: 'Investment Value Over Time',
        data: data.map(point => point.value),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div className="investment-graph">
      <div className="investment-summary">
        <span>Amount invested: ${amountInvested}</span>
        <span>Amount returned: ${amountReturned}</span>
        <span>% increase: {percentageIncrease}%</span>
      </div>
      <Line data={chartData} />
    </div>
  );
}

export default InvestmentGraph;