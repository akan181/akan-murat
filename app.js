
var express=require('express');
var mysql = require('mysql');
var app=express();
var fs=require('fs');
var http=require('http');
var reload=require('reload');



let connection = mysql.createConnection({
  host: 'localhost',
  user: 'aknels',
  password: 'xkg5zeze',
  database: 'sampledb',
});

connection.connect(function (err) {
  if (!!err) {
  console.log('olmadı'); 
} else {
    console.log('MySQL bağlantısı başarıyla gerçekleştirildi.'); 
  }
  
});


app.get('/',function(req,res) {
  connection.query("SELECT*FROM mySampleTable",function(err,rows,fields){
       if (!!err) {
         console.log('hata');
       }   else {
           console.log('Başarılı...');
      }

  })
});


var sunucu=http.createServer(function(req,res){
   fs.readFile(__dirname + '/index.html',
  function (err, data) {
   if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
   }
 
   res.writeHead(200);
   res.end(data);
  }); 

});



sunucu.listen(3000);
reload(app)



