import multer from "multer";

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename for each uploaded file
  },
});

// Multer Upload Configuration
const upload = multer({ storage: storage });

export default upload
