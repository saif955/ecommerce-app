import { Box, List, Text, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import useCartStore from "../../store/cartStore";
import { toaster } from "@/components/ui/toaster";
import { getCart } from "../../utiils/Cartapi";
import { Separator } from "@chakra-ui/react";
const CartSummary = () => {
  const { cartItems, total, totalItems, setCartItems, setTotal } =
    useCartStore();

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
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <Box
      p={4}
      border="1px solid #ccc"
      borderRadius="md"
      mb={4}
      padding={4}
      margin={4}
      display={"flex"}
      flexDirection={"column"}  
    >
      <Heading>Cart Summary</Heading>
      <List.Root>
        {cartItems.map((item) => (
          <HStack>
            <List.Item key={item._id} mb={2} spaceY={2}>
              <VStack>
              <Text fontSize="2xl">Name: {item.product.name}</Text>
              <Text>Quantity:{item.quantity}</Text>
              <Text>Price: {item.priceSnapshot}</Text>
              </VStack>
            </List.Item>
          </HStack>
        ))}
      </List.Root>
        
        <Box display="flex" flexDirection="column" justifyContent="flex-end" gap={2}>
      <Text fontSize="lg" textAlign="right">Total Items: {totalItems}</Text>
      <Text fontSize="lg" textAlign="right">Total Price: {total}</Text>
      </Box>
    </Box>
  );
};

export default CartSummary;
