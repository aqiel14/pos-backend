const express = require('express');
const router = express.Router();
const machine = require('./models/machine_schema');
const jwt = require('./jwt');

router.put('/machine', async (req, res) => {
  try {
    let doc = await machine.findByIdAndUpdate({ _id: req.body._id }, req.body);

    res.json({
      result: 'success',
      message: 'Update Machine Information Successfully',
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.post('/machine', async (req, res) => {
  try {
    let doc = await machine.create(req.body);

    res.json({
      result: 'success',
      message: 'Create new Machine Information Successfully',
    });
  } catch (err) {
    console.log(err);
    res.json({ result: 'error', message: err.msg });
  }
});

router.get('/machine', jwt.verify, async (req, res) => {
  try {
    let data = await machine.find({}).sort({ created: -1 });
    res.json({
      result: 'success',
      message: 'Fetch Machine Information Successfully',
      data: data,
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.get('/machine/:id', async (req, res) => {
  try {
    let data = await machine.findById({ _id: req.params.id });
    res.json({
      result: 'success',
      message: 'Fetch Single Machine Successfully',
      data: data,
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.delete('/machine/:id', async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await machine.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: 'success',
      message: 'Delete Machine Information Successfully',
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

module.exports = router;
