const db = require("../models");
const User = db.users;
const Tutorial = db.tutorials;
const Faculty = db.faculties;

var mongoose = require('mongoose');

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
exports.findExistsUse=(req, res)=>{

  const username = req.query.uname;
  const password = req.query.psw;
  var conditionName = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  var conditionPassword = password ? { password: { $regex: new RegExp(password), $options: "i" } } : {};
  var condition =  { $and: [ conditionName,conditionPassword ]};
  User.findOne(condition).then(data=> {
    if (!data)
      res.status(404).send({ message: "Not found User with userName and password "  });
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving User with id=" + id });
  });
}


// ###############
exports.init = (req, res) => {
  console.log("@@@dlea11@@@@");

  console.log("@@@data11ee@@@@");
  // var dict =[ { lecturer:'Erela Amit',faculty:'The Haim Striks School of Law'}];
  // const facultyName= dict[i].lecturer;
  // var condition3 = facultyName ? { facultyName: { $regex: new RegExp(facultyName), $options: "i" } } : {};
  //   Faculty.find(condition3)
  //     .then(data => {
  //       console.log(data[0]['_id']);
  //       // res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving fuculties."
  //       });
  //     });

  //       username=  'Erela Amit';
  //     var condition4 = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  //     User.find(condition4)
  //     .then(data => {
  //       res.send(data);
  //       console.log(data[0]);

  //       // res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving fuculties."
  //       });
  //     });



};
  
// ##################
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // console.log("@@@dlea11@@@@");
  // console.log("@@@data11ee@@@@");
  var dict =[
  { lecturer:'Erela Amit',faculty:'The School of Business Administration'},
  { lecturer:'Dvora Geller',faculty:'The School of Business Administration'},
  { lecturer:'Eli Gilbai',faculty:'The School of Business Administration'},
  { lecturer:'Abigail Hurwitz',faculty:'The School of Business Administration'},
  { lecturer:'Eyal Inbar',faculty:'The School of Business Administration'},
  { lecturer:'Eyal Lahav ',faculty:'The School of Business Administration'},
  { lecturer:'Ronny Manos',faculty:'The School of Business Administration'},
  { lecturer:'Gila Oren',faculty:'The School of Business Administration'},
  { lecturer:'Eli Gilbai ',faculty:'The School of Business Administration'},
  { lecturer:'Tal Shavit',faculty:'The School of Business Administration'},
  { lecturer:'Yaakov Weber',faculty:'The School of Business Administration'},
  { lecturer:'Ido Baum',faculty:'The Haim Striks School of Law'},
  { lecturer:'Orna Ben- Naftali',faculty:'The Haim Striks School of Law'},
  { lecturer:'Yifat Bitton',faculty:'The Haim Striks School of Law'},
  { lecturer:'Orna Ben- Naftali',faculty:'The Haim Striks School of Law'},
  { lecturer:'Orit Fischman Afori',faculty:'The Haim Striks School of Law'},
  { lecturer:'Yifat Holzman- Gazit ',faculty:'The Haim Striks School of Law'},
  { lecturer:'Yifat Bitton',faculty:'The Haim Striks School of Law'},
  { lecturer:'Nili Karako-eyal',faculty:'The Haim Striks School of Law'},
  { lecturer:'Ruthy Lowenstein Lazar',faculty:'The Haim Striks School of Law'},
  { lecturer:'Yuval Merin',faculty:'The Haim Striks School of Law'},
  { lecturer:'Roy Peled',faculty:'The Haim Striks School of Law'},
  { lecturer:'Karni Perlman',faculty:'The Haim Striks School of Law'},
  { lecturer:'Yoram Rabin',faculty:'The Haim Striks School of Law'},
  { lecturer:'Haim Sandberg',faculty:'The Haim Striks School of Law'},
  { lecturer:'Iris Soroker',faculty:'The Haim Striks School of Law'},
  { lecturer:'Zvi Triger',faculty:'The Haim Striks School of Law'},
  { lecturer:'Limor Zer- Gutman',faculty:'The Haim Striks School of Law'},


  { lecturer:'Shahar Sansani',faculty:'School of Economics'},
  { lecturer:'Itzhak Zilcha',faculty:'School of Economics'},

  

  { lecturer:'Yehuda Elmaliach',faculty:'School of Computer Science'},
  { lecturer:'Galit Haim',faculty:'School of Computer Science'},
  { lecturer:'Samuel Itzikowitz',faculty:'School of Computer Science'},
  { lecturer:'Igor Rochlin',faculty:'School of Computer Science'},

  { lecturer:'Guy Abutbul- Selinger',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Tamar Almor',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Joy Benatov',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Hanna Benoni',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Boris Blumenstein',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Keren Friedman- Peleg',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Gillie Gabay',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Lael Gershgoren',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Anat Guy',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Iris Orbach',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'David Segal',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Keren Shakhar',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Shmuel Shulman',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Ido Ziv',faculty:'School of Behavioral Sciences & Psychology'},
  { lecturer:'Naomi Ziv',faculty:'School of Behavioral Sciences & Psychology'},




  { lecturer:'Dan Arav',faculty:'School of Media Studies'},
  { lecturer:'Eva Berger',faculty:'School of Media Studies'},
 
  

  { lecturer:'Gavin Suss',faculty:'School of Design & Innovation'},

  { lecturer:'Muhammed Abu Nasra',faculty:'The School of Education'},
  { lecturer:'Rachel Bolless',faculty:'The School of Education'},
  { lecturer:'Irit Harboun',faculty:'The School of Education'},
  { lecturer:'Etti Isler',faculty:'The School of Education'},
  { lecturer:'Irit Keynan',faculty:'The School of Education'},
  { lecturer:'Idan Porat',faculty:'The School of Education'},
  { lecturer:'Ronit Shalev',faculty:'The School of Education'},
  { lecturer:'Yaron Sokolov',faculty:'The School of Education'},
  { lecturer:'Riki Yogev',faculty:'The School of Education'}
  


];
for ( x = 0; x <dict.length; x++)
{
  var facultyName= dict[x].faculty;
  var condition3 = facultyName ? { facultyName: { $regex: new RegExp(facultyName), $options: "i" } } : {};
   var id_faculty='';
   var id_user='';
   var json= '';
  Faculty.find(condition3)
      .then(data => {
        // console.log(data);
        id_faculty=data[0]['_id'];
        json={faculty:new mongoose.mongo.ObjectId(id_faculty)};
        // res.send(data);
      })
      .catch(err => {
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while retrieving fuculties."
        // });
      });
        username=  dict[x].lecturer;
      var condition4 = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
      User.find(condition4)
      .then(data => {
        id_user = data[0]['_id'];
                  // console.log(id_faculty);
                  User.findByIdAndUpdate(id_user,json , { useFindAndModify: false })
        .then(data => {
        })
        .catch(err => {
        });
      })
      .catch(err => {
      }); 
}

 
    username = req.query.username;
  const status = req.query.status;
  const faculty = req.query.faculty;
  //var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  //condition = status ? { status: { $regex: new RegExp(status), $options: "i" } } : {};

  var conditionName = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  var conditionStatus = status ? { status: { $regex: new RegExp(status), $options: "i" } } : {};
  var conditionfaculty = faculty ? { faculty:  mongoose.Types.ObjectId(faculty)  }: {};
  var condition =  { $and: [ conditionName, conditionStatus, conditionfaculty ]};




  User.find(condition)
  .populate({ path: 'faculty' ,select: 'facultyName'  /* , match: conditionfaculty  */  })
  .exec(function (err, data) {
    if (err) return res.status(500).send({
      message:
        err.message  || "Some error occurred while retrieving users."
    });
    res.send(data);
  });
  

   /*  .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    }); */
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



exports.numOfTutorial = (req, res) => {

  Tutorial.aggregate( [
    {
      $group: {
         _id :"$name",
         count: {  $sum: 1 }
      }
    }
  ] ).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
 
};