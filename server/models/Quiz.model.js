const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true, enum:['POLL','QnA'] },
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: "Question"}],
    impressions: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
