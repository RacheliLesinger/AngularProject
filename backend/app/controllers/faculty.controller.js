const db = require("../models");
const Faculty = db.faculties;

exports.getAll=(req,res)=>{
    const facultyName = req.query.facultyName;
    var condition = facultyName ? { facultyName: { $regex: new RegExp(facultyName), $options: "i" } } : {};
  
    Faculty.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fuculties."
        });
      });
     
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Faculty.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Faculty with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Faculty with id=" + id });
    });
};

  