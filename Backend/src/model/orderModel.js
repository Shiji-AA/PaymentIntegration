import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    coursename: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      enum: ["Kottiyam", "Kadappakkada", "Kochi"],
      default: "Kochi",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["CREATED", "INITIATED", "CHARGED", "PENDING", "FAILED", "AUTHORIZATION_FAILED", "AUTHENTICATION_FAILED"],
      default: "CREATED",
    },
    paymentMethod: {
      type: String,
      default: "juspay",
    },
    enrolled: {
      type: Boolean,
      default: false,
    },
    enrolledAt: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

const Order = model("Order", orderSchema);

export default Order;
