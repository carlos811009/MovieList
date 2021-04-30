const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const movieList = require('./movieList.json')

//定義一個引擎 設定要使用哪種引擎(handlebars)並且設定預設值預設檔案main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

//定義引擎之後，要設定這個引擎是什麼引擎，是view engine 並且種類是handlebars
app.set('view engine', 'handlebars')

app.get('/movie/:id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.querystring
  const movies = movieList.results.filter(movie => { return movie.title.toLowerCase().includes(keyword.toLowerCase()) })
  res.render('index', { movie: movies, keyword: keyword })
})

app.use(express.static('public'))
//注意建立的資料夾 必須一模一樣 views & layouts
app.get('/', (req, res) => {
  res.render('index', { movie: movieList.results })
})

//設定express使用的bootstrap檔案放在哪個資料夾


app.listen(port, () => {
  console.log('ok')
})