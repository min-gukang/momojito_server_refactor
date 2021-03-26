const express = require('express');
const router = express.Router();
const { isLogged } = require('../middleware/middleware');
const favorite = require('../controller/detailpage/favorite');
const rating = require('../controller/detailpage/rating');

router.patch('/favorite/:id', isLogged, favorite);
router.patch('/rate/:score', isLogged, rating);

module.exports = router;
