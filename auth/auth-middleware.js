module.exports = (req, res, next) => {
  // console.log(req.session);
  if ((req.session && req.session.user) || process.env.NODE_ENV === "testing") {
    next();
  } else {
    res.status(401).json({ message: "Access is restricted. Please login..." });
  }
};
