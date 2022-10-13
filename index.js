// run `node index.js` in the terminal
const express = require('express')
const bodyParser = require('express')
const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/prodect" method="POST"><input type="text" name="title"><button type="submit">Add Prodect</button></form>')
})

app.use('/prodect', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    res.send('<h1>hello from express!<h1>')
})

app.listen(8080)
