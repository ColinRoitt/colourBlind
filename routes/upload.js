var express = require('express');
var Jimp = require('jimp');
var router = express.Router();

router.post('/', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.sampleFile;
  let timestamp = Date.now();
  let fileName = `${'.'}/USER_UPLOADS/${timestamp}.jpg`;

  sampleFile.mv(fileName, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    new Jimp(fileName, (err, img) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      //do some maths
      let oldWidth = img.getWidth();
      let oldHeight = img.getHeight();
      let max = 500;
      let newWidth = oldWidth;
      let newHeight = oldHeight;

      if (oldWidth > max) {
        newWidth = max;
        newHeight = newWidth * oldHeight / oldWidth;
      } else if (oldHeight > max) {
        newHeight = max;
        newWidth = newHeight * oldWidth / oldHeight;
      }

      img.resize(newWidth, newHeight, _ => {
        img.writeAsync(fileName)
          .then(_ => {
            img.getBase64Async(Jimp.AUTO)
              .then(img => {
                res.json({
                  'status': 'success',
                  'name': timestamp,
                  'path': `${timestamp}.jpg`,
                  'original': img
                });
              });
          });
      })

    });
  });
});

module.exports = router;
