const express = require("express");
const router = express.Router();
const bahan = require("./models/bahan_schema");
const material = require("./models/material_schema");
const jwt = require("./jwt");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");

router.get("/material", jwt.verify, async (req, res) => {
  try {
    await material
      .find({ user_id: req.userId })
      .populate("bahan")
      .exec(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            result: "success",
            message: "Fetch Material Successfully",
            data: data,
          });
        }
      });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/material/:id", async (req, res) => {
  try {
    await material
      .findById({ _id: req.params.id })
      .populate("bahan")
      .exec(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            result: "success",
            message: "Fetch Single Material Successfully",
            data: data,
          });
        }
      });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.put("/material", async (req, res) => {
  try {
    // let doc = await material.findByIdAndUpdate({ _id: req.body._id }, req.body);
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      let updateMaterial = await material.findByIdAndUpdate(
        { _id: fields.id },
        {
          price: fields.price,
          qty: fields.qty,
          unit: fields.unit,
        }
      );
      res.json({
        result: "success",
        message: "Update Material data Successfully",
      });
      let bahan_arr = fields.bahan.split(",");
      const bahan = await bahan.find().where("_id").in(bahan_arr).exec();
      updateMaterial.bahan = bahan;
      await updateMaterial.save();
      res.json({
        result: "success",
        message: "Update Material successfully",
      });
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/material_getbahan", jwt.verify, async (req, res) => {
  try {
    let data = await bahan
      .find({ user_id: req.userId })
      .select({ materialname: 1, _id: 1 })
      .sort({ created: -1 });
    res.json({
      result: "success",
      message: "Fetch Single Material Successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({ result: "error", message: err.msg });
  }
});

router.post("/material", jwt.verify, async (req, res) => {
  try {
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      let newMaterial = await material.create({
        price: fields.price,
        qty: fields.qty,
        unit: fields.unit,
        user_id: req.userId,
      });
      let bahan_arr = fields.bahan.split(",");
      const bahan1 = await bahan.find().where("_id").in(bahan_arr).exec();
      console.log(newMaterial);
      newMaterial.bahan = bahan1;
      await newMaterial.save();
      res.json({
        result: "success",
        message: "Create Material successfully",
      });
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});

router.get("/material", jwt.verify, async (req, res) => {
  try {
    let data = await material.find({}).sort({ created: -1 });
    res.json({
      result: "success",
      message: "Fetch Material data Successfully",
      data: data,
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});

router.get("/material/:id", async (req, res) => {
  try {
    let data = await material.findById({ _id: req.params.id });
    res.json({
      result: "success",
      message: "Fetch Single Material data Successfully",
      data: data,
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});

router.delete("/material/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await material.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: "success",
      message: "Delete Material data Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});

module.exports = router;
