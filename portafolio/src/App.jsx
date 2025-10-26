import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./nav.jsx";         // Navbar
import Portada from "./portada.jsx"; // Portada
import About from "./about.jsx";     // Sobre mí
import Proyecto from "./proyecto";
import Skills from "./skills.jsx";
import "./App.css";
import Footer from "./footer.jsx";

export default function App() {
  return (
    <Router>
      <Nav /> {/* Navbar fijo arriba */}
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/about" element={<About />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
      <Footer />
    </Router>
  );
}

//esta exportacion tiene rutas para cambios de ventanas con reac router dom
