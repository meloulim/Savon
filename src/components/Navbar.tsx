import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, ChevronDown, History, Settings } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Savons', href: '/boutique?category=Savons' },
  { name: 'Cosmétiques', href: '/boutique?category=Cosmétiques' },
  { name: 'Senteurs', href: '/boutique?category=Senteurs' },
  { name: "Lait d'ânesse", href: '/boutique?category=Lait%20d\'ânesse' },
  { name: 'Accessoires', href: '/boutique?category=Accessoires' },
];

const navigation = [
  { name: 'Accueil', href: '/' },
  {
    name: 'Boutique',
    href: '/boutique',
    children: categories,
  },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const items = useCartStore(state => state.items);
  const { user, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-serif text-primary-700">
                La Savonnerie
              </Link>
            </div>
            <div className="hidden sm:ml-12 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.href}
                    className="inline-flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </Link>
                  {item.children && activeDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                            role="menuitem"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            {user ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <History className="h-5 w-5" />
                </Link>
                <div className="relative group">
                  <button className="text-gray-600 hover:text-primary-600 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                    <div className="py-1">
                      <p className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user.name}
                      </p>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Administration
                          </div>
                        </Link>
                      )}
                      <button
                        onClick={() => useAuthStore.getState().logout()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
            <button 
              onClick={handleCartClick}
              className="text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
              {item.children && (
                <div className="pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="px-3 py-2 space-y-1">
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Panier ({items.length})
            </Link>
            {user ? (
              <>
                <Link
                  to="/orders"
                  className="flex items-center text-gray-600 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <History className="h-5 w-5 mr-2" />
                  Mes commandes
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center text-gray-600 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Administration
                  </Link>
                )}
                <button
                  onClick={() => {
                    useAuthStore.getState().logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center text-gray-600 hover:text-primary-600"
                >
                  <User className="h-5 w-5 mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}