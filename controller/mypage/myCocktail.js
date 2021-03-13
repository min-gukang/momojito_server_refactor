const User = require('../../models/User');
const Cocktail = require('../../models/Cocktail');

module.exports = async (req, res) => {
  try {
    console.log('ghgghgh');
    let user = await User.findOne({
      where: { email: req.session.email },
      attributes: { exclude: 'password' },
    });
    console.log('user', user.dataValues);
    if (user) {
      let cocktailList = await user.getCocktails();
      return res.status(200).json({ list: cocktailList });
    } else {
      return res.status(400).send('존재하지 않는 유저입니다');
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
