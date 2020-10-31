const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
var bodyParser = require('body-parser');
const path = require('path');
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "be33768d2bcc8f",
  password: "3cb36c5b"
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
    res.send({shortenedURL:req.body.url});
})

app.listen(PORT, ()=>{
    console.log(`Listening on PORT @${PORT}`)
})