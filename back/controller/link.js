const { Link } = require('../models');

exports.createLink = async (req, res, next) => {
  try {
    const link = await Link.create({
      name: req.body.name,
      url: req.body.url,
      image: req.file.path,
      public: req.body.public,
      //UserId: req.user.id,
    });
    res.status(201).json(link);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
