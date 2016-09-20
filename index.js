const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongo = require('mongodb');
const db = require('monk')("mongodb://localhost:27017/devicelibrary");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

// GET ALL DEVICES
app.get('/devices', (req, res) => {
  req.db.get('devices').find({}).then((devices) => {
    res.send(devices)
  }, (error) => {
    res.error(error)
  });
});

// GET SPECIFIC DEVICE
app.get('/devices/:id', (req, res) => {
  req.db.get('devices').find({_id: req.params.id}).then((device) => {
    res.send(device);
  }, (error) => {
    res.error(error);
  })
});

// POST DEVICE
app.post('/devices', (req, res) => {
  req.db.get('devices').insert(req.body).then((device) => {
    res.send(device);
  }, (error) => {
    res.error(error);
  });
});

app.put('/devices/:id', (req, res) => {
  req.db.get('devices').update({_id: req.params.id}, req.body).then((device) => {
    res.send(device);
  }, (error) => {
    res.error(error);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
