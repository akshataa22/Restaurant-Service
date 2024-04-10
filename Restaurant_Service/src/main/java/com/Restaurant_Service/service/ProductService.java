package com.Restaurant_Service.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Restaurant_Service.model.Product;
import com.Restaurant_Service.repository.ProductRepository;
import com.Restaurant_Service.response.Response;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<Object> createProduct(Product p) {
    	Product product = new Product();
    	product.setName(p.getName());
    	product.setPrice(p.getPrice());
    	return ResponseEntity.ok(productRepository.save(product));
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Response updateProduct(Long id, Product p) {
        Product product = productRepository.findById(id).orElse(null);
        product.setName(p.getName());
        product.setPrice(p.getPrice());
        productRepository.save(product);
        Response response = new Response();
        response.setCode(200);
		response.setMessage("Note updated Sucessfully");
        return response;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
