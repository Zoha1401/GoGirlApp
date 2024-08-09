const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const uploadOnSystem = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // Increase the file size limit to 100MB
});

module.exports = uploadOnSystem;
