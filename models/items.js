const mongoose = require("mongoose");

const ItemsSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    user: { type: String },
    name: { type: String },
    status: { type: String, default: "draft" },
    description: { type: String },
    instructions: { type: String },
    channel: { type: String },
    url: { type: String },
    fileType: { type: String },
    iframe_url: { type: String },
    category: { type: String },
    creationDate: { type: Date },
    publishedDate: { type: Date },
    width: { type: Number },
    height: { type: Number },
    tags: { type: Array },
    attachments: {
      zipFile: { type: String },
      thumbnail1: { type: String },
      thumbnail2: { type: String },
      screenshot1: { type: String },
      screenshot2: { type: String },
      screenshot3: { type: String },
      screenshot4: { type: String }
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Items", ItemsSchema, "items");
