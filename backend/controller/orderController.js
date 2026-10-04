const Order = require('../model/Order');
const { orderPlacedMessage } = require('../utils/Message');
const sendEmail = require('../utils/sendEmail');



const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: "Invalid order data" })
        }
        const order = await Order.create({ userId: req.user._id, items, totalAmount, address, paymentId });

        const mailMessage = orderPlacedMessage(req.user.name, totalAmount, order._id);
        await sendEmail(req.user.email, "Order Created", mailMessage)
        return res.status(201).json({ message: "Order Created Succesfully", order })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'id name')
        if (orders) {
            return res.json(orders)
        }
        return res.status(404).json({ message: "Orders not found" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('items.productId', 'name price')
        if (orders) {
            return res.json(orders)
        }
        return res.status(404).json({ message: "Orders not found" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            return res.json({ message: "Order Status Updated", order });
        }
        return res.status(404).json({ message: "Order not found" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    myOrders,
    getOrders,
    createOrder,
    updateOrderStatus
}