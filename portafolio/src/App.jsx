import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./nav";           // Navbar
import Portada from "./portada.jsx"; // Portada
import "./App.css";                 // CSS
import Footer from "./footer.jsx";  // Footer
import About from "./about.jsx";        // Sobre mí
// import Proyecto from "./proyecto";   // Proyectos
// import Gal from "./gal";             // Galería / habilidades

export default function App() {
  return (
    <Router>
      {/* Navbar fijo arriba */}
      <Nav />

      {/* Rutas */}
      <Routes>
        <Route path="/portada" element={<Portada />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Proyecto />} /> */}
        {/* <Route path="/gal" element={<Gal />} /> */}
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}
