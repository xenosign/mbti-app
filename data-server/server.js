const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const dataRouter = require('./routes/data');
const mongoRouter = require('./routes/mongo');
app.use('/data', dataRouter);
app.use('/mongo', mongoRouter);

app.listen(PORT, () => {
  console.log(`데이터 통신 서버가 ${PORT}에서 작동 중입니다!`);
});
