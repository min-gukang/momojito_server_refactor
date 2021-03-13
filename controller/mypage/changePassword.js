const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { password, newPassword } = req.body;

  let user = await User.findOne({
    where: { email: req.session.email },
  });
  if (user) {
    let passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      let hashedPassword = await bcrypt.hash(newPassword, 12);
      await User.update(
        { password: hashedPassword },
        { where: { email: req.session.email } }
      );
      return res.status(200).send('비밀번호 수정 완료');
    } else {
      res.status(400).send('존재하지 않는 유저입니다');
    }
  }
};
