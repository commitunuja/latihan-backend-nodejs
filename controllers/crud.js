const crudModel = require("../model/crud");
const error = require("../middleware/err");
const {
  validationResult
} = require("express-validator");

const errorFormatter = ({
  msg,
  param
}) => {
  return `${param}: ${msg}`;
};

class CrudControllers {
     async simpan(req, res) {
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
       const result = await crudModel.simpan(data)
        if (result != "" && result != undefined && result.code == undefined) {
            res.status(200);
            res.json({
                success: 1,
                data : {"id_crud" : result[0],
                        ...data}
            });
        } else {
            res.status(400);
             res.json({
                success: 0,
                data : error.validate(result.code)  
             });
        }
    }
    async edit(req, res) {
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
        const result = await crudModel.edit({...req.params,data})
        if (result != "" && result != undefined && result.code == undefined) {
            res.status(200);
            res.json({
                success: 1,
                data : {...req.params,...data}
            });
        } else {
            res.status(400);
             res.json({
                success: 0,
                data : error.validate(result.code)  
             });
        }
    }
    async hapus(req, res) {
        const result = await crudModel.hapus({...req.params})
        if (result != "" && result != undefined && result.code == undefined) {
             res.status(200);
            res.json({
                success: 1,
            });
        } else {
            res.status(400);
             res.json({
                success: 0,
                data : error.validate(result.code)  
             });
        }
    }
    async tampil(req, res) {
        const result = await crudModel.tampil()
        if (result != "" && result != undefined && result.code == undefined) {
            res.status(200);
            res.json({
                success: 1,
                data : result
            });
        } else {
            res.status(400);
             res.json({
                success: 0,
                error : error.validate(result.code)
            });
        }
    }
}

module.exports = new CrudControllers();