const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
const linkController = require('../controller/link');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더를 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      done(null, Date.now() + '_' + file.originalname);
    },
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  }),
});

router.get('/:linkId', isLoggedIn, linkController.getLink);
router.get('/', linkController.getLinks);
router.post('/', isLoggedIn, upload.single('image'), linkController.createLink);
router.patch(
  '/:linkId',
  isLoggedIn,
  upload.single('image'),
  linkController.editLink
);
router.delete('/:linkId', isLoggedIn, linkController.deleteLink);

module.exports = router;
