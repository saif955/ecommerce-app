import { Button, Card, Image, Text } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <Card.Root maxW="sm" key={product._id} overflow={"hidden"} gap={4}>
      <Image src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>
          <Text fontWeight={"bold"} fontFamily={"monospace"} fontSize={"2xl"}>
            ${product.price}
          </Text>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" colorPalette={"blue"} >Add to Cart</Button>
        <Button variant="secondary" colorPalette={"blue"}>Buy Now</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
