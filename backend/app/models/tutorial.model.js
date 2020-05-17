module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      name: {  type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'  },
      faculty: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty' },
      img: { type: String, required: true },
      link:{ type: String, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;

  
};
