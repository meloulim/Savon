import express from 'express';
import Product from '../models/Product.js';
import { adminAuth, auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('-__v');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check stock availability
router.post('/check-stock', auth, async (req, res) => {
  try {
    const { items } = req.body;
    const stockCheck = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Produit ${item.productId} non trouvé`);
        }
        return {
          productId: item.productId,
          available: product.stock >= item.quantity,
          currentStock: product.stock,
          requested: item.quantity
        };
      })
    );

    const unavailableItems = stockCheck.filter(item => !item.available);
    if (unavailableItems.length > 0) {
      return res.status(400).json({
        error: 'Stock insuffisant',
        items: unavailableItems
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update stock (admin only)
router.patch('/:id/stock', adminAuth, async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { stock } },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Reduce stock after successful payment
router.post('/reduce-stock', auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = req.body;
    
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Produit ${item.productId} non trouvé`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuffisant pour ${product.name}`);
      }
      
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { session, new: true }
      );
    }
    
    await session.commitTransaction();
    res.json({ success: true });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

export { router as default };