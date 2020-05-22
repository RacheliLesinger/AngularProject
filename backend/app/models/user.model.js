 
const rp = require('request-promise');
const $ = require('cheerio');
const leaAculty = require("./faculty.model.js");
const db = require("../models");
// const mongoose = require("mongoose");
// const Faculty = require("./faculty.model.js")(mongoose);


// const Faculty =  require('mongoose').model
// Faculty = require("./tutorial.model.js");
// const Faculty =require("./faculty.model.js");
// const Faculty = db.faculties
// const Faculty = mongoose.model("Faculty", schema)
  module.exports = mongoose => {
    
     var schema = mongoose.Schema(
      {
        first_name: { type: String, required: true },
        last_name:  { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        // faculty: { type: String, required: true },
        faculty: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Faculty' 
        },
        // status:["lecturer", "student"],
        status: { type: String, required: true },
        email: { type: String, required: true },
      },
      { timestamps: true }//תאריך יצירה
    );


//     const createById = async ({facultyName}) => {
//       console.log(   Faculty    );
//       console.log(  facultyName );
//       const matches = await Faculty.find({facultyName}).exec();
//       console.log(   "@@@###@@$$$"    );
//       console.log(     matches[0]['_id']    );
//      //  return
//   };
  
//   function lea({facultyName}){
//     console.log(   "@@@@@111@@@"    );
//       const matches = Faculty.find({facultyName}).exec();
//       console.log(     matches[0]['_id']    );
//       console.log(   "@@@@@111@@@"    );
//     }
  
//   function function_name(){
//        lea({ facultyName: 'The School of Business Administration' } );
//     }
  
// setTimeout( function_name, 30000);



    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });




// ##########init Faculty##########
const User = mongoose.model("User", schema)
var dict = { 'The Haim Striks School of Law': '5ec3bec5aecc7c3fd09dfcf8', 
 'School of Economics': '5ec3bec5aecc7c3fd09dfcf9', 
 'School of Media Studies': '5ec3bec5aecc7c3fd09dfcfa',
 'School of Design & Innovation': '5ec3bec5aecc7c3fd09dfcfb',
 'The School of Education': '5ec3bec5aecc7c3fd09dfcfc',
 'School of Computer Science': '5ec3bec5aecc7c3fd09dfcfd',
 'School of Behavioral Sciences & Psychology': '5ec3bec5aecc7c3fd09dfcfe',
 'The School of Business Administration': '5ec3bf6621d9414510668647'};

// #################
  const users =[]
  const faculties=[]
  const  url='http://english.colman.ac.il/staff_members/'
  rp(url) 
   .then(function(html) { 

      const all=[] ;
      const faculties =[];
      const faculty = []; 
        $('.faculty-name', html).each(function() { 
          faculty.push($(this).text()); 
            });
       // #####init   names  and email #####
      j=0;
      $('.faculty-members-container', html).each(function() { 
          names = []; 
          email = []; 
         faculty_=faculty[j]; 
        //  console.log( "dict[faculty_]"); 
        j++;
         $('.info-name',$(this)).each(function() { 
                  names.push($(this).text()); 
                  
                  }); 
          $('span > .waikawa_font',$(this)).each(function() { 
            email.push($(this).text()); 
          
           });          
  //         // ############insert user##############
   
          for ( i = 0; i <names.length; i++)
            {
              all_name = names[i].replace('  ',' ');;
              randomNumber=''
              for ( x = 0; x <8; x++)
              {
                  randomNumber += (Math.floor(Math.random() * 10) + 1);
              }
              // console.log(randomNumber);
              all_name=all_name.slice(all_name.indexOf('.')+2,all_name.length);
              first_name=all_name.slice(0,all_name.indexOf(' '));
              last_name=all_name.slice(all_name.indexOf(' ')+1,all_name.length);
              var newId = new mongoose.mongo.ObjectId(dict[faculty_]);
            //   console.log(all_name);
                  user = new User({
                first_name:first_name ,
                last_name:last_name ,
                username:all_name ,
                password:randomNumber,
                status:'lecturer',
                // faculty:newId,
                email:email[i]
              });
                            user
                .save(user)
              users.push(user);

            };
  
          })

    }) 
      .catch(function(err){
    //      handle error   
   });
  //  

  //   // #######
    return User;;
  };