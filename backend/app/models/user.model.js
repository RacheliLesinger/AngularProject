// module.exports = mongoose => {
//     var schema = mongoose.Schema(
//       {
//         first_name: String,
//         last_name: String,
//         username: String,
//         password:String,
//         status:String,
//         // status:["lecturer", "student"],
//         faculty:String,
//         status:String,
//         address:String
//         // published: Boolean
        
//       },
//       { timestamps: true }
//     );
  
//     schema.method("toJSON", function() {
//       const { __v, _id, ...object } = this.toObject();
//       object.id = _id;
//       return object;
//     });
  
//     const User = mongoose.model("user", schema);
//     return User;
//   };
  

  // #################
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
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const User = mongoose.model("User", schema);
    return User;;
  };
  




