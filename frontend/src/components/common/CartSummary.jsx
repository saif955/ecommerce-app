import { Box, List, ListItem, Text, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import useCartStore from '../../store/cartStore'
import { toaster } from "@/components/ui/toaster";
import { getCart } from "../../utiils/Cartapi";
const CartSummary = () => {
    const { cartItems, total, totalItems, setCartItems, setTotal } = useCartStore();

    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.items || []);
        setTotal(data.total || 0);
      } catch (error) {
        toaster.create({
          title: "Error fetching cart",
          description: error.message,
          status: "error",
          duration: 3000,
        });
      }
    }

    useEffect(() => {
      fetchCart();
    }, []);
  return (
    <Box>
      <Heading>Cart Summary</Heading>
      <List.Root>
        {cartItems.map((item) => (
          <List.Item key={item._id}>
            <ListItem>{item.name}</ListItem>
            <ListItem>Quantity: {item.quantity}</ListItem>
            <ListItem>Price: {item.priceSnapshot}</ListItem>
          </List.Item>
        ))}
      </List.Root>
      <Text>Total Items: {totalItems}</Text>
      <Text>Total Price: {total}</Text>
      
    </Box>
  )
}

export default CartSummary
