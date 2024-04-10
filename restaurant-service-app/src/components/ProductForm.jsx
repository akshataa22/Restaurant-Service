import React, { useState, useEffect } from 'react';
import productservice from './../service/productservice';

function ProductForm() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await productservice.getAllProducts();
      setProducts(fetchedProducts); // Update state with fetched products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUpdate = async (productId) => {
    try {
      await productservice.updateProduct(productId, editingProduct); // Pass editingProduct as second argument
      setEditingProduct(null); // Reset editingProduct state
      fetchProducts(); // Fetch products again to update the list
    } catch (error) {
      console.error(`Error updating product with id ${productId}:`, error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await productservice.deleteProduct(productId);
      fetchProducts(); // Fetch products again to update the list
    } catch (error) {
      console.error(`Error deleting product with id ${productId}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productservice.createProduct(newProduct);
      fetchProducts(); // Fetch products again to update the list
      setNewProduct({ name: '', price: '' }); // Clear input fields
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="productPrice">Product Price:</label>
        <input
          type="number"
          id="productPrice"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <h3>Products</h3>
      {products.map((product) => (
        <li key={product.id}>
          {editingProduct && editingProduct.id === product.id ? (
            <>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              />
              <button onClick={() => handleUpdate(product.id)}>Save</button>
            </>
          ) : (
            <>
              {product.name} - {product.price} Rs
              <button style={{ marginLeft: 20 }} onClick={() => setEditingProduct(product)}>Edit</button>
              <button style={{ marginLeft: 10 }} onClick={() => handleDelete(product.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </div>
  );
}

export default ProductForm;
