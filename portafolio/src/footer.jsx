import { Box, Typography, IconButton } from "@mui/material";  //importaciones de mui
import { GitHub, LinkedIn, Facebook } from "@mui/icons-material"; //iconos de mui
import { keyframes } from "@mui/material/styles";  //estilos de mui
import { Link } from "react-router-dom"; 

// Glow Dead Space define una animacion css tagged template tipo plantilla
//declaa un componente 
const glow = keyframes`   
  0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; } 
  50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
  100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
`;  //estilos y secuencias de animacion de 0 a 100


//declara un componente funcional de react usando arrow function o funcion de flecha
const Footer = () => {
  return (   //inicio del return lo que renderiza el componente
    <Box  //caja de footer renderiza un contenedor
      component="footer"    //contenedor footer
      sx={{   //prop sx sistema de mui
        width: { lg: "1200px" },       //tamano de ancho para pantallas grandes 
        borderRadius: 2,   //borde radial
        mx: "auto",    //margen horizontal para footer en ambos laos
        mb: 0, // margen de abajo
        py: 1, // altura de relleno
        px: 2,    //relleno horizontal
        display: "flex",   //distribuye elementos dentro de un contenedor o flexbox para distribuir los hijos
        alignItems: "center",  //centra verticalmente los elementos dentro del contenedor flex
        justifyContent: "space-between",  //espacio entre los hijos
        backgroundColor: "rgba(0,0,0,0.5)",   //color de fondo semitransparente
        borderTop: "1px solid #00fff7",   //linea de color superior cian coincide con el glos 
        backdropFilter: "blur(8px)",      //desenfoque al fondo detras del elemento 'vidrio' varia segun navegador
        boxShadow: "0 0 10px #00fff7 inset",  //sombra de color interior inset
        flexWrap: "wrap", // se adapta a pantallas muy pequeñas evita que se desborde
      }}
    >
      {/* Texto copyright */}
      <Typography   //renderiza el texto
        sx={{  //similar a style abre para poder dar estilos
          color: "#00fff7",   //color de texto
          fontSize: "0.8rem",   //tamano de texto 
          fontWeight: "bold",    //grosor de texto
          animation: `${glow} 2s infinite alternate`,   //animacion tipo glow de forma infinita alternativa
        }}
      >
        © 2025 PolarisX                   {/*texto*/}
      </Typography>

      {/* Redes sociales */}
      <Box sx={{ display: "flex", gap: 1 }}>  {/*display flex distribuye los elementos y gap distribuye los espacios en los elementos*/}
        <IconButton   /*inicio de iconos boton circular*/
          href="https://github.com/tuusuario"  /* github*/
          target="_blank"  /*enlace hacia otro navegador*/
          sx={{      /*componente de mui para dar estilos*/
            color: "#00fff7",     /*color de iconos*/
            padding: 0.5,     /*relleno*/
            "&:hover": {        /*efecto para hover*/
              transform: "scale(1.2)",    /*cambia de tamano al hacer hover*/
              boxShadow: "0 0 10px #00fff7",   /*caja de sombra al hacer hover*/
            },
          }}
        >
          <GitHub fontSize="small" />      {/*tamano de texto*/}
        </IconButton>
        <IconButton
          href="https://linkedin.com/in/tuusuario"
          target="_blank"
          sx={{
            color: "#00fff7",
            padding: 0.5,
            "&:hover": {
              transform: "scale(1.2)",
              boxShadow: "0 0 10px #00fff7",
            },
          }}
        >
          <LinkedIn fontSize="small" />
        </IconButton>
        <IconButton
          href="https://facebook.com/tuusuario"
          target="_blank"
          sx={{
            color: "#00fff7",
            padding: 0.5,
            "&:hover": {
              transform: "scale(1.2)",
              boxShadow: "0 0 10px #00fff7",
            },
          }}
        >
          <Facebook fontSize="small" />
        </IconButton>
      </Box>

      {/* Contacto rápido */}
      <Typography
        sx={{
          color: "#00fff7",
          fontSize: "0.75rem",
          opacity: 0.8,
        }}
      >
        <a href="mailto:polarisx@polarisx.space" style={{ color: "#00fff7" }}>
          polarisx@polarisx.space
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
//exportacion por defecto de para importacion de footer hacia app.jsx