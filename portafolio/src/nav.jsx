// Nav.jsx - VERSIÓN FINAL ÉPICA (2025)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha, keyframes } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useTheme, useMediaQuery } from '@mui/material';

// Animaciones
const glow = keyframes`
  0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
  50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
  100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 8px #00fff7, 0 0 15px #00fff7; }
  20%, 60% { opacity: 0.4; text-shadow: none; }
  40%, 80% { opacity: 1; text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Estilo de los botones
const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontSize: '1rem',
  py: 0.5,
  textAlign: 'center',
  px: 1,
  color: '#dce3e2ff',
  fontWeight: 'bold',
  borderRadius: 1,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha('#00fff7', 0.2),
    boxShadow: '0 0 5px #00fff7, 0 0 3px #00fff7 inset',
    transform: 'scale(1.05)',
    animation: `${glow} 2s infinite alternate`,
  },
  '&.flicker': {
    animation: `${flicker} 0.4s ease-in-out 2`,
  },
}));

// Componente Terminal (reutilizable)
const Terminal = ({ activeButton }) => {
  const pageName = activeButton
    ? activeButton.toLowerCase().replace(' ', '-')
    : '';

  return (
    <Box sx={{
      borderRadius: 1,
      backgroundColor: 'rgba(0, 255, 247, 0.08)',
      border: '1px solid #00fff7',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 0 15px rgba(0, 255, 247, 0.4), inset 0 0 10px rgba(0, 255, 247, 0.2)',
      animation: `${glow} 3s infinite alternate`,
      px: { xs: 1.5, sm: 2 },
      py: 1,
      fontFamily: "'Courier New', monospace, 'Orbitron', sans-serif",
      fontSize: { xs: '0.75rem', sm: '0.85rem', lg: '0.95rem' },
      color: '#00fff7',
      letterSpacing: '1px',
      width: { xs: '200px', sm: '300px', md: '380px', lg: '420px' },
      overflow: 'hidden',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap', paddingLeft: 4, }}>
        <Box component="span" sx={{ color: '#00ff85', fontWeight: 'bold' }}>root</Box>
        <Box component="span" sx={{ color: '#fff' }}>@</Box>
        <Box component="span" sx={{ color: '#ff00ff', fontWeight: 'bold' }}>david-spacex</Box>
        <Box component="span" sx={{ color: '#fff' }}>:</Box>
        <Box component="span" sx={{ color: '#00ffaa', fontWeight: 'bold' }}>
           /{pageName}
        </Box>
        <Box component="span" sx={{
          ml: 0.5,
          animation: `${blink} 1s infinite`,
          color: '#00fff7'
        }}>
          █
        </Box>
      </Box>
    </Box>
  );
};

// NAV PRINCIPAL
export default function Nav() {
  const [activeButton, setActiveButton] = React.useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const theme = useTheme();
  const isHamburger = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Sobre Mi', path: '/about' },
    { text: 'Proyecto', path: '/proyecto' },
    { text: 'Skills', path: '/skills' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (path, text) => {
    setActiveButton(text);
    setTimeout(() => {
      navigate(path);
      setMenuOpen(false);
      setActiveButton(null);
    }, 500);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: { lg: 'center' } }}>
      <AppBar
        position="fixed"
        sx={{
          mt: 2,
          zIndex: theme.zIndex.drawer + 2,
          top: 0,
          py: 0.5,
          left: 0,
          right: 0,
          mx: 'auto',
          maxWidth: '1200px',
          border: '2px solid #00fff7',
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 0 20px #00fff7, 0 0 20px #00fff7 inset',
        }}
      >
        <Toolbar sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', lg: 'center' },
          alignItems: 'center',
          gap: { lg: 4 },
          minHeight: { xs: 50, lg: 60 },
          px: { xs: 1, lg: 4 },
        }}>
          {/* Desktop */}
          {isDesktop && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Terminal activeButton={activeButton} />
              <List sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                {menuItems.map((item) => (
                  <StyledListItem
                    key={item.text}
                    onClick={() => handleNavigate(item.path, item.text)}
                    className={activeButton === item.text ? "flicker" : ""}
                  >
                    <ListItemText primary={item.text} />
                  </StyledListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Móvil */}
          {isHamburger && (
            <>
              <Terminal activeButton={activeButton} />
              <IconButton
                size="large"
                edge="end"
                onClick={toggleMenu}
                sx={{
                  position: 'absolute',
                  right: 16,
                  color: '#00fff7',
                  animation: `${glow} 2s infinite alternate`,
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>

        {/* Menú hamburguesa */}
        {isHamburger && (
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <List sx={{
              bgcolor: 'rgba(0,0,0,0.85)',
              color: '#00fff7',
              borderTop: '1px solid #00fff7',
            }}>
              {menuItems.map((item) => (
                <StyledListItem
                  key={item.text}
                  onClick={() => handleNavigate(item.path, item.text)}
                  className={activeButton === item.text ? "flicker" : ""}
                >
                  <ListItemText primary={item.text} />
                </StyledListItem>
              ))}
            </List>
          </Collapse>
        )}
      </AppBar>
    </Box>
  );
}