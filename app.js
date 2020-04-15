
const express = require("express");// express modülünü çağıyoruz
const app = express();//app adında bir değişken bundan sonra expres modülü bu şekilde işlem görecek
const path = require('path');// dosya yolu
const mysql = require('mysql');// mysql database çağıralım

//database bağlantı girişi yapalım not:bundan önce mysql ilgili tablo yapılıp username verildi

app.use(express.json());// gönderilen veriyi json parametrelerine çevirmek için
app.use(express.urlencoded({ extended: true })); // gönderilen veriyi 


let connection = mysql.createConnection({ 
   host: 'localhost',
   user: 'aknels',
   password: 'xkg5zeze',
   database: 'sampledb',
});

//bağlantı gerçekleştikten sonra hata verirse ve gerçekleşirse gelenc msg
connection.connect(function(err) {
  if (err) throw err;
  console.log("Database ile bağlantı kuruldu!");

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


// web sayfa üzerine formu almak 
const requestListener=app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/public'+'/index.html'));
});

 
// web sayafası üzerinde port açmak ve console yollamak
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});