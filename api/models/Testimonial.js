import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 5,
    },
    isFeatured: {
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

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
