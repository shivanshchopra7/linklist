import { Schema, model, models } from "mongoose";

// Define the schema
const EventSchema = new Schema(
  {
    type: { type: String, required: true }, // "view" or "click"
    uri: { type: String, required: true },  // Page URL
  },
  { timestamps: true }
);

// Safeguard against model overwrite errors
export const Event = models?.Event || model("Event", EventSchema);
