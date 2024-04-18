const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  title: {type: String, required},
  public: {type: Boolean, required, default: true},
  content: {type: String, required},
  datepublished: {type: Date, default: Date.now()},
  datewritten: {type: Date, default: Date.now()}
})

PostSchema.virtual("datepublished_formatted").get(function () {
  return DateTime.fromJSDate(this.datepublished).toISODate(); // format 'YYYY-MM-DD'
});

PostSchema.virtual("datewritten_formatted").get(function () {
  return DateTime.fromJSDate(this.datewritten).toISODate(); // format 'YYYY-MM-DD'
});

module.exports(mongoose.model("Post", PostSchema));