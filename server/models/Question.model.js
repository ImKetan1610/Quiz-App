const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  ImageUrl: {
    type: String,
  },
});

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    optionType: {
      type: String,
      enum: ["Text", "ImageUrl", "TextImageUrl"],
      required: true,
    },
    options: [OptionSchema],
    poll: [{ type: Number, default: new Array(4).fill(0) }], // for poll type quiz
    impression: {
      type: Number,
      default: 0,
    },
    correctImpression: {
      type: Number,
      default: 0,
    },
    answer: { type: Number, required: true, immutable: true }, // Only for Q&A type quiz
    timer: { type: Number, default: 0 },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
