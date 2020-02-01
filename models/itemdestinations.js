const mongoose = require("mongoose");

const ItemDestinatonSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  itemname: {
    type: String,
    required: true,
    unique: true
  },
  itemDestinations: {
    type: Array
  }
});

module.exports = mongoose.model(
  "ItemDestinations",
  ItemDestinatonSchema,
  "itemdestinations"
);
