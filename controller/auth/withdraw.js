const User = require('../../models/User');
const DormantId = require('../../models/DormantId');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body
        //비밀번호를 한번더 확인하는 로직이 있으면 좋다. 
        let user = await User.findOne({
            where : {
                email
            }
        });
        let passwordCheck = await bcrypt.compare(password, user.password);
        if(user && passwordCheck) {
            await DormantId.create({
                email,
                password: user.password
            });
            await User.destroy({ //deletedAt
                where: {
                    email,
                }
            });
            req.session.destroy();
            return res.status(200).send('계정삭제가 완료되었습니다')
        } else {
            return res.status(400).send('계정 삭제가 안됩니다.')
        }
    } catch (err) {
        console.error(err);
        return next(err);
    }
}