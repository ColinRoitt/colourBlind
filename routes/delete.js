var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');

router.get('/:fileName', function (req, res) {
    let pth = path.join(__dirname, `../USER_UPLOADS/${req.params.fileName}`);
    fs.unlink(pth, (err) => {
        if (err) {
            console.log("failed to delete local image:" + err);
        }
    });
});

module.exports = router;
