window.onload = function() {

const _COL = 23;
const _FILAS =  16;
let mapa_div = document.getElementById('mapa');
let arr_mapa_div;

let pasillosY = [5,8,11,14];
let pasillosX = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
let cantEnemigos = 1;
let enemigos = [];

//spawn ramdom de un enemigo
// let enemyX = shuffle(pasillosX)[0];
// let enemyY = shuffle(pasillosY)[0];


// Genero un array bi-dimensional para guardar todos los divs del DOM
var arr_mapa = new Array(_FILAS);
for (var i = 0; i < arr_mapa.length; i++) {
  arr_mapa[i] = new Array(_COL);
}

// Variables de control
let hayLlave = false;
let hayLibro = false;
let hayCuchi = false;
let vidas = 5;
let firstMove = true;
let nivel = 1;

// let vidas = getComputedStyle(mapa_div.getElementsByClassName("vidas")[0]).getPropertyValue('--vidas');

// Items de las cajas
let arr_items = [5,7,8,6,9 ,9,9,9,9,9
                ,9,9,9,9,9 ,9,9,9,9,9];
// shuffle(arr_items);
let premioActual = 0;
console.log(arr_items);

// mapa [1][9];
let xInicial = 9;
let yInicial = 1;
// Posicion inicial
let personajeY = yInicial;
let personajeX = xInicial;


// 0 = pared
// 1 = personaje
// 2 = camino
// 3 = camino pisado
// 4 = pared con tesoro
// 5 = Enemy
// 6 = llave
// 7 = urna / libro
// 8 = pergamino / knife
// 9 = nothing
// 10 = puerta cerrada
// 11 = puerta abierta
// S = Score
// V = Vidas

// Mapa inicial
  let mapa = [
              [0,'S',0,0,0, 'L',0,0,0,0, 0,0,'V',0,0, 0,0,0,0,0, 0,0,0],
              [0,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 0,0,0,0,0, 0,0,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0]
  ];
  // Array para llevar que casillas se pisaron y que tesoros se revelaron
    let mapaPisadas = [
              [0,'S',0,0,0, 'L',0,0,0,0, 0,0,'V',0,0, 0,0,0,0,0, 0,0,0],
              [0,0,0,0,0, 0,0,0,0,2, 0,0,0,0,0, 0,0,0,0,0, 0,0,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 6,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,4,4,4, 2,4,4,4,2, 4,4,4,2,4, 4,4,2,4,4, 4,2,0],
              [0,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,0],
              [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0]
    ];
  // Clon de los arrays para el siguiente nivel
  let clonMapa = JSON.parse(JSON.stringify(mapa));
  let clonMapaPisadas = JSON.parse(JSON.stringify(mapaPisadas));


  spawnearEnemigos();
  mostrarMapa();

  var moveEnemies = setInterval(function() {
    moverEnemigos();
  }, 800);


  function setVidas(value) {
    mapa_div.getElementsByClassName("vidas")[0].style.setProperty('--vidas',"'"+value+"'");
  }
  function setNivel(value) {
    mapa_div.getElementsByClassName("level")[0].style.setProperty('--level',"'"+value+"'");
  }

  function pasarDeNivel() {
    clearInterval(moveEnemies);
    nivel++;
    restoreMaps();
    mostrarMapa();
    setNivel(nivel);
    setVidas(vidas);
    cantEnemigos++;
    hayLlave = false;
    hayLibro = false;
    hayCuchi = false;
    firstMove = true;
    premioActual = 0;
    shuffle(arr_items);
    personajeY = yInicial;
    personajeX = xInicial;
    spawnearEnemigos();
    moveEnemies = setInterval(function() {
     moverEnemigos();
    }, 800);
  }
  function restoreMaps() {
    mapa = JSON.parse(JSON.stringify(clonMapa));
    mapaPisadas = JSON.parse(JSON.stringify(clonMapaPisadas));
  }
// Genera enemigos en el mapa
  function spawnearEnemigos() {
    for (var i = 0; i < cantEnemigos; i++) {
      enemigos[i] = {x:shuffle(pasillosX)[0],y:shuffle(pasillosY)[0],vivo:true};
      for (var j = 0; j < i; j++) {
        while(enemigos[j].x == enemigos[i].x && enemigos[j].y == enemigos[i].y) {
          enemigos[i] = {x:shuffle(pasillosX)[0],y:shuffle(pasillosY)[0],vivo:true};
        }
      }
      mapa[enemigos[i].y][enemigos[i].x] = 5;
    }
  }

  // mover enemigos
  //TODO: reescribir esta basura
  function moverEnemigos() {
    var movio;
    for (var i = 0; i < enemigos.length; i++) {
      movio = false;
      // Arriba
      if (enemigos[i].vivo) {
        if(movio == false && enemigos[i].y > personajeY && mapa[enemigos[i].y-1][enemigos[i].x] != 4 && mapa[enemigos[i].y-1][enemigos[i].x] != 0 && mapa[enemigos[i].y-1][enemigos[i].x] != 5){
          mapa[enemigos[i].y-1][enemigos[i].x] = 5;
          arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('enemy');
          arr_mapa[enemigos[i].y-1][enemigos[i].x].classList.add('enemy');

          if(mapaPisadas[enemigos[i].y-1][enemigos[i].x] == 3){
               arr_mapa[enemigos[i].y-1][enemigos[i].x].classList.remove('pisado');}
          else{arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('camino');}

          if (mapaPisadas[enemigos[i].y][enemigos[i].x] == 3) {
            mapa[enemigos[i].y][enemigos[i].x] = 3;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('pisado');}
          else{
            mapa[enemigos[i].y][enemigos[i].x] = 2;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('camino');}

          enemigos[i].y = enemigos[i].y-1;
          movio = true;
        }
          // Abajo
        if(movio == false && enemigos[i].y < personajeY && mapa[enemigos[i].y+1][enemigos[i].x] != 4 && mapa[enemigos[i].y+1][enemigos[i].x] != 0 && mapa[enemigos[i].y+1][enemigos[i].x] != 5){
          mapa[enemigos[i].y+1][enemigos[i].x] = 5;
          arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('enemy');
          arr_mapa[enemigos[i].y+1][enemigos[i].x].classList.add('enemy');

          if(mapaPisadas[enemigos[i].y+1][enemigos[i].x] == 3){
               arr_mapa[enemigos[i].y+1][enemigos[i].x].classList.remove('pisado');}
          else{arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('camino');}

          if (mapaPisadas[enemigos[i].y][enemigos[i].x] == 3) {
            mapa[enemigos[i].y][enemigos[i].x] = 3;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('pisado');}
          else{
            mapa[enemigos[i].y][enemigos[i].x] = 2;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('camino');}

          enemigos[i].y = enemigos[i].y+1;
          movio = true;
        }
          // Derecha
        if(movio == false && enemigos[i].x < personajeX && mapa[enemigos[i].y][enemigos[i].x+1] != 4 && mapa[enemigos[i].y][enemigos[i].x+1] != 0 && mapa[enemigos[i].y][enemigos[i].x+1] != 5){
          mapa[enemigos[i].y][enemigos[i].x+1] = 5;
          arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('enemy');
          arr_mapa[enemigos[i].y][enemigos[i].x+1].classList.add('enemy');

          if(mapaPisadas[enemigos[i].y][enemigos[i].x+1] == 3){
               arr_mapa[enemigos[i].y][enemigos[i].x+1].classList.remove('pisado');}
          else{arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('camino');}

          if (mapaPisadas[enemigos[i].y][enemigos[i].x] == 3) {
            mapa[enemigos[i].y][enemigos[i].x] = 3;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('pisado');}
          else{
            mapa[enemigos[i].y][enemigos[i].x] = 2;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('camino');}

          enemigos[i].x = enemigos[i].x+1;
          movio = true;
        }
          // Izquierda
        if(movio == false && enemigos[i].x > personajeX && mapa[enemigos[i].y][enemigos[i].x-1] != 4 && mapa[enemigos[i].y][enemigos[i].x-1] != 0 && mapa[enemigos[i].y][enemigos[i].x-1] != 5){
          mapa[enemigos[i].y][enemigos[i].x-1] = 5;
          arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('enemy');
          arr_mapa[enemigos[i].y][enemigos[i].x-1].classList.add('enemy');

          if(mapaPisadas[enemigos[i].y][enemigos[i].x-1] == 3){
               arr_mapa[enemigos[i].y][enemigos[i].x-1].classList.remove('pisado');}
          else{arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove('camino');}

          if (mapaPisadas[enemigos[i].y][enemigos[i].x] == 3) {
            mapa[enemigos[i].y][enemigos[i].x] = 3;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('pisado');}
          else{
            mapa[enemigos[i].y][enemigos[i].x] = 2;
            arr_mapa[enemigos[i].y][enemigos[i].x].classList.add('camino');}

          enemigos[i].x = enemigos[i].x-1;
          movio = true;
        }
        // colision con el personaje
        if(enemigos[i].x == personajeX && enemigos[i].y == personajeY){
          cantEnemigos--;
          enemigos[i].vivo = false;
          mapa[enemigos[i].y][enemigos[i].x] = 1;
          arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove("enemy");
          if (hayCuchi) {
            hayCuchi = false;
          }
          else{
            vidas--;
            setVidas(vidas);
          }
        }
      }
    }
  }

  // Movimiento del personaje
  // Se modifica el array interno y el DOM
  function mover(dirreccion) {
    function canMove(y, x) {
      const cellValue = mapa[y][x]
      return cellValue != 0 && cellValue != 4 && cellValue != 10
    }

    arr_mapa[personajeY][personajeX].classList.remove('personaje');
    arr_mapa[personajeY][personajeX].classList.add('pisado');

    if(dirreccion=="arriba"){
      if(canMove(personajeY-1, personajeX)) personajeY--
    }
    if(dirreccion=="abajo"){
      if(canMove(personajeY+1, personajeX)) personajeY++
      if (firstMove) {
        firstMove = false;
        arr_mapa[yInicial][xInicial].classList.remove('pisado');
        arr_mapa[yInicial][xInicial].classList.add("cerrarPuerta");
        mapa[yInicial][xInicial] = 10;
      }
    }
    if(dirreccion=="der"){
      if(canMove(personajeY, personajeX+1)) personajeX++
    }
    if(dirreccion=="izq"){
      if(canMove(personajeY, personajeX-1)) personajeX--
    }
    for (var i = 0; i < enemigos.length; i++) {
      if(enemigos[i].vivo){
        if(enemigos[i].x == personajeX && enemigos[i].y == personajeY){
          enemigos[i].vivo = false;
          arr_mapa[enemigos[i].y][enemigos[i].x].classList.remove("enemy");
          cantEnemigos--;
          if (hayCuchi) {
            hayCuchi = false;
          }
          else{
            vidas--;
            setVidas(vidas);
          }
        }
      }
    }
    mapaPisadas[personajeY][personajeX] = 3; //setMapPisadas(y,x, CODE)
    mapa[personajeY][personajeX] = 1;   //setMap(y,x, CODE)
    arr_mapa[personajeY][personajeX].classList.add('personaje'); // addClassToArrMap(y,x, class)
    arr_mapa[personajeY][personajeX].classList.remove('pisado');  // removeClassFromArrMap(y,x, class)
    checkCajas();
    if(hayLibro && hayLlave && personajeY == yInicial && personajeX == xInicial){
      pasarDeNivel();
    }
  }

    // Dibuja el mapa en el DOM
      function  mostrarMapa(){
        //Borro el contenido del div padre
        mapa_div.innerHTML = "";
        //Genero el mapa a partir de "mapa"
          mapa.forEach(function(element){
            for (var i = 0; i < element.length; i++) {
              var node = document.createElement("div");
              if (element[i] == 0 || element[i] == 4) {node.classList.add("pared");}
              else if(element[i] == 2){node.classList.add("camino");}
              else if(element[i] == 3){node.classList.add("pisado");}
              else if(element[i] == 6){node.classList.add("llave");}
              else if(element[i] == 7){node.classList.add("book");}
              else if(element[i] == 8){node.classList.add("knife");}
              else if(element[i] == 9){node.classList.add("nothing");}
              else if(element[i] == 1){node.classList.add("personaje");}
              else if(element[i] == 5){node.classList.add("enemy");}
              else if(element[i] == 'S'){node.classList.add("score");}
              else if(element[i] == 'V'){node.classList.add("vidas");}
              else if(element[i] == 'L'){node.classList.add("level");}
              else if(element[i] == 10){node.classList.add("cerrarPuerta");}
              else if(element[i] == 11){node.classList.add("abrirPuerta");}

              node.classList.add("casilla");
              mapa_div.appendChild(node);
            }
          });
          // Capturo todos los divs y los guardo en un array
          arr_mapa_div = mapa_div.getElementsByClassName('casilla');
          var fila=0;
          var index=0;
          for (var i = 0; i < arr_mapa_div.length; i+=(_COL)) {
            j=i;
            index=0;
            while(index<(_COL)){
              arr_mapa[fila][index] = arr_mapa_div[j];
              j++;
              index++;
            }
            fila++;
          }
          resize();
        }
    // Ver caja por caja si esta pintada o no, si no ejecutar mirarAlrededor()
    function checkCajas() {
      if(mapaPisadas[3][2+1]!= true)mirarAlrededor(3,2);
      if(mapaPisadas[3][6+1]!= true)mirarAlrededor(3,6);
      if(mapaPisadas[3][10+1]!=true)mirarAlrededor(3,10);
      if(mapaPisadas[3][14+1]!=true)mirarAlrededor(3,14)
      if(mapaPisadas[3][18+1]!=true)mirarAlrededor(3,18);
      if(mapaPisadas[6][2+1]!=true)mirarAlrededor(6,2);
      if(mapaPisadas[6][6+1]!=true)mirarAlrededor(6,6);
      if(mapaPisadas[6][10+1]!=true)mirarAlrededor(6,10);
      if(mapaPisadas[6][14+1]!=true)mirarAlrededor(6,14);
      if(mapaPisadas[6][18+1]!=true)mirarAlrededor(6,18);
      if(mapaPisadas[9][2+1]!=true)mirarAlrededor(9,2);
      if(mapaPisadas[9][6+1]!=true)mirarAlrededor(9,6);
      if(mapaPisadas[9][10+1]!=true)mirarAlrededor(9,10);
      if(mapaPisadas[9][14+1]!=true)mirarAlrededor(9,14);
      if(mapaPisadas[9][18+1]!=true)mirarAlrededor(9,18);
      if(mapaPisadas[12][2+1]!=true)mirarAlrededor(12,2);
      if(mapaPisadas[12][6+1]!=true)mirarAlrededor(12,6);
      if(mapaPisadas[12][10+1]!=true)mirarAlrededor(12,10);
      if(mapaPisadas[12][14+1]!=true)mirarAlrededor(12,14);
      if(mapaPisadas[12][18+1]!=true)mirarAlrededor(12,18);
    }
    // Checkea uno por uno los cuadros adyacentes para ver si estan todos "pisados"
    function mirarAlrededor(y,x) {
      if (
           mapaPisadas[y  ][x+3] == 3
        && mapaPisadas[y+1][x+3] == 3
        && mapaPisadas[y+2][x+3] == 3
        && mapaPisadas[y+2][x+2] == 3
        && mapaPisadas[y+2][x+1] == 3
        && mapaPisadas[y+2][x-1] == 3
        && mapaPisadas[y+1][x-1] == 3
        && mapaPisadas[y  ][x-1] == 3

        && mapaPisadas[y-1][x-1] == 3
        && mapaPisadas[y-1][x  ] == 3
        && mapaPisadas[y-1][x+1] == 3
        && mapaPisadas[y-1][x+2] == 3
        && mapaPisadas[y-1][x+3] == 3
      ){
        revelarCaja(y,x);
        mapaPisadas[y][x+1] = true;
      }
    }

    function abrirPuerta() {
      arr_mapa[yInicial][xInicial].classList.remove("cerrarPuerta");
      arr_mapa[yInicial][xInicial].classList.add("abrirPuerta");
      setTimeout(function(){
        arr_mapa[yInicial][xInicial].classList.add("puertaAbierta");
        arr_mapa[yInicial][xInicial].classList.remove("abrirPuerta");
      }, 1000);
      mapa[yInicial][xInicial] = 11;
      puedeSalir = true;
    }
    function revelarCaja(y,x) {
      mapaPisadas[y][x+1] = arr_items[premioActual];
      switch (arr_items[premioActual]) {
        case 9: arr_mapa[y][x+1].classList.add('nothing');
        break;
        case 6: arr_mapa[y][x+1].classList.add('llave');
        hayLlave = true;
        if (hayLibro) abrirPuerta()
        break;
        case 7: arr_mapa[y][x+1].classList.add('book');
        hayLibro = true;
        if (hayLlave) abrirPuerta()
        break;
        case 8: arr_mapa[y][x+1].classList.add('knife');
        hayCuchi = true;
        break;
        case 5:
            arr_mapa[y+1][x+2].classList.add("spawn");
            arr_mapa[y+1][x+2].classList.remove("pared");
            setTimeout(function(){
              mapa[y+2][x+3] = 5;
              enemigos[cantEnemigos] = {x:x+3,y:y+2,vivo:true};
              cantEnemigos++;
            }, 1000);

        break;
        default:
        break;
      }
      premioActual++;
    }

  // Inputs desde teclado
  document.onkeydown = function(e) {
    // s
    if (e.which == 83){
      mover("abajo");
    }
    // a
    else if (e.which == 65) {
      mover("izq");
    }
    // d
    else if (e.which == 68) {
      mover("der");
    }
    // w
    else if (e.which == 87) {
      mover("arriba");
    }

  }

  // Setteo las propiedades de las clases segun el tamaño de la ventana en el tag style del dom
  function resize() {
    style = document.getElementsByTagName('style')[0];
    style.innerHTML = "";
    // Map size
    style.innerHTML +=
    "#mapa{ grid-template-rows: repeat("+_FILAS+","+(window.innerHeight/_FILAS)+"px); \n"+
           "grid-template-columns: repeat("+_COL+","+(window.innerWidth/_COL)+"px)"+"}\n";
    // Character size
    style.innerHTML +=
    ".personaje, .enemy{--height-character: "+(window.innerHeight/_FILAS)*2.2+"px;\n"+
               "--margin-character: "+(-window.innerHeight/_FILAS)+"px 0px 0px 0px }\n";
    // Pisadas size
    style.innerHTML +=
    ".pisado{--height-pisado:"+(window.innerHeight/_FILAS)*2+"px;\n"+
            "--margin-pisado:"+(-(window.innerHeight/_FILAS)/1.5)+"px 0px 0px 0px;\n}\n";
    // Llaves size
    style.innerHTML +=
    ".llave, .book, .knife, .nothing{ --height-item:"+((window.innerHeight/_FILAS)*2)+"px;\n"+
            "--margin-item: "+((window.innerHeight/_FILAS)/1.5)+"px 0px 0px 0px;}\n";
    // Llaves size
    style.innerHTML +=
    ".cerrarPuerta, .abrirPuerta, .spawn, .puertaAbierta{ --height: "+(window.innerHeight/_FILAS)+"px;}\n";
    //puerta abierta
    style.innerHTML +=
    ".puertaAbierta{background-image: linear-gradient(to top, grey, black);}";
  }
  // re-size en real time
  window.addEventListener('resize', function(){
    resize();
  });

  // funcion para shuflear un array
  function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
  }
}
