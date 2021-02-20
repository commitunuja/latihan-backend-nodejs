const multer = require("multer");
const path = require("path");
const tools = require("./validation");

const storage = multer.diskStorage({
    destination: path.join(__dirname + './../files/'),
    filename: function (req, file, cb) {
        cb(null, tools.makeid(15) +
            path.extname(file.originalname));
    }

});

const fileFilter = (req, file, cb) => {
    let allowed_types = [
		"image/jpg",
		"image/jpeg",
		"image/png",
		"image/webp",
		"jpg",
		"jpeg",
		"png",
		"webp",
	];
	if (allowed_types.includes(file.mimetype)) {
		return cb(null, true);
	} else {
        req.fileValidationError = 'Only image files are allowed!';
		cb("Upload Error Images Only!!!", false);
	}
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2000000 //max 2mb
    }
}).single('nama_file');
