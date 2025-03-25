import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

const App = () => {
  return (
   <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
