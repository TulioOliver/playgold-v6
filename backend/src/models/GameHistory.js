import mongoose from "mongoose";

const GameHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gameName: {
      type: String,
      required: true,
    },

    betAmount: {
      type: Number,
      required: true,
    },

    winAmount: {
      type: Number,
      required: true,
    },

    balanceBefore: {
      type: Number,
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    pattern: {
      type: Array,
      required: true,
    },

    profitImpact: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GameHistory", GameHistorySchema);
