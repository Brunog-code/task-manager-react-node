const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    maxlength: 300,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finalizedAt: {
    type: Date,
  },
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports = Task;
