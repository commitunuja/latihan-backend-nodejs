const jwt = require("jsonwebtoken");
const tokenModel = require("../model/token");
const moment = require("moment");
const error = require("../middleware/err");


module.exports = {

  async create_token(id_autentikasi, data,res) {
    const result = await tokenModel.tampil(id_autentikasi)
    if (result != "" && result != undefined && result.code == undefined) {

        const ex_access_token = moment(result[0].ex_access_token,"YYYY-MM-DD HH:mm:ss").diff(moment().format("YYYY-MM-DD HH:mm:ss"), 'minutes');
        const ex_refresh_token   = moment(result[0].ex_refresh_token,"YYYY-MM-DD HH:mm:ss").diff(moment().format("YYYY-MM-DD HH:mm:ss"), 'days');

        let accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
          algorithm:"HS256",
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
              algorithm:"HS256",
              expiresIn: process.env.REFRESH_TOKEN_LIFE,
        });
        
    
        await jwt.verify(result[0].refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            res.cookie("refreshToken", result[0].refresh_token, {
              secure: false,
              httpOnly: true,
        
            });
        
            res.cookie("accessToken", result[0].access_token, {
              secure: false,
              httpOnly: true,
        
            });   
            tokenModel.edit(
              {
                 id_autentikasi : id_autentikasi
              },
              {
                  access_token : accessToken,
                  ex_access_token : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                  refresh_token : refreshToken,
                  ex_refresh_token : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')
              }
            )
            res.status(200);
            res.json({
              accessToken:{token : accessToken,
              tanggal_ex : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss') },
              refreshToken: {token : refreshToken,
              tanggal_ex : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')   },
              da : 44
            });
          } else {
            res.cookie("refreshToken", result[0].refresh_token, {
              secure: false,
              httpOnly: true,
        
            });
        
            res.cookie("accessToken", result[0].access_token, {
              secure: false,
              httpOnly: true,
        
            });   
        
            res.status(200);
            res.json({
              accessToken:{token : result[0].access_token,
              tanggal_ex : "masa aktif token kurang "+ex_access_token+" menit" },
              refreshToken: {token : result[0].refresh_token,
              tanggal_ex :"masa aktif token kurang "+ex_refresh_token+" hari"},
              da : 3
            });
          }
        });

        if(ex_access_token < 3){
          res.cookie("refreshToken", result[0].refresh_token, {
            secure: false,
            httpOnly: true,
      
          });

          res.cookie("accessToken", accessToken, {
            secure: false,
            httpOnly: true,

          });   

          res.status(200);
          await tokenModel.edit(
            {
              id_autentikasi : id_autentikasi
            },
            {
                access_token : accessToken,
                ex_access_token : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
            }
          )
          res.json({
            accessToken:{token : accessToken,
            tanggal_ex :  moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss') },
            da : 2
        }); 
        }
      
        if(ex_refresh_token < 10){
          res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,

          });

          res.cookie("accessToken", accessToken, {
            secure: false,
            httpOnly: true,

          });  
          res.status(200);
          await tokenModel.edit(
            {
               id_autentikasi : id_autentikasi
            },
            {
                access_token : accessToken,
                ex_access_token : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                refresh_token : refreshToken,
                ex_refresh_token : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')
            }
          )
        
          res.json({
            accessToken:{token : accessToken,
            tanggal_ex : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss') },
            refreshToken: {token : refreshToken,
            tanggal_ex : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')   },
            da : 1
          });
        }


    }else{
        //simpan
        let accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            algorithm:"HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
        });

        let refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
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

        await tokenModel.simpan(
            {
                id_autentikasi : id_autentikasi,
                access_token : accessToken,
                ex_access_token : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                refresh_token : refreshToken,
                ex_refresh_token : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')
            }
        )

        res.json({
            accessToken:{token : accessToken,
            tanggal_ex : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss') },
            refreshToken: {token : refreshToken,
            tanggal_ex : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')   },
        });

    }
  },

  async show_token(data,res) {
    
       let input = {};
       await jwt.verify(data, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
              res.status(401).json({
                succes: "0",
                message: "Invalid Token",
              });
            } else {
              input = {
                id_autentikasi : user.id_autentikasi,
                username : user.username,
                password : user.password
              }
            }
       });
        const result = await tokenModel.tampil(input.id_autentikasi)
        if (result != "" && result != undefined && result.code == undefined) {
          const ex_access_token = moment(result[0].ex_access_token,"YYYY-MM-DD HH:mm:ss").diff(moment().format("YYYY-MM-DD HH:mm:ss"), 'minutes');
          const ex_refresh_token   = moment(result[0].ex_refresh_token,"YYYY-MM-DD HH:mm:ss").diff(moment().format("YYYY-MM-DD HH:mm:ss"), 'days');

          let accessToken = jwt.sign(input, process.env.ACCESS_TOKEN_SECRET, {
            algorithm:"HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
          });

          let refreshToken = jwt.sign(input, process.env.REFRESH_TOKEN_SECRET, {
                algorithm:"HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE,
          });

          if(ex_access_token < 3){
            res.cookie("refreshToken", refreshToken, {
              secure: false,
              httpOnly: true,
  
            });
  
            res.cookie("accessToken", accessToken, {
              secure: false,
              httpOnly: true,
  
            });   

            res.status(200);
            await tokenModel.edit(
              {
                id_autentikasi : input.id_autentikasi
              },
              {
                  access_token : accessToken,
                  ex_access_token : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
              }
            )
            res.json({
              accessToken:{token : accessToken,
              tanggal_ex :  moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss') },
          }); 
          }
        
          if(ex_refresh_token < 10){
            res.cookie("refreshToken", refreshToken, {
              secure: false,
              httpOnly: true,
  
            });
  
            res.cookie("accessToken", accessToken, {
              secure: false,
              httpOnly: true,
  
            });  
            res.status(200);
            await tokenModel.edit(
              {
                 id_autentikasi : input.id_autentikasi
              },
              {
                  access_token : accessToken,
                  ex_access_token : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                  refresh_token : refreshToken,
                  ex_refresh_token : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')
              }
            )
          
            res.json({
              accessToken:{token : accessToken,
              tanggal_ex : moment().add(process.env.ACCESS_TOKEN_LIFE_TIME, 'minutes').format('YYYY-MM-DD HH:mm:ss') },
              refreshToken: {token : refreshToken,
              tanggal_ex : moment().add(process.env.REFRESH_TOKEN_LIFE_TIME, 'days').format('YYYY-MM-DD HH:mm:ss')   },
            });
          }
          res.status(200);
          res.json({
            accessToken:{token : result[0].access_token,
            tanggal_ex : "masa aktif token kurang "+ex_access_token+" menit" },
            refreshToken: {token : result[0].refresh_token,
            tanggal_ex :"masa aktif token kurang "+ex_refresh_token+" hari"},
          });

        }else{
          res.status(401).json({
            succes: "0",
            message: "Login terlebih dahulu",
          
          });
        }
  },

  async remove_token(id_autentikasi,res) {
      const result = await tokenModel.hapus(id_autentikasi)
      if (result != "" && result != undefined && result.code == undefined) {
        res.status(200);
        res.json({
           success: 1,
        });
      }else{
        res.status(400);
        res.json({
           success: 0,
           data : error.validate(result.code)  
        });
      }
  }
}