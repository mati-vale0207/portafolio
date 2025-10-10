import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Box, ButtonGroup } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

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
    title: 'AI Necromorph Simulator',
    description: 'Simulador de enemigos de Dead Space con IA.',
    image: 'https://via.placeholder.com/300x200?text=Necromorph+AI',
    repo: 'https://github.com/tuusuario/proyecto1',
    demo: 'https://demo-link.com',
    category: 'AI',
  },
  {
    title: 'Halo Ring Builder',
    description: 'App para diseñar anillos Halo en 3D.',
    image: 'https://via.placeholder.com/300x200?text=Halo+Ring',
    repo: 'https://github.com/tuusuario/proyecto2',
    demo: null,
    category: '3D',
  },
  {
    title: 'Plasma Cutter Game',
    description: 'Juego 2D inspirado en Dead Space.',
    image: 'https://via.placeholder.com/300x200?text=Plasma+Cutter',
    repo: 'https://github.com/tuusuario/proyecto3',
    demo: 'https://demo-link.com',
    category: 'Game',
  },
  {
    title: 'Spartan Dashboard',
    description: 'Tablero interactivo estilo Halo.',
    image: 'https://via.placeholder.com/300x200?text=Spartan+UI',
    repo: 'https://github.com/tuusuario/proyecto4',
    demo: null,
    category: 'Web',
  },
  {
    title: 'Necromorph Tracker',
    description: 'App para rastrear enemigos en tiempo real.',
    image: 'https://via.placeholder.com/300x200?text=Tracker',
    repo: 'https://github.com/tuusuario/proyecto5',
    demo: 'https://demo-link.com',
    category: 'AI',
  },
  {
    title: 'Halo Weapon Customizer',
    description: 'Personaliza armas al estilo Halo.',
    image: 'https://via.placeholder.com/300x200?text=Weapon+Custom',
    repo: 'https://github.com/tuusuario/proyecto6',
    demo: null,
    category: '3D',
  },
  {
    title: 'Dead Space Log System',
    description: 'Sistema de logs narrativos interactivos.',
    image: 'https://via.placeholder.com/300x200?text=Dead+Space+Log',
    repo: 'https://github.com/tuusuario/proyecto7',
    demo: 'https://demo-link.com',
    category: 'Web',
  },
  {
    title: 'Covenant AI Chat',
    description: 'Chatbot inspirado en IA Covenant.',
    image: 'https://via.placeholder.com/300x200?text=Covenant+Chat',
    repo: 'https://github.com/tuusuario/proyecto8',
    demo: null,
    category: 'AI',
  },
  {
    title: 'Ishimura Explorer',
    description: 'Explorador 3D de la nave Ishimura.',
    image: 'https://via.placeholder.com/300x200?text=Ishimura',
    repo: 'https://github.com/tuusuario/proyecto9',
    demo: 'https://demo-link.com',
    category: '3D',
  },
  {
    title: 'Master Chief Trainer',
    description: 'App de entrenamiento inspirada en Halo.',
    image: 'https://via.placeholder.com/300x200?text=Master+Chief',
    repo: 'https://github.com/tuusuario/proyecto10',
    demo: null,
    category: 'Web',
  },
];

function Proyecto() {
  const [filter, setFilter] = useState('All');

  // Categorías únicas
  const categories = ['All', ...new Set(projects.map((project) => project.category))];

  // Filtrar proyectos
  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  return (
    <Box sx={{ padding: 4, background: 'url(https://example.com/space-nebula.jpg) no-repeat center/cover', minHeight: '100vh' }}>
      {/* Filtros */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
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
                sx={{ filter: 'brightness(0.8) hue-rotate(180deg)', objectFit: 'cover',
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