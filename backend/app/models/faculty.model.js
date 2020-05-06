module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: { type: String, required: true }
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Faculty = mongoose.model("Faculty", schema);
    return Faculty;
  };