const authModel = require("../model/auth");
const error = require("../middleware/err");
const validation = require("../middleware/validation");
const jwt = require("jsonwebtoken");
const date = require("moment");
const {
  validationResult
} = require("express-validator");

const errorFormatter = ({
  msg,
  param
}) => {
  return `${param}: ${msg}`;
};

class authontrollers {
    async daftar(req, res) {
        const errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
            let errorsParam = []
            for (let param of Object.keys(errors.errors)) {
                errorsParam.push({ "parameter" : errors.errors[param].param, "pesan" : errors.errors[param].msg  })
            }     
            res.status(422).json({
                succes: "0",
                errors: errorsParam
            });
            return;
            }
        const data = req.body;
        let input = {
            username : data.username,
            password : await validation.encrypt(data.password)
        }
        const result = await authModel.daftar(input)
            if (result != "" && result != undefined && result.code == undefined) {
                res.status(200);
                res.json({
                    success: 1,
                    data : {"id_autentikasi" : result[0],
                             ...input}
                 });
             } else {
                 res.status(200);
                  res.json({
                     success: 0,
                     data : error.validate(result.code)  
                  });
             }
    }
    async login(req, res) {
        const errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
            let errorsParam = []
            for (let param of Object.keys(errors.errors)) {
                errorsParam.push({ "parameter" : errors.errors[param].param, "pesan" : errors.errors[param].msg  })
            }     
            res.status(422).json({
                succes: "0",
                errors: errorsParam
            });
            return;
            }
        const data = req.body;
        const result = await authModel.login(data.username)
            if (result != "" && result != undefined && result.code == undefined) {
                if(await validation.verify(data.password,result[0].password)){
                    
                    let tokenUserinfo = {
                        id_autentikasi : result[0].id_autentikasi ,
                        username: result[0].username,
                        password: result[0].password,
                    };

                    let accessToken = jwt.sign(tokenUserinfo, process.env.ACCESS_TOKEN_SECRET, {
                        algorithm:"HS256",
                        expiresIn: process.env.ACCESS_TOKEN_LIFE,
                      });
                    let refreshToken = jwt.sign(tokenUserinfo, process.env.REFRESH_TOKEN_SECRET, {
                        algorithm:"HS256",
                        expiresIn: process.env.REFRESH_TOKEN_LIFE,
                      });
        
                    res.cookie("refreshToken", refreshToken, {
                        secure: false,
                        httpOnly: true,
        
                      });

                    res.cookie("accessToken", accessToken, {
                        secure: false,
                        httpOnly: true,
        
                      });   
                    res.status(200);
                    res.json({
                        accessToken:{token : accessToken,
                        tanggal_ex : date().add(15, 'minutes').format('YYYY-MM-DD h:mm:ss') },
                        refreshToken: {token : refreshToken,
                        tanggal_ex : date().add(60, 'days').format('YYYY-MM-DD h:mm:ss')   },
                    });
                }else{
                    res.status(400);
                    res.json({
                       success: 0,
                       data : "Password Salah" 
                    });
                }
             } else {
                 res.status(400);
                  res.json({
                     success: 0,
                     data : error.validate(result.code)  
                  });
             }
    }
    async token(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken == null) {
          res.status(401).json({
            succes: "0",
            message: "Token tidak di temukan",
          });
        }
    
       await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            res.status(401).json({
              succes: "0",
              message: "Invalid Token",
            });
          } else {
            let accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
              algorithm:"HS256",
              expiresIn: process.env.ACCESS_TOKEN_LIFE,
            });
            let refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, {
                algorithm:"HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE,
              });

            res.cookie("refreshToken", refreshToken, {
                secure: false,
                httpOnly: true,

              });

            res.cookie("accessToken", accessToken, {
                secure: false,
                httpOnly: true,

              });   
            res.status(200);
            res.json({
                accessToken:{token : accessToken,
                tanggal_ex : date().add(15, 'minutes').format('YYYY-MM-DD h:mm:ss') },
                refreshToken: {token : refreshToken,
                tanggal_ex : date().add(60, 'days').format('YYYY-MM-DD h:mm:ss')   },
            });
          }
        });
    }
    async coba(req, res) {
        res.status(200);
        res.json({
           success: 0,
           data : "coba coba kak"  
        });
    }

}

module.exports = new authontrollers();
