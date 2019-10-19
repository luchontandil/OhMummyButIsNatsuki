window.onload = function() {

const _COL = 23;
const _FILAS =  16;
let mapa_div = document.getElementById('mapa');
let arr_mapa_div;

//genero un array bi-dimensional para guardar todos los divs mas adelante
var arr_mapa = new Array(_FILAS);
for (var i = 0; i < arr_mapa.length; i++) {
  arr_mapa[i] = new Array(_COL);
}
let hayLlave = false;
// 0 = pared
// 1 = personaje
// 2 = camino
// 3 = camino pisado
// 4 = pared con tesoro
// 6 = llave
// 7 = urna
// 8 = pergamino / espada
// 9 = vacio /
// S = Score
// V = Vidas
let arr_items = [6,7,8,9,9 ,9,9,9,9,9
                ,9,9,9,9,9 ,9,9,9,9,9];
shuffle(arr_items);
let premioActual = 0;
console.log(arr_items);
// Mapa inicial
  var mapa = [
              [0,'S',0,0,0, 0,0,0,0,0, 0,0,0,0,'V', 0,0,0,0,0, 0,0,0],
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
  // mapa [1][9];
  // Posicion inicial
  let personajeX = 9;
  let personajeY = 1;




  mostrarMapa();


  // Dibujar mapa
  function  mostrarMapa(){
    //Borro el contenido del div padre
    mapa_div.innerHTML = "";
    //Genero el mapa a partir de "mapa"
      mapa.forEach(function(element){
        for (var i = 0; i < element.length; i++) {
          var node = document.createElement("div");
          if (element[i] == 0 || element[i] == 4) {node.classList.add("pared");}
          else if(element[i] == 2){node.classList.add("camino");}
          else if(element[i] == 1){node.classList.add("personaje");}
          else if(element[i] == 3){node.classList.add("pisado");}
          else if(element[i] == 'S'){node.classList.add("score");}
          else if(element[i] == 'V'){node.classList.add("vidas");}
          else if(element[i] == 6){node.classList.add("llave");}
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
    };

    // Movimiento
    // Se modifica el array interno y el DOM
    function mover(dirreccion) {
      if(dirreccion=="arriba"){
        if(mapa[personajeY-1][personajeX] != 0 && mapa[personajeY-1][personajeX] != 4 && mapa[personajeY-1][personajeX] != 6){
          mapaPisadas[personajeY-1][personajeX]   = 3;
          mapa[personajeY-1][personajeX] = 1;
          arr_mapa[personajeY][personajeX].classList.remove('personaje');
          arr_mapa[personajeY][personajeX].classList.add('pisado');
          arr_mapa[personajeY-1][personajeX].classList.add('personaje');
          arr_mapa[personajeY-1][personajeX].classList.remove('pisado');
          personajeY--;
        }
      }
      else if(dirreccion=="abajo"){
        if(mapa[personajeY+1][personajeX] != 0 && mapa[personajeY+1][personajeX] != 4 && mapa[personajeY+1][personajeX] != 6){
          mapaPisadas[personajeY+1][personajeX]   = 3;
          mapa[personajeY+1][personajeX] = 1;
          arr_mapa[personajeY][personajeX].classList.remove('personaje');
          arr_mapa[personajeY][personajeX].classList.add('pisado');
          arr_mapa[personajeY+1][personajeX].classList.add('personaje');
          arr_mapa[personajeY+1][personajeX].classList.remove('pisado');
          personajeY++;
        }
      }
      else if(dirreccion=="der"){
        if(mapa[personajeY][personajeX+1] != 0 && mapa[personajeY][personajeX+1] != 4 && mapa[personajeY][personajeX+1] != 6){
          mapaPisadas[personajeY][personajeX+1]   = 3;
          mapa[personajeY][personajeX+1] = 1;
          arr_mapa[personajeY][personajeX].classList.remove('personaje');
          arr_mapa[personajeY][personajeX].classList.add('pisado');
          arr_mapa[personajeY][personajeX+1].classList.add('personaje');
          arr_mapa[personajeY][personajeX+1].classList.remove('pisado');
          personajeX++;
        }
      }
      else if(dirreccion=="izq"){
        if(mapa[personajeY][personajeX-1] != 0 && mapa[personajeY][personajeX-1] != 4 && mapa[personajeY][personajeX-1] != 6){
          mapaPisadas[personajeY][personajeX-1]   = 3;
          mapa[personajeY][personajeX-1] = 1;
          arr_mapa[personajeY][personajeX].classList.remove('personaje');
          arr_mapa[personajeY][personajeX].classList.add('pisado');
          arr_mapa[personajeY][personajeX-1].classList.add('personaje');
          arr_mapa[personajeY][personajeX-1].classList.remove('pisado');
          personajeX--;
        }
      }
      checkCajas();
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
    function revelarCaja(y,x) {
      mapaPisadas[y][x+1] = arr_items[premioActual];

      switch (arr_items[premioActual]) {
        case 6:
        arr_mapa[y][x+1].classList.add('llave');
        hayLlave = true;
        console.log("llave revelada");
        break;
        case 7: arr_mapa[y][x+1].classList.add('camino');
        break;
        case 8: arr_mapa[y][x+1].classList.add('camino');
        break;
        case 9: arr_mapa[y][x+1].classList.add('camino');
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
    ".personaje{--height-character: "+(window.innerHeight/_FILAS)*2.2+"px;\n"+
               "--margin-character: "+(-window.innerHeight/_FILAS)+"px 0px 0px 0px }\n";
    // Pisadas size
    style.innerHTML +=
    ".pisado{--height-pisado:"+(window.innerHeight/_FILAS)*2+"px;\n"+
            "--margin-pisado:"+(-(window.innerHeight/_FILAS)/1.5)+"px 0px 0px 0px;\n}\n";
    // Llaves size
    style.innerHTML +=
    ".llave{ --height-llave:"+((window.innerHeight/_FILAS)*2)+"px;\n"
    "\n}";
  }
  // re-size en real time
  window.addEventListener('resize', function(){
    resize();
  });
// Array para llevar que casillas se pisaron
  var mapaPisadas = [
              [0,'S',0,0,0, 0,0,0,0,0, 0,0,0,0,'V', 0,0,0,0,0, 0,0,0],
              [0,0,0,0,0, 0,0,0,0,3, 0,0,0,0,0, 0,0,0,0,0, 0,0,0],
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
  // funcion para shuflear un array totalmente robada de por ahi
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
  }
}
