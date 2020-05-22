module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
    // router.post("/initUser", users.init);

  
    // Retrieve all Tutorials
    router.get("/",users.findAll);
  
    // Retrieve all published Tutorials
    router.get("/query/numOfTutorial", users.numOfTutorial);
    router.get("/query/findExistsUse", users.findExistsUse);
    
    // Retrieve a single Tutorial with id
    router.get("/user/:id", users.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);

    // router.get("/",faculties.getAll);

    // router.get("/",users.getAll);

    app.use("/api/users", router);
  };

 
  
  