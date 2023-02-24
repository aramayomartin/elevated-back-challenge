// To handle back
var express = require('express');
var router = express.Router();

const Books = require('./book.js');

router.use('/',Books);

module.exports = router;
