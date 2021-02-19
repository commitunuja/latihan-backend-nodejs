const conn = require("../database/conn");

class crud {

    async simpan(data){
        return await conn("crud")
            .insert(data)
            .then((res) => res)
            .catch((err) => err);
    }
    async edit({ id_crud, data }) {
        return await conn("crud")
            .where("id_crud", id_crud)
            .update(data)
            .then((res) => res)
            .catch((err) => err);
    }
    async hapus({id_crud}) {
         return await conn("crud")
            .where("id_crud", id_crud)
            .del()
            .then((res) => res)
            .catch((err) => err);
    }
    async tampil() {
        return await conn("crud")
            .select("*")
            .then((res) => res)
            .catch((err) => err);
    }

   
}

module.exports = new crud();