// Draw the board
function drawBoard () {
  console.log('Darwing Board');

   const lightSquare = '<div ondrop="drop_handler(event)" ondragover="dragover_handler(event)" ondragstart="dragstart_handler(event)" class="lightSquare"';
  const darkSquare = '<div  ondrop="drop_handler(event)" ondragover="dragover_handler(event)" ondragstart="dragstart_handler(event)" class="darkSquare"';
  const boardWidth = 8;
  const boardRows = 'abcdefgh';
  const boardColumns = '12345678';


  const boardContainer = document.querySelector('#board-container');
  let color = 0; // white = 0, black = 1
  let html = '';
  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardWidth; j++) {
      if (color == 0) {
        html = lightSquare + 'id="' + boardRows[Math.abs(j - 7)] + boardColumns[i] + '">' ; 
        boardContainer.insertAdjacentHTML('afterbegin', html);
        color++;
      }
      else {
        html = darkSquare + 'id="' + boardRows[Math.abs(j - 7)] + boardColumns[i] + '">';
        boardContainer.insertAdjacentHTML('afterbegin', html);
        color--;
      }
      // find out if drawing the last square of the board and keep color the same
      if (j == 7) {
        if (color == 0) {
          color++;
        }
        else {
          color--;
        }
      }
    }
  }
}

// Place the pieces on the starting squares
function placePieces () {
  // Get a list of the child nodes
  const parentContainer = document.getElementById('board-container');
  let squareNodes = parentContainer.childNodes;
  // make numbers to use in Ids
  let numP = 1;
  let nump = 1;
  let numR = 1;
  let numr = 1;
  let numN = 1;
  let numn = 1;
  let numB = 1;
  let numb = 1;
  let id = '';
  for (let i = 0; i < squareNodes.length - 1; i++) {
    let sq = squareNodes[i].getAttribute('id');
    // place white pawns
    if (sq[1] == '2') {
      id = 'P' + numP
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/wp.svg"/>');
      numP++;
    }
    // place black pawns
    if (sq[1] == '7') {
      id = 'p' + nump
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/bp.svg"/>');
      nump++;

    }
    // place white rooks
    else if (sq == 'a1' || sq == 'h1') {
      id = 'R' + numR
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/wr.svg"/>');
      numR++;
    }
    // place black rooks
    else if (sq == 'a8' || sq == 'h8') {
      id = 'r' + numr
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/br.svg"/>');
      numr++;
    }
    // place white knights
    else if (sq == 'b1' || sq == 'g1') {
      id = 'N' + numN;
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/wn.svg"/>');
      numN++;
    }
    // place black knights
    else if (sq == 'b8' || sq == 'g8') {
      id = 'n' + numn
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/bn.svg"/>');
      numn++;
    }
    // place white bishops
    else if (sq == 'c1' || sq == 'f1') {
      id = 'B' + numB
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/wb.svg"/>');
      numB++;
    }
    // place black bishops
    else if (sq == 'c8' || sq == 'f8') {
      id = 'b' + numb
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="' + id +  '" class="piece" src="../assets/images/pieces/bb.svg"/>');
      numb++;
    }
    // place white queen
    else if (sq == 'd1') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="W" class="piece" src="../assets/images/pieces/wq.svg"/>');
    }
    // place black queen
    else if (sq == 'd8') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="q" class="piece" src="../assets/images/pieces/bq.svg"/>');
    }
    // place white king
     else if (sq == 'e1') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="K" class="piece" src="../assets/images/pieces/wk.svg"/>');
    }
    // place black king
     else if (sq == 'e8') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="k" class="piece" src="../assets/images/pieces/bk.svg"/>');
    }
  }
}

// drag and drop handlers
function dragstart_handler (event) {
  let parentNode = event.target.parentNode;
  let data = event.target.id + parentNode.id;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData('text/plain', data);
}

function dragover_handler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function drop_handler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  // Get Id of square and add moved element to it
  data = event.dataTransfer.getData('text/plain');
  let squareFrom = data.slice(2);
  // Make sure the drop square is not a piece
  let dropSquare = event.target.className == "piece" ? event.target.parentNode : event.target;
  let piece = document.getElementById(data.slice(0,2));

  // Check if legal move
  // clear nodes and insert new piece
  console.log(dropSquare.hasChildNodes());
  if (dropSquare.hasChildNodes()) {
    let oldChild = dropSquare.firstChild;
    console.log("replacing:" + oldChild);
    dropSquare.replaceChild(piece, oldChild);
  } else {
    dropSquare.appendChild(piece);
  }
  // remove piece
  
}




// Draw the board and set up the pieces
drawBoard();
placePieces();
