# 🌐 Latihan Backend dengan Node Js (Express Js)

membuat project : 

```bash

npm init

```

menambahkan library digunakan :

```bash

npm install bcrypt body-parser cors express express-validator jsonwebtoken knex multer mysql nodemon  dotenv --save

```

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
- dotenv = membuat konfirgurasi

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
    - upload gambar
      
      Multipart : nama_file
      
      POST (http://localhost:8080/upload/)

    - pembaruan gambar

      paramter url : id_upload
    
      Multipart : nama_file
      
      POST (http://localhost:8080/upload/1)

    - tampil

      GET (http://localhost:8080/upload/)

    - hapus

      DELETE (http://localhost:8080/upload/1)

      paramter url : id_crud 

3. autentikasi
    - daftar
    - login
