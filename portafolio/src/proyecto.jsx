import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Box, ButtonGroup } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import capturaImg from './assets/captura.png';
import cardImg from './assets/card.png';
import restauranteImg from './assets/restaurante.png';
import dashImg from './assets/dash.png';
import gameImg from './assets/game.png';
import netflixImg from './assets/netflix.png';
import cieloImg from './assets/cielo.jpg';
import { motion, AnimatePresence } from "framer-motion";

// Estilo para efecto glitch
const GlitchTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.primary.main,
  textShadow: '0 0 5px #00FFAA',
  '&:hover': {
    animation: 'glitch 0.5s linear infinite',
  },
  '@keyframes glitch': {
    '0%': { transform: 'translate(0)', textShadow: '0 0 5px #00FFAA, 2px 0 5px #FF4500' },
    '20%': { transform: 'translate(-2px, 2px)', textShadow: '-2px 0 5px #00FFAA' },
    '40%': { transform: 'translate(2px, -2px)', textShadow: '2px 0 5px #FF4500' },
    '60%': { transform: 'translate(-2px, 0)', textShadow: '-2px 0 5px #00FFAA' },
    '80%': { transform: 'translate(2px, 0)', textShadow: '2px 0 5px #FF4500' },
    '100%': { transform: 'translate(0)', textShadow: '0 0 5px #00FFAA' },
  },
}));

// Datos de ejemplo para 10 proyectos
const projects = [
  {
    title: 'Juego de Tetris',
    description: 'Hecho con HTML, CSS Y JAVASCRIPT.',
    image: capturaImg,
    repo: 'https://github.com/David-SpaceX/Tetris.git',
    demo: 'Revision de codigo unicamente',
    category: 'GAME',
  },
  {
    title: 'Simulacion de Tarjeta de debito',
    description: 'Hecho con HTML, CSS, JAVASCRIPT Y REACT.',
    image: cardImg,
    repo: 'https://github.com/David-SpaceX/tarjeta-credito.git',
    demo: 'Revision de codigo, no responsive',
    category: 'JS',
  },
  {
    title: 'Panel de Restaurante',
    description: 'Hecho con PHP y Bootstrap, con MYSQL.',
    image: restauranteImg,
    repo: 'https://github.com/David-SpaceX/panel_restaurante.git',
    demo: 'https://demo-link.com',
    category: 'PHP',
  },
  {
    title: 'Control Parental',
    description: 'Hecho con React, MUI, HTML Y JAVASCRIPT aun en proceso de desarrollo.',
    image: '',
    repo: 'https://github.com/David-SpaceX/control-parental.git',
    demo: 'https://parental-control-40851.web.app',
    category: 'JS',
  },
  {
    title: 'Dashboard-sistema-tickets',
    description: 'Hecho con HTML, Bootstrap y JavaScript.',
    image: dashImg,
    repo: 'https://github.com/David-SpaceX/sistema-tickets.git',
    demo: 'Dashboard con graficas para un sistema de tickets.',
    category: 'CSS',
  },
  {
    title: 'Dashboard de videojuegos',
    description: 'Hecho con HTML, Bootstrap y JavaScript.',
    image: gameImg,
    repo: 'https://github.com/David-SpaceX/tienda-de-videojuegos.git',
    demo: 'Dashboard con cards de videjuegos aun en desarrollo',
    category: 'CSS',
  },
  {
    title: 'Landig page tipo Netflix',
    description: 'Hecho con React, MUI y VITE.',
    image: netflixImg,
    repo: 'https://github.com/David-SpaceX/landing-page.git',
    demo: 'Plataforma de videos tipo Netflix ',
    category: 'CSS',
  }
  /*
  {
    title: 'Covenant AI Chat',
    description: 'Chatbot inspirado en IA Covenant.',
    image: 'https://via.placeholder.com/300x200?text=Covenant+Chat',
    repo: 'https://github.com/tuusuario/proyecto8',
    demo: null,
    category: 'CSS',
  },
  {
    title: 'Ishimura Explorer',
    description: 'Explorador 3D de la nave Ishimura.',
    image: 'https://via.placeholder.com/300x200?text=Ishimura',
    repo: 'https://github.com/tuusuario/proyecto9',
    demo: 'https://demo-link.com',
    category: 'JS',
  },
  {
    title: 'Master Chief Trainer',
    description: 'App de entrenamiento inspirada en Halo.',
    image: 'https://via.placeholder.com/300x200?text=Master+Chief',
    repo: 'https://github.com/tuusuario/proyecto10',
    demo: null,
    category: 'JS',
  },*/
];

function Proyecto() {
  const [filter, setFilter] = useState('All');

  // Categorías únicas
  const categories = ['All', ...new Set(projects.map((project) => project.category))];

  // Filtrar proyectos
  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  return (
   <AnimatePresence mode="wait">
      <motion.div
        key="proyectos-page" // Clave única para forzar animación
        initial={{ opacity: 0, scale: 0.85, y: -60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 60 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.08
        }}
        style={{
          width: "100%",
          minHeight: "100vh",
          background: `url(${cieloImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* === Filtros === */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "60px", marginBottom: "2rem" }}
        >
          <ButtonGroup variant="contained">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                style={{ marginTop: "70px" }}
              >
                <Button
                  onClick={() => setFilter(cat)}
                  sx={{
                    bgcolor: filter === cat ? '#00FFAA' : '#1E1E1E',
                    color: filter === cat ? '#000' : '#fff',
                    '&:hover': { bgcolor: '#00FFAA', color: '#000' }
                  }}
                >
                  {cat}
                </Button>
              </motion.div>
            ))}
          </ButtonGroup>
        </motion.div>

        {/* === Grid de Cards === */}
        <Grid container spacing={4} component={motion.div} sx={{ px: 4, pb: 4 }}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ 
                  scale: 1.04,
                  boxShadow: "0 0 30px rgba(0, 255, 255, 0.7)"
                }}
              >
                <Card sx={{
                  bgcolor: 'rgba(30, 30, 30, 0.85)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid #00FFAA',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                      filter: 'brightness(0.8) hue-rotate(180deg)',
                      transition: '0.3s'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <GlitchTypography variant="h6">{project.title}</GlitchTypography>
                    <Typography variant="body2" color="antiquewhite" sx={{ mt: 1 }}>
                      {project.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<GitHubIcon />} href={project.repo} target="_blank"
                      sx={{ color: '#00FFAA', '&:hover': { color: '#FF4500' } }}>
                      Repo
                    </Button>
                    {project.demo && (
                      <Button size="small" startIcon={<ImageIcon />} href={project.demo} target="_blank"
                        sx={{ color: '#00FFAA', '&:hover': { color: '#FF4500' } }}>
                        Demo
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
}

export default Proyecto;