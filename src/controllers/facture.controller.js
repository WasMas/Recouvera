export const createInvoice = async (req, res) => {
    const { client, amount, dueDate } = req.body;
    try {
        const invoice = await Invoice.create({ client, amount, dueDate });
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate("client");
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};