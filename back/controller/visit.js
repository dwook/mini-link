const { Visit, Link, Home } = require('../models');
const getGeo = require('../utils/geoLocation').geoLocation;

exports.getVisitCount = async (req, res, next) => {
  try {
    const visit = {};
    if (req.query.linkId) {
      visit.LinkId = req.query.linkId;
    }
    if (req.query.HomeId) {
      visit.HomeId = req.query.homeId;
    }

    const { data } = await Visit.findAndCountAll({
      where: visit,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.postVisit = async (req, res, next) => {
  try {
    const ip = req.query.ip;
    console.log('----아이피', ip);
    const { requestId, geoLocation } = await getGeo(ip);
    const { country, lat, long, r1, r2, r3 } = geoLocation;
    console.log('----지오', geoLocation);

    const visit = {
      requestId,
      country,
      lat,
      long,
      r1,
      r2,
      r3,
      useragent: req.useragent.source,
      isMobile: req.useragent.isMobile,
    };

    if (req.query.linkId) {
      visit.LinkId = req.query.linkId;
    }
    if (req.query.homeId) {
      visit.HomeId = req.query.homeId;
    }

    const data = await Visit.create(visit);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
