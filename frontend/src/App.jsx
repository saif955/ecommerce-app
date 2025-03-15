import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App =()=> {
  return (
    
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
