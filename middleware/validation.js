const { check } = require('express-validator');

//membuat validasi paramter jika kosong atau tdak Sesuai dengan kententuan
exports.validate = (method) => {
  switch (method) {
    case "crud": {
       return [ 
        check('nama',"nama kosong").not().isEmpty(),
        check('jenis_kelamin',"pilih jenis kelamin Laki-laki atau Perempusan").optional().isIn(['L', 'P']),
        check('jenis_kelamin',"Jenis kelamin kosong").not().isEmpty(),
        check('alamat',"alamat kosong").not().isEmpty(),
        check('telepon',"telepon kosong").not().isEmpty(),
        check('telepon',"telepon harus mengunakan angka").optional().isInt(),

       ];
    }
  }
};
