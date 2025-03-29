import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { Toaster } from "./components/ui/toaster";
import CartSummary from "./components/common/CartSummary";
import ProtectedRoute from "./components/common/ProtectedRoute";
const App = () => {
  return (
   <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartsummary" element={<CartSummary />} />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
