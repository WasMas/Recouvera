export const createPayment = async (req, res) => {

const { invoice, amount } = req.body;

const payment = await Payment.create({ invoice, amount });

const invoiceDoc = await Invoice.findById(invoice);

if (amount >= invoiceDoc.amount) {
    invoiceDoc.status = "paid";
    await invoiceDoc.save();
}

res.status(201).json(payment);
};
