const { User, Home } = require('../models');
const ColorThief = require('colorthief');

const rgbToHex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

exports.getHome = async (req, res, next) => {
  try {
    console.log('유저네임', req.params.username);
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    console.log('유저아이디', user.id);
    const home = await Home.findOne({
      where: {
        UserId: user.id,
      },
    });
    res.status(200).json(home);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.editHome = async (req, res, next) => {
  try {
    const editedHome = {
      introduction: req.body.introduction,
      instagram: req.body.instagram,
      youtube: req.body.youtube,
      website: req.body.website,
    };
    if (req.file) {
      const color = await ColorThief.getColor(req.file.path);
      const mainColor = rgbToHex(color[0], color[1], color[2]);
      editedHome.mainColor = mainColor;
      editedHome.coverImage = req.file.path;
    }
    await Home.update(editedHome, {
      where: {
        UserId: req.user.id,
      },
    });
    res.status(200).json({ UserId: parseInt(req.user.id, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
