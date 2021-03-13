exports.isLogged = (req, res, next) => {
  if (req.session.email) {
    return next();
  } else {
    return res.status(400).send('로그인이 필요합니다');
  }
};
exports.isNotLogged = (req, res, next) => {
  if (!req.session.email) {
    return next();
  } else {
    // console.log('로그인했는데 또 로그인할때 뜨는 에러');
    return res.redirect('/');
  }
};
