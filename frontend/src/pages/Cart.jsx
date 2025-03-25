import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart,updateCartItem } from "../utiils/Cartapi"; // Fixed typo
import { toaster } from "@/components/ui/toaster";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

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

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      await fetchCart(); // Refresh cart after removal
      toaster.create({
        title: "Item removed",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toaster.create({
        title: "Removal failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(productId);
      } else {
        await updateCartItem(productId, newQuantity); // true for exact quantity update
      }
      await fetchCart(); // Refresh cart after quantity change
      toaster.create({
        title: "Quantity updated",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toaster.create({
        title: "Update failed",
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
    <Box p={8} maxW="container.xl" mx="auto">
      <Center>
        <Heading mb={6} fontSize="2xl">
          Shopping Cart
        </Heading>
      </Center>
      {cartItems.length === 0 ? (
        <Text fontSize="lg">Your cart is empty</Text>
      ) : (
        <Box>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            {cartItems.map((item) => (
              <Box 
                key={item.product.id}
                borderWidth="1px" 
                borderRadius="lg" 
                p={4}
                boxShadow="md"
              >
                <Flex direction="column" gap={3}>
                  <Text fontSize="xl" fontWeight="bold">
                    {item.product.name}
                  </Text>
                  
                  <Flex justify="space-between" align="center">
                    <Text>Price:</Text>
                    <Text fontWeight="semibold">${item.priceSnapshot}</Text>
                  </Flex>
                  
                  <Flex justify="space-between" align="center">
                    <Text>Quantity:</Text>
                    <Flex align="center" gap={2}>
                      <Button 
                        size="sm" 
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        isDisabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button 
                        size="sm" 
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </Flex>
                  </Flex>
                  
                  <Button
                    mt={2}
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    Remove
                  </Button>
                </Flex>
              </Box>
            ))}
          </Grid>

          <Flex mt={8} justifyContent="flex-end">
            <Box p={4} borderRadius="md">
              <Text fontSize="xl" fontWeight="bold">
                Total: ${total}
              </Text>
              <Button mt={4} colorScheme="blue" size="lg">
                Checkout
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
