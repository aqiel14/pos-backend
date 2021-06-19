const express = require('express');
const router = express.Router();
const product = require('./models/product_schema');
router.get('/stat/current_inventory', async (req, res) => {
  try {
    await product.find({}).exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          result: 'success',
          message: 'Fetch product Successfully',
          data: data,
        });
      }
    });
  } catch (err) {
    res.json({ result: 'error', message: err.msg });
  }
});
module.exports = router;
