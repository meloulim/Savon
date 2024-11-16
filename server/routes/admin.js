import express from 'express';
import { adminAuth } from '../middleware/auth.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// Get admin dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [orders, products, customers] = await Promise.all([
      Order.find({ status: 'paid' }),
      Product.find(),
      User.find({ role: 'user' })
    ]);

    const revenue = orders.reduce((total, order) => total + order.total, 0);

    res.json({
      revenue,
      products: products.length,
      orders: orders.length,
      customers: customers.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders with details
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/orders/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all customers
router.get('/customers', adminAuth, async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('-password')
      .sort('-createdAt');
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get customer details with orders
router.get('/customers/:id', adminAuth, async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');
    const orders = await Order.find({ user: req.params.id })
      .populate('items.product')
      .sort('-createdAt');
    
    res.json({ customer, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product stock
router.patch('/products/:id/stock', adminAuth, async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get stock alerts (products with low stock)
router.get('/stock-alerts', adminAuth, async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as default };