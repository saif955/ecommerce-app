import { create } from "zustand";

const useCartStore = create((set) => ({
    cartItems: [],
    total: 0,
    totalItems: 0,
    setCartItems: (items) => set({ 
        cartItems: items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0) 
    }),
    setTotal: (total) => set({ total: total }),
}));

export default useCartStore;
