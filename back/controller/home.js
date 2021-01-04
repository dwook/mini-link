const { Home } = require('../models');

exports.getHome = async (req, res, next) => {
  try {
    const home = await Home.findOne({
      where: {
        userId: req.user.id,
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
