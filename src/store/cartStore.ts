import { create } from 'zustand';
import { CartStore, Product } from '../types';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product: Product) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        set({
          items: items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      }
    } else {
      set({ items: [...items, { product, quantity: 1 }] });
    }
    
    set(state => ({
      total: state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    }));
  },
  
  removeItem: (productId: number) => {
    set(state => ({
      items: state.items.filter(item => item.product.id !== productId),
      total: state.items
        .filter(item => item.product.id !== productId)
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }));
  },
  
  updateQuantity: (productId: number, quantity: number) => {
    const items = get().items;
    const item = items.find(item => item.product.id === productId);
    
    if (item && quantity <= item.product.stock && quantity > 0) {
      set({
        items: items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      });
      
      set(state => ({
        total: state.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
      }));
    }
  },
  
  clearCart: () => set({ items: [], total: 0 }),
}));