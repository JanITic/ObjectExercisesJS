let estatOrdreColumna = { indexColumna: null, ordreDireccio: "asc" };
let noms = [];
let bbdd;
let dades = null;
let llista = [];
let llistaOriginal = [];

let arrayLabels = [],
  arrayDadesGraf = [],
  backgroundColor = [],
  borderColor = [];

function triarJSON() {
  event.preventDefault();
  dades = null;
  llista = [];
  noms = [];
  console.clear();
  let valor =
    document.querySelector('input[value="pokemons"]:checked') ||
    document.querySelector('input[value="municipis"]:checked') ||
    document.querySelector('input[value="meteorits"]:checked') ||
    document.querySelector('input[value="movies"]:checked');

  bbdd = valor.value;
  if (bbdd == "pokemons") {
    fetch("js/data/pokemon.json")
      .then((response) => response.json())
      .then((data) => {
        dades = data.pokemon;

        for (let i in dades) {
          noms.push(dades[i].name);
        }
        console.log("Noms dels pokemons: " + noms.join(", "));

        dades.forEach((pokemon) => {
          let pokemonSenseKG = parseFloat(pokemon.weight);
          llista.push([pokemon.id, pokemon.name, pokemon.img, pokemonSenseKG]);
        });

        console.table(llista);

        llistaOriginal = [...llista];
      });
  } else if (bbdd == "municipis") {
    fetch("js/data/municipis.json")
      .then((response) => response.json())
      .then((data) => {
        dades = data.elements;

        for (let i in dades) {
          noms.push(dades[i].municipi_nom);
        }
        console.log("Noms dels municipis: " + noms.join(", "));
        dades.forEach((municipi) => {
          llista.push([
            municipi.grup_ajuntament.codi_postal,
            municipi.municipi_nom,
            municipi.municipi_bandera,
            municipi.nombre_habitants,
          ]);
        });
        console.table(llista);
        llistaOriginal = [...llista];
      });
  } else if (bbdd == "meteorits") {
    fetch("js/data/earthMeteorites.json")
      .then((response) => response.json())
      .then((data) => {
        dades = data;
        for (let i in dades) {
          noms.push(dades[i].name);
        }
        console.log("Noms dels meteorits: " + noms.join(", "));

        dades.forEach((meteorit) => {
          llista.push([
            meteorit.id,
            meteorit.name,
            meteorit.mass,
            meteorit.year,
          ]);
        });
        console.table(llista);
        llistaOriginal = [...llista];
      });
  } else if (bbdd == "movies") {
    fetch("js/data/movies.json")
      .then((response) => response.json())
      .then((data) => {
        dades = data.movies;

        for (let i in dades) {
          noms.push(dades[i].title);
        }
        console.log("Noms de les pel·lícules: " + noms.join(", "));

        dades.forEach((movies) => {
          llista.push([movies.title, movies.rating, movies.url, movies.year]);
        });
        console.table(llista);
        llistaOriginal = [...llista];
      });
  }
}

function searchList(index) {
  index = parseInt(
    prompt("introdueix un index per buscar a l'array [0 - " + noms.length + "]")
  );
  if (isNaN(index)) {
    console.log("No has introduït cap número.");
    return;
  }
  console.log("Element número " + index + ": " + noms[index]);
}

function orderList(ordre) {
  let numColumna;
  if (bbdd == "movies") {
    numColumna = 0;
  } else {
    numColumna = 1;
  }
  let llistaOrdenada = [...llista];

  llistaOrdenada.sort((a, b) => {
    let compararValorA = String(a[numColumna] || "").toLowerCase();
    let compararValorB = String(b[numColumna] || "").toLowerCase();
    return ordre === "asc"
      ? compararValorA.localeCompare(compararValorB)
      : compararValorB.localeCompare(compararValorA);
  });

  console.table(llistaOrdenada);
  llista = llistaOrdenada;
  printList();
}

function orderListTable(numColumna) {
  let indexActualColumna = estatOrdreColumna.indexColumna;
  let ordreActualDireccio = estatOrdreColumna.ordreDireccio;

  let nouOrdreDireccio =
    indexActualColumna === numColumna
      ? ordreActualDireccio === "asc"
        ? "desc"
        : "asc"
      : "asc";
  estatOrdreColumna = {
    indexColumna: numColumna,
    ordreDireccio: nouOrdreDireccio,
  };

  llista.sort((a, b) => {
    let compararValorA = a[numColumna];
    let compararValorB = b[numColumna];
    if (!isNaN(compararValorA) && !isNaN(compararValorB)) {
      return nouOrdreDireccio === "asc"
        ? compararValorA - compararValorB
        : compararValorB - compararValorA;
    } else {
      compararValorA = String(compararValorA).toLowerCase();
      compararValorB = String(compararValorB).toLowerCase();
      return nouOrdreDireccio === "asc"
        ? compararValorA.localeCompare(compararValorB)
        : compararValorB.localeCompare(compararValorA);
    }
  });

  console.table(llista);

  printList();
}

function printList() {
  if (dades == null) {
    alert("Selecciona una bd");
  } else {
    let titols;
    document.getElementById("canvas").innerHTML = "";
    if (myChart) {
      myChart.destroy();
    }
    let div = document.getElementById("resultat");
    div.innerHTML = "";
    let table = document.createElement("table");
    table.id = "taula";
    let tbody = document.createElement("tbody");
    let filaTitols = document.createElement("tr");
    if (bbdd == "pokemons") {
      titols = ["ID", "NAME", "IMG", "PES"];
    } else if (bbdd == "municipis") {
      titols = ["CP", "NAME", "BANDERA", "NOMBRE D'HABITANTS"];
    } else if (bbdd == "meteorits") {
      titols = ["ID", "NAME", "MASSA", "ANY DE CAIGUDA"];
    } else if (bbdd == "movies") {
      titols = ["TITOL", "PUNTUACIÓ", "PORTADA", "ANY"];
    }
    titols.forEach((titol, index) => {
      let th = document.createElement("th");
      if (titol == "IMG" || titol == "BANDERA" || titol == "PORTADA") {
        th.textContent = titol;
      } else {
        th.textContent = titol;
        th.onclick = function () {
          orderListTable(index);
        };
      }
      filaTitols.appendChild(th);
    });
    tbody.appendChild(filaTitols);

    for (let item of llista) {
      let fila = document.createElement("tr");

      let casellaID = document.createElement("td");
      casellaID.textContent = item[0];
      fila.appendChild(casellaID);

      let casellaNom = document.createElement("td");
      casellaNom.textContent = item[1];
      fila.appendChild(casellaNom);

      let casellaImatge = document.createElement("td");
      if (bbdd == "meteorits") {
        casellaImatge.textContent = item[2];
      } else {
        casellaImatge.innerHTML =
          "<img alt='Imatge no disponible' src='" + item[2] + "'></img>";
      }

      fila.appendChild(casellaImatge);

      let casellaPes = document.createElement("td");
      casellaPes.textContent = item[3];
      fila.appendChild(casellaPes);

      tbody.appendChild(fila);
    }

    table.appendChild(tbody);
    div.appendChild(table);
    document.body.appendChild(div);
  }
}

function calcMitjana() {
  let total = 0,
    c = 0;
  if (bbdd == "pokemons") {
    dades.forEach((item) => {
      total += parseFloat(item.weight);
      c++;
    });
  } else if (bbdd == "municipis") {
    dades.forEach((item) => {
      total += parseFloat(item.nombre_habitants);
      c++;
    });
  } else if (bbdd == "meteorits") {
    dades.forEach((item) => {
      if (item.mass != undefined) {
        total += parseFloat(item.mass);
        c++;
      }
    });
  } else if (bbdd == "movies") {
    dades.forEach((item) => {
      total += parseFloat(item.rating);
      c++;
    });
  }
  let mitjana = total / c;
  if (isNaN(mitjana)) {
    alert("Selecciona una base de dades abans!");
  } else {
    alert("Mitjana: " + mitjana.toFixed(2));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let inputSearch = document.getElementById("txtSearch");
  inputSearch.addEventListener("input", (e) => {
    let valorInput = inputSearch.value.toLowerCase();
    let listaFiltrada = llistaOriginal.filter((item) => {
      return item.some((value) => {
        let stringValue = String(value).toLowerCase();
        return stringValue.includes(valorInput);
      });
    });

    llista = [...listaFiltrada];
    printList();
  });

  inputSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      if (inputSearch.value.trim() === "") {
        llista = [...llistaOriginal];
        printList();
      }
    }
  });
});

let myChart = null;
function grafic() {
  document.getElementById("resultat").innerHTML = "";
  let grafic = document.createElement("canvas");
  grafic.id = "myChart";
  let canvas = document.getElementById("canvas");
  canvas.appendChild(grafic);
  let data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          getBackgroundColor(),
          getBackgroundColor(),
          getBackgroundColor(),
          getBackgroundColor(),
          getBackgroundColor(),
        ],
        borderColor: getBorderColor(),
      },
    ],
  };
  let config = {
    type: "polarArea",
    data: data,
    options: {},
  };

  let graficMap = new Map();
  if (bbdd == "pokemons") {
    dades.forEach((pokemon) => {
      pokemon.type.forEach((tipus) => {
        if (!graficMap.has(tipus)) {
          graficMap.set(tipus, 0);
        }
        graficMap.set(tipus, graficMap.get(tipus) + 1);
      });
    });
    graficMap.forEach(function (value, key) {
      data.labels.push(key);
      data.datasets[0].data.push(value);
    });
  } else if (bbdd == "municipis") {
    dades.forEach((municipi) => {
      if (!graficMap.has(municipi.grup_comarca.comarca_nom)) {
        graficMap.set(municipi.grup_comarca.comarca_nom, 0);
      }
      graficMap.set(
        municipi.grup_comarca.comarca_nom,
        graficMap.get(municipi.grup_comarca.comarca_nom) + 1
      );
    });
    graficMap.forEach(function (value, key) {
      data.labels.push(key);
      data.datasets[0].data.push(value);
    });
  } else if (bbdd == "meteorits") {
    dades.forEach((meteorit) => {
      if (!graficMap.has(meteorit.fall)) {
        graficMap.set(meteorit.fall, 0);
      }
      graficMap.set(meteorit.fall, graficMap.get(meteorit.fall) + 1);
    });
    graficMap.forEach(function (value, key) {
      data.labels.push(key);
      data.datasets[0].data.push(value);
    });
  } else if (bbdd == "movies") {
    dades.forEach((movies) => {
      movies.genres.forEach((genere) => {
        if (!graficMap.has(genere)) {
          graficMap.set(genere, 0);
        }
        graficMap.set(genere, graficMap.get(genere) + 1);
      });
    });
    graficMap.forEach(function (value, key) {
      data.labels.push(key);
      data.datasets[0].data.push(value);
    });
  }

  function getBackgroundColor() {
    let r = getRandomNumber(0, 255);
    let g = getRandomNumber(0, 255);
    let b = getRandomNumber(0, 255);
    let opacity = 0.2;
    return `rgba(${r},${g},${b},${opacity})`;
  }

  function getBorderColor() {
    let color = getBackgroundColor();
    let opacity = 1;
    return `${color},${opacity})`;
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(document.getElementById("myChart"), config);
}
