// Clase Cicle para representar un ciclo formativo
class Cicle {
    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom; // Nombre del ciclo
        this.categoria = categoria; // Categoría del ciclo
        this.numAlumnes = numAlumnes; // Número de alumnos del ciclo
        this.abreviatura = abreviatura; // Abreviatura del ciclo
        this.numEdicions = 0; // Número de ediciones del ciclo
        this.ultimaEdicio = null; // Fecha de la última edición del ciclo
        this.moduls = []; // Lista de módulos del ciclo
    }

    // Incrementa el número de ediciones y actualiza la fecha de la última edición
    setNumEdicions() {
        this.numEdicions++;
        this.ultimaEdicio = new Date();
    }

    // Agrega un módulo al ciclo
    afegirModul(modul) {
        this.moduls.push(modul);
    }

    // Devuelve una representación en cadena del ciclo y sus módulos
    toString() {
        // Ordena los módulos por número
        this.moduls.sort((a, b) => a.num - b.num);
        // Crea una cadena con la información de los módulos
        let modulsStr = this.moduls.map(modul => `  - ${modul.nom} (Num: ${modul.num}, Hores: ${modul.hores})`).join('\n');
        // Devuelve la información del ciclo y sus módulos
        return `Cicle:
          Nom: ${this.nom}
          Categoria: ${this.categoria}
          Num d'alumnes: ${this.numAlumnes}
          Abreviatura: ${this.abreviatura}
          Num d'edicions: ${this.numEdicions}
          Última edició: ${this.ultimaEdicio ? this.ultimaEdicio.toLocaleString() : 'Encara no s\'ha editat'};
        Mòduls:
${modulsStr} `;
    }

    // Calcula el total de horas de los módulos del ciclo
    calculHores() {
        let hores = 0;
        // Suma las horas de todos los módulos
        this.moduls.forEach(function (modul){
            hores += parseInt(modul.modul_hores);
        })
        // Imprime las horas en la consola y muestra una alerta con el resultado
        console.log("Hores del mòdul: " + hores)
        alert("Hores del mòdul: " + hores)
    }
}

// Función para agregar un módulo a un ciclo
function afegirModulAlCicle(cicle, modul) {
    cicle.afegirModul(modul);
}

export default Cicle; // Exporta la clase Cicle como el valor predeterminado del módulo
