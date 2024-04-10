import axios from 'axios';

const baseURL = "http://localhost:8080";

const orderService = {
    getAllOrders: async () => {
        try {
            const response = await axios.get(`${baseURL}/orders`);
            return response.data;
        } catch (error) {
            console.error("Error while fetching orders: ", error);
            throw error;
        }
    },
    
    placeOrder: async (order) => {
        try {
            const orderData = {
                productName: order.product.name,
                quantity: order.quantity
            };

            const response = await axios.post(`${baseURL}/orders`, orderData);
            console.log("Order Placed Successfully.");
            return response.data;
        } catch (error) {
            console.error("Error while placing order: ", error);
            throw error;
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const response = await axios.delete(`${baseURL}/orders/${orderId}`);
            console.log("Product deleted successfully.");
            return response.data;
        } catch (error) {
            console.error("Error while deleting order: ", error);
            throw error;
        }
    }
}

export default orderService;
