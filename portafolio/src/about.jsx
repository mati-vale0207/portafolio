import React from "react"; //importacion de react
import { Typography, Card, CardContent, Button, Box, Avatar, Stack } from "@mui/material"; //importacion de MUI
import { styled, keyframes } from "@mui/system"; //importacion de MUI

//  Animaciones o array de efectos de sombras a las cards
const glow = keyframes`
  0% { box-shadow: 0 0 10px #ff3b3b55, 0 0 20px #00ffff33; }
  50% { box-shadow: 0 0 25px #ff3b3b88, 0 0 40px #00ffff55; }
  100% { box-shadow: 0 0 10px #ff3b3b55, 0 0 20px #00ffff33; }
`;

//*array de efecto de degradado de color para la card
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

//array / efecto de lineas que aparecen en las cards
const scanlines = keyframes`  
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
`;

//array de efecto tipo flotante de la card en eje Y o vertical
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

//array de efecto tipo parallay  para fondo de pagina
const parallaxMove = keyframes`
  0% { background-position: 0 0, 0 0, 0 0; }
  100% { background-position: 200px 100px, -200px 150px, 0px 50px; }
`;

// Fondo principal con animación tipo HUD/espacial
const AboutContainer = styled("div")({
  position: "relative",  //posicion en relacion con otro
  display: "flex",  //distribuye elementos dentro de un contenedor
  flexDirection: "column",  //los distribuye tipo columna
  alignItems: "center", //alinea los elementos en el eje
  minHeight: "100vh",   //tamano de viewport
  backgroundColor: "#000", //color de fondo
  color: "#e0e0e0",  //color de texto
  padding: "100px 20px 40px",   //relleno
  marginTop: "70px",
  overflow: "hidden", //evita scroll
  boxSizing: "border-box", //modelo de caja
  "&::before": {                 //inserta contenido estilizado
    content: '""',   //se enlaza con  &
    position: "absolute",    //tipo de posicion
    top: 0,   //arriba
    left: 0,  //izquierda
    width: "100%",  //tmano
    height: "100%", //ancho y abajofondo estrellado
    background: `    
      radial-gradient(circle at center, rgba(0,255,255,0.05) 0%, transparent 70%),
      url('https://www.transparenttextures.com/patterns/stardust.png'),
      linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,1))
    `, //importacion de imagen sin fondo de stardust para animacion de fondo con estilos
    backgroundSize: "cover, 400px, cover",  //cubre el tamano de la imagen para todo el fondo
    animation: `${parallaxMove} 20s linear infinite`,     //efecto parallax con estilos     
    zIndex: 0,   //para sobreponerse en la pagina segun el rango
  },
});

//  Card holográfica
const CardStyled = styled(Card)(({ borderColor }) => ({
  position: "relative",   //posicion segun   elemento
  background: "rgba(10,10,10,0.8)",    //fondo
  backdropFilter: "blur(8px)",     //filtro tipo vidrio
  border: `2px solid ${borderColor}`,     //borde con estilos
  borderRadius: "16px",    //borde radial
  width: "70%",   //tamano
  maxWidth: "440px",    //tamano maximo
  padding: "20px",    //relleno
  animation: `${glow} 2s infinite alternate, ${float} 6s ease-in-out infinite`,  //estilo de animacion
  marginBottom: "50px",     //margen abajo
  display: "flex",      //flexbox
  flexDirection: "column",    //direccion de columna
  alignItems: "center",    //alineacion al centro
  zIndex: 1,       //superpone segun rango
  transition: "transform 0.3s ease, box-shadow 0.3s ease",    //efecto de transicion
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",   ////transicion al hacer hover
    boxShadow: `0 0 25px ${borderColor}, 0 0 45px ${borderColor}55`,   //sombra de caja
  },

  //inserta contenido antes del contenido antes del elemento
  "&::before": {
    content: '""',  //sin esto no funciona el pseudo elemento
    position: "absolute",  //posiciona segun el elemento al contenedor padre
    inset: 0,   //hace que ocupe todo el tamano del elemento padre
    background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,255,255,0.05) 3px)",  //efecto de lineas 
    animation: `${scanlines} 1.2s linear infinite`,  //efecto de scaneo
    pointerEvents: "none",   //evita clicks
    borderRadius: "inherit",   //hereda el borde del elemento padre
  },

  //inserta contenido despues del elemento
  "&::after": {
    content: '""',   //mismos estilos que before o similares
    position: "absolute",
    inset: 0,
    background: "linear-gradient(45deg, rgba(255,255,255,0.05), transparent 60%)",
    borderRadius: "inherit",
    pointerEvents: "none",
  },
}));

// Encabezado o texto principal
const CardHeader = styled("div")({
  textAlign: "center",   //texto centrado
  marginBottom: "15px",    //margen inferior
});

//  Botones con estilos
const BtnSocial = styled(Button)({
  marginTop: "10px",   //margen superior
  borderRadius: "10px",   //borde radial
  textTransform: "none",   //control de texto
  fontWeight: "bold",   //grosor de texto
  width: "180px",   //ancho
  background: "linear-gradient(270deg, #00ffff, #ff3b3b, #00ffff)",   //fondo
  backgroundSize: "600% 600%",   //tamano de fondo
  color: "#000",    //color de texto
  animation: `${gradientShift} 5s ease infinite`,   //animacion tipo gradial
  "&:hover": {
    transform: "scale(1.08)",    //transformacion o estilo de transicion
    boxShadow: "0 0 20px #00ffff99",   //sombra de caja
  },
});


//estilos para boron primario o primero
const BtnPrimary = styled(Button)({
  marginTop: "10px",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: "bold",
  width: "180px",
  backgroundColor: "#ff3b3b",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#ff0000",
    boxShadow: "0 0 20px #ff3b3b88",
  },
});


//estilos para contenedor de boton
const BtnContainer = styled(Stack)({
  marginTop: "10px",
  width: "100%",
  alignItems: "center",
});


//inicion de renderizacion
export default function About() {
  return (
    <AboutContainer>  {/*contenedor de sobre mi*/}
      {/* Sobre mí */}
      <CardStyled borderColor="#ff3b3b">  {/*estilos para foto*/}
        <Avatar
          src="/placeholder.png"
          alt="David Cardona"
          sx={{  //estilos para foto
            width: 150,
            height: 150,
            mb: 2,
            border: "2px solid #ff3b3b",
            boxShadow: "0 0 25px #ff3b3b55",
          }}
        />
        <CardHeader>
          <Typography variant="h5" sx={{ color: "#00fff7" }}> {/*nombre*/}
            David Cardona
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#ff3b3b" }}>
            Desarrollador Full Stack
          </Typography>
        </CardHeader>
        <CardContent>
          {/*texto de introduccion*/}
          <Typography variant="body2" paragraph sx={{ color: "#e0e0e0" }}>
            Soy un apasionado del desarrollo web, con experiencia en proyectos front-end y back-end.
            Me encanta diseñar interfaces con estética tecnológica, basadas en diseños modernos y de
            última generación, utilizando herramientas y tecnologías avanzadas.
          </Typography>
          <BtnPrimary variant="contained" href="#contact">  {/*boton de contactame*/}
            Contáctame
          </BtnPrimary>
        </CardContent>
      </CardStyled>

      {/* Contacto con botones de direccion con card con estilos y diseno con importaciones o const con estilos*/}
      <CardStyled id="contact" borderColor="#00ffff">
        <CardHeader>
          <Typography variant="h6" sx={{ color: "#ff3b3b" }}>
            Contacto
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body2" paragraph align="center" sx={{ color: "#e0e0e0" }}>
            Conecta conmigo a través de tus plataformas favoritas:
          </Typography>
          <BtnContainer spacing={1}>
            <BtnPrimary variant="contained" href="mailto:polarisx@polarisx.space">
              Correo
            </BtnPrimary>
            <BtnSocial variant="contained" href="https://wa.me/50235927178" target="_blank">
              WhatsApp
            </BtnSocial>
            <BtnSocial variant="contained" href="https://facebook.com/davidcardona.145776" target="_blank">
              Facebook
            </BtnSocial>
          </BtnContainer>
        </CardContent>
      </CardStyled>
    </AboutContainer>
  );
}
