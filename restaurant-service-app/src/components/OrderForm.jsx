import React, { useState, useEffect } from 'react';
import orderservice from './../service/orderservice';

function OrderForm() {
  const [orders, setOrders] = useState([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  const handleSubmit = async (e, fetchOrders) => {
    e.preventDefault();
    const newOrder = { product: { name: productName }, quantity: parseInt(quantity) };
    try {
      await orderservice.placeOrder(newOrder);
      fetchOrders();
      setProductName('');
      setQuantity('');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await orderservice.getAllOrders();
      setOrders(fetchedOrders); // Update state with fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  
  const deleteOrder = async (id) => {
    try {
        await orderservice.deleteOrder(id);
        // After deletion, fetch orders again to update the list
        fetchOrders();
    } catch (error) {
        console.error("Error deleting order:", error);
    }
};

  return (
    <div>
      <h2>Order Placement</h2>
      <form onSubmit={(e) => handleSubmit(e, fetchOrders)}>
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <button type="submit">Place Order</button>
      </form>
      <div>
      <h3>Orders List</h3>
        {orders.map(order => (
          <li key={order.id}>Product: {order.productName} &nbsp; Total Price: {order.totalPrice} &nbsp; <button onClick={() => deleteOrder(order.id)}>Delete</button></li>
        ))}
    </div>
    </div>
  );
}

export default OrderForm;
