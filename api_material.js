const express = require('express');
const router = express.Router();
const material = require('./models/material_schema');
const jwt = require('./jwt');

router.put('/material', async (req, res) => {
  try {
    let doc = await material.findByIdAndUpdate({ _id: req.body._id }, req.body);

    res.json({
      result: 'success',
      message: 'Update Material data Successfully',
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.post('/material', async (req, res) => {
  try {
    let doc = await material.create(req.body);

    res.json({
      result: 'success',
      message: 'Create new Material data Successfully',
    });
  } catch (err) {
    console.log(err);
    res.json({ result: 'error', message: err.msg });
  }
});

router.get('/material', jwt.verify, async (req, res) => {
  try {
    let data = await material.find({}).sort({ created: -1 });
    res.json({
      result: 'success',
      message: 'Fetch Material data Successfully',
      data: data,
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.get('/material/:id', async (req, res) => {
  try {
    let data = await material.findById({ _id: req.params.id });
    res.json({
      result: 'success',
      message: 'Fetch Single Material data Successfully',
      data: data,
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.delete('/material/:id', async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await material.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: 'success',
      message: 'Delete Material data Successfully',
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

module.exports = router;
