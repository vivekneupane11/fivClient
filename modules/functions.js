const jwt = require("jsonwebtoken");

function generateJWT({ username }) {
  // IMPORTANT: avoid adding unwanted key to the token object; send filtered data
  const tokenFields = {};
  tokenFields.userType = "user";
  tokenFields.username = username;

  const token = jwt.sign(tokenFields, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_TTL
  });

  return [
    process.env.PROJECT_NAME,
    token,
    {
      domain: process.env.DOMAIN_NAME,
      secure: JSON.parse(process.env.DEPLOYMENT),
      httpOnly: true,
      sameSite: true,
      expires: new Date(Date.now() + +process.env.JWT_TTL),
      path: "/"
    }
  ];
}

module.exports = {
  generateJWT
};
