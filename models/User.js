const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  travents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Travent'
    }
  ]
});

module.exports = mongoose.model("User", userSchema);