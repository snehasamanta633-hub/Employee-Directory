const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    contact: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Left"],
      default: "Active",
      required: true
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", employeeSchema);