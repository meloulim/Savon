import React from 'react';
import { Leaf, Truck, Heart, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Produits Naturels',
    description: 'Ingrédients 100% naturels et respectueux de l\'environnement',
  },
  {
    icon: Truck,
    title: 'Livraison Gratuite',
    description: 'Dès 49€ d\'achat en France métropolitaine',
  },
  {
    icon: Heart,
    title: 'Fabrication Artisanale',
    description: 'Fait main avec passion au cœur de Montmartre',
  },
  {
    icon: ShieldCheck,
    title: 'Qualité Garantie',
    description: 'Satisfaction garantie ou remboursé sous 30 jours',
  },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-primary-50/50 hover:bg-primary-50 transition-colors"
            >
              <benefit.icon className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}