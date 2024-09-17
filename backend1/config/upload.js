const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files'); // Directory where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp to avoid conflicts
    }
});

// Filter to allow only CSV files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only CSV files are allowed.'), false);
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = { upload };
