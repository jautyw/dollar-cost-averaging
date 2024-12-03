import React, { useState } from 'react';
import './App.css';
import InvestmentInput from './components/InvestmentInput';
import InvestmentGraph from './components/InvestmentGraph';
import { getMonthlyStockData } from './services/stockService';

function App() {
  const [amount, setAmount] = useState('');
  const [years, setYears] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [investmentData, setInvestmentData] = useState([]);
  const [amountInvested, setAmountInvested] = useState(0);
  const [amountReturned, setAmountReturned] = useState(0);
  const [percentageIncrease, setPercentageIncrease] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const handleCalculate = async () => {
    if (!amount || !years || !selectedStock) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const data = await getMonthlyStockData(selectedStock, parseInt(years));
      const monthlyInvestment = parseFloat(amount);
      const totalMonths = parseInt(years) * 12;
      let totalInvested = 0;
      let totalShares = 0;

      if (data.length < totalMonths) {
        setNotification(`Data goes back as far as possible. Only ${Math.round(data.length/12)} years ${data.length%12} months of data available.`);
      } else {
        setNotification('');
      }

      const investmentData = data.slice(0, totalMonths).map((point, index) => {
        totalInvested += monthlyInvestment;
        const sharesBought = monthlyInvestment / point.close; // Calculate shares bought this month
        totalShares += sharesBought;
        const totalValue = totalShares * point.close; // Calculate total value based on current month's closing price
        return {
          date: point.date,
          value: totalValue,
        };
      });

      setInvestmentData(investmentData);
      setAmountInvested(totalInvested.toFixed(2));
      setAmountReturned((totalShares * data[data.length - 1].close).toFixed(2));
      setPercentageIncrease(((totalShares * data[data.length - 1].close - totalInvested) / totalInvested * 100).toFixed(2));
      setShowGraph(true);
      setError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error calculating investment data:', error);
      setError('Error fetching investment data.');
    }
  };

  return (
    <div className="App">
      <div className={`investment-inputs-container ${showGraph ? 'move-up' : ''}`}>
        <InvestmentInput
          amount={amount}
          setAmount={setAmount}
          years={years}
          setYears={setYears}
          onSelectStock={setSelectedStock}
        />
        <button onClick={handleCalculate} className="calculate-button">Calculate</button>
        {error && <p className="error-message">{error}</p>}
        {notification && <p className="notification-message">{notification}</p>}
      </div>
      {showGraph && (
        <InvestmentGraph
          data={investmentData}
          amountInvested={amountInvested}
          amountReturned={amountReturned}
          percentageIncrease={percentageIncrease}
        />
      )}
    </div>
  );
}

export default App;