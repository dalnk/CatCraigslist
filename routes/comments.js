const express = require('express');
const router = express.Router({mergeParams: true});

let comments = require('../json/comments')

// CREATE
router.post('/', (req, res) => {
    comments.unshift(req.body);

    res.redirect('/cats/0');
});

// DESTROY
router.delete('/:index', (req, res) => {
  res.redirect(`/cats/${req.params.id}`);
});



module.exports = router;
