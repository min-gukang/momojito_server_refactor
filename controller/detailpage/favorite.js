const User = require('../../models/User');
const Cocktail = require('../../models/Cocktail');

module.exports = async (req, res, next) => {
  try {
    const cocktailId = req.params.id;
    let user = await User.findOne({
      where: { email: req.session.email },
      attributes: { exclude: 'password' },
    });

    if (user) {
      let myCocktails = await user.addFFavorite(Number(cocktailId)); //Favorite{}을 나타낸다.
      // console.log('myCocktails', myCocktails);
      return res
        .status(200)
        .json({ message: '칵테일이 추가되었습니다', result: myCocktails });
    } else {
      return res.status(400).send('유저가 존재하지 않습니다');
    }
  } catch (Err) {
    console.error(Err);
    return next(Err);
  }
};
