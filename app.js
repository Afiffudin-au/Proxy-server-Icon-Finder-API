const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.port || 5000
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/', createProxyMiddleware({
  target: 'https://api.iconfinder.com/v4/', //original url
  changeOrigin: true,
  ws: true,
  headers: {
    accept: "application/json",
    method: "GET",
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));
app.listen(port);