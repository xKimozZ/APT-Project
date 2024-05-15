const { Schema, model } = require("mongoose");

const VersionSchema = new Schema({
  data: Object,
  date: { type: Date, default: Date.now }
});

const Document = new Schema({
  _id: String,
  data: Object,
  versions: [VersionSchema]
});

module.exports = model("Document", Document);
