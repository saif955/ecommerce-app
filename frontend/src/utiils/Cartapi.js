import api from "./api";

const addToCart = async (productId) => {
    try {
        const response = await api.post('/cart', {
            productId: productId.toString(),
            quantity: 1
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to add product to cart';
    }
} 

const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch cart';
    }
}

const removeFromCart = async (productId) => {
    try {
        const response = await api.delete(`/cart/${productId.toString()}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to remove product from cart';
    }
}

const updateCartItem = async (productId, quantity) => {
    try {
        const response = await api.put(`/cart/${productId.toString()}`, {
            quantity: quantity
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update cart item';
    }
}



export { addToCart, getCart, removeFromCart, updateCartItem };
