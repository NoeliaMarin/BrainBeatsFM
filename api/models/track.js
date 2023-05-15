const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  genre: { type: String, required: true },
  url: { type: String, required: true },
});

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
