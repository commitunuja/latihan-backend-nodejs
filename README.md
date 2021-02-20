membuat project : 

npm init 

menambahkan library digunakan :

npm install bcrypt body-parser cors express express-validator jsonwebtoken knex multer mysql nodemon --save

- express = framework digunakan untuk backend  di nodejs
- body-parser = mengambil data dari form 
- bcrypt = membuat hashing kata sandi
- cors =  mekanisme yang membolehkan untuk dapat diakses dari suatu halaman web dengan domain tertentu di luar domain
- express-validator = membuat validasi pada middleware ketika paramter tidak sesuai
- knex = SQL query builder
- mysql = mengunakan database mysql
- multer = digunakan sebagai proses upload file
- jsonwebtoken = membuat token authentication dan mengamankan request ilegal
- nodemon = untuk menjalakan file index.js dengan 1 kali perintah

membuat latihan 
1. crud
    - simpan
        POST (http://localhost:8080/crud/)

        paramter body : nama,alamat,jenis_kelamin,telepon

    - edit 
        PUT (http://localhost:8080/crud/1)

        paramter url : id_crud
        
        paramter body : nama,alamat,jenis_kelamin,telepon

    - hapus 
        DELETE (http://localhost:8080/crud/1)

        paramter url : id_crud

    - tampil 
        GET (http://localhost:8080/crud/)

2. upload
    - gambar
    - file
3. autentikasi
    - daftar
    - login
