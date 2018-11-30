const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const PORT = 3050
const pgp= require('pg-promise')()
const connectionString = "postgres://localhost:5432/book"
const db = pgp(connectionString)

// parse application/json
app.use(bodyParser.json())
//-----------------to enable CORS-------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, function(){
  console.log('Server is running...')
})
//-------------------------------------------
app.post('/addBook',function(req,res){
  let title = req.body.title
  let author= req.body.author
  let category =req.body.category
  let year = req.body.year
  let imageUrl = req.body.imageUrl

db.none('INSERT INTO books (booktitle,publisheddate,imageurl,category,author) VALUES ($1,$2,$3,$4,$5)',[title,year,imageUrl,category,author]).then(function(){
  res.json({success: true})
})

})
app.get('/api/getBooks',function(req,res){
  db.any('SELECT id,booktitle,publisheddate,imageurl,category,author FROM books').then(function(response){
      res.json(response)

  })
})
app.delete('/delete-book/:id',function(req,res){
  let bookId = req.params.id

db.none('DELETE from books WHERE id=$1',[bookId]).then(function(){
  console.log('success')
  res.json({success: true})
})
})
app.post('/updateBook/:id',function(req,res){
  let id = req.params.id
  let title = req.body.title
  let author = req.body.author
  let imageUrl = req.body.imageUrl
  let category = req.body.category
  let publishedDate = req.body.publisheddate
db.none('UPDATE books SET booktitle=$1,author=$2,publisheddate=$3,imageurl=$4,category=$5 WHERE id = $6',[title,author,publishedDate,imageUrl,category,id]).then(()=>{
  console.log('update is successful')
  res.json({success:true})
})
})
