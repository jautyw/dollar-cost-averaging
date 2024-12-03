const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Use CORS middleware
app.use(cors());

app.use('/api', createProxyMiddleware({
  target: 'https://query1.finance.yahoo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding the request
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});