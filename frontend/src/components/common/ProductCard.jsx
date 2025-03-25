import { Button, Card, Image, Text, Box } from "@chakra-ui/react";
import { addToCart } from "@/utiils/Cartapi";
const ProductCard = ({ product }) => {
  return (
    <Card.Root maxW="sm" key={product._id} overflow={"hidden"} gap={4}>
      <Image src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Box mt={2}>
          <Text as="div" fontWeight={"bold"} fontFamily={"monospace"} fontSize={"2xl"}>
            ${product.price}
          </Text>
        </Box>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" colorPalette={"blue"}  onClick={() => addToCart(product._id)}>Add to Cart</Button>
        <Button variant="secondary" colorPalette={"blue"} onClick={() => addToCart(product._id)}>Buy Now</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
