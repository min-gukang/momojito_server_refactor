const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('file-system');

const router = express.Router();
const { isLogged } = require('../middleware/middleware');
const changeNickName = require('../controller/mypage/changeNickName');
const changePassword = require('../controller/mypage/changePassword');
const changeProfile = require('../controller/mypage/changeProfile');
const myCocktails = require('../controller/mypage/myCocktail');
const userInfo = require('../controller/mypage/userinfo');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../', 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//폴더 없으면 생성
if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
  fs.mkdirSync(path.join(__dirname, '../', 'uploads'));
}

router.patch('/nickname', isLogged, changeNickName);
router.patch('/password', isLogged, changePassword);
router.post('/profile', isLogged, upload.single('image'), changeProfile);
router.get('/myCocktails', isLogged, myCocktails);
router.get('/userInfo', isLogged, userInfo);

module.exports = router;
