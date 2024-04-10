import axios from 'axios';

const base_url = "http://localhost:8080";


const productservice = {
    createProduct: async (product) => {
        try {
            const response = await axios.post(base_url + '/products', product);
            return response.data;
        } catch (error) {
            console.error('Error creating the product:', error);
            throw error;
        }
    },

    getAllProducts: async () => {
        try {
            const response = await axios.get(base_url + '/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axios.get(base_url + `/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    },

    updateProduct: async (id, product) => {
        try {
            const response = await axios.put(base_url + `/products/${id}`, product);
            return response.data;
        } catch (error) {
            console.error(`Error updating product with id ${id}:`, error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            await axios.delete(base_url + `/products/${id}`);
        } catch (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            throw error;
        }
    }
};

export default productservice;
