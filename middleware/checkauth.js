const jwt = require("jsonwebtoken");

const { generateJWT } = require("../modules/functions");

const filterJWT = string => {
  try {
    const match = string.match(
      new RegExp("(^| )" + process.env.PROJECT_NAME + "=([^;]+)")
    );
    if (match) {
      return match[2];
    }
  } catch (error) {
    return;
  }
};

const requiresRefresh = expiry => {
  expiry - parseInt(new Date().getTime() / 1000) <
    +process.env.COOKIE_REFRESH_TIME;
};

module.exports = (req, res, next) => {
  try {
    const token = filterJWT(req.headers.cookie);
    if (!token) throw "no jwt";
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.userType !== "user") {
      throw "not user";
    }
    req.jwt = decoded;

    if (requiresRefresh(req.jwt.exp)) {
      res.cookie(...generateJWT());
    }
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie(process.env.PROJECT_NAME, {
      domain: process.env.DOMAIN_NAME,
      secure: JSON.parse(process.env.DEPLOYMENT),
      httpOnly: false,
      path: "/"
    });
    return res.redirect("/login");
  }
};
