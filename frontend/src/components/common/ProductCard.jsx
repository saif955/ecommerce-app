import { useState } from "react";
import { Button, Image, Text, Box } from "@chakra-ui/react";
import { addToCart, getCart } from "@/utiils/Cartapi";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/store/cartStore";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { setCartItems, setTotal } = useCartStore();
  const handleAddToCart = async (productId) => {
    setIsLoading(true);
    try {
      await addToCart(productId);
      const data = await getCart();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
      toaster.create({
        title: "Item added to cart",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toaster.create({
        title: "Add to cart failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      maxW="sm"
      key={product._id}
      overflow="hidden"
      gap={4}
      border="1px solid #ccc"
      p={4}
      borderRadius="md"
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        objectFit="cover"
      />
      <Box mt={4}>
        <Text fontSize="xl" fontWeight="bold">
          {product.name}
        </Text>
        <Box mt={2}>
          <Text fontWeight="bold" fontFamily="monospace" fontSize="2xl">
            ${product.price}
          </Text>
        </Box>
      </Box>
      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => handleAddToCart(product._id)}
          isLoading={isLoading}
        >
          Add to Cart
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={async () => {
            await handleAddToCart(product._id);
            navigate("/cart");
          }}
          isLoading={isLoading}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
