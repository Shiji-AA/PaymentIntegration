import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cricketOrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
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

    // Optional: raw Juspay status response, handy for debugging. Delete if not wanted.
    juspayResponse: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true, // gives createdAt / updatedAt
  }
);

const Cricket = model("Cricket", cricketOrderSchema);

export default Cricket;