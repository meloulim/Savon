import React from 'react';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-primary-800 mb-8">Notre Histoire</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Au cœur de Montmartre, notre savonnerie artisanale perpétue une tradition centenaire 
            de fabrication de savons naturels. Depuis notre création, nous nous engageons à 
            produire des cosmétiques de qualité, respectueux de votre peau et de l'environnement.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src="https://images.unsplash.com/photo-1612487439139-c2021eaf0f12"
              alt="Fabrication artisanale"
              className="rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-2xl font-serif text-primary-700 mb-4">Notre Savoir-Faire</h2>
              <p className="text-gray-600">
                Chaque savon est fabriqué à la main selon des méthodes traditionnelles, 
                en utilisant des huiles végétales biologiques et des ingrédients naturels 
                soigneusement sélectionnés.
              </p>
            </div>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-serif text-primary-700 mb-4">Nos Valeurs</h2>
            <ul className="space-y-4 text-gray-600">
              <li>🌿 Ingrédients 100% naturels et biologiques</li>
              <li>🤝 Production artisanale et locale</li>
              <li>♻️ Emballages écologiques et recyclables</li>
              <li>🐰 Produits non testés sur les animaux</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}