const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");

exports.signUp = async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (exUser) {
      return res.status(403).send("사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const userInfo = await User.findOne({
        where: { id: user.id },
      });
      return res.status(200).json(userInfo);
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
};
