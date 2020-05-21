const db = require("../models");
const Tutorial = db.tutorials;
var mongoose = require('mongoose');


// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
    }

  // Create a Tutorial

  const url = req.protocol + "://" + req.get("host");
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    img:  url + "/images/" + req.file.filename,
    link: req.body.link,
    faculty:mongoose.Types.ObjectId(req.body.faculty),
    name: mongoose.Types.ObjectId(req.body.name)
  });
  console.log(tutorial.faculty)

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data),
      res.status(201).json({
        message: "Tutorial added successfully"
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});
}
// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};  
//   Tutorial.find(condition)
//    .populate({ path: 'faculty' ,select: 'facultyName'  /* , match: conditionfaculty  */  })
//   .exec(function (err, data) {
//              console.log( "leaaaaaa"); 

//     if (err) return res.status(500).send({
//       message:
//         err.message  || "Some error occurred while retrieving users."
//     });
//     res.send(data);
//   });
// };

// #######################3


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const faculty = req.query.faculty;
  //var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  //condition = status ? { status: { $regex: new RegExp(status), $options: "i" } } : {};
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};  
  
  var conditionTitle = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  var conditionDescription = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};
  var conditionfaculty = faculty ? { faculty:  mongoose.Types.ObjectId(faculty)  }: {};
  var condition =  { $and: [ conditionTitle,conditionDescription,conditionfaculty ]};
  Tutorial.find(condition)
  .find(condition)
  .populate({ path: 'faculty' ,select: 'facultyName'  /* , match: conditionfaculty  */  })
  .exec(function (err, data) {
    if (err) return res.status(500).send({
      message:
        err.message  || "Some error occurred while retrieving users."
    });
    res.send(data);
  });
  

 
};
// @@@@@@@@@@@@@@@@@@@@@

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });

// };
