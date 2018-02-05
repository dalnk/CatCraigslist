const express = require('express');
const router = express.Router();

let model = require('../models/')
let pets = require('../json/pets')

/* GET home page. */
router.get('/', (req, res) => {
  model.Cat.findAll().then(cats => {
    res.render('cats-index', {cats})
  })
});

module.exports = router;
