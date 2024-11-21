import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: {
      type: String,
      required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
  },
  { timestamps: true }
);

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
