const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  hidden: {type: Boolean, required: true, default: false},
  post: {type: Schema.Types.ObjectId, ref: "Post", required: true},
  author: {type: Schema.Types.ObjectId, ref: "User", required: true},
  content: {type: String, required: true},
  timestamp: {type: Date, default: Date.now()}
})

CommentSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Comment", CommentSchema);