//importaciones de react y MUI
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

// Glow Dead Space efecto de brillo o resplandor
const glow = keyframes`
  0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
  50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
  100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
`;

// Search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',  //posiciona el elemento sin afectar a los otros elementos
  borderRadius: theme.shape.borderRadius,    //border por defecto de mui 
  backgroundColor: alpha('#00fff7', 0.15),   //color de fondo
  '&:hover': { backgroundColor: alpha('#00fff7', 0.25) },  //hover y color al hacerlo
  display: 'flex',   //posiciona a los elementos en el contenedor
  alignItems: 'center',  //posiciona a los elementos en posicion horizontal
  animation: `${glow} 2s infinite alternate`,  //efecto de animacion tipo glow
  boxShadow: '0 0 10px #00fff7, 0 0 20px #00fff7 inset',  //borde de sombra mas inset que ayuda a que se vea adentro de la caja
}));

//contante de barra de busqueda
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),   //padding de mui
  height: '100%',  //altura
  display: 'flex',  //posiciona a los elementos dentro del contenedor
  alignItems: 'center',  //posiciona a los elementos en el centro
  justifyContent: 'center', //posiciona a los elementos al centro 
  color: '#00fff7', //color de letra
}));


//array de input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#00fff7',  //color de letra
  '& .MuiInputBase-input': { padding: theme.spacing(1) },
  width: '100%',  //tamaño
}));

  //efecto parpadeo rapido
  const flicker = keyframes`
   0%, 100% { opacity: 1; text-shadow: 0 0 8px #00fff7, 0 0 15px #00fff7; }
   20%, 60% { opacity: 0.4; text-shadow: none; }
   40%, 80% { opacity: 1; text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
   `;


// Estilo para los enlaces
const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontSize: '1rem',  //tamano de texto
  py: 0.5,   //relleno vertical
  textAlign: 'center',   //cetra el texto
  px: 1,  //relleno  horizontal
  color: '#dce3e2ff',   //color de texto
  fontWeight: 'bold',  //tamano o grosor de texto
  borderRadius: 1,   //borde radial
  transition: 'all 0.3s ease',   //efecto de animacion
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha('#00fff7', 0.2),  //color de fondo
    boxShadow: '0 0 5px #00fff7, 0 0 3px #00fff7 inset',  //cp;pr de sombra mas inset
    transform: 'scale(1.05)',  //efecto
    animation: `${glow} 2s infinite alternate`,  //efecto
  },
  '&.flicker': {
    animation: `${flicker} 0.4s ease-in-out 2`, //parpadea 2 veces rapido
  },
}));


//inicio de componente nav
export default function Nav() {
  const [activeButton, setActiveButton] = React.useState(null);
  const navigate = useNavigate();  //conecta usenavigate con react router   
  const [menuOpen, setMenuOpen] = React.useState(false); //hook de estado que controla el menu
  const theme = useTheme();  //hokk que devuelve tema de MUI
  const isHamburger = useMediaQuery(theme.breakpoints.down('lg')); // Móviles + laptops medianas
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Desktop grandes

  //arreglo de items o lista del menu
  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Sobre Mi', path: '/about' },
    { text: 'Proyecto', path: '/proyecto' },
    { text: 'Skills', path: '/skills' },
  ];

  //valor para ver si esta abierto el menu o cerrado
  const toggleMenu = () => setMenuOpen(!menuOpen);

  //conecta react router dom con usenavigate
  const handleNavigate = (path, text) => {
    setActiveButton(text);  //activa parpadeo

    setTimeout(() => {
      navigate(path);
      setMenuOpen(false); // Cierra el menú tras navegar en móvil
      setActiveButton(null);  //limpia animacion despues
    }, 500);
  };



  //define lo que se mostrara en pantalla
  return (  //estilos de nav
    <Box sx={{ width: '100%', display: 'flex', justifyContent: { lg: 'center' } }}>
      <AppBar
        position="fixed"  //deja el nav fijo aunque se haga scroll
        sx={{
          mt: 2,   //margin top
          zIndex: theme.zIndex.drawer + 2,   //deja encima de otros elementos 
          top: 0,
          py: 0.5,
          left: 0,
          right: 0,
          mx: 'auto',  //margen horizontal
          maxWidth: '1200px',   //tamano maximo
          border: '2px solid #00fff7',  //borde y estilos
          borderRadius: 2,   //borde radial
          backgroundColor: 'rgba(0,0,0,0.4)',    //color de fondo
          backdropFilter: 'blur(15px)',    //efecto tipo vidrio
          boxShadow: '0 0 20px #00fff7, 0 0 20px #00fff7 inset',  //sombra de caja mas insset
        }}
      >


        <Toolbar  //contenedor interno dentro del appbar o nav
          sx={{   //estilos
            display: 'flex',
            justifyContent: { xs: 'space-between', lg: 'center' },  //alinea los elementos a lo largo del eje
            alignItems: 'center',   //centra los elementos en el eje horizontal
            gap: { lg: 1 },   //deja espacio entre los elementos
            paddingTop: 0,   //relleno
            paddingBottom: { xs: 0, sm: 0, md: 3, lg: 3 },
            height: { xs: 50, sm: 50, md: 50, lg: 60 },  //altura segun pantalla
            minHeight: { xs: 40, sm: 40, md: 50, lg: 60 },  //altura minima segun pantalla
            px: { xs: 1, sm: 1, lg: 4 },  //relleno horizontal segun pantalla
            flexWrap: 'wrap',  //permite que los elementos se muevan a otra linea si no caben
          }}
        >
          {/* Desktop: enlaces horizontales */}
          {isDesktop && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Search>  {/*barra de busqueda*/}
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
              {/*estilos para barra de busqueda*/}
              <List sx={{ display: 'flex', flexDirection: 'row', color: '#00fff7', gap: 3 }}>
                {menuItems.map((item) => (
                  <StyledListItem
                    key={item.text}
                    onClick={() => handleNavigate(item.path, item.text)}
                    className={activeButton === item.text ? "flicker" : ""}
                    aria-label={`Navegar a ${item.text}`}
                  >
                    <ListItemText primary={item.text} />
                  </StyledListItem>
                ))}

              </List>
            </Box>
          )}

          {/* Móvil + Laptop Mediana: hamburguesa */}
          {isHamburger && (
            <>   {/*define en que pantalla aparece el menu hamburguesa*/}
              <Search sx={{ mx: 'auto', width: { xs: '180px', sm: '250px', md: '300px' } }}>
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
              <IconButton
                size="large"   //tamano
                edge="end"  //pposiciona respecto a su contenedor
                color="inherit"   //color heredado
                onClick={toggleMenu}    //click para que abra el menu hamburguesa
                sx={{
                  position: 'absolute',   //le da una posicin exacta en su contenedor
                  right: 16,      //a la derecha
                  color: '#00fff7',  //color
                  animation: `${glow} 2s infinite alternate`,    //efecto de animacion
                }}
                aria-label="Abrir menú"
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>

        {/* Menú desplegable */}
        {isHamburger && (     //menu desplegable con zindex para priorizar su contenido
          <Collapse in={menuOpen} timeout="auto" unmountOnExit sx={{ position: 'relative', zIndex: 10 }}>
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',    //direccion con display flex tipo columna
                bgcolor: 'rgba(0,0,0,0.85)',   //color de fondo
                color: '#00fff7',   //letra color
                borderTop: '1px solid #00fff7',   //color de borde
              }}
            >
              {menuItems.map((item) => (
                <StyledListItem
                  key={item.text}
                  onClick={() => handleNavigate(item.path, item.text)}
                  className={activeButton === item.text ? "flicker" : ""}
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