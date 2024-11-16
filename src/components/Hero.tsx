import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[90vh] bg-cover bg-center" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1612487439139-c2021eaf0f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
    }}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800/60 to-secondary-800/60" />
      <div className="relative max-w-7xl mx-auto pt-32 px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl font-serif text-white mb-6">
            La Savonnerie<br />de Montmartre
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Découvrez nos savons artisanaux et cosmétiques naturels, fabriqués avec passion au cœur de Montmartre.
          </p>
          <div className="space-x-4">
            <a
              href="/shop"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-md hover:bg-primary-600 transition-colors"
            >
              Découvrir nos produits
            </a>
            <a
              href="/about"
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-3 rounded-md hover:bg-white/20 transition-colors"
            >
              Notre histoire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}