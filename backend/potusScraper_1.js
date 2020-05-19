 
const rp = require('request-promise');
const $ = require('cheerio');
const db = require("./app/models");
const User = db.users;
const users =[]


const  url='http://english.colman.ac.il/staff_members/'
rp(url) 
 .then(function(html) { 
    const all=[] ;
    const faculties =[];
   
    const faculty = []; 
    

      $('.faculty-name', html).each(function() { 
        faculty.push($(this).text()); 
        faculties.push({facultyName: $(this).text()})
         });

        console.log(faculties);

        //  faculties = [{
        //   facultyName: "Economics"}, {facultyName: "Computer Science"},{facultyName: "Laws"},{facultyName: "Humen Resources"}
        // ];

      //   const createFaculty = async ({facultyName}) => {
      //     const matches = await Faculty.find({facultyName}).exec();
      
      //     if (matches.length === 0) {
      //         return Faculty.create({facultyName});
      //     }
      // };
      //   faculties.forEach((element)=>(async () => {
      //     await createFaculty(element);
      //   })())


        
        //   return Faculty;
        // };

    //   console.log(faculty);   
    //  console.log(faculty.length );

    // #####init   names  and email #####
    j=0;
    $('.faculty-members-container', html).each(function() { 
        names = []; 
        email = []; 
       faculty_=faculty[j]; 
      // console.log(faculty_); 
      j++;
       $('.info-name',$(this)).each(function() { 
                names.push($(this).text()); 
                
                }); 
        $('span > .waikawa_font',$(this)).each(function() { 
          email.push($(this).text()); 
        
         });          
        // console.log(names);
        //  console.log(names.length );
        //  console.log(email);
        //  console.log(email.length );
        // ############insert user##############

        for ( i = 0; i <names.length; i++)
          {
            all_name = names[i].replace('  ',' ');;
            randomNumber=''
            for ( x = 0; x <8; x++)
            {
                randomNumber += (Math.floor(Math.random() * 10) + 1);
            }
            console.log(randomNumber);
            // first_name_=all_name.slice(2,6);
            all_name=all_name.slice(all_name.indexOf('.')+2,all_name.length);
            first_name=all_name.slice(0,all_name.indexOf(' '));
            last_name=all_name.slice(all_name.indexOf(' ')+1,all_name.length);
         
            //  console.log(first_name);
            //  console.log(last_name);

            // users.push(user);

                user = new User({
              first_name:first_name ,
              last_name:last_name ,
              username:all_name ,
              password:randomNumber,
              status:'lecturer',
              faculty:faculty_,
              email:email[i]
            });
            users.push(user);

            // Save User in the database
            // user
            //   .save(user)
          };
      

         console.log(users);
         console.log(users.length);





        })

  
  

    
  }) 
    .catch(function(err){
  //      handle error   
 });
 

