const conn = require("../database/conn");

class tokenModel {
    
    async simpan(data){
        return await conn("token")
            .insert(data)
            .then((res) => res)
            .catch((err) => err);
    }

    async edit({id_autentikasi},data) {
        return await conn("token")
            .where("id_autentikasi ", id_autentikasi )
            .update(data)
            .then((res) => res)
            .catch((err) => err);
    }
    async hapus(id_autentikasi) {
        return await conn("token")
           .where("id_autentikasi", id_autentikasi)
           .del()
           .then((res) => res)
           .catch((err) => err);
   }
    async tampil(id_autentikasi ) {
        return await conn("token")
            .select("*")
            .where("id_autentikasi ",id_autentikasi)
            .then((res) => res)
            .catch((err) => err);
    }
}

module.exports = new tokenModel();