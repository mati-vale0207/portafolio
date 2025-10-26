import { useEffect, useState, useRef } from "react"; //hooks de react
import { Box, Typography, Button } from "@mui/material";  //importaciones de mui
import nave from "./assets/nave.jpg";   //importacion de imagen
import { useNavigate } from "react-router-dom";


//inicion del componente funcional
const Portada = () => {
  const canvasRef = useRef(null);  //referencia al DOM que leugo asigna al camvas ref

  // Animación de texto tipo IA
  const texts = ["David Cardona", "Full Stack Dev"];  //array con texto
  const [currentTextIndex, setCurrentTextIndex] = useState(0);  //indice de que texto de array esta activo
  const [displayedText, setDisplayedText] = useState(""); //texto que renderiza en pantalla por animacion
  const [index, setIndex] = useState(0);  //numero de mostrados en el texto activos
  const [deleting, setDeleting] = useState(false);  //booleano que indica si esta en fase de borrado

const navigate = useNavigate();

const handleContact = () => {
  navigate("/about#contact")
}

  //para la animacion de typewriter 'maquina de escribir'
  useEffect(() => {  //controlo la escritura y borre de texto
    const speed = 200;  //tieppo base entre cada caracter al escribir
    const pause = 1200;  //pasua al terminar de escribir
    let timeout;  //variable para guardar el id de settimeout
    const currentText = texts[currentTextIndex]; //texto actual a mostrar segun 

    if (!deleting && index < currentText.length) {
      timeout = setTimeout(() => {  //si no esta borrando y aun no termina de escribirse
        setDisplayedText(currentText.slice(0, index + 1));  //agrega un caracter segun el efecto
        setIndex(index + 1);  //incrementa o agrega texto
      }, speed);
    } else if (deleting && index > 0) { // si esta borrando y aun quedan caracteres
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, index - 1));  //quita un caracter
        setIndex(index - 1);
      }, speed / 2);
    } else if (!deleting && index === currentText.length) { //si llega al final  y no esta borrando 0
      timeout = setTimeout(() => setDeleting(true), pause);  //espera el borrado
        } else if (deleting && index === 0) {    // si no empieza a borrar
      setDeleting(false);  //para empezar a boorrar
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);  //pasa alsiguiente texto modulo para reciclar o rotar
    }

    return () => clearTimeout(timeout);   //el efecto se ejectua o el componente se desmonta
  }, [index, deleting, texts, currentTextIndex]);

  // Animación de estrellas/partículas holográficas
  useEffect(() => {  //efecto que corre al montar animacion del canvas
    const canvas = canvasRef.current;  //canvas real desde la referencia
    const ctx = canvas.getContext("2d");  //contexto para dibujar
    let stars = [];  //array de particulas
    const numStars = 150;  //cantidad de particulas

    const initStars = () => { //inicio de canvas segun padre
      canvas.width = canvas.parentElement.offsetWidth; //tamano
      canvas.height = canvas.parentElement.offsetHeight;  //tamano
      stars = [];   //inicio de arreglo
      for (let i = 0; i < numStars; i++) {  //bucle que se ejecuta tantas veces y la varia numstars ya llamada
        stars.push({   //array con elementos
          x: Math.random() * canvas.width,  //particulas en el eje X
          y: Math.random() * canvas.height,  //particulas en el eje Y
          radius: Math.random() * 1.5,  //tamano de radio aleatorio
          speed: Math.random() * 0.3,  //velocidad aleatoria
        });
      }
    };

    const animateStars = () => {  //bcle de animacion
      ctx.clearRect(0, 0, canvas.width, canvas.height);  //borra el frame anterior
      stars.forEach((s) => {    //para cada estrellla
        ctx.beginPath();  //dibujan un circulo
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);  //dibujan un circulo
        ctx.fillStyle = `rgba(0,255,255,${Math.random() * 0.8 + 0.2})`;  //color cyan mas efecto parpadeo aletorio
        ctx.fill();  //pinta la estrella
        s.y -= s.speed;  //muve la estrella hacia arriba restando
        if (s.y < 0) s.y = canvas.height;  //si se sale arrba la reubicas
      });
      requestAnimationFrame(animateStars);  //vuelve a llamar para el siguiente frame
    };

    window.addEventListener("resize", initStars);  //calcula tamano e inicia si la ventana cambia de tmano
    initStars();   //llamada iicial para preparar y arrancar la animacion
    animateStars();  

    return () => window.removeEventListener("resize", initStars);  //quita el listener de resize cuando se desmonta el componente
  }, []);

  return (  //inicio del jsx
    <Box  //contenedor principal
      sx={{  //estilos
        display: "flex",  //distribuye los elementos dentro del contenedor
        justifyContent: "center",  //centra horizontalmente el contenido
        px: { xs: 2, sm: 4, md: 6 },  //relleno horizontal responsive
        py: { xs: 6, md: 6 }, //relleno vertical responsive
        minHeight: "80vh",  //altura dela entana minima

      }}
    >
      {/* Card principal */}
      <Box  //contenedor de card
        sx={{  //estilos
          position: "relative",  //para posicionar elementos 
          width: { xs: "90%", sm: "400px", md: "600px", lg: "700px" },  //ancho responsive
          height: { xs: "300px", sm: "400px", md: "400px", lg: "400px" },  //altura responsive
          borderRadius: 3,  //esquina redondeada
          overflow: "hidden",  //recorta contenido para que no salga de la caja
          backgroundImage: `url(${nave})`,  //imagen
          backgroundSize: "cover", //permite establecer el tamano de imagen de fondo
          backgroundPosition: "center",  //comportamiento para centrar y cubrir la imagen
          boxShadow: '0 0 30px #00fff7',  //sombra de caja
          mt: 15,   //margen superior
          
        }}
      >
        {/* Canvas de estrellas */}
        <canvas
          ref={canvasRef}  //elemento canvas
          style={{  //estilo ocupa todo el area del card
            position: "absolute",  //se poisicion a al su contenedor mas cercano
            top: 0,   //arriba
            left: 0,  //izquierda
            width: "100%",   //ancho
            height: "100%",   //altura
            zIndex: 1,     //debaje de overlas/controles superiores
          }}
        />

        {/* Overlay holográfico pulsante */}
        <Box   //absolute encima del canvas
          sx={{  //estilos
            position: "absolute",  //se posiciona a su contenedor mas cercano 
            top: 0,   //arriba
            left: 0,  //izquierda
            width: "100%",  //ancho
            height: "100%", //altura
            background:  //color de fondo tipo gradiente
              "linear-gradient(180deg, rgba(0,255,255,0.08), rgba(0,255,255,0.02))",
            zIndex: 2,  //con un gradiente translucido
            animation: "pulseOverlay 3s infinite alternate",  //tipo de animacion 
            "@keyframes pulseOverlay": {  ////efecto con opacidad
              "0%": { opacity: 0.6 },
              "100%": { opacity: 0.3 },
            },
          }}
        />

        {/* Contenido: texto animado + subtítulo + botón */}
        <Box   //caja
          sx={{ //estylo
            position: "absolute",  //se posiciona a su contenedor mas cercano
            top: "50%",  //sirve para centrar
            left: "50%",   //ayuda a centrar
            transform: "translate(-50%, -50%)",  //ayuda a centrar
            zIndex: 3,  //por encima de overlay y canvas
            display: "flex",  //posiciona dentro del contenedor
            flexDirection: "column", //apila elementos erticalmentee
            alignItems: "center",  //alinea los objetos al centro
            textAlign: "center",  //alinea el texto horizontalmente
            px: 2,  //rellno  horizontal
            gap: 1,  //espacio entre iconos o lista
          }}
        >
          {/* Contenedor del texto animado con ancho fijo para que no mueva subtítulo/botón */}
          <Box  //caja
            sx={{  //estilos
              minWidth: { xs: "180px", sm: "220px", md: "280px", lg: "320px" },  //ancho responsive
              display: "flex",  //posiciona dentro del contenedor
              justifyContent: "center",  //los alinea 
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Orbitron', sans-serif",  //tipo de texto
                fontWeight: "bold", //tamano de texto 
                letterSpacing: 2,  //estilos glox
                color: "#00ffff",
                textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff",
                fontSize: {   //reponsive
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "2rem",
                  lg: "2.5rem",
                  xl: "3rem",
                },
                whiteSpace: "nowrap",  //evita que el texto mueva el diseno
                overflow: "hidden",  //no hace scroll
                textOverflow: "ellipsis",  //texto dinamico
                animation: "glowText 2s infinite alternate",  //animacion con estilos
                "@keyframes glowText": {
                  "0%": { textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff" },
                  "100%": { textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff" },
                },
              }}
            >
              {displayedText}
              <Box  //componente span con estilos
                component="span"  //actua como cursor vertical 
                sx={{
                  borderRight: "3px solid #00ffff",
                  ml: 0.5,
                  animation: "blink 1s infinite",  //simula el cursor de texto
                  "@keyframes blink": {  //efcto
                    "0%, 50%, 100%": { opacity: 1 },
                    "25%, 75%": { opacity: 0 },
                  },
                }}
              />
            </Typography>
          </Box>

          {/* Subtítulo */}
          <Typography
            sx={{
              mt: 1,
              fontSize: {
                color: "#e0e0e0",
                xs: "0.9rem",
                sm: "1rem",
                md: "1.2rem",
                lg: "1.4rem",
                xl: "1.6rem",
              },
              textShadow: "0 0 8px #00ffff",
              textAlign: "center",
              whiteSpace: { xs: "normal", sm: "normal", md: "nowrap" },  //controla como se comportan los de abaho para evitar desbordes
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: { xs: "90%", sm: "90%", md: "100%" },
            }}
          >
            Desarrollador Full Stack  Creando experiencias digitales únicas
          </Typography>

          {/* Botón pulsante */}
          <Button onClick={handleContact}
            variant="contained"
            sx={{   //stilos
              mt: 2,
              bgcolor: "transparent",  //estilos de mui
              border: "2px solid #00ffff",
              color: "#00ffff",
              fontWeight: "bold",
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 2,
              boxShadow: "0 0 10px #00ffff",
              "&:hover": {
                bgcolor: "#00ffff",
                color: "whitesmoke",
                transform: "scale(1.05)",
                boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff",
              },
              animation: "pulseButton 2s infinite alternate",
              "@keyframes pulseButton": {
                "0%": { boxShadow: "0 0 10px #00ffff" },
                "100%": { boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff" },
              },
            }}
            href="#contacto"
          >
            Contáctame
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Portada;
