import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Minus, Plus, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { orders } from '../services/api';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe n\'est pas initialisé');
      }

      // Créer la commande et obtenir la session Stripe
      const { data } = await orders.create({
        items: items.map(item => ({
          product: item.product.id,
          quantity: item.quantity
        })),
        shippingAddress: {
          // Dans une version complète, ces informations seraient collectées via un formulaire
          street: '',
          city: '',
          postalCode: '',
          country: 'FR'
        }
      });

      // Rediriger vers la page de paiement Stripe
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Votre panier est vide
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center space-x-4 py-4 border-b">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.price.toFixed(2)} €</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => removeItem(product.id)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Traitement en cours...
            </span>
          ) : (
            'Procéder au paiement'
          )}
        </button>
        
        <button
          onClick={clearCart}
          disabled={loading}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}