import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Concert from "./pages/Concert";
import Artist from "./pages/Artitst";
import Product from './pages/Product';
import News from "./pages/News";
import Profile from "./pages/user/Profile";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/concert" element={<Concert />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/products" element={<Product />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile/edit" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
