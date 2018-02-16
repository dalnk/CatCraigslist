const express = require('express');
const router = express.Router();

let model = require('../models/')
let pets = require('../json/pets')
let comments = require('../json/comments')


// INDEX
router.get('/', (req, res) => {
  res.send(pets);
});

// NEW
router.get('/new', (req, res) => {
  res.render('cats-new');
});

// SHOW
router.get('/:index', (req, res) => {
  model.Cat.findById(req.params.index ).then(cat => {
    res.render('cats-show', {cat:cat, comments:comments})
  })
});

// LOVE
router.get('/:index/love', (req, res) => {
  model.Cat.findById(req.params.index ).then(cat => {
    res.render('cats-love', {cat:cat})
  })
});

// CREATE
router.post('/', (req, res) => {
    model.Cat.create(req.body)
    res.redirect('/');
});

// EDIT
router.get('/:index/edit', (req, res) => {
  model.Cat.findById(req.params.index ).then(cat => {
    res.render('cats-edit', {cat:cat})
  })
});

// UPDATE
router.put('/:index', (req, res) => {
  model.Cat.findById(req.params.index).then(cat => {
    cat.update(req.body)
  })
  res.redirect(`/cats/${req.params.index}`)
});

// DESTROY
router.delete('/:index', (req, res) => {
  model.Cat.findById(req.params.index).then(cat => {
    cat.destroy()
  })
  res.redirect('/');
});


module.exports = router;
