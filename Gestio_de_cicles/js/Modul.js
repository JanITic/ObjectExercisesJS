// Clase Modul para representar un módulo de un ciclo formativo
class Modul {
    constructor(cicle, modul_nom, modul_num, modul_hores) {
        this.cicle = cicle; // Ciclo al que pertenece el módulo
        this.modul_nom = modul_nom; // Nombre del módulo
        this.modul_num = modul_num; // Número del módulo
        this.modul_hores = modul_hores; // Horas del módulo
    }

    // Devuelve una representación en cadena del módulo
    toString() {
        return `MP${this.modul_num}. ${this.modul_nom} (${this.modul_hores}h)`;
    }
}

export default Modul; // Exporta la clase Modul como el valor predeterminado del módulo
