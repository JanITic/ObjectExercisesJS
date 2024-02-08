// Preparació del canvas ----------------------
/* Obté una referència a <canvas>, després crida al mètode getContext()
  per definir un context al el que es pot començar a dibuisar
  (ctx) és un objecte que representa l'àrea de dibuix del 
  <canvas> y permet dibuixar elements 2D al damunt.

  width and height són dreceres a l'ample i alt del canvas  que coincideixen
  amb l'alt i ample del navegador (viewport)
*/
// main.js

import { Pilota } from "./pilota.js"; // Importar la clase Pilota desde otro archivo

const canvas = document.querySelector("canvas"); // Referencia al elemento canvas
const ctx = canvas.getContext("2d"); // Contexto 2D para dibujar en el canvas
const width = (canvas.width = window.innerWidth); // Ancho del canvas
const height = (canvas.height = window.innerHeight); // Alto del canvas
const pilotes = []; // Array para almacenar las instancias de Pilota

// Función principal que se ejecuta en bucle para animar las pelotas
function loop() {
  // Limpiar el canvas con un rectángulo negro
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // Crear nuevas pelotas si no hay ninguna en el array
  if (pilotes.length === 0) {
    for (let i = 0; i < 20; i++) {
      // Crear una nueva instancia de Pilota con valores aleatorios
      const pilota = new Pilota(
        Math.random() * (width - 20) + 10,
        Math.random() * (height - 20) + 10,
        Math.random() * 4,
        Math.random() * 4,
        `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
        Math.random() * (20 - 10) + 10,
        width,
        height
      );
      pilotes.push(pilota); // Agregar la nueva pelota al array
    }
  }

  // Dibujar y mover cada pelota en el array
  pilotes.forEach((pilota) => {
    pilota.dibuixa(ctx);
    pilota.mou();
  });

  // Detectar y manejar colisiones entre pelotas
  detectaColisions(pilotes);

  requestAnimationFrame(loop); // Llamar a loop de nuevo en el siguiente frame
}

// Función para detectar colisiones entre pelotas
function detectaColisions(pilotes) {
  for (let i = 0; i < pilotes.length; i++) {
    for (let j = i + 1; j < pilotes.length; j++) {
      const dx = pilotes[i].x - pilotes[j].x;
      const dy = pilotes[i].y - pilotes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Si la distancia entre dos pelotas es menor que la suma de sus radios, hay colisión
      if (distance < pilotes[i].mida + pilotes[j].mida) {
        // Intercambiar velocidades para simular el rebote
        const tempVelX = pilotes[i].velX;
        const tempVelY = pilotes[i].velY;

        pilotes[i].velX = pilotes[j].velX;
        pilotes[i].velY = pilotes[j].velY;

        pilotes[j].velX = tempVelX;
        pilotes[j].velY = tempVelY;
      }
    }
  }
}

loop(); // Iniciar el bucle de animación