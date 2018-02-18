const express = require('express');
const router = express.Router();

let model = require('../models/')
let pets = require('../json/pets')

/* GET home page. */
router.get('/', (req, res) => {
  query = {}
  // Check if search term present
  if(req.query.search) {
    sanitary = "%" + req.query.search + "%"

    query = {
      $or: [{name:{$iLike: sanitary}},
        {species:{$iLike: sanitary}},
        {bio:{$iLike: sanitary}}]
    }
  }

  model.Cat.findAll({
    where:query
  }).then((cats) => {
    res.render('cats-index', {cats})
  })

});

router.post('/', (req, res) => {
  // Check if search term present
  if(req.query.search) {
    sanitary = "%" + req.query.search + "%"

    query = {
      $or: [{name:{$iLike: sanitary}},
        {species:{$iLike: sanitary}},
        {bio:{$iLike: sanitary}}]
    }

    model.Cat.findAll({
      where:query
    }).then((cats) => {
      res.render('cats-index', {cats})
    })
  }
})

module.exports = router;
