const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    const token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {     // ["Bearer", "<tokenvalue>"]
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  //-- This is used when attempting to login. 
    // If Username and Password match database, sign a JWT token auth and return
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };
    // console.log("Attempting to signToken")
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
