const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    let user = await User.findOne({
      where: { email: req.session.email },
      attributes: ['email', 'nickname', 'snsId'],
    });
    if (user) {
      return res
        .status(200)
        .json({ userInfo: user, message: '유저 정보를 불러왔습니다' });
    } else {
      res.status(400).send('그런 유저는 없습니다');
    }
  } catch (err) {
    console.err(err);
    return;
  }
};
