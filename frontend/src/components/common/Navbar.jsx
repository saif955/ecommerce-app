import {
  Button,
  Container,
  HStack,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { Link } from "react-router-dom";
import { LuSun, LuMoon } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../utiils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, blue.500)",
    "linear(to-r, purple.600, pink.600)"
  );
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
      bgGradient={bgGradient}
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
          <Button
            as={Link}
            to="/login"
            colorScheme="whiteAlpha"
            variant="solid"
          >
            Login
          </Button>

          <Button
            as={Link}
            to="/register"
            colorScheme="whiteAlpha"
            variant="solid"
          >
            Register
          </Button>
          <Button
            as={Link}
            to="/cart"
            colorScheme="whiteAlpha"
            variant="solid"
          >
            Cart
          </Button>
          <Button
            onClick={handleLogout}
            colorScheme="whiteAlpha"
            variant="solid"
          >
            Logout
          </Button>
          <Button
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          >
            {colorMode === "light" ? <LuMoon size={20} /> : <LuSun size={20} />}
          </Button>
          
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
