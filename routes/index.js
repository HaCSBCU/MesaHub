var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Test',
    announcements: [
      {
        title: 'Title 1',
        date: '11th March 20:15',
        body: 'Here is some body text'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      }
    ]
  };
  res.render('index', data);
});

module.exports = router;
