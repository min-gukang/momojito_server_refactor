const User = require('../../models/User');

// 이렇게 db를 많이 왔다갔다 해야하나.
module.exports = async (req, res) => {
  try {
    const { nickname } = req.body;
    if (req.session.email) {
      //닉네임 중복 확인
      let doubleCheck = await User.findOne({
        where: { nickname },
      });
      if (!doubleCheck) {
        await User.update(
          // update구문을 잘못 사용해서 test통과가 안됨.
          { nickname: nickname },
          { where: { email: req.session.email } }
        );
        return res.status(200).send('닉네임 수정 완료');
      } else {
        return res.status(400).send('이미 존재하는 닉네임입니다');
      }
    } else {
      return res.status(400).send('존재하지 않는 유저입니다');
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
