import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
    type: { type: String, required: true }, // "view" or "click"
    uri: { type: String, required: true },  // Page URL

}, { timestamps: true });

export const Event = models.Event || model("Event", EventSchema);
