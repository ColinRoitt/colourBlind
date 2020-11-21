var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.sampleFile;
  let timestamp = Date.now();

  sampleFile.mv(`${'.'}/USER_UPLOADS/${timestamp}.jpg`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    output = {
      'status': 'success',
      'name': timestamp,
      'path': `${timestamp}.jpg`
    }
    res.json(output);
  });
});

module.exports = router;
