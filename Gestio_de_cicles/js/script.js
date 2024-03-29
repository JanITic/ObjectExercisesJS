import Cicle from './Cicle.js';
import Modul from './Modul.js';

let llistatCicles = []; // Lista de ciclos

// Event listeners para los botones de agregar ciclo y módulo
document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);

// Función para agregar un ciclo
function afegirCicle() {
    // Obtener valores de los campos del formulario
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;
    let cicleID = document.getElementById("editCicle").value;

    // Crear instancia de Cicle con los valores del formulario
    let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);
    cicle.toString(); // Convertir a cadena (no hace nada)
    console.log(cicle); // Imprimir el ciclo en la consola

    // Agregar el ciclo al array o editar un ciclo existente
    if (cicleID === "-1") {
        llistatCicles.push(cicle);
    } else {
        llistatCicles[cicleID].nom = nom;
        llistatCicles[cicleID].categoria = categoria;
        llistatCicles[cicleID].numAlumnes = numAlumnes;
        llistatCicles[cicleID].abreviatura = abreviatura;
    }

    // Actualizar el selector de ciclos
    actualitzarSelector();

    // Imprimir la lista de ciclos
    printLlistat(llistatCicles);

    // Limpiar los formularios
    netejarFormularis();

    document.getElementById("editCicle").value = -1; // Restaurar valor del campo de edición
}

// Función para agregar un módulo
function afegirModul() {
    // Obtener valores de los campos del formulario
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    // Crear instancia de Modul con los valores del formulario
    let modul = new Modul(cicle, modul_nom, modul_num, modul_hores);
    modul.toString(); // Convertir a cadena (no hace nada)
    console.log(modul); // Imprimir el módulo en la consola

    // Agregar el módulo al ciclo correspondiente
    llistatCicles[cicle].afegirModul(modul);

    // Imprimir la lista de ciclos
    printLlistat(llistatCicles);

    // Limpiar los formularios
    netejarFormularis();

    document.getElementById("editCicle").value = -1; // Restaurar valor del campo de edición
}

// Función para mostrar la lista de ciclos en la interfaz
function printLlistat(llistat) {
    let str = "";
    llistat.forEach(function (element, index) {
        // Construir el HTML para cada ciclo
        let btnRemoveCicle = `btnRemoveCicle${index}`;
        let btnEditCicle = `btnEditCicle${index}`;
        let btnCalculHores = `btnCalculHores${index}`;

        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>

                    <button type="button" id="${btnRemoveCicle}" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" id="${btnEditCicle}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" id="${btnCalculHores}" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;
    });

    document.getElementById("llistat").innerHTML = str; // Mostrar el HTML en la interfaz

    // Asignar eventos a los botones
    llistat.forEach(function (element, index) {
        let btnRemoveCicle = `btnRemoveCicle${index}`;
        let btnEditCicle = `btnEditCicle${index}`;
        let btnCalculHores = `btnCalculHores${index}`;
        document.getElementById(btnRemoveCicle).addEventListener("click", function () {
            removeCicle(index)
        });

        document.getElementById(btnEditCicle).addEventListener("click", function () {
            editCicle(index);
            llistatCicles[index].setNumEdicions()
        });

        document.getElementById(btnCalculHores).addEventListener("click", function () {
            llistatCicles[index].calculHores()
        });
    });
}

// Función para actualizar el selector de ciclos
function actualitzarSelector() {
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function (element, index) {
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Función para eliminar un ciclo
function removeCicle(i) {
    llistatCicles.splice(i, 1);
    printLlistat(llistatCicles);
}

//Función para editar un ciclo
function editCicle(i) {
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value = i;
}

//Función para limpiar los forms
function netejarFormularis() {
    var inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}