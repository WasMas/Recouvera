import Client from "../models/client.js";

export const createClient = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const client = await Client.create({ name, email, phone, address });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};