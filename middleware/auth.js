const isLogin = (req, res, next) => {
  if (req.session.auth) {
    next();
  } else {
    res.redirect("/login");
  }
};

const isLogout = (req, res, next) => {
  if (!req.session.auth) {
    next();
  } else {
    if (req.session.adminAuth) {
      res.redirect("/admin");
    } else {
      res.redirect("/home");
    }
  }
};

module.exports = {
  isLogin,
  isLogout,
};
