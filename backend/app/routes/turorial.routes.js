const multer = require("multer");
const db = require("../models");
const Tutorial = db.tutorials;
const MIME_TYPE_MAP = {
  
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("",multer({ storage: storage }).single("img"), tutorials.create);

  // Retrieve all Tutorials
  // router.get("/", tutorials.findAll);
  router.get("/", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const tutorialQuery = Tutorial.find();
    let fetchedTutorials;
    if (pageSize && currentPage) {
      tutorialQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    tutorialQuery
      .then(documents => {
        fetchedTutorials = documents;
        return Tutorial.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Tutorials fetched successfully!",
          tutorials: fetchedTutorials,
          maxTutorials: count
        });
      });
  });

  // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
