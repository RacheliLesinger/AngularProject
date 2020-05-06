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
          ref: 'Faculties' 
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
  
    const Tutorial = mongoose.model("tutorial", schema);
    return Tutorial;
  };
  

// ######################
// #####################


