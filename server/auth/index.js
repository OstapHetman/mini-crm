const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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

function respondError422(res, next) {
  res.status(422)
  const error = new Error('Login failed; Invalid Username or Password')
  next(error)
}

router.post('/signin', (req, res, next) => {
  let schema;
  const result = Joi.validate(req.body, schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-z0-9_]+$)/).min(2).max(30).required(),
    password: Joi.string().trim().min(8).required(),
  }));

  if (result.error === null) {
    users.findOne({
      username: req.body.username
    }).then(user => {
      if (user) {
        // found user in db and compare password
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            // the right password
            const payload = {
              _id: user._id,
              username: user.username
            };
            jwt.sign(payload, process.env.TOKEN_SECRET, {
              expiresIn: '1d'
            }, (err, token) => {
              if (err) {
                respondError422(res, next)
              } else {
                res.json({ token })
              }
            })
          } else {
            respondError422(res, next)
          }
        })
      } else {
        respondError422(res, next)
      }
    })
  } else {
    respondError422(res, next)
  }
})

module.exports = router;