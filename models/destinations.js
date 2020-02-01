const mongoose = require("mongoose");
//**NOTE no need of gui to insert destinations insert manually is ok  */
const DestinatonSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model(
  "Destinations",
  DestinatonSchema,
  "destinations"
);
