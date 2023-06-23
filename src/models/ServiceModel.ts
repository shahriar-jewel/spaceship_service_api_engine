import { IService } from "../core/IServiceProvider";
import mongoose, { Schema } from "mongoose";

const ServiceSchema: Schema = new Schema({
    serviceId: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: false, default:null },
    description: { type: String, required: false, default: null },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IService>("services", ServiceSchema);