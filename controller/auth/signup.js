const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const { email, nickname, password, snsId } = req.body;

    let user = await User.findOne({
      where: { email },
    });
    if (user) return res.status(401).send('이미 유저가 존재합니다');

    let hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      password: hash,
      snsId
    });
    res.status(200).send('유저 생성이 완료되었습니다');
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
