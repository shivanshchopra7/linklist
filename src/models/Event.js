import { Schema, model, models } from "mongoose";

// Define the schema with validation and indexing
const EventSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["view", "click"], // Restrict event types
    },
    uri: {
      type: String,
      required: true,
      trim: true, // Remove leading/trailing spaces
    },
  },
  { timestamps: true }
);

// Add an index for optimized querying
EventSchema.index({ type: 1, uri: 1 });

// Safeguard against model overwrite issues
export const Event = models?.Event || model("Event", EventSchema);
