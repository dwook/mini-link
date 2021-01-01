const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const dotenv = require("dotenv");
const morgan = require('morgan');
const path = require('path');

const db = require("./models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const linkRouter = require("./routes/link");

const PORT = 5000;
dotenv.config();
passportConfig();
const app = express();

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

app.use(morgan('dev'));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello! mini-link!");
});

app.use("/user", userRouter);
app.use("/link", linkRouter);

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 실행중`);
});
