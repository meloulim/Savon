import React from 'react';

const products = [
  {
    id: 1,
    name: 'Savon à la Lavande',
    price: '12,90 €',
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Savons',
  },
  {
    id: 2,
    name: 'Crème Hydratante',
    price: '24,90 €',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Cosmétiques',
  },
  {
    id: 3,
    name: 'Parfum Rose de Mai',
    price: '49,90 €',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Parfums',
  },
  {
    id: 4,
    name: 'Coffret Découverte',
    price: '39,90 €',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Coffrets',
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif text-primary-800 text-center mb-12">
          Nos Produits Phares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-primary-600 font-medium">{product.category}</p>
                <h3 className="text-lg font-medium text-gray-900 mt-1">
                  {product.name}
                </h3>
                <p className="text-primary-700 font-medium mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}