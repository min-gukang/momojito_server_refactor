const User = require('../../models/User');
const DormantId = require('../../models/DormantId');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const recoveryAccount = await DormantId.findOne({
            where : { email }
        })
        if(recoveryAccount) {
            let passwordCheck = await bcrypt.compare(password, recoveryAccount.password);
            console.log('password check', passwordCheck);
            if(passwordCheck) {
                console.log("recoveryAccount.email", recoveryAccount.email);
                await User.restore({
                    where : {
                        email: recoveryAccount.email,
                    }
                })
                await DormantId.destroy({
                    where: {email: recoveryAccount.email}
                });
                return res.status(200).send('계정 복구 완료');
            }
        } else {
            return res.status(400).send('없는 아이디거나 보존기간이 지난 아이디입니다')
        }
    } catch(err) {

    }
}