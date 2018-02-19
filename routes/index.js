const express = require('express');
const router = express.Router();

let model = require('../models/')
let pets = require('../json/pets')

/* GET home page. */
router.get('/', (req, res) => {
  let limit = 3
  let offset = 0
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

  model.Cat.findAndCountAll({
    where: query
  }).then((data) => {
    let page = req.query.page || 0;
    let pages = Math.ceil(data.count / limit)
    offset = limit * (page - 1)

    model.Cat.findAll({
      where: query,
      limit: limit,
      offset: offset,
      $sort: {id: 1}
    }).then((cats) => {
      res.render('cats-index', {cats, count:data.count, pages})
    }).catch((error) => {
      res.status(500).send('Uh oh spaghettio')
    })

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
