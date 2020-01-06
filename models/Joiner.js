const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const joinerSchema = new Schema(
    {
      travent: {
        type: Schema.Types.ObjectId,
        ref: 'Travent'
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Joiner", joinerSchema)