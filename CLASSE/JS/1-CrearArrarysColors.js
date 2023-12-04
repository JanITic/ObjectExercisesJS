function operacionesConColores() {
    // Crear el array de colores
    let colores = ['verd', 'vermell', 'groc', 'blau', 'negre', 'blanc'];

    // Comprobar si todos los colores son menores que 'marrón'
    let sonMenoresQueMarron = colores.every(color => color < 'marró');
    document.write('¿Son todos los colores menores que "marrón"? ' + sonMenoresQueMarron + '<br>');

    // Mostrar los colores que son menores que 'marrón'
    let coloresMenoresQueMarron = colores.filter(color => color < 'marró');
    document.write('Colores menores que "marrón": ' + coloresMenoresQueMarron + '<br>');

    // Obtener los últimos dos colores
    let ultimosDosColores = colores.slice(-2);
    document.write('Últimos dos colores: ' + ultimosDosColores + '<br>');

    // Agregar el color 'turquesa'
    colores.push('turquesa');
    document.write('Array después de agregar "turquesa": ' + colores + '<br>');

    // Eliminar el color 'verd'
    const indiceVerd = colores.indexOf('verd');
    if (indiceVerd !== -1) {
      colores.splice(indiceVerd, 1);
      document.write('Array después de eliminar "verd": ' + colores + '<br>' + '<br>');

    }

    // at()
    document.write("Function at(): " + colores.at(0) + '<br>');

    // concat()
    let otrosColores = ['taronja', 'rosa'];
    let coloresConcatenados = colores.concat(otrosColores);
    document.write("Function concat(): " + coloresConcatenados + '<br>');

    // constructor
    document.write("Function constructor(): " + colores.constructor + '<br>');

    // copyWithin()
    let copiaColores = colores.slice();
    copiaColores.copyWithin(0, 2, 4);
    document.write("Function copyWithin(): " + copiaColores + '<br>');

    // entries()
    let iteracionColores = colores.entries();
    for (let entrada of iteracionColores) {
      document.write("Function entries(): " + entrada + '<br>');
      break; // Mostrar solo el primer elemento
    }

    // every()
    let todosMenoresQueMarron = colores.every(color => color < 'marró');
    document.write("Function every(): " + todosMenoresQueMarron + '<br>');

    // fill()
    let coloresRellenados = colores.fill('gris', 2, 4);
    document.write("Function fill(): " + coloresRellenados + '<br>');

    // filter()
    let coloresFiltrados = colores.filter(color => color.length > 4);
    document.write("Function filter(): " + coloresFiltrados + '<br>');

    // find()
    let colorEncontrado = colores.find(color => color === 'blau');
    document.write("Function find(): " + colorEncontrado + '<br>');

    // findIndex()
    let indiceColorEncontrado = colores.findIndex(color => color === 'negre');
    document.write("Function findIndex(): " + indiceColorEncontrado + '<br>');

    // flat()
    let arrayAnidado = [1, 2, [3, 4, [5, 6]]];
    let arrayAplanado = arrayAnidado.flat(2);
    document.write("Function flat(): " + arrayAplanado + '<br>');

    // flatMap()
    let arrayNumeros = [1, 2, 3, 4];
    let arrayDuplicado = arrayNumeros.flatMap(num => [num, num * 2]);
    document.write("Function flatMap(): " + arrayDuplicado + '<br>');

    // forEach()
    colores.forEach(color => document.write("Function forEach(): " + color + '<br>'));

    // from()
    let arrayFromObjeto = Array.from('hello');
    document.write("Function from(): " + arrayFromObjeto + '<br>');

    // includes()
    let incluyeColor = colores.includes('blanc');
    document.write("Function includes(): " + incluyeColor + '<br>');

    // indexOf()
    let indiceColor = colores.indexOf('vermell');
    document.write("Function indexOf(): " + indiceColor + '<br>');

    // isArray()
    let esArray = Array.isArray(colores);
    document.write("Function isArray(): " + esArray + '<br>');

    // join()
    let coloresUnidos = colores.join(' - ');
    document.write("Function join(): " + coloresUnidos + '<br>');

    // keys()
    let iteradorKeys = colores.keys();
    for (let key of iteradorKeys) {
      document.write("Function keys(): " + key + '<br>');
    }

    // lastIndexOf()
    let ultimoIndiceBlau = colores.lastIndexOf('blau');
    document.write("Function lastIndexOf(): " + ultimoIndiceBlau + '<br>');

    // length
    let cantidadElementos = colores.length;
    document.write("Function length(): " + cantidadElementos + '<br>');

    // map()
    let coloresMayusculas = colores.map(color => color.toUpperCase());
    document.write("Function map(): " + coloresMayusculas + '<br>');

    // pop()
    let ultimoColorEliminado = colores.pop();
    document.write("Function pop(): " + ultimoColorEliminado + '<br>');

    // prototype
    Array.prototype.saludo = function() {
      return "Hola, soy un array.";
    };
    document.write("Function prototype(): " + colores.saludo() + '<br>');

    // push()
    let nuevaLongitud = colores.push('roig');
    document.write("Function push(): " + nuevaLongitud + '<br>');

    // reduce()
    let sumaNumeros = [1, 2, 3, 4, 5];
    let suma = sumaNumeros.reduce((total, num) => total + num);
    document.write("Function reduce(): " + suma + '<br>');

    // reduceRight()
    let inversa = colores.reduceRight((reversa, color) => reversa + ' ' + color);
    document.write("Function reduceRight(): " + inversa + '<br>');

    // reverse()
    colores.reverse();
    document.write("Function reverse(): " + colores + '<br>');

    // shift()
    let primerColorEliminado = colores.shift();
    document.write("Function shift(): " + primerColorEliminado + '<br>');

    // slice()
    let coloresCopia = colores.slice(1, 4);
    document.write("Function slice(): " + coloresCopia + '<br>');

    // some()
    let algunMenorQueMarron = colores.some(color => color < 'marró');
    document.write("Function some(): " + algunMenorQueMarron + '<br>');

    // sort()
    colores.sort();
    document.write("Function sort(): " + colores + '<br>');

    // splice()
    let coloresEliminados = colores.splice(2, 1, 'gris', 'morat');
    document.write("Function splice(): " + colores + '<br>');

    // toString()
    let coloresString = colores.toString();
    document.write("Function toString(): " + coloresString + '<br>');

    // unshift()
    let nuevaLongitudUnshift = colores.unshift('verd');
    document.write("Function unshift(): " + nuevaLongitudUnshift + '<br>');

    // valueOf()
    let valorArray = colores.valueOf();
    document.write("Function valueOf(): " + valorArray + '<br>');

  }

  // Llamar a la función para realizar las operaciones con el array de colores
  operacionesConColores();