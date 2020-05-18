const db = require("../models");
const User = db.users;


// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({ message: "first name can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password:req.body.password,
    status:req.body.status,
    // status:["lecturer", "student"],
    faculty:req.body.faculty,
    email:req.body.email
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  const status = req.query.status;
  const faculty = req.query.faculty;
  //var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  //condition = status ? { status: { $regex: new RegExp(status), $options: "i" } } : {};

  var conditionName = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  var conditionStatus = status ? { status: { $regex: new RegExp(status), $options: "i" } } : {};
  var conditionfaculty = faculty ? { faculty: { $regex: new RegExp(faculty) , $options: "i"} } : {};
 
var condition =  { $and: [ conditionName, conditionStatus ]};




  User.find(condition)
  .populate({ path: 'faculty', match: conditionfaculty})
  .exec(function (err, data) {
    if (err) return res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
    res.send(data);
    console.log('The user data are an array: ', data);
  })
  /* populate({
    path: 'Faculty',
    match: conditionfaculty
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    //select: 'name -_id'
  })
  .exec() 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });*/
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all published users
exports.findAllPublished = (req, res) => {
  User.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
