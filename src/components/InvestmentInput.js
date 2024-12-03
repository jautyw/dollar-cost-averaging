import React from 'react';
import StockSearcher from './StockSearcher';
import './InvestmentInput.css';

function InvestmentInput({ amount, setAmount, years, setYears, onSelectStock }) {
  return (
    <div className="investment-inputs">
      <span>I invested </span>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="10"
        className="amount-input"
      />
      <span> dollars every month for </span>
      <input
        type="number"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        placeholder="10"
        className="years-input"
      />
      <span> years in </span>
      <StockSearcher onSelect={onSelectStock} />
    </div>
  );
}

export default InvestmentInput;