const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route		GET api/users/test
// @desc		Tests post route
// @access	Public
router.get('/test', (req, res) => {
  res.json({
    msg: 'Users works'
  });
});

// @route		POST api/users/register
// @desc		Register user
// @access	Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password, name } = req.body;

  try {
    //Find if the e-mail exist
    let user = await User.findOne({ email });

    // If there is found a user throw an error message
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // TODO: add an image to the profile

    user = new User({
      name,
      email,
      password
    });

    // Hash the password for saving in the DB
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error...😢');
  }
});

// @route		POST api/users/login
// @desc		Login User / Returning JWT Token
// @access	Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  console.log(email);
  /* I changed the promise based with then handlers to async await functions */

  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      // Check Password
      bcrypt.compare(password, user.password).then(passwordMatch => {
        if (passwordMatch) {
          // Create the JWT payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          // Sign Token
          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          errors.password = 'Password not correct';
          return res.status(400).json({ errors });
        }
      });
    })
    .catch(err => console.log(err));
});

// @route		POST api/users/current
// @desc		Return current user
// @access	Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
