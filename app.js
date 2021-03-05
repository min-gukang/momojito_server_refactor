const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const csrf = require('csurf');
const compression = require('compression');
//cookie-parser 불러와야 하나?

const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.set('port', process.env.PORT || 4000);

//미들웨어 사용
app.use(morgan('dev'));
app.use(express.json()); //body-parser대신 요즘 사용하는 모듈
app.use(express.urlencoded({ extended: true })); //true로 하면 form형식의 데이터를 강력한 모듈을 사용하여 처리하기 때문에 설정
app.use(helmet());
app.use(cookieParser()); //이건 어디다가 사용하냐?
app.use(csrf({ cookie: true })); //csrf공격 차단
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(compression());

app.get('/', (req, res, next) => {
  res.send('aa');
});

//에러처리 핸들러
app.use((req, res, next) => {
  const error = `${req.method} ${req.url}이 존재하지 않습니다`;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send('에러가 떴다!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 대기중입니다`);
});
