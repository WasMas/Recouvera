const paymentSchema = new mongoose.Schema({
    facture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "facture",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ["cash", "credit_card", "bank_transfer"],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Payment", paymentSchema);
