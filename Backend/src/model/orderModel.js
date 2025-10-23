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
    campusOpted: {
      type: String,
      enum: ["Kottiyam", "Kadappakkada", "Kochi", "Online"],
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

    // Add these to store full payment info
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    collegeName: { type: String },
    joiningBatch: { type: String },
    dayScholarOrHosteler: { type: String },
    hasLaptop: { type: String },
    whatsapp: { type: String },
  },
  {
    timestamps: true,
  }
);


const Order = model("Order", orderSchema);

export default Order;
