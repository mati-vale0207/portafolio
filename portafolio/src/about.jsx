import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { styled, keyframes } from "@mui/system";

// Animaciones
const glow = keyframes`
  0% { box-shadow: 0 0 10px #ff3b3b55, 0 0 20px #00ffff33; }
  50% { box-shadow: 0 0 20px #ff3b3b88, 0 0 40px #00ffff55; }
  100% { box-shadow: 0 0 10px #ff3b3b55, 0 0 20px #00ffff33; }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
`;

const scanlines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 50px; }
`;

// Card con glow pulsante
const About = styled(Card)({
  background: "linear-gradient(145deg, #0a0a0a, #1a1a1a)",
  border: "2px solid #ff3b3b",
  borderRadius: "12px",
  width: "320px",
  padding: "20px",
  color: "#e0e0e0",
  fontFamily: "'Orbitron', sans-serif",
  animation: `${glow} 2s infinite alternate`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,255,255,0.05) 3px)",
    animation: `${scanlines} 1s linear infinite`,
    pointerEvents: "none",
  },
  "&:hover": {
    transform: "scale(1.05)",
    animation: `${glow} 1s infinite alternate`,
  },
});

// Encabezado con efecto glitch
const AboutCardHeader = styled("div")({
  marginBottom: "15px",
  "& h2": {
    color: "#ff3b3b",
    marginBottom: "5px",
    position: "relative",
    animation: `${glitch} 1s infinite`,
  },
  "& p": {
    color: "#00ffff",
    margin: 0,
  },
});

// Botón con glow pulsante
const BtnContact = styled(Button)({
  marginTop: "15px",
  backgroundColor: "#ff3b3b",
  color: "#fff",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#ff0000",
    boxShadow: "0 0 15px #ff3b3b",
  },
});

export default function AboutMeCard() {
  return (
    <AboutCard>
      <AboutCardHeader>
        <Typography variant="h5">David Cardona</Typography>
        <Typography variant="subtitle1">Desarrollador Full Stack</Typography>
      </AboutCardHeader>
      <CardContent>
        <Typography variant="body2" color="#c0c0c0" paragraph>
          Soy un apasionado del desarrollo web, con experiencia en proyectos
          front-end y back-end. Me encanta crear interfaces dinámicas y
          funcionales inspiradas en el estilo futurista y espacial de Dead Space.
        </Typography>
        <BtnContact variant="contained" href="#contact">
          Contáctame
        </BtnContact>
      </CardContent>
    </AboutCard>
  );
}
