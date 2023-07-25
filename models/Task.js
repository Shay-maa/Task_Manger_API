const mongoose = require ('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Provide Name"],
      trim: true,
      maxlength: [20, "Name Can't be More Than 20 Characters"],
    },
    description: {
      type: String,
      maxlength: [50, "description Can't be More Than 50 Characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Task' , TaskSchema)