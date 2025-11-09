import React, { useState } from 'react';
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
    category: 'CSS',
  },
  {
    title: 'Control Parental',
    description: 'Hecho con React, MUI, HTML Y JAVASCRIPT aun en proceso de desarrollo.',
    image: '',
    repo: 'https://github.com/David-SpaceX/control-parental.git',
    demo: 'https://parental-control-40851.web.app',
    category: 'js',
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
    category: 'JS',
  },
  {
    title: 'Landig page tipo Netflix',
    description: 'Hecho con React, MUI y VITE.',
    image: netflixImg,
    repo: 'https://github.com/David-SpaceX/landing-page.git',
    demo: 'Plataforma de videos tipo Netflix ',
    category: 'CSS',
  },
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
    <Box sx={{
      padding: 4,
      background: "url('')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: '100vh',
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Filtros */}
      <Box sx={{ mb: 4, textAlign: 'center', mt: 15 }}>
        <ButtonGroup variant="contained" color="primary">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              sx={{
                backgroundColor: filter === category ? '#00FFAA' : '#1E1E1E',
                color: filter === category ? '#000' : '#fff',
                '&:hover': { backgroundColor: '#00FFAA', color: '#000' },
              }}
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Grid de proyectos */}
      <Grid container spacing={4}>
        {filteredProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(5px)', // Efecto vidrio esmerilado
                border: '1px solid #00FFAA',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
                loading="lazy" // Lazy loading
                sx={{
                  filter: 'brightness(0.8) hue-rotate(180deg)', objectFit: 'cover',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 20px #00FFAA',
                    transition: '0.3s',
                  },

                }}
              />
              <CardContent>
                <GlitchTypography variant="h5" component="div">
                  {project.title}
                </GlitchTypography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<GitHubIcon />}
                  href={project.repo}
                  target="_blank"
                  rel="noopener"
                  sx={{ color: '#00FFAA', '&:hover': { color: '#FF4500' } }}
                >
                  Repo
                </Button>
                {project.demo && (
                  <Button
                    size="small"
                    startIcon={<ImageIcon />}
                    href={project.demo}
                    target="_blank"
                    rel="noopener"
                    sx={{ color: '#00FFAA', '&:hover': { color: '#FF4500' } }}
                  >
                    Demo
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Proyecto;