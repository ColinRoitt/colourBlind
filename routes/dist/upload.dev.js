"use strict";

var express = require('express');

var Jimp = require('jimp');

var router = express.Router();
router.post('/', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  var sampleFile = req.files.sampleFile;
  var timestamp = Date.now();
  var fileName = '.'.concat("/USER_UPLOADS/", timestamp, ".jpg");
  sampleFile.mv(fileName, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    new Jimp(fileName, function (err, img) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } //do some maths


      var oldWidth = img.getWidth();
      var oldHeight = img.getHeight();
      var max = 500;
      var newWidth = oldWidth;
      var newHeight = oldHeight;

      if (oldWidth > max) {
        newWidth = max;
        newHeight = newWidth * oldHeight / oldWidth;
      } else if (oldHeight > max) {
        newHeight = max;
        newWidth = newHeight * oldWidth / oldHeight;
      }

      img.resize(newWidth, newHeight, function (_) {
        img.writeAsync(fileName).then(function (_) {
          img.getBase64Async(Jimp.AUTO).then(function (img) {
            res.json({
              'status': 'success',
              'name': timestamp,
              'path': "".concat(timestamp, ".jpg"),
              'original': img
            });
          });
        });
      });
    });
  });
});
module.exports = router;