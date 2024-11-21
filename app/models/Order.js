import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,  // Automatically generate unique ID for the order
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User who placed the order
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',  // Default status of the order
    },
    totalAmount: {
      type: Number,
      required: true,  // Total amount of the order
    },
    date: {
      type: Date,
      default: Date.now,  // Date the order was placed
    },
  },
  {
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt`
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
