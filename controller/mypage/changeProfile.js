const path = require('path');

module.exports = (req, res) => {
  if (req.file) {
    return res.status(200).send('프로필 수정 완료');
  }
};
