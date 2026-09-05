import mongoose from "mongoose";

const CaseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: "Digital Marketing",
    },
    metric: {
      type: String,
      default: "3X Leads",
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    client: {
      type: String,
      default: "Confidential (Nagpur)",
    },
    role: {
      type: String,
      default: "Full-Stack Digital Marketing",
    },
    duration: {
      type: String,
      default: "3 Months",
    },
    budget: {
      type: String,
      default: "Confidential",
    },
    contentImage: {
      type: String,
      default: "",
    },
    overview: {
      type: String,
      default: "",
    },
    challenges: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    strategy: {
      type: String,
      default: "",
    },
    results: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);
