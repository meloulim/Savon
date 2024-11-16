import React from 'react';

export default function Newsletter() {
  return (
    <section className="bg-primary-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif text-primary-800 mb-4">
            Restez informé
          </h2>
          <p className="text-gray-600 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos nouveautés et offres exclusives
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="px-4 py-3 rounded-md border-gray-200 focus:ring-primary-500 focus:border-primary-500 flex-1 max-w-md"
              required
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}