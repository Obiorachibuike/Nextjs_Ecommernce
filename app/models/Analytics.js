import mongoose from 'mongoose';



const analyticsSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,  // Ensure there's only one Analytics entry per year
    },
    totalBlogViews: {
      type: Number,
      required: true,
      default: 0,  // Default value if not provided
    },
    totalUsers: {
      type: Number,
      required: true,
      default: 0,  // Default value if not provided
    },
    activeUsers: {
      type: Number,
      required: true,
      default: 0,  // Default value if not provided
    },
    websiteViews: {
      daily: {
        type: Number,
        default: 0,  // Default daily view count
      },
      weekly: {
        type: Number,
        default: 0,  // Default weekly view count
      },
      monthly: {
        type: Number,
        default: 0,  // Default monthly view count
      },
      yearly: {
        type: Number,
        default: 0,  // Default yearly view count
      },
    },
    months: {
      type: [String],
      required: true,
      default: [],  // Default empty array for months
    },
    sales: {
      type: [Number],
      required: true,
      default: [],  // Default empty array for sales
    },
    categories: {
      type: [String],
      required: true,
      default: [],  // Default empty array for categories
    },
    categorySales: {
      type: [Number],
      required: true,
      default: [],  // Default empty array for category sales
    },
    totalOrders: {
      type: Number,
      required: true,
      default: 0,  // Total number of orders in the year
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Order", 
      },
    ],
  },
  {
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export default Analytics;
