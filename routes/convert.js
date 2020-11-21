var express = require('express');
var router = express.Router();
var path = require('path');
var blinder = require('color-blind');
var Jimp = require('jimp');

router.get('/:colourType/:fileName', function (req, res) {
    console.log('Loading');
    let pth = path.join(__dirname, `../USER_UPLOADS/`);
    let colourType = req.params.colourType.toLowerCase();
    let fileName = req.params.fileName.split('.');
    let sourcePth = `${pth}${fileName[0]}.${fileName[1]}`;
    let outputPth = `${pth}${fileName[0]}_${colourType}.${fileName[1]}`;

    let func;
    switch (colourType) {
        case "protanomaly":
            func = blinder.protanomaly;
            break;
        case "protanopia":
            func = blinder.protanopia;
            break;
        case "deuteranomaly":
            func = blinder.deuteranomaly;
            break;
        case "deuteranopia":
            func = blinder.deuteranopia;
            break;
        case "tritanomaly":
            func = blinder.tritanomaly;
            break;
        case "tritanopia":
            func = blinder.tritanopia;
            break;
        case "achromatomaly":
            func = blinder.achromatomaly;
            break;
        case "achromatopsia":
            func = blinder.achromatopsia;
            break;
    }

    Jimp.read(sourcePth)
        .then(img => {
            let width = img.bitmap.width;
            let height = img.bitmap.height
            new Jimp(width, height, 0x00000000, (err, newImage) => {
                if (err)
                    return res.status(500).json(err);

                for (let x = 0; x <= width; x++) {
                    for (let y = 0; y <= height; y++) {
                        let startingColour = `#${img.getPixelColor(x, y).toString(16)}`.slice(0, -2);
                        let convertedColour = '';
                        convertedColour = Jimp.cssColorToHex(func(startingColour));
                        newImage.setPixelColor(convertedColour, x, y);
                    }
                }
                newImage.getBase64Async(Jimp.AUTO)
                    .then((b64, err) => {
                        res.json(b64);
                    });
            });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
