const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    try {
        //check ac token
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({message: "Authorization Failed"})
        }
        //validate
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user,shopadmin)=>{
            if (err) return res.status(400).json({message:"Authorization Failed"})
            //success
            req.user = user
            next();
        })
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = auth;