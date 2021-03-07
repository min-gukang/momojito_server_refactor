const bcrypt = require('bcrypt');
const User = require('../../models/User');
const DormantId = require('../../models/DormantId');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userInfo = await User.findOne({
      where: { 
        email,
       },
    });

    let isSleepId = await DormantId.findOne({
      where: {email}
    });

    if(isSleepId) {
      return res.send('잠자고 있는 계정입니다');
    }

    if (!userInfo) {
      return res.status(400).send('가입되지 않은 계정입니다');
    } else {
      let pwd = userInfo.dataValues.password;
      delete userInfo.dataValues.password;
      let isPassword = await bcrypt.compare(password, pwd);
      if (isPassword) {
        req.session.email = email;
        res.status(200).json({ message: '로그인 성공', data: userInfo });
      } else {
        res.status(400).send('비밀번호가 틀립니다');
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
