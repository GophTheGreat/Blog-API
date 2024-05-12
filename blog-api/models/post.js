const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  hidden: {type: Boolean, required: true, default: false},
  datepublished: {type: Date, default: Date.now},
  datewritten: {type: Date, default: Date.now}
})

PostSchema.virtual("datepublished_formatted").get(function () {
  return DateTime.fromJSDate(this.datepublished).toISODate(); // format 'YYYY-MM-DD'
});

PostSchema.virtual("datewritten_formatted").get(function () {
  return DateTime.fromJSDate(this.datewritten).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Post", PostSchema);