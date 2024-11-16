import React from 'react';
import CartComponent from '../components/Cart';

export default function Cart() {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-serif text-primary-800 mb-6">Mon Panier</h1>
      <CartComponent />
    </div>
  );
}