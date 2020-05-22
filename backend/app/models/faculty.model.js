 
const rp = require('request-promise');
const $ = require('cheerio');

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

//   const createById = async ({facultyName}) => {
//      const matches = await Faculty.find({facultyName}).exec();
//      console.log(     matches[0]['_id']    );
//     //  leaaaa.push( matches[0]['_id'])
//     //  return
//  };


 

  const faculties =[];

  // const faculties = [{
  //   facultyName: "Economics"}, {facultyName: "Computer Science" ,_id:5ec6a110ca8ae61900063789},{facultyName: "Laws"},{facultyName: "Humen Resources"}
  // ];
  // faculties.forEach((element)=>(async () => {        
  //             await createFaculty(element);
            // })())
// console.log(faculties);

const  url='http://english.colman.ac.il/staff_members/'
rp(url) 
 .then(function(html) { 
      $('.faculty-name', html).each(function() { 
        faculties.push({facultyName: $(this).text()})
         });

        console.log(faculties);
        faculties.forEach((element)=>(async () => {        
          await createFaculty(element);
        })())
  }) 
    .catch(function(err){
  //      handle error   
 });

    return Faculty;
  };