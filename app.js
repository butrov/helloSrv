// const http = require('http');
// const port = process.env.PORT || 3001

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1>Hello World</h1>');
// });

// server.listen(port,() => {
//   console.log(`Server running at port `+port);
// });
//------------------------
const port = process.env.PORT || 3001
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const superagent = require('superagent');

app.get('/', (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

console.log(`app.get`);
//res.status(200)
//.send(`Hello World! Our server is running at port ${port}`);
superagent.get('http://doprtr.intech.ru:5050/httpproxy/192.168.8.137:4125/MeteoSrv/Service1.asmx/getMeteoData')
.query()
.end((err, res1) => {
  if (err) { return console.log(err); }
  //console.log(res1.body);
  console.log(res1.text);
  //console.log(res);
  //res.json({guid: res1.body});
  let res2 = {};
  try{
    const json1 = res1.text.replace(/<[^>]+>/g,"");
    res2 = JSON.parse(json1);
  }
  catch(e){res2.err=e.message}
  res.json(res2);
});
});

server.listen(port, () => {
console.log(`Server running at port ${port}`);
});