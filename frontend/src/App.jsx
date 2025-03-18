import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

const App = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Box>
  );
};

export default App;
