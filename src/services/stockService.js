import axios from 'axios';

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY; // Access the API key from environment variables
const BASE_URL = 'https://api.polygon.io/v3/reference';
const YAHOO_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';
const PROXY_URL = 'http://localhost:5000/api/v8/finance/chart';

export const getMonthlyStockData = async (symbol, years) => {
  const endDate = Math.floor(Date.now() / 1000); // Current date in UNIX timestamp
  const startDate = Math.floor(new Date().setFullYear(new Date().getFullYear() - years) / 1000); // Start date in UNIX timestamp

  const url = `${PROXY_URL}/${symbol}`;
  const params = {
    period1: startDate,
    period2: endDate,
    interval: '1mo',
  };

  console.log('Request URL:', url);
  console.log('Request Params:', params);

  try {
    const response = await axios.get(url, { params });
    const data = response.data.chart.result[0];
    const formattedData = data.timestamp.map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toISOString().split('T')[0], // Convert timestamp to date string
      open: data.indicators.quote[0].open[index],
      high: data.indicators.quote[0].high[index],
      low: data.indicators.quote[0].low[index],
      close: data.indicators.quote[0].close[index],
      volume: data.indicators.quote[0].volume[index],
    }));
    return formattedData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const getAllStockNames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tickers`, {
      params: {
        market: 'stocks',
        search: '',
        active: true,
        limit: 1000, // Adjust the limit as needed
        apiKey: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching stock names:', error);
    throw error;
  }
};