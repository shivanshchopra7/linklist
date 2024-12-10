import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
    type: { type: String, required: true }, // "view" or "click"
    uri: { type: String, required: true },  // Page URL

}, { timestamps: true });

if (models.Event) {
    delete models.Event;
  }
  
  // Export the model
  export const Event = model("Event", EventSchema);

