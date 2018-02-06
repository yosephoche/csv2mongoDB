var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

let path = require('path');
let csv = require('fast-csv');
let fs = require('fs');
let mongoose = require('mongoose');

let Product = mongoose.model('Products');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Import CSV file using nodeJs' });
});

router.get('/import', (req, res, next) => {
  
  // change this if u want choose csv file manually
  // req.files.file;
  // add form in view file with input type file with name file.
  let csvfile = path.resolve('./products.csv');
  let stream = fs.createReadStream(csvfile);
  
  const products = [];

  const csvStream = csv().on('data', (data) => {
    const item = new Product({
      name: data[0],
      price: data[1],
      category: data[2],
      description: data[3],
      manufacturer: data[4]
    });

    item.save((error) => {
      console.log(item)
      if (error) {
        throw error;
      }
    });
  }).on('end', () => {
    console.log('End of import file');
  });

  stream.pipe(csvStream);

  res.json({success: "Data imported successfully.", status: 200});
});

router.get('/fetchdata', (req, res, next) => {
  Product.find({}, function(err, docs) {
    if (!err){ 
      res.json({success : "Updated Successfully", status : 200, data: docs});

    } else { 
      throw err;
    }
  });
});

router.post('/import2', multipartMiddleware, (req, res, next) => {
  const csvOptions = {
    headers: true //set true for ignore first line
  };
  
  let csvPath = req.files.csvfile.path;
  let csvfile = path.resolve(csvPath);
  let stream = fs.createReadStream(csvfile);
  const csvStream = csv.fromPath(csvPath, csvOptions).on('data', (data) => {
    // console.log(data);
    const item = new Product(data);

    item.save((error) => {
      console.log(item)
      if (error) {
        throw error;
      }
    });
  })
  .on("end", function(){
    console.log("done");
  });

  stream.pipe(csvStream);

  res.json({success: "Data imported successfully.", status: 200});

});

module.exports = router;
