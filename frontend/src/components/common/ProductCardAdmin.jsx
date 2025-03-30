import { useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  Presence,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { updateProduct, deleteProduct } from "@/utiils/Adminapi";
import { toaster } from "@/components/ui/toaster";

const ProductCardAdmin = ({ product, onUpdate, onDelete }) => {
  const [productData, setProductData] = useState(product);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { open, onToggle } = useDisclosure();
  const handleInputChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateProduct(product._id, productData);
      toaster.create({
        title: "Product updated",
        status: "success",
        duration: 2000,
      });
      onUpdate();
    } catch (error) {
      toaster.create({
        title: "Update failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setIsDeleting(true);
    try {
      await deleteProduct(product._id);
      toaster.create({
        title: "Product deleted",
        status: "success",
        duration: 2000,
      });
      onDelete();
    } catch (error) {
      toaster.create({
        title: "Delete failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box
      maxW="sm"
      overflow="hidden"
      gap={4}
      border="1px solid #ccc"
      p={4}
      borderRadius="md"
    >
      <Image
        src={product.image}
        alt={product.name}
        w="400px"
        h="200px"
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
        <Button colorScheme="blue" onClick={onToggle} isLoading={isUpdating}>
          Update
        </Button>
        <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting}>
          Delete
        </Button>
      </Box>
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
          <Button onClick={handleUpdate}>Update</Button>
        </Box>
      </Presence>
    </Box>
  );
};

export default ProductCardAdmin;
