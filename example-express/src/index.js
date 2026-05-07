const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

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

app.get('/', (req, res) => {
  res.send('Express сервер работает!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
