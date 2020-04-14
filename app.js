
const express = require("express");// express modülünü çağıyoruz
const app = express();//app adında bir değişken bundan sonra expres modülü bu şekilde işlem görecek
const path = require('path');// dosya yolu
const mysql = require('mysql');// mysql database çağıralım
const http = require("http");
//database bağlantı girişi yapalım not:bundan önce mysql ilgili tablo yapılıp username verildi
let connection = mysql.createConnection({ 
   host: 'localhost',
   user: 'aknels',
   password: 'xkg5zeze',
   database: 'sampledb',
});

//bağlantı gerçekleştikten sonra hata verirse ve gerçekleşirse gelenc msg
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // web sayfası(istemciden) üzerinden bilgi göndermek(sunucuya/server)  VE consol da göstermek
  app.post("/gonder", (req, res) => {
   console.log(req.body);
   res.send("gönderildi");
   //html input bilgilerine değişken atıyorum 
   const id     = req.body.id;
   const Adi    = req.body.Adı;
   const Soyadi  = req.body.Soyadı;
   const nummber = req.body.no;

  //database ekliyorum
  const sql = `INSERT INTO mysampletable (ID, ADI, SOYADI, NO) VALUES ('${id}', '${Adi}', '${Soyadi}','${nummber}' )`;
  connection.query(sql,function (err, data) {
    if (err) throw err;
         console.log("record inserted");
     });
    res.redirect('/user');
   });
  
});


app.use(express.json());// gönderilen veriyi json parametrelerine çevirmek için
app.use(express.urlencoded({ extended: true })); // gönderilen veriyi 


// web sayfa üzerine formu almak 
const requestListener=app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/public'+'/index.html'));
});

 
// web sayafası üzerinde port açmak ve console yollamak
const server = http.createServer(requestListener);
server.listen(8000);
 

