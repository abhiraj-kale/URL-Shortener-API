const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
var bodyParser = require('body-parser');
const path = require('path');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "be33768d2bcc8f",
  password: "3cb36c5b",
  database: "heroku_5c062220028c37e"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySql!");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/routes', express.static(path.join(__dirname, 'routes')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/getlink', (req, res)=>{
    var url = req.body.url;
    var s = `SELECT id from urls WHERE url='${url}'`;
    con.query(s, function(req, r){
      if (r.length>0) {
        res.send({shortenedURL:"urlq.herokuapp.com/"+r[0].id});
        return;
      }      
    })
    const query = `INSERT INTO urls(url) VALUES ('${url}')`;
    con.query(query, function (err, result) {
      if (err) throw err;
      var select = `SELECT id from urls WHERE url='${url}'`;
      con.query(select, function(err,result){
        if (err) throw err;
        res.send({shortenedURL:"urlq.herokuapp.com/"+result[0].id});
      })
    });
})

app.get('/:id', function(req, res){
    var id = req.params.url;
    var select = `SELECT url from urls WHERE id='${id}'`;
      con.query(select, function(err,result){
        if (err) throw err;
        if (result.length>0) {
          res.redirect(result[0].url);
        }else
        res.end(`<h1>No such URL exists.</h1><a href="https://urlq.herokuapp.com/">Create one</a>`);
      })
})

app.listen(PORT, ()=>{
    console.log(`Listening on PORT @${PORT}`)
})