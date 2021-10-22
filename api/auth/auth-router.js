const router = require("express").Router();
const bcrypt = require('bcryptjs');
const { tokenBuilder } = require('./token-builder');
const Users = require('../users/users-model');
const {
  validateUserName,
  checkusernameFree,
  validateCredentials
} = require('./auth-middleware');


router.post("/register", validateUserName, checkusernameFree, (req, res, next) => {
    let user = req.user;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    
    user.password = hash;
    
    Users.add(user)
      .then(newUser => {
        res.status(201).json(newUser[0]);
      })
      .catch(next);
});


router.post("/login", validateUserName, validateCredentials, (req, res, next) => {
  let { username, password, user_id } = req.dbUser;
  if (bcrypt.compareSync(req.user.password, password)) {
    const token = tokenBuilder({
    user_id,
    username
    });
    res.status(200).json({
      message: `Welcome back ${username}`,
      user_id,
      username,
      token
    });
  } else {
    next({status: 401, message: 'Invalid credentials'});
  }
});

module.exports = router;