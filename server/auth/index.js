const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs')

const db = require('../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router()

const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-z0-9_]+$)/).min(2).max(30).required(),
  fullName: Joi.string().required(),
  password: Joi.string().trim().min(8).required(),
});

// Any route in here is pre-pended with /auth

router.get('/', (req, res) => {
  res.json({
    message: '🔐'
  })
})

// POST /auth/signup
router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // make sure username is unique
    users.findOne({
      username: req.body.username
    }).then(user => {
      if (user) {
        // there is already a user in db with this username
        const error = new Error('Please choose another one username')
        res.status(409)
        next(error)

      } else {
        // hash the password
        // insert user with hash password
        bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
          const newUser = {
            username: req.body.username,
            fullName: req.body.fullName,
            password: hashedPassword
          }
          users.insert(newUser).then(insertedUser => {
            delete insertedUser.password
            res.json(insertedUser)
          })
        });
      }
    })
  } else {
    res.status(422)
    next(result.error)
  }
})

module.exports = router;