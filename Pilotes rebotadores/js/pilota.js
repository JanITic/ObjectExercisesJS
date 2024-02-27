// Clase Pilota para representar pelotas en el canvas
export class Pilota {
    constructor(x, y, velX, velY, color, mida, canvasWidth, canvasHeight) {
      this.x = x; // Posición en el eje x
      this.y = y; // Posición en el eje y
      this.velX = velX; // Velocidad en el eje x
      this.velY = velY; // Velocidad en el eje y
      this.color = color; // Color de la pelota
      this.mida = mida; // Tamaño de la pelota (radio)
      this.canvasWidth = canvasWidth; // Ancho del canvas
      this.canvasHeight = canvasHeight; // Altura del canvas
    }
  
    // Método para dibujar la pelota en el canvas
    dibuixa(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI);
      ctx.fill();
    }
  
    // Método para mover la pelota
    mou() {
      // Revisa si la pelota alcanza los bordes del canvas y cambia de dirección si es así
      if (this.x + this.mida >= this.canvasWidth || this.x - this.mida <= 0) {
        this.velX = -this.velX;
      }
      if (this.y + this.mida >= this.canvasHeight || this.y - this.mida <= 0) {
        this.velY = -this.velY;
      }
  
      // Actualiza la posición de la pelota según su velocidad
      this.x += this.velX;
      this.y += this.velY;
    }
  }
