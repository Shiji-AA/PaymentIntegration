import mongoose from "mongoose";

const { Schema, model } = mongoose;

const partialOrderSchema = new Schema(
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
        "CANCELLED",
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

    // Partial customer details
    customerName: {
      type: String,
      default: "",
    },

    customerEmail: {
      type: String,
      default: "",
    },

    customerPhone: {
      type: String,
      default: "",
    },

    // Store Juspay response
    juspayResponse: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// IMPORTANT: Different model name
const PartialOrder = model("PartialOrder", partialOrderSchema);

export default PartialOrder;