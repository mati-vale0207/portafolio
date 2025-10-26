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

//variavle para graficas que pueden cambiar de estado
const Skills = () => {
  const [booting, setBooting] = useState(true);
  const [currentSet, setCurrentSet] = useState("frontend");
  const [chartData, setChartData] = useState(null);

  // Simulación del "encendido del sistema"
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  return (              //estilos generales de skills
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
        mt: 4,
      }}
    >
      {/*estilos para animacion de cargando pantalla*/}
      <AnimatePresence mode="wait">
        {booting ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
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

{/*estilos para animacion de inicio en skills*/}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                marginTop: "2rem",
                fontSize: "1rem",
                opacity: 0.7,
              }}
            >
              Sistema de inicio activado...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ width: "100%", textAlign: "center" }}
          >
            {/*estilos para texto */}
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                textShadow: "0 0 20px #00fff7",
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
               SISTEMA DE HABILIDADES
            </Typography>

            <ButtonGroup
              variant="outlined"
              sx={{
                mb: 1,
                "& .MuiButton-root": {
                  color: "#00fff7",
                  borderColor: "#00fff7",
                  "&:hover": { backgroundColor: "rgba(0,255,247,0.1)" },
                },
              }}
            >

              {/*se combina para variables para botones de cambios de estado*/}
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
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Radar data={chartData} options={options} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Skills;