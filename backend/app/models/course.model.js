module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: { type: String, required: true },
        faculty: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Faculty' 
        },
        editor: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' 
        },
        description: { type: String, required: true },
        link: { type: String, required: true },
        count_views : { type: Number, required: true },
      },
      { timestamps: true }//תאריך יצירה
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Course = mongoose.model("Course", schema);
    return Course;
  };