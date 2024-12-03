import React, { useState, useEffect } from 'react';
import { getAllStockNames } from '../services/stockService';
import './StockSearcher.css';

function StockSearcher({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allStockNames, setAllStockNames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockNames = async () => {
      try {
        const data = await getAllStockNames();
        setAllStockNames(data || []);
      } catch (error) {
        setError('Error fetching stock names');
      }
    };

    fetchStockNames();
  }, []);

  const handleSelect = (symbol) => {
    setQuery(symbol);
    setResults([]);
    onSelect(symbol); // Call the onSelect callback with the selected symbol
  };

  const handleFocus = () => {
    setResults(allStockNames);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const filteredResults = allStockNames.filter(stock =>
        stock.ticker.toLowerCase().includes(value.toLowerCase()) ||
        stock.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="stock-searcher">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="Search for a fund"
        className="search-input"
      />
      {error && <p className="error-message">{error}</p>}
      <ul className="search-results">
        {results.map((result, index) => (
          <li key={index} onClick={() => handleSelect(result.ticker)}>
            {result.ticker} - {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockSearcher;