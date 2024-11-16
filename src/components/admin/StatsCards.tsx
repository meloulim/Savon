import React, { useEffect, useState } from 'react';
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react';
import { api } from '../../services/api';

interface Stats {
  revenue: number;
  products: number;
  orders: number;
  customers: number;
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stats>({
    revenue: 0,
    products: 0,
    orders: 0,
    customers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      name: 'Revenu total',
      value: `${stats.revenue.toFixed(2)} €`,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      name: 'Produits',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      name: 'Commandes',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      name: 'Clients',
      value: stats.customers,
      icon: Users,
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className={`h-6 w-6 text-white ${card.color} rounded-md p-1`}
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}