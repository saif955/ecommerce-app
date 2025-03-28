import { useState, useEffect, use } from "react";
import { Button, HStack, Text, Flex, Box } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { Link } from "react-router-dom";
import { LuSun, LuMoon } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../utiils/api";
import { getCart } from "../../utiils/Cartapi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import useCartStore from "@/store/cartStore";

const Navbar = () => {
  const { cartItems, total, totalItems, setCartItems, setTotal } = useCartStore();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue(
    "linear(to-r, blue.500, blue.500)",
    "linear(to-r, purple.600, pink.600)"
  );
  const isLoggedIn = !!localStorage.getItem("token");
  useEffect(() => {
    if (isLoggedIn) {
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
      fetchCart();
    } else {
      setCartItems([]);
      setTotal(0);
    }
  }, [isLoggedIn]);
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      as="nav" 
      w="100%"
      position="sticky"
      top={0}
      zIndex="sticky"
      
      px={{ base: 4, md: 8 }}
      py={4}
      align="center"
      boxShadow="md"

    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          _hover={{ textDecoration: "none" }}
        >
          Store
        </Text>
      </Link>

      <Flex flex={1} justify="flex-end">
        <HStack spacing={4}>
          {!isLoggedIn && (
            <>
              <Button
                as={Link}
                to="/login"
                colorScheme="whiteAlpha"
                variant="solid"
              >
                <Icon>
                  <MdLogin />
                </Icon>
              </Button>
              <Button
                as={Link}
                to="/register"
                colorScheme="whiteAlpha"
                variant="solid"
              >
                <FaUser />
              </Button>
            </>
          )}
          {isLoggedIn && (
          <Button
            as={Link}
            to="/cart"
            colorScheme="whiteAlpha"
            variant="solid"
            position="relative"
          >
            <AiOutlineShoppingCart />
            {isLoggedIn && totalItems > 0 && (
              <Box
                as="span"
                position="absolute"
                top="-1"
                right="-1"
                bg="red.500"
                color="white"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="full"
              >
                {totalItems}
              </Box>
            )}
          </Button>)}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              colorScheme="whiteAlpha"
              variant="solid"
            >
              <MdLogout />
            </Button>
          )}
          <Button onClick={toggleColorMode} variant="solid">
            {colorMode === "light" ? <LuMoon size={20} /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
