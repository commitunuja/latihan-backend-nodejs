const uploads = require("../middleware/multer");
const error = require("../middleware/err");
const uploadModel = require("../model/upload");
const fs = require("fs");


class uploadControllers {
    async tampil(req, res) {
        const result = await uploadModel.tampil()
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
    async simpan(req, res) {
        await uploads(req, res, err =>  {
            if(err){
                 res.status(422).json({
                     succes: "0",
                     errors: err
                 });
            }else if (!req.file) {
                  res.status(422).json({
                     succes: "0",
                     errors: "File Kosong"
                 });
            }else{
                let input = {
                    nama_file : req.file.filename,
                    tempat_file : process.env.urlfoto+req.file.filename
                }
                const result = uploadModel.upload(input)
                 if (result != "" && result != undefined && result.code == undefined) {
                     res.status(200);
                     res.json({
                         success: 1,
                         data : {"id_upload" : result[0],
                                 ...input}
                     });
                 } else {
                     res.status(400);
                      res.json({
                         success: 0,
                         data : error.validate(result.code)  
                      });
                 }
            }
 
         });
        
    }
    async edit(req, res) {
        const result = await uploadModel.cari({...req.params})
            if (result != "" && result != undefined && result.code == undefined) {
                const nama_foto = result[0].nama_file;
                uploads(req, res, err =>  {
                    if(err){
                         res.status(422).json({
                             succes: "0",
                             errors: err
                         });
                    }else if (!req.file) {
                          res.status(422).json({
                             succes: "0",
                             errors: "File Kosong"
                         });
                    }else{
                        let input = {
                            nama_file : req.file.filename,
                            tempat_file : process.env.urlfoto+req.file.filename
                        }
                        const result = uploadModel.upload_pembaruan({...req.params,input})
                         if (result != "" && result != undefined && result.code == undefined) {
                             res.status(200);
                             res.json({
                                 success: 1,
                                 data : {"id_upload" : result[0],
                                         ...input}
                             });
                             fs.unlinkSync(process.env.pathfoto + nama_foto);
                         } else {
                             res.status(400);
                              res.json({
                                 success: 0,
                                 data : error.validate(result.code)  
                              });
                         }
                    }
         
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
        const result = await uploadModel.cari({...req.params})
        if (result != "" && result != undefined && result.code == undefined) {
            const nama_foto = result[0].nama_file;
                const hapus = uploadModel.hapus({...req.params})
                if (hapus != "" && hapus != undefined && hapus.code == undefined) {
                    res.status(200);
                    res.json({
                        success: 1,
                    });
                    fs.unlinkSync(process.env.pathfoto + nama_foto);
                } else {
                    res.status(400);
                    res.json({
                        success: 0,
                        data : error.validate(result.code)  
                    });
                }
        } else {
            res.status(400);
             res.json({
                success: 0,
                error : error.validate(result.code)
            });
        }    
    }
}

module.exports = new uploadControllers();