require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(require('cors')({origin: "http://localhost:3000"}));

const aws = require('aws-sdk');
aws.config.region="us-west-1";
const s3 = new aws.S3();
var fs = require('fs');

app.get('/s3/sign', (req, res)=>{
  var params = {
    Bucket:'linda.aqua.brainstation',
    Key: req.query.objectName,
    Expires: 60,
    ContentType: req.query.contentType,
    ACL: 'public-read'
    
};
  s3.getSignedUrl('putObject', params, function(err, data) {
    if (err) {
        console.log(err);
        return res.send(500, "Cannot create S3 signed URL");
    }
    res.json({
      signedUrl: data
    });
  });
})

const FoodPlate = require('./model/FoodPlate');
mongoose.connect('mongodb://127.0.0.1:27017/whats-on-your-plate', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to db at /data/db/")
});

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
function createNewPlate(url,msg, cb) {
  var visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    iam_apikey: process.env.AWS_ACCESS_KEY_ID
  });
  var classifier_ids = ["food"];
  let message = msg;
  var params = {
    url: url,
    classifier_id:classifier_ids
  };
  let retval = false;
  visualRecognition.classify(params, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      if (response.images.length > 0) {
        let classifiers = response.images[0].classifiers;
        if (classifiers.length > 0) {
          for (let item of classifiers) {
            let current_datetime = new Date();
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            let foodClass = item.classes[0];
            if (foodClass.class.includes('food')|| (foodClass.type_hierarchy && foodClass.type_hierarchy.includes('food'))) {
              let newPlate = new FoodPlate({
                name:foodClass.class,
                type:foodClass.type_hierarchy || 'unknown',
                imgURL:url,
                date:formatted_date,
                message:message
              })
              newPlate.save()
              .then(newPlate => {
                  console.log('new Plate saved:',newPlate);
                  retval = true;
                  return cb(newPlate)
              })
              .catch(err => {
                  console.log(err);
                  return cb(null);
              })
              //
            }
          }
        }
      }
    }
  });
  return retval;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/myplate',(req,res)=>{
  FoodPlate.find({}).then(objectsArray => {
    res.json(objectsArray);
  })
  .catch(err => {
    console.log(err);
    res.status(404)
      .json({err});
  })
})


app.get('/myplate/:id',(req,res)=>{
  FoodPlate.findById(req.params.id).then(object => {
    res.json(object);
  })
  .catch(err => {
    console.log(err);
    res.status(400)
      .json({err});
  })

})

 app.post('/myplate', (req, res) => {
   console.log('myplate post was hit');
   
  let retval = createNewPlate(req.body.url, req.body.msg, (result)=>{
    if (result) {
      res.json(result);
    } else {
      res.status(400).json({data:'err'});
    }
  });
 });

// add date 
app.put('/myplate/:id',(req,res)=>{
  let query = {
    "_id":req.params.id
  };
  let update = {
    "date":req.body.date,
    "name":req.body.name,
    "message":req.body.message
  };
  let option = {
    new:true,
    runValidator:true
  };
  FoodPlate.findOneAndUpdate(query,update,option).then(
    updatedItem=>{
      res.json(updatedItem);
    }

  ).catch(err=>{
    res.status(400).json({err});
  })
})

app.delete('/myplate/:id',(req,res)=>{
  FoodPlate.findOneAndRemove({"_id":req.params.id}).then(
    deletedItem=>{
      res.json({deleted:true});
    }

  ).catch(err=>{
    res.status(400).json({err});
  }

  )
})
app.listen(8080, () => {
    console.log('http://localhost:8080');
})