const express = require("express");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();
const PORT = 5000;

const app = express();
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("Hello! mini-link!");
});

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 실행중`);
});
