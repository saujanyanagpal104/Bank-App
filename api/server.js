const express = require('express');
const multer = require('multer');
const cors = require("cors");
const data = require('./data.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("uploadedFile");

app.get("/", (req, res) => res.send(data));

app.post("/upload", function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });
  });
  

app.listen(port, () => console.log(`Listening on port ${port}`));


