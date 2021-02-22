const authModel = require("../model/auth");
const error = require("../middleware/err");
const validation = require("../middleware/validation");
const token = require("./generate_token");

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
                    token.create_token(result[0].id_autentikasi,tokenUserinfo,res)
                 
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
        token.show_token(refreshToken,res)
    }
    async coba(req, res) {
        res.status(200);
        res.json({
           success: 0,
           data : "coba coba kak"  
        });
    }
    async logout(req, res) {
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
        token.remove_token(req.body.id_autentikasi,res)
    }
}

module.exports = new authontrollers();
