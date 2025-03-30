import api from "./api";

 const createProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create product';
    }
};

 const updateProduct = async (productId, productData) => {
    try {
        const response = await api.put(`/products/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update product';
    }
};

 const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete product';
    }
};

 export { createProduct, updateProduct, deleteProduct };