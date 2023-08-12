const protectRoute = (req, res, next) => {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.json({
      Message: "Operation Not Allowed",
    });
  }
};

module.exports = protectRoute;
