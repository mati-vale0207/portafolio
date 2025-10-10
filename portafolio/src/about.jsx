import React from "react";
import { Typography, Card, CardContent, Button, Box, Avatar, Stack } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// 🌈 Animaciones
const glow = keyframes`
  0% { box-shadow: 0 0 10px #ff3b3b55, 0 0 20px #00ffff33; }
  50% { box-shadow: 0 0 25px #ff3b3b88, 0 0 40px #00ffff55; }
  100% { box-shadow: 0 0 10px #ff3b3b55, 0 0 20px #00ffff33; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const scanlines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const parallaxMove = keyframes`
  0% { background-position: 0 0, 0 0, 0 0; }
  100% { background-position: 200px 100px, -200px 150px, 0px 50px; }
`;

// 🌌 Fondo principal con animación tipo HUD/espacial
const AboutContainer = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#000",
  color: "#e0e0e0",
  padding: "100px 20px 40px",
  overflow: "hidden",
  boxSizing: "border-box",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `
      radial-gradient(circle at center, rgba(0,255,255,0.05) 0%, transparent 70%),
      url('https://www.transparenttextures.com/patterns/stardust.png'),
      linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,1))
    `,
    backgroundSize: "cover, 400px, cover",
    animation: `${parallaxMove} 20s linear infinite`,
    zIndex: 0,
  },
});

// ✨ Card holográfica
const CardStyled = styled(Card)(({ borderColor }) => ({
  position: "relative",
  background: "rgba(10,10,10,0.8)",
  backdropFilter: "blur(8px)",
  border: `2px solid ${borderColor}`,
  borderRadius: "16px",
  width: "90%",
  maxWidth: "540px",
  padding: "25px",
  animation: `${glow} 2s infinite alternate, ${float} 6s ease-in-out infinite`,
  marginBottom: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: `0 0 25px ${borderColor}, 0 0 45px ${borderColor}55`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,255,255,0.05) 3px)",
    animation: `${scanlines} 1.2s linear infinite`,
    pointerEvents: "none",
    borderRadius: "inherit",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(45deg, rgba(255,255,255,0.05), transparent 60%)",
    borderRadius: "inherit",
    pointerEvents: "none",
  },
}));

// Encabezado
const CardHeader = styled("div")({
  textAlign: "center",
  marginBottom: "15px",
});

// 🌐 Botones
const BtnSocial = styled(Button)({
  marginTop: "10px",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: "bold",
  width: "180px",
  background: "linear-gradient(270deg, #00ffff, #ff3b3b, #00ffff)",
  backgroundSize: "600% 600%",
  color: "#000",
  animation: `${gradientShift} 5s ease infinite`,
  "&:hover": {
    transform: "scale(1.08)",
    boxShadow: "0 0 20px #00ffff99",
  },
});

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

const BtnContainer = styled(Stack)({
  marginTop: "10px",
  width: "100%",
  alignItems: "center",
});

export default function About() {
  return (
    <AboutContainer>
      {/* Sobre mí */}
      <CardStyled borderColor="#ff3b3b">
        <Avatar
          src="/placeholder.png"
          alt="David Cardona"
          sx={{
            width: 150,
            height: 150,
            mb: 2,
            border: "2px solid #ff3b3b",
            boxShadow: "0 0 25px #ff3b3b55",
          }}
        />
        <CardHeader>
          <Typography variant="h5" sx={{ color: "#00fff7" }}>
            David Cardona
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#ff3b3b" }}>
            Desarrollador Full Stack
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body2" paragraph sx={{ color: "#e0e0e0" }}>
            Soy un apasionado del desarrollo web, con experiencia en proyectos front-end y back-end.
            Me encanta diseñar interfaces con estética tecnológica, basadas en diseños modernos y de
            última generación, utilizando herramientas y tecnologías avanzadas.
          </Typography>
          <BtnPrimary variant="contained" href="#contact">
            Contáctame
          </BtnPrimary>
        </CardContent>
      </CardStyled>

      {/* Contacto */}
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
            <BtnSocial variant="contained" href="https://facebook.com/DavidCardona" target="_blank">
              Facebook
            </BtnSocial>
          </BtnContainer>
        </CardContent>
      </CardStyled>
    </AboutContainer>
  );
}
