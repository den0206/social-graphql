const jwt = require('jsonwebtoken');

module.exports.verifyUser = async (req) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    try {
      const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
      const token = bearerHeader.split(' ')[1];
      const user = jwt.verify(token, secret);

      return {
        user,
      };
    } catch (e) {
      console.log(e);
      throw new Error('Token invalid');
    }
  }
};
