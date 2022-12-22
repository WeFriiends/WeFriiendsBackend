const multer = require("multer");
const aws = require("aws-sdk");
const photoService = require("../services/photo.js");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

module.exports = (app) => {
  app.post("/api/profile/upload", upload.single("profilePhoto"), (req, res) => {
    console.log(req.file);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read-write",
      ContentType: "image/jpeg",
    };

    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send({ err: error });
      }

      console.log(data);

      photoService.addPhoto(req.user.userId, data.Location);
    });
  });
};
