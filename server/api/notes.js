const express = require('express');
const Joi = require('joi');

const db = require('../db/connection');
const notes = db.get('notes');

const schema = Joi.object().keys({
  title: Joi.string().trim().max(40).required(),
  body: Joi.string().trim().required(),
});

const router = express.Router();

router.get('/', (req, res) => {
  notes.find({
    user_id: req.user._id
  })
    .then(notes => {
      res.json(notes)
    })
})

router.post('/', (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // insert into db
    const note = {
      ...req.body,
      user_id: req.user._id
    }
    notes
      .insert(note)
      .then(note => {
        res.json(note)
      })
  } else {
    // create error
    const error = new Error(result.error);
    res.status(422);
    next(error);
  }
})

module.exports = router;