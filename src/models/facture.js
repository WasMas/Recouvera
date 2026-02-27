import mongoose from "mongoose";

const ifactureSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "overdue"],
        default: "pending"
    }

}, { timestamps: true });

export default mongoose.model("facture", factureSchema);