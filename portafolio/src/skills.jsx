//importaciones de react , mui y chart.js
import React, { useState, useEffect } from "react";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

//registro de componentes de chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

//arrays para graficos 
const skillSets = {
  frontend: {
    label: "Frontend",
    labels: ["HTML", "CSS", "JavaScript", "React", "MUI", "Bootstrap"],
    data: [90, 80, 50, 50, 60, 80],
    color: "#00fff7",
  },
  backend: {
    label: "Backend",
    labels: ["PHP", "SQL", "MYSQL", "Cargando...", "Cargando..."],
    data: [30, 50, 40, 90, 90],
    color: "#ff00c8",
  },
  tools: {
    label: "Tools",
    labels: ["Git", "VS Code", "Figma", "GitHub", "Vite", "Cargando...", "Cargando..."],
    data: [50, 80, 70, 50, 70, 20, 90],
    color: "#00ff85",
  },
};

//componente funcional principal
const Skills = () => {
  const [currentSet, setCurrentSet] = useState("frontend"); //estado para el conjunto activo
  const [chartData, setChartData] = useState(null); //datos dinámicos del gráfico

  //efecto de transicion de entrada
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50, //se mueve levemente hacia abajo al iniciar
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    },
  };

  // Genera los datos del radar según el set actual
  useEffect(() => {
    const { label, labels, data, color } = skillSets[currentSet];
    setChartData({
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: `${color}33`,
          borderColor: color,
          pointBackgroundColor: color,
          borderWidth: 2,
        },
      ],
    });
  }, [currentSet]);

  //configuración general del radar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        grid: { color: "rgba(0,255,247,0.2)" },
        angleLines: { color: "rgba(0,255,247,0.1)" },
        pointLabels: {
          color: "#00fff7",
          font: { size: 13 },
        },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: { labels: { color: "#00fff7" } },
    },
  };

  return ( //estilos generales de skills\\
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSet}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            display: "flex",
            flexDirection: "column", // 🔹 ahora se apilan verticalmente
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "700px",
          }}
        >

    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #0a0a0a, #000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#00fff7",
        fontFamily: "'Orbitron', sans-serif",
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
        px: { xs: 2, sm: 4 },
      }}
    >

          {/*estilos para texto */}
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              textShadow: "0 0 20px #00fff7",
              fontWeight: "bold",
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            SISTEMA DE HABILIDADES
          </Typography>

          {/*botones de cambio de categoría*/}
          <ButtonGroup
            variant="outlined"
            sx={{
              mb: 4,
              "& .MuiButton-root": {
                color: "#00fff7",
                borderColor: "#00fff7",
                "&:hover": { backgroundColor: "rgba(0,255,247,0.1)" },
              },
            }}
          >
            <Button onClick={() => setCurrentSet("frontend")}>Frontend</Button>
            <Button onClick={() => setCurrentSet("backend")}>Backend</Button>
            <Button onClick={() => setCurrentSet("tools")}>Tools</Button>
          </ButtonGroup>

          {/*estilos para graficos*/}
          {chartData && (
            <motion.div
              key={currentSet}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                width: "100%",
                maxWidth: "450px",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Radar data={chartData} options={options} />
            </motion.div>
          )}
          </Box>
        </motion.div>
      </AnimatePresence>
  );
}

export default Skills;
