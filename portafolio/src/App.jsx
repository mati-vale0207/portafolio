import Nav from "./nav";        //navbar
import Portada from "./portada.jsx";  ///portada
import "./App.css"; //importacion de css
import Footer from "./footer.jsx";  //importacion de footer
/*import About from "./about";   //importacion de sobre mi
import Proyecto from "./proyecto";   //importacion de proyectos
import Gal from "./gal"*/  //importacion de galeria o habilidades

//lista en app.jsx que conecta todos los componentes hacia main.jsx
export default function App() {
  return (      //regresa el llamado para los componentes
    <>
      {/* Navbar fijo arriba */}
      <Nav />

      {/* Portada inicial (card con imagen) */}
       <Portada>
       </Portada>
      <Footer />
    </>
  );
}
