import {create} from 'zustand'

const useCartStore = create((set) =>({
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    addItem: (product) => {
        existingItem  = set.items.find(item => item.id === product.id)
        if (existingItem) {
            return{
                items: state.items.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item),
                totalPrice: state.totalPrice + product.price,
                totalQuantity: state.totalQuantity + 1
            }
        } else {
            return{
                items: [...state.items, {...product , quantity: 1}],
                totalPrice: state.totalPrice + product.price,
                totalQuantity: state.totalQuantity + 1
            }
        }
    },
    removeItem: (product) => {
        existingItem  = set.items.find(item => item.id === product.id)
        if (existingItem) {
            return{
                items: state.items.map(item => item.id === product.id ? {...item, quantity: item.quantity - 1} : item),
                totalPrice: state.totalPrice - product.price,
                totalQuantity: state.totalQuantity - 1
            }
        } else {
            return{
                items: state.items,
                totalPrice: state.totalPrice,                
                totalQuantity: state.totalQuantity                                                              
            }
        }
    }
}))