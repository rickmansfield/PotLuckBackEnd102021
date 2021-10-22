const { JWT_SECRET } = require("../secrets");
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                next({
                    status: 401,
                    message: `Token invalid`
                });
            } else {
                req.decodedJwt = decoded;
                next();
            }
        });
    } else {
        next({
            status: 401,
            message: 'Token required'
        });
    }
};

const validateUserName = (req, res, next) => {
    const { username, password } = req.body;
    if (
        !username ||
        username.trim() === '' ||
        !password ||
        password.trim() === ''
    ) {
        next({
            status: 422,
            message: 'Username and password are required'
        });
    } else {
        req.user = {
            username: username.trim(),
            password: password.trim()
        };
        next();
    }
};

const checkusernameFree = async (req, res, next) => {
    const { username } = req.user;
    const user = await Users.findBy({ username });
    if (user) {
        next({
            status: 401,
            message: 'Username already exists'
        });
    } else {
        next();
    }
};

const validateCredentials = async (req, res, next) => {
    const { username } = req.user;
    const user = await Users.findBy({ username });
    if (user) {
        req.dbUser = user;
        next();
    } else {
        next({
            status: 401,
            message: 'Invalid credentials'
        });
    }
};

module.exports = {
    restricted,
    validateUserName,
    checkusernameFree,
    validateCredentials
};