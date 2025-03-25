import { useEffect, useState } from "react";
import { getProducts } from "../utiils/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { Box, Heading } from "@chakra-ui/react";
const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await getProducts();
      setData(response);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };
  const getLoggedInUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!getLoggedInUser()) navigate("/login");

  return (
    <Box p={8} maxW="container.xl" mx="auto">
      <Heading mb={6} fontSize="2xl" fontWeight="bold" textAlign={"center"}>
        Homepage{" "}
      </Heading>

      <Box display="flex" flexWrap="wrap" padding={4} gap={4}>
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default Homepage;
