const jwt = require('jsonwebtoken');
const SECRET_KEY = "devdevdevdev4"
const cookieParser = require('cookie-parser');



const auth = async(req,res,next) => {
    try {
        let token = req.cookies.token;
        if(token){
            jwt.verify(token, SECRET_KEY, (err, info) => {
                if(err){
                    res.status(401).json({success:false, message: "Unauthorized!"})
                }
                else{
                    req.userId = info.id;
                    req.email = info.email;
                    req.name = info.name;
                    next();
                }
            });
        }   
    } catch (error) {
        res.status(401).json({success:false, message:"Unauthorized user"})
    }
}

module.exports = {
    auth
}