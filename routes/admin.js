const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-prodect" method="POST"><input type="text" name="title"><button type="submit">Add Prodect</button></form>')
})


router.post('/add-prodect', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
})

module.exports = router;
