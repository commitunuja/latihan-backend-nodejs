const conn = require("../database/conn");

class uploadModel{

    async upload(data){
        return await conn("upload")
            .insert(data)
            .then((res) => res)
            .catch((err) => err);
    }
    async upload_pembaruan({ id_upload, data }) {
        return await conn("upload")
            .where("id_upload", id_upload)
            .update(data)
            .then((res) => res)
            .catch((err) => err);
    }
    async cari({id_upload}) {
        return await conn("upload")
            .select("*")
            .where("id_upload",id_upload)
            .then((res) => res)
            .catch((err) => err);
    }
    async tampil() {
        return await conn("upload")
            .select("*")
            .then((res) => res)
            .catch((err) => err);
    }

    async hapus({id_upload}) {
        return await conn("upload")
           .where("id_upload", id_upload)
           .del()
           .then((res) => res)
           .catch((err) => err);
   }
}

module.exports = new uploadModel();