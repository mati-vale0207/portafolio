import { useEffect, useState, useRef } from "react"; // Hooks de React
import { Box, Typography, Button } from "@mui/material"; // Importaciones de MUI
import nave from "./assets/nave.jpg"; // Importación de imagen
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Inicio del componente funcional
const Portada = () => {
  const canvasRef = useRef(null); // Referencia al DOM que luego asigna al canvas ref
  const [booting, setBooting] = useState(true); // Estado para mostrar la pantalla de inicio

  // Simulación del "encendido del sistema"
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animación de texto tipo IA
  const texts = ["David Cardona", "Full Stack Dev"]; // Array con texto
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // Índice de qué texto del array está activo
  const [displayedText, setDisplayedText] = useState(""); // Texto que renderiza en pantalla por animación
  const [index, setIndex] = useState(0); // Número de caracteres mostrados en el texto activo
  const [deleting, setDeleting] = useState(false); // Booleano que indica si está en fase de borrado

  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/about#contact");
  };

  // Para la animación de typewriter 'máquina de escribir'
  useEffect(() => { // Controla la escritura y borrado de texto
    const speed = 200; // Tiempo base entre cada carácter al escribir
    const pause = 1200; // Pausa al terminar de escribir
    let timeout; // Variable para guardar el ID de setTimeout
    const currentText = texts[currentTextIndex]; // Texto actual a mostrar según índice

    if (!deleting && index < currentText.length) {
      timeout = setTimeout(() => { // Si no está borrando y aún no termina de escribirse
        setDisplayedText(currentText.slice(0, index + 1)); // Agrega un carácter según el efecto
        setIndex(index + 1); // Incrementa o agrega texto
      }, speed);
    } else if (deleting && index > 0) { // Si está borrando y aún quedan caracteres
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, index - 1)); // Quita un carácter
        setIndex(index - 1);
      }, speed / 2);
    } else if (!deleting && index === currentText.length) { // Si llega al final y no está borrando
      timeout = setTimeout(() => setDeleting(true), pause); // Espera para empezar a borrar
    } else if (deleting && index === 0) { // Si ya borró todo
      setDeleting(false); // Para empezar a escribir de nuevo
      setCurrentTextIndex((prev) => (prev + 1) % texts.length); // Pasa al siguiente texto (loop)
    }

    return () => clearTimeout(timeout); // Limpia el timeout al desmontar
  }, [index, deleting, currentTextIndex, texts.length]);

  // Animación de estrellas/partículas holográficas
  useEffect(() => { // Efecto que corre al montar la animación del canvas
    const canvas = canvasRef.current; // Canvas real desde la referencia
    if (!canvas) return; // Verificación para evitar null ref

    const ctx = canvas.getContext("2d"); // Contexto para dibujar
    let stars = []; // Array de partículas
    let animationId; // ID del requestAnimationFrame para cleanup
    const numStars = 150; // Cantidad de partículas

    const initStars = () => { // Inicializa canvas según tamaño del contenedor
      canvas.width = window.innerWidth; // Ancho completo de ventana
      canvas.height = window.innerHeight; // Altura completa de ventana
      stars = []; // Reinicia arreglo
      for (let i = 0; i < numStars; i++) { // Bucle que genera estrellas
        stars.push({ // Array con elementos
          x: Math.random() * canvas.width, // Posición X
          y: Math.random() * canvas.height, // Posición Y
          radius: Math.random() * 1.5, // Tamaño aleatorio
          speed: Math.random() * 0.3, // Velocidad aleatoria
        });
      }
    };

    const animateStars = () => { // Bucle de animación
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Borra el frame anterior
      stars.forEach((s) => { // Para cada estrella
        ctx.beginPath(); // Empieza un nuevo dibujo
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2); // Dibuja un círculo
        ctx.fillStyle = `rgba(0,255,255,${Math.random() * 0.8 + 0.2})`; // Color cyan con parpadeo aleatorio
        ctx.fill(); // Pinta la estrella
        s.y -= s.speed; // Mueve la estrella hacia arriba
        if (s.y < 0) s.y = canvas.height; // Si se sale arriba, reaparece abajo
      });
      animationId = requestAnimationFrame(animateStars); // Repite para el siguiente frame
    };

    window.addEventListener("resize", initStars); // Recalcula tamaño al cambiar la ventana
    initStars(); // Inicia la animación
    animateStars();

    return () => { // Cleanup al desmontar
      window.removeEventListener("resize", initStars);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  // ----------- RETURN PRINCIPAL -----------
  return (
    <>
      {/* Canvas de estrellas (siempre visible) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <AnimatePresence mode="wait">
        {booting ? (
          // -------- Pantalla de inicio tipo "sistema cargando" --------
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              height: "95vh", // Altura fija para no scroll
              overflow: "hidden", // Bloquea overflow
            }}
          >
            <Typography variant="h5" sx={{ textShadow: "0 0 10px #00fff7" }}>
              INICIANDO SISTEMA...
            </Typography>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2 }}
              style={{
                height: "4px",
                background: "linear-gradient(90deg, #00fff7, #007bff)",
                marginTop: "1rem",
                boxShadow: "0 0 10px #00fff7",
                borderRadius: "2px",
              }}
            ></motion.div>

            {/* Estilos para animación de inicio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                marginTop: "2rem",
                fontSize: "1rem",
                opacity: 0.7,
                 color: "antiquewhite",
              }}
            >
              Sistema de inicio activado...
            </motion.p>
          </motion.div>
        ) : (
          // -------- Contenido principal (portada real) --------
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Box // Contenedor principal
              sx={{ // Estilos
                display: "flex", // Distribuye los elementos dentro del contenedor
                justifyContent: "center", // Centra horizontalmente
                px: { xs: 2, sm: 4, md: 6 }, // Relleno horizontal responsive
                py: { xs: 6, md: 6, lg: 6 }, // Relleno vertical
                height: "80vh", // Altura fija para no scroll (cambié de minHeight)
                overflow: "hidden", // Bloquea overflow
                margin: 0,
              }}
            >
              {/* Card principal */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1, // Sobre el canvas
                  width: { xs: "90%", sm: "400px", md: "600px", lg: "700px" },
                  height: { xs: "300px", sm: "400px", md: "400px", lg: "400px" },
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundImage: `url(${nave})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 0 30px #00fff7",
                  mt: 15,
                }}
              >
                {/* Overlay holográfico pulsante (reduce opacidad para ver imagen) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(180deg, rgba(0,255,255,0.05), rgba(0,255,255,0.01))", // Reducida opacidad
                    zIndex: 2,
                    animation: "pulseOverlay 3s infinite alternate",
                    "@keyframes pulseOverlay": {
                      "0%": { opacity: 0.4 },
                      "100%": { opacity: 0.2 },
                    },
                  }}
                />

                {/* Contenido: texto animado + subtítulo + botón */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    px: 2,
                    gap: 1,
                  }}
                >
                  {/* Contenedor del texto animado */}
                  <Box
                    sx={{
                      minWidth: { xs: "180px", sm: "220px", md: "280px", lg: "320px" },
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: "bold",
                        letterSpacing: 2,
                        color: "#00ffff",
                        textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff",
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.5rem",
                          md: "2rem",
                          lg: "2.5rem",
                          xl: "3rem",
                        },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.2, // Para evitar overflows
                        animation: "glowText 2s infinite alternate",
                        "@keyframes glowText": {
                          "0%": { textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff" },
                          "100%": { textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff" },
                        },
                      }}
                    >
                      {displayedText}
                      <Box
                        component="span"
                        sx={{
                          borderRight: "3px solid #00ffff",
                          ml: 0.5,
                          animation: "blink 1s infinite",
                          "@keyframes blink": {
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
                      color: "#e0e0e0",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.2rem",
                        lg: "1.4rem",
                        xl: "1.6rem",
                      },
                      textShadow: "0 0 8px #00ffff",
                      textAlign: "center",
                      whiteSpace: { xs: "normal", sm: "normal", md: "nowrap" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: { xs: "90%", sm: "90%", md: "100%" },
                      lineHeight: 1.3, // Para mejor legibilidad
                    }}
                  >
                    Desarrollador Full Stack — Creando experiencias digitales únicas
                  </Typography>

                  {/* Botón pulsante */}
                  <Button
                    onClick={handleContact}
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: "transparent",
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
                  >
                    Contáctame
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portada;