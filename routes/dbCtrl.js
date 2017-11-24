const mongoose = require('mongoose');
const Image = mongoose.model('images');
const path = require('path');
const PATH_IMG = path.join(__dirname, '..public/uploads/');

module.exports = {
    create: (req, res) => {

        const image = req.body;
        
        new Image({
            src: image.src,
            title: image.title
        })
        .save((err) => {
            if (err) {
                res.status(504)
                res.end(err)
            } 
            else {
              res.json({
              result: {
                  src: image.src,
                  title: image.title
              },
                  path: PATH_IMG
              })
                  res.end()
            }
        })
    }
};