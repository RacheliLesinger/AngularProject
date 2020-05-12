module.exports = app => {
    const faculties = require("../controllers/faculty.controller.js");
  
    var router = require("express").Router();

    router.get("/",faculties.getAll);
    app.use("/api/faculties", router);
}