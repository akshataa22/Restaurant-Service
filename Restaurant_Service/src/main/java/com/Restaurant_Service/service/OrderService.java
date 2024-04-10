package com.Restaurant_Service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Restaurant_Service.model.Order;
import com.Restaurant_Service.model.Product;
import com.Restaurant_Service.repository.OrderRepository;
import com.Restaurant_Service.repository.ProductRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;    
    
    @Autowired
    private ProductRepository productRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order placeOrder(Order order) {
        Product product = productRepository.findByName(order.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found with name: " + order.getProductName()));

        double totalPrice = product.getPrice() * order.getQuantity();
        order.setTotalPrice(totalPrice);
        order.setProductName(product.getName());
        return orderRepository.save(order);
    }
    
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
