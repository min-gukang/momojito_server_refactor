module.exports = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        return res.status(200).send('로그아웃 성공'); 
    });
}