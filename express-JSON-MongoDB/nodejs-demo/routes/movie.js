var express = require('express');
var Movie = require('./../models/Movie.js');
var router = express.Router();

/* GET movie page. */
router.get('/add', MovieAdd).post('/add', doMovieAdd).get('/:name', MovieAdd).get('/json/:name', movieJSON);

function MovieAdd(req, res, next) {
  if (req.params.name) { //update
    return res.render('movie', {
      title: req.params.name + '|电影|管理|moive.me',
      label: '编辑电影:' + req.params.name,
      movie: req.params.name
    });
  } else {
    return res.render('movie', {
      title: '新增加|电影|管理|moive.me',
      label: '新增加电影',
      movie: false
    });
  }
}

function doMovieAdd(req, res, next) {
  console.log(req.body.content);
  var json = req.body.content;
  // //var json = JSON.parse(req.body.content);

  if (json._id) { //update

  } else { //insert
    Movie.save(json, function(err) {
      if (err) {
        res.send({
          'success': false,
          'err': err
        });
      } else {
        res.send({
          'success': true
        });
      }
    });
  }
}

function movieJSON(req, res, next) {
  Movie.findByName(req.params.name, function(err, obj) {
    res.send(obj);
  });
}
module.exports = router;
