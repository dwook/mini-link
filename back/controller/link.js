const { Link } = require('../models');

exports.getLink = async (req, res, next) => {
  try {
    const link = await Link.findOne({
      where: {
        id: req.params.linkId,
        UserId: req.user.id,
      },
    });
    res.status(200).json(link);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getLinks = async (req, res, next) => {
  try {
    const links = await Link.findAll({
      where: {
        UserId: req.user.id,
      },
    });
    console.log(links);
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createLink = async (req, res, next) => {
  try {
    const link = await Link.create({
      name: req.body.name,
      url: req.body.url,
      image: req.file.path,
      public: req.body.public,
      UserId: req.user.id,
    });
    res.status(200).json(link);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.editLink = async (req, res, next) => {
  try {
    const editedLink = {
      name: req.body.name,
      url: req.body.url,
      public: req.body.public,
    };
    if (req.file) {
      editedLink.image = req.file.path;
    }
    await Link.update(editedLink, {
      where: {
        id: req.params.linkId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ LinkId: parseInt(req.params.linkId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteLink = async (req, res, next) => {
  try {
    await Link.destroy({
      where: {
        id: req.params.linkId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ LinkId: parseInt(req.params.linkId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
