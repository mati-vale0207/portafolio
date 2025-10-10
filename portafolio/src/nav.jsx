import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled, alpha, keyframes } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useTheme, useMediaQuery } from '@mui/material';

// Glow Dead Space
const glow = keyframes`
  0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
  50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
  100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
`;

// Search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#00fff7', 0.15),
  '&:hover': { backgroundColor: alpha('#00fff7', 0.25) },
  display: 'flex',
  alignItems: 'center',
  animation: `${glow} 2s infinite alternate`,
  boxShadow: '0 0 10px #00fff7, 0 0 20px #00fff7 inset',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#00fff7',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#00fff7',
  width: '100%',
  '& .MuiInputBase-input': { padding: theme.spacing(1) },
}));

// Estilo para los enlaces
const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontSize: '1rem',
  py: 0.5,
  textAlign: 'center',
  px: 1,
  color: '#dce3e2ff',
  fontWeight: 'bold',
  borderRadius: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha('#00fff7', 0.2),
    boxShadow: '0 0 5px #00fff7, 0 0 3px #00fff7 inset',
    transform: 'scale(1.05)',
    animation: `${glow} 2s infinite alternate`,
  },
}));

export default function Nav() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const theme = useTheme();
  const isHamburger = useMediaQuery(theme.breakpoints.down('lg')); // Móviles + laptops medianas
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Desktop grandes

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Sobre Mi', path: '/about' },
    { text: 'Proyecto', path: '/proyecto' },
    { text: 'Skills', path: '/skills' },
    { text: 'Contacto', path: '/contact' },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Cierra el menú tras navegar en móvil
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: { lg: 'center' } }}>
      <AppBar
        position="fixed"
        sx={{
          mt: 2,
          zIndex: theme.zIndex.drawer + 2,
          top: 0,
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
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: { xs: 'space-between', lg: 'center' },
            alignItems: 'center',
            gap: { lg: 1 },
            py: 0,
            height: { xs: 50, sm: 50, md: 50, lg: 50 },
            minHeight: { xs: 40, sm: 40, md: 40, lg: 40 },
            px: { xs: 1, sm: 1, lg: 1 },
            flexWrap: 'wrap',
          }}
        >
          {/* Desktop: enlaces horizontales */}
          {isDesktop && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Search>
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
              <List sx={{ display: 'flex', flexDirection: 'row', color: '#00fff7', gap: 3 }}>
                {menuItems.map((item) => (
                  <StyledListItem
                    key={item.text}
                    component={Link}
                    to={item.path}
                    aria-label={`Navegar a ${item.text}`}
                    sx={{ cursor: 'pointer'}}
                  >
                    <ListItemText primary={item.text} />
                  </StyledListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Móvil + Laptop Mediana: hamburguesa */}
          {isHamburger && (
            <>
              <Search sx={{ mx: 'auto', width: { xs: '180px', sm: '250px', md: '300px' } }}>
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={toggleMenu}
                sx={{
                  position: 'absolute',
                  right: 16,
                  color: '#00fff7',
                  animation: `${glow} 2s infinite alternate`,
                }}
                aria-label="Abrir menú"
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>

        {/* Menú desplegable */}
        {isHamburger && (
          <Collapse in={menuOpen} timeout="auto" unmountOnExit sx={{ position: 'relative', zIndex: 10 }}>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(0,0,0,0.85)',
                color: '#00fff7',
                borderTop: '1px solid #00fff7',
              }}
            >
              {menuItems.map((item) => (
                <StyledListItem
                  button
                  key={item.text}
                  onClick={() => handleNavigate(item.path)}
                  aria-label={`Navegar a ${item.text}`}
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