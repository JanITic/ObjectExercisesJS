// Clase para representar una pelota en un lienzo (canvas)
export class Pilota {
  // Constructor
  constructor({ x, y, velX, velY, color, mida, canvasWidth, canvasHeight }) {
      // Propiedades de la pelota
      this.x = x; // Posición x
      this.y = y; // Posición y
      this.velX = velX; // Velocidad en x
      this.velY = velY; // Velocidad en y
      this.color = color; // Color
      this.mida = mida; // Tamaño
      this.canvasWidth = canvasWidth; // Ancho del lienzo
      this.canvasHeight = canvasHeight; // Alto del lienzo
  }

  // Método para dibujar la pelota en el lienzo
  dibuixa(ctx) {
      ctx.beginPath(); // Iniciar trazado
      ctx.fillStyle = this.color; // Color de relleno
      ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); // Dibujar círculo
      ctx.fill(); // Rellenar
  }

  // Método para mover la pelota dentro del lienzo
  mou() {
      const { x, y, mida, canvasWidth, canvasHeight } = this; // Extraer propiedades
      const { velX, velY } = this; // Extraer velocidades
      
      // Verificar límites horizontales
      if (x + mida >= canvasWidth || x - mida <= 0) {
          this.velX = -velX; // Invertir velocidad x
      }

      // Verificar límites verticales
      if (y + mida >= canvasHeight || y - mida <= 0) {
          this.velY = -velY; // Invertir velocidad y
      }

      // Actualizar posición
      this.x += this.velX;
      this.y += this.velY;
  }
}
