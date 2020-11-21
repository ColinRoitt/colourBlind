var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let timestamp = Date.now();

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`${'.'}/USER_UPLOADS/${timestamp}.jpg`, function (err) {
    if (err)
      return res.status(500).send(err);

    output = {
      'status': 'success',
      'name': timestamp,
      'path': `${timestamp}.jpg`
    }
    res.json(output);
  });
});

module.exports = router;