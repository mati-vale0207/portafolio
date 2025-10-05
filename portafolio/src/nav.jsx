import React from 'react';
import { styled, alpha, keyframes } from '@mui/material/styles'; //estilos de MUI para crear componentes
import AppBar from '@mui/material/AppBar';  //appbar de mui
import Box from '@mui/material/Box';  //caja de mui
import Toolbar from '@mui/material/Toolbar';  //barra de herramientas
import IconButton from '@mui/material/IconButton';  //iconos de mui
import InputBase from '@mui/material/InputBase';   //informacion base de mui o estilos de mui
import MenuIcon from '@mui/icons-material/Menu';  //menu de mui tipo hamburguesa 
import List from '@mui/material/List';    //listas de mui para el nav
import ListItem from '@mui/material/ListItem';   //lista de item objetos de mui
import ListItemText from '@mui/material/ListItemText';  //textos de mui 
import Collapse from '@mui/material/Collapse';  //colapse de mui para layout y todas las anteriores
import { useTheme, useMediaQuery } from '@mui/material';   //hooks para accedes a temas de mui y evaluar el responsive con los breakpoints del tema

// Animación glow tipo Dead Space 
//inicio de animacion atravez de un array
//sombra de texto con animacion de 0 a 100
const glow = keyframes`
  0% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
  50% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7; }
  100% { text-shadow: 0 0 5px #00fff7, 0 0 10px #00fff7; }
`;


//search o div con estilo 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',  /*ubiacion de un objeto con relacion a otro*/
  borderRadius: theme.shape.borderRadius,  /*borde redondeado segun thema de mui*/
  backgroundColor: alpha('#00fff7', 0.15),   /*fondo semitransparente usando alpha*/
  '&:hover': { backgroundColor: alpha('#00fff7', 0.25) },    /*color y efecto hover*/
  width: 300,   /*ancho fijo*/
  display: 'flex',   /*distribuye los elementos en un contenedor*/
  alignItems: 'center',  /*alinea los objetos o hiijos al centro*/
  animation: `${glow} 2s infinite alternate`,  /*tipo de animacion*/
  boxShadow: '0 0 10px #00fff7, 0 0 20px #00fff7 inset',  /*sombra de caja en hover*/
}));


//contenedor dentro de seaarch
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),   //centra el icono en X y Y u le da color cian y da reelleno
  height: '100%',  //altura
  display: 'flex',  //distribuye los elementos dentro del contenedor
  alignItems: 'center',  //alinea objetos o los centra
  justifyContent: 'center',  //alinea los objetos en el eje o les da espacio libre sobrante
  color: '#00fff7',   //color para icono
}));


//version estilizada de input base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#00fff7',  //color al texto
  width: '100%',  //tamano 
  '& .MuiInputBase-input': { padding: theme.spacing(1) },  //usa la clase interna para ajustar el padding real del input
}));


//define y exporta la funcion o el componente
export default function Portada() {
  const [menuOpen, setMenuOpen] = React.useState(false);  //crea estado para control del menu movil esta abierto

  const theme = useTheme();  //tema de mui para acceder a estilos de el 
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));  //variable o declaracion para moviles
  const isTabletOrLaptop = useMediaQuery(theme.breakpoints.between('md','lg')); //961-1199px variable para pantallas medianas
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));  //variable para pantallas grandes segunel tema de mui con las anteriores

  //array con las secciones del nav
  const menuItems = ['Inicio', 'Sobre Mi', 'Proyectos', 'Skills', 'Contacto'];

  //funcion para abrir y cerrar el menu movil
  const toggleMenu = () => setMenuOpen(!menuOpen);

 
  return (   //funcion o instruccion que se mostrara en pantalla al usar el componente
    <Box sx={{      //actua como wrapper y envuelve su contenido mas sus estilos de la caja
      width: "100%",  //altura de caja
      display: "flex",  //distribuye los elementos dentro de un contenedor
      justifyContent: { lg: "center" },  //alinea los elementos del contenedor cuando no usan el espacio disponible horizontalmente
    }}>
      <AppBar     //barra principal
        position="fixed"  //mantiene fija la barra aunque se haga scroll
        sx={{  //inicio de estilos
          mt: 2, // margin top
          border: '2px solid #00fff7', // borde azul tipo holograma
          borderRadius: 2, // esquinas redondeadas
          backgroundColor: 'rgba(0,0,0,0.4)',  //color de fondo
          backdropFilter: 'blur(15px)',   //fondo semitransparente efecto vidrio
          boxShadow: '0 0 20px #00fff7, 0 0 20px #00fff7 inset', //sombra mas inset para dar brillo interior y exterior
          zIndex: theme.zIndex.drawer + 1,  //para que quede encima de drawers o dibujos
          maxWidth: { lg: "1200px" },  //limita el ancho 
          width: "100%", //ancho de base
          transform: { lg: "translateX(-50%)" },    //tecnica tipica para centrar elementos con position relative
          left: { lg: "50%" },  //se combina con translateX para centrar
        }}
      >
        <Toolbar   //organiza elementos internos
          sx={{     //estilos
            pt: { md: 0 },    //relleno superior en pantalla mediana
            display: "flex",  //alinea los elementos dentro del contenedor
            justifyContent: { xs: "space-between", lg: "center" },   //alinea los elementos en formahorizontal o los separa en lg centra todo
            alignItems: "center",  //alinea objetos en ejehorizontal o eje transversal
            gap: { lg: 1 },  //espacios entre filas y columnas
            py: { sm: 1 }, //relleno vertical
            height: { md: 70, lg: 70 },  //altura para diferentes pantallas
            minHeight: { xs: 56, sm:50, md: 40, lg: 30 }, // controla alto según pantalla
            px: { xs: 1, sm: 1, lg: 1 },           // padding horizontal responsivo
            flexWrap: "wrap", //permite que el contenido no se corte o se ajusten en varias lineas
          }}
        >
          {/* Desktop */}
          {(isDesktop || isTabletOrLaptop) && (  //renderiza la barra de busqueda mas los enlaces o lista
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>  {/*estilos segun su definicion*/}
              <Search>  {/*renderizq el input ya definido*/}
                <SearchIconWrapper></SearchIconWrapper>  {/*icono de busqueda si exste*/}
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} /> {/*texto interno para barra de busqueda de mui*/}
              </Search>
              <List  //se mantiene en flex row para que los objetos queden en linea
                sx={{
                  display: 'flex',  //alinea los elementos dentro del contenedor
                  flexDirection: 'row',  //se despliga a lo largo de la fila
                  color: '#00fff7',  //color de texto
                  gap: { md: 2, lg: 3 },  //espacio entre los elementos segun pantalla
                }}
              >
                {menuItems.map((text) => (  //llama a los elementos del menu con la funcion .map
                  <ListItem     //esta en flex row para que queden los items en linea atravez de mui
                    key={text} //funcion que identifica de forma unica cada elemento en una lista se une con .map
                    button  //boton clickeable
                    sx={{   //estilos de mui
                      fontSize: { md: '0.5em', lg: '1rem' },  //tamano de letra segun pantalla o breakpoint
                      py: { md: 0.5 },  //relleno vertical
                      textAlign: 'center',  //texto alineado al centro
                      px: 1,  //relleno horizontal
                      color: '#dce3e2ff',  //color de texto
                      fontWeight: 'bold',  //grosor de texto
                      borderRadius: 1,  //borde radial
                      transition: 'all 0.3s ease',    //efecto de trancision lenta-rapida-lenta
                      '&:hover': {
                        backgroundColor: alpha('#00fff7', 0.2),  //colorde texto al hacer hover
                        boxShadow: '0 0 5px #00fff7, 0 0 3px #00fff7 inset', //sombra de texto con inseet
                        transform: 'scale(1.05)',  //efecto
                        minHeight: { md: 20, lg: 30 },//altura minima al hacer hover
                        py: { md: 0.5 },    //relleno vertical
                      },
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Móvil */}
          {isMobile && (   //renderiza con version compacta
            <>
              <Search  //centrado con anchos responsivos
                sx={{  //estilos
                  mx: 'auto',   //margen horizontal
                  width: { xs: '180px', sm: '250px', md: '300px' },    //altura segun pantalla
                }}
              >
                <SearchIconWrapper></SearchIconWrapper>  {/*para icono de busqueda*/}
                <StyledInputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'search' }} />  {/*texto interno para barra de busqueda*/}
              </Search>
              <IconButton   //en position absolute por defecto
                size="large"      //talla grande o grande la barra de busqueda
                edge="end"    //borde final
                color="inherit"   //color a heredar
                onClick={toggleMenu}   //para abrir y cerrar el menu
                sx={{     //estilos
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

        {/* Móvil: menú desplegable */}
        {isMobile && (    //para moviles
          <Collapse in={menuOpen} timeout="auto" unmountOnExit>   {/*anima a entrada salida del menu*/}
            <List  //lista vvertical y con fondo oscuro
              sx={{   //estilos
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(0,0,0,0.85)',
                color: '#00fff7',
                borderTop: '1px solid #00fff7',
              }}
            >
              {menuItems.map((text) => (
                <ListItem   //cierra el menu al hacer click
                  button   //boton clickeable
                  key={text}   //funcion que identifica de forma unica a cada elemento
                  onClick={() => setMenuOpen(false)}   //cierra el menu al hacer click
                  sx={{   //estilos con hover
                    textAlign: 'center',
                    borderBottom: '1px solid #00fff7',
                    '&:hover': {
                      backgroundColor: alpha('#00fff7', 0.2),
                      boxShadow: '0 0 10px #00fff7, 0 0 20px #00fff7 inset',
                      transform: 'scale(1.05)',
                    },
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
