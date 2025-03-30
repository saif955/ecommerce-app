import {
  Box,
  Heading,
  Spinner,
  Button,
  Presence,
  useDisclosure,
  Input,
  Text,
} from "@chakra-ui/react";
import { getProducts } from "@/utiils/api";
import { useEffect, useState } from "react";
import ProductCardAdmin from "../components/common/ProductCardAdmin";
import { createProduct } from "@/utiils/Adminapi";
import { toaster } from "@/components/ui/toaster";

const Admin = () => {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: 0,
  });
  const { open, onToggle } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      await createProduct(productData);
      toaster.create({
        title: "Product added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      refreshProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to add product"
      );
      toaster.create({
        title: "Error adding product",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const refreshProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response);
      toaster.create({
        title: "Products refreshed",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch products"
      );
      toaster.create({
        title: "Error fetching products",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);
  return (
    <Box maxW="7xl" mx="auto" p={6} gap={6}>
      <Heading 
        mb={8} 
        fontSize="3xl" 
        fontWeight="semibold" 
        textAlign="center"
        color="gray.700"
      >
        Admin Dashboard
      </Heading>
      {loading ? (
        <Box 
          textAlign="center" 
          p={12}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <Spinner size="xl" thickness="3px" color="blue.500" />
          <Text mt={4} color="gray.500">Loading products...</Text>
        </Box>
      ) : error ? (
        <Box 
          textAlign="center" 
          p={6} 
          color="red.500"
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <Text fontWeight="medium">{error}</Text>
        </Box>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={6}
          px={2}
        >
          {products.map((product) => (
            <ProductCardAdmin
              key={product._id}
              product={product}
              onUpdate={refreshProducts}
              onDelete={refreshProducts}
            />
          ))}
        </Box>
      )}
      <Button colorScheme={"blue"} onClick={onToggle} mt={4}>
        Add Product
      </Button>
      <Presence
        present={open}
        animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }}
      >
        <Box mt={4} display="flex" flexDirection="column" gap={2}>
          <Input
            name="name"
            type="text"
            value={productData.name}
            onChange={handleInputChange}
          />
          <Input
            name="image"
            type="text"
            value={productData.image}
            onChange={handleInputChange}
          />
          <Input
            name="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
          />
          <Button onClick={handleAddProduct}>Add</Button>
        </Box>
      </Presence>
    </Box>
  );
};

export default Admin;
