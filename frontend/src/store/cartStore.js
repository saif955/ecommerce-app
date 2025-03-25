import { create } from "zustand";

const useCartStore = create((set) => ({
    cart: [],
}));

export default useCartStore;
