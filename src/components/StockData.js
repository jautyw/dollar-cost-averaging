import React, { useState, useEffect } from 'react';
import { getMonthlyStockData } from '../services/stockService';
import StockSearcher from './StockSearcher';

function StockData() {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthlyStockData(symbol);
        setStockData(data);
      } catch (error) {
        setError('Error fetching stock data');
      }
    };

    fetchData();
  }, [symbol]);

  const calculateAveragePrice = (data) => {
    return data.map(month => ({
      date: month.date,
      average: ((month.open + month.high + month.low + month.close) / 4).toFixed(2),
    }));
  };

  const averagePrices = calculateAveragePrice(stockData);

  return (
    <div>
      <h1>Stock Data for {symbol}</h1>
      <StockSearcher onSelect={setSymbol} />
      {error && <p>{error}</p>}
      <ul>
        {averagePrices.map((data, index) => (
          <li key={index}>
            {data.date}: Average Price: {data.average}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockData;