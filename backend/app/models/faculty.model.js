module.exports = mongoose => {
  
    var schema = mongoose.Schema(
      {
        facultyName: { type: String, required: true }
      }
    );
   
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
  
     const Faculty = mongoose.model("Faculty", schema)
     const createFaculty = async ({facultyName}) => {
      const matches = await Faculty.find({facultyName}).exec();
  
      if (matches.length === 0) {
          return Faculty.create({facultyName});
      }
  };



  const faculties = [{
    facultyName: "Economics"}, {facultyName: "Computer Science"},{facultyName: "Laws"},{facultyName: "Humen Resources"}
  ];
  faculties.forEach((element)=>(async () => {
    await createFaculty(element);
})())



    

    return Faculty;
  };