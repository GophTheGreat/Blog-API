const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  hidden: {type: Boolean, required, default: false},
  author: {type: Schema.Types.ObjectId, ref: "User", required: true},
  content: {type: String, required},
  timestamp: {type: Date, default: Date.now()}
})

PostSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toISODate(); // format 'YYYY-MM-DD'
});

module.exports(mongoose.model("Comment", CommentSchema));