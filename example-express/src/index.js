const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;
const projectRoot = path.join(__dirname, '..', '..');

app.use(express.json());

// Dev-friendly CORS (для Live Server / других портов)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const stocksService = require('./services/stocksService');
const stocksRouter = require('./routes/stocks');

stocksService.init(path.join(__dirname, 'data', 'stocks.json'));
app.use('/stocks', stocksRouter);

// Фронтенд с того же порта — не нужен Live Server и нет проблем WSL + :5502
app.use(express.static(projectRoot));

app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  const wslIp = Object.values(os.networkInterfaces())
    .flat()
    .find((iface) => iface && iface.family === 'IPv4' && !iface.internal)?.address;

  console.log(`API и сайт: http://localhost:${PORT}`);
  console.log(`Откройте в браузере: http://localhost:${PORT}`);
  if (wslIp) {
    console.log(`Если localhost не открывается (WSL): http://${wslIp}:${PORT}`);
  }
});
