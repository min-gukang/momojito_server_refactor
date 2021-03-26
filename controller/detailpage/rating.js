const User = require('../../models/User');
const Cocktail = require('../../models/Cocktail');
const Rating = require('../../models/Rating');

module.exports = async (req, res, next) => {
  try {
    const score = req.params.score;
    const CocktailId = req.body.cocktailId;
    let user = await User.findOne({
      where: { email: req.session.email },
    });

    // rating 테이블에 칵테일에 대한 평점이 반영되면
    // cocktail테이블에 avrRate도 계산해줘야 한다.
    if (user) {
      //일단 rating테이블에 평점주기에 대한 data생성을 해주고 
       await Rating.create({
        UserId: user.id,
        CocktailId,
        score
      })
      //평점을 계산해서 칵테일 테이블에 평점을 업데이트 해야함.       
      let calculation = await Rating.findAll({
        where: {
          CocktailId,
        }
      });      
      calculation = calculation.map((el) => el.dataValues.score); // [1,2,3,4,5]
      let resultOfCalculation = calculation.reduce((e1,e2) => e1 + e2)/calculation.length;
      //칵테일 테이블에 평점 반영
      await Cocktail.update(
        {
          avrRate: resultOfCalculation,
        },
        { 
          where : {
          id: CocktailId,
        }      
      })
      //같은 칵테일에 대한 평점을 업데이트 가능하게 하려면 앞부분에 이 칵테일에 대한 평가가 이루어졋는지를 확인하고 반영하는 코드를 짜면 된다. 
      return res.status(200).send('평점 반영 되었습니다');
    } else {
      return res.status(400).send('존재하지 않는 유저입니다');
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};


