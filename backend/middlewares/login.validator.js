const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  const token = req.cookies?.token || null;
  if (!token) {
    return res.status(404).send({ msg: "User authentication failed" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = { id: payload.id, username: payload.username };
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
