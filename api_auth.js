const express = require('express');
const router = express.Router();
const Users = require('./models/user_schema');
const jwt = require('./jwt');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');
const jsonwebtoken = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/login', async (req, res) => {
  let doc = await Users.findOne({ username: req.body.username });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      if (doc.status != 'not_activated') {
        const payload = {
          id: doc._id,
          level: doc.level,
          username: doc.username,
        };

        let token = jwt.sign(payload);
        console.log(token);
        res.json({ result: 'success', token, message: 'Login successfully' });
      } else {
        return res.json({
          result: 'error',
          message: 'You need to activate your account first',
        });
      }
    } else {
      // Invalid password
      res.json({ result: 'error', message: 'Invalid password' });
    }
  } else {
    // Invalid username
    res.json({ result: 'error', message: 'Invalid username' });
  }
});

router.post('/register', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await Users.create(req.body);
    res.json({ result: 'success', message: 'Register successfully' });
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
});

//BELOM DITAMBAH VERIFICATION EMAIL

router.post('/profile', async (req, res) => {
  try {
    await Users.create(req.body);
    res.json({ result: 'success', message: 'Register successfully' });
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
});

router.put('/profile', async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let doc = await Users.findOneAndUpdate({ _id: fields.id }, fields);
      await uploadImage(files, fields);
      res.json({ result: 'success', message: 'Update Successfully' });
    });
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
});

uploadImage = async (files, doc) => {
  if (files.avatars != null) {
    var fileExtention = files.avatars.name.split('.').pop();
    doc.avatars = `${Date.now()}+${doc.username}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + '/uploaded/images/') + '/' + doc.avatars;

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.avatars.path, newpath);

    // Update database
    await Users.findOneAndUpdate({ _id: doc.id }, doc);
  }
};

module.exports = router;