window.onload = function() {

const _COL = 23;
const _FILAS =  16;
var mapa_div = document.getElementById('mapa');
var arr_mapa_div;

//genero un array bi-dimensional para guardar todos los divs mas adelante
var arr_mapa = new Array(_FILAS);
for (var i = 0; i < arr_mapa.length; i++) {
  arr_mapa[i] = new Array(_COL);
}

// Mapa inicial
  var mapa = [
              [0,'S',0,0,0, 0,0,0,0,0, 0,0,0,0,'V', 0,0,0,0,0, 0,0,0],
              [0,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 0,0,0,0,0, 0,0,0],
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
          mapa[personajeY][personajeX]   = 3;
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
          mapa[personajeY][personajeX]   = 3;
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
          mapa[personajeY][personajeX]   = 3;
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
          mapa[personajeY][personajeX]   = 3;
          mapa[personajeY][personajeX-1] = 1;
          arr_mapa[personajeY][personajeX].classList.remove('personaje');
          arr_mapa[personajeY][personajeX].classList.add('pisado');
          arr_mapa[personajeY][personajeX-1].classList.add('personaje');
          arr_mapa[personajeY][personajeX-1].classList.remove('pisado');
          personajeX--;
        }
      }
      resize();
      resizeElements();
      checkCajas();
    }
    function checkCajas() {
      mirarAlrededor(2,3); // y,x de cada caja
      mirarAlrededor(y,x);
    }
    function mirarAlrededor(y,x) {
      if ( y+1 == 3
        && y-2 == 3){

      }
    }
    // function checkArround() {
    //   //arriba
    //   if (mapa[personajeY-1][personajeX] = 4) {
    //     mirarBordes(params = {X:personajeY-1,Y:personajeX});
    //   }
    // }
    // function mirarBordes(params) {
    //   var x = params[0];
    //   var y = params[1];
    //   if (params[2]!= "undefined") {
    //     var visitado = params[2];
    //     console.log(params);
    //   }
    //   else {
    //     mirarBordes({x:personajeY-1,y:personajeX-1,array:[x,y]});
    //   }
    // }

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
  // Set the size of elements to fit
  function resize() {
    // Map size

    document.getElementById('mapa').style.gridTemplateRows = "repeat("+_FILAS+","+(window.innerHeight/_FILAS)+"px)";
    document.getElementById('mapa').style.gridTemplateColumns = "repeat("+_COL+","+(window.innerWidth/_COL)+"px)";
    // Character size
    document.getElementsByClassName('personaje')[0].style.setProperty('--height-character',((window.innerHeight/_FILAS)*2.2+'px'));
    // Character margin
    document.getElementsByClassName('personaje')[0].style.setProperty('--margin-character',(-window.innerHeight/_FILAS+'px'+" 0px 0px 0px"));
    // Llave size
    // document.getElementsByClassName('llave')[0].style.setProperty('--margin-llave',("0px 0px 0px "+(-(window.innerWidth/_COL))+"px"));
    document.getElementsByClassName('llave')[0].style.setProperty('--height-llave',(((window.innerHeight/_FILAS)*2)+'px'));
  }
  // Resize de las pisadas
  function resizeElements() {
    aux_array = document.getElementsByClassName('pisado');
    for (var i = 0; i < aux_array.length; i++) {
      // Pisada size
      aux_array[i].style.setProperty('--height-pisado',((window.innerHeight/_FILAS)*2+'px'));
      // Pisada margin
      aux_array[i].style.setProperty('--margin-pisado',(-(window.innerHeight/_FILAS)+'px'+" 0px 0px 0px"));
    }
  }













}
