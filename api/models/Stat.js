import mongoose from "mongoose";

const StatSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
    },
    suffix: {
      type: String,
      default: "+",
    },
    decimals: {
      type: Number,
      default: 0,
    },
    caseStudy: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Stat || mongoose.model("Stat", StatSchema);
