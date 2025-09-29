import * as React from 'react';
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

// Animación glow tipo Dead Space
const glow = keyframes`
  0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
  50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
  100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#00fff7', 0.15),
  '&:hover': { backgroundColor: alpha('#00fff7', 0.25) },
  width: 300,
  display: 'flex',
  alignItems: 'center',
  animation: `${glow} 2s infinite alternate`,
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

export default function HoloNavInline() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const menuItems = ['Inicio', 'Juegos', 'Series', 'Mi Netflix', 'Explorar'];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 25px #00fff7',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: isDesktop ? 'center' : 'space-between',
            alignItems: 'center',
            position: 'relative',
            gap: isDesktop ? 2 : 0,
          }}
        >
          {/** Desktop: barra + lista en la misma línea **/}
          {isDesktop && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Search>
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
              <List
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  color: '#00fff7',
                  gap: 2,
                }}
              >
                {menuItems.map((text) => (
                  <ListItem
                    key={text}
                    button
                    sx={{
                      textAlign: 'center',
                      px: 1,
                      '&:hover': { backgroundColor: alpha('#00fff7', 0.1) },
                      animation: `${glow} 2s infinite alternate`,
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/** Móvil/tablet: buscador centrado, menú hamburguesa a la derecha **/}
          {isMobile && (
            <>
              <Search sx={{ mx: 'auto' }}>
                <SearchIconWrapper>🔍</SearchIconWrapper>
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
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>

        {/** Móvil: lista desplegable vertical debajo **/}
        {isMobile && (
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(0,0,0,0.85)',
                color: '#00fff7',
              }}
            >
              {menuItems.map((text) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    textAlign: 'center',
                    borderBottom: '1px solid #00fff7',
                    '&:hover': { backgroundColor: alpha('#00fff7', 0.1) },
                    animation: `${glow} 2s infinite alternate`,
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </AppBar>
    </Box>
  );
}
