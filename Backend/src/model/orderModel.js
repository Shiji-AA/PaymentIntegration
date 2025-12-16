import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
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
      enum: [  
    "CREATED",
    "NEW",
    "PENDING",
    "PENDING_VBV",
    "CHARGED",
    "FAILED",
    "AUTHORIZATION_FAILED",
    "AUTHENTICATION_FAILED",
    "CANCELLED"
    ],
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
      default: null,
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

      // Store full Juspay response (VERY useful)
    juspayResponse: {
      type: Object,
      default: null,
    },
    
  },
  {
    timestamps: true,
  }
);


const Order = model("Order", orderSchema);

export default Order;
