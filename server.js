const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
var bodyParser = require('body-parser');
const path = require('path');
var mysql = require('mysql');
const { url } = require('inspector');

var con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "be33768d2bcc8f",
  password: "3cb36c5b",
  database: "heroku_5c062220028c37e"
});

function handleDisconnect() { // Recreate the connection, since the old one cannot be reused.

con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

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
    var s = "SELECT id from urls WHERE url='"+url+"'";
    con.query(s, function(req, r){
      if (r.length>0) {
        res.send({shortenedURL:"urlq.herokuapp.com/"+r[0].id});
      }      
    })
    const query = "INSERT INTO urls(url) VALUES ('"+url+"')";
    con.query(query, function (err, result) {
      if (err) throw err;
      var select = "SELECT id from urls WHERE url='"+url+"'";
      con.query(select, function(err,result){
        if (err) throw err;
        res.send({shortenedURL:"urlq.herokuapp.com/"+result[0].id});
      })
    });
    res.end;
})

app.get('/:id', function(req, res){
    var id = req.params.id;
    var select = "SELECT url from urls WHERE id="+id+"";
      con.query(select, function(err,result){
        if (err) throw err;
        if (result.length>0) {
          res.redirect(result[0].url);
        }else
        res.redirect("https://urlq.herokuapp.com");
      })
})

app.listen(PORT, ()=>{
    console.log(`Listening on PORT @${PORT}`)
})