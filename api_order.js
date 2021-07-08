const express = require('express');
const router = express.Router();
const Order = require('./models/order_schema.js');
const jwt = require('./jwt');
router.post('/order', async (req, res) => {
  try {
    let newOrder = await Order.create(req.body);

    res.json({
      result: 'success',
      message: 'Create Brach data successfully',
    });
  } catch (err) {
    res.json({ result: 'error', message: err });
  }
});

router.post('/order', jwt.verify, async (req, res) => {
  try {
    req.body.user_id = req.userId;
    let doc = await Order.create(req.body);
    res.json({ result: 'ok', message: doc });
  } catch (error) {
    res.json({ result: 'error', message: error });
  }
});

router.get('/order', jwt.verify, async (req, res) => {
  try {
    let data = await Order.find({ user_id: req.userId }).sort({ created: -1 });
    res.json({
      result: 'success',
      message: 'Fetch Order Successfully',
      data: data,
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

router.delete('/order/:id', async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await Order.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: 'success',
      message: 'Delete Order Successfully',
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});

module.exports = router;
