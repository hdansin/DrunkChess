// Start new game
const chess = new Chess();

function drawBoard () {
// Draw the board
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
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="Q0" class="piece" src="../assets/images/pieces/wq.svg"/>');
    }
    // place black queen
    else if (sq == 'd8') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="q0" class="piece" src="../assets/images/pieces/bq.svg"/>');
    }
    // place white king
     else if (sq == 'e1') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="K0" class="piece" src="../assets/images/pieces/wk.svg"/>');
    }
    // place black king
     else if (sq == 'e8') {
      squareNodes[i].insertAdjacentHTML('afterbegin', '<img id="k0" class="piece" src="../assets/images/pieces/bk.svg"/>');
    }
  }
}

// drag and drop handlers
function dragstart_handler (event) {
  let parentNode = event.target.parentNode;
  let data = event.target.id + parentNode.id;
  event.dataTransfer.setData('text/plain', data);
}

function dragover_handler(event) {
  let data = event.dataTransfer.types;
  // Only allow drag if it is an image
  if (data.includes("text/uri-list")) {
    event.preventDefault();
  }
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
  let move = {from: '', to: '', promotion: 'q'};
  move.from = squareFrom;
  move.to = dropSquare.id;
  let moveObj = chess.move(move);
  console.log(moveObj.flags);
  // Check if legal move
  if (moveObj) {
    if (moveObj.flags == 'n' || moveObj.flags == 'b') {
      dropSquare.appendChild(piece);
    }
    // clear nodes and insert new piece
    else if (moveObj.flags == 'c') {
      let oldChild = dropSquare.firstChild;
      dropSquare.replaceChild(piece, oldChild);
    } else {
      // handle castling
      if (moveObj.flags == 'k') {
        // kimgside castle
        if (moveObj.color == 'w') {
          // Move King
          dropSquare.appendChild(piece);
          // Move rook
          let R2 = document.getElementById("R2");
          let f1 = document.getElementById("f1");
          let h1 = document.getElementById("h1");
          h1.replaceChildren();
          f1.appendChild(R2);
        } else {
          // Move King
          dropSquare.appendChild(piece);
          // Move rook
          let r2 = document.getElementById("r2");
          let f8 = document.getElementById("f8");
          let h8 = document.getElementById("h8");
          h8.replaceChildren();
          f8.appendChild(r2);

        }
      } else if (moveObj.flags == 'q') {
        // queenside castle
        if (moveObj.color == 'w') {
          // Move King
          dropSquare.appendChild(piece);
          // Move rook
          let R1 = document.getElementById("R1");
          let d1 = document.getElementById("d1");
          let a1 = document.getElementById("a1");
          a1.replaceChildren();
          d1.appendChild(R1);
        } else {
          // Move King
          dropSquare.appendChild(piece);
          // Move rook
          let r1 = document.getElementById("r1");
          let d8 = document.getElementById("d8");
          let a8 = document.getElementById("a8");
          a8.replaceChildren();
          d8.appendChild(r1);

        }
        // handle en passant
      } else if (moveObj.flags == 'e') {
        dropSquare.appendChild(piece);
        if (moveObj.color == 'w') {
          //white
          let sq = document.getElementById(dropSquare.id[0] + (Number(dropSquare.id[1]) - 1));
          sq.replaceChildren();
        } else {
          // black
          let sq = document.getElementById(dropSquare.id[0] + (Number(dropSquare.id[1]) + 1));
          sq.replaceChildren();
        }
        // handle promotion
      } else if (moveObj.flags[1] == 'p') {
        console.log("promotion");
        let queen = '';
        let fromNode = document.getElementById(squareFrom);
        let numQueens = 1;
        let boardFen = chess.fen();
        // white 
        if (moveObj.color == 'w') {
          for (let i = 0; i < boardFen.length; i++) {
            if (boardFen[i] == 'w') {
              i = boardFen.length;
            } else if (boardFen[i] == 'Q') {
              numQueens++;
            }
          }
          queen = '<img id="Q' + numQueens + '" class="piece" src="../assets/images/pieces/wq.svg"/>';
          fromNode.replaceChildren();
          dropSquare.replaceChildren();
          dropSquare.insertAdjacentHTML('afterbegin', queen);
        } else {
          // black
          for (let i = 0; i < boardFen.length; i++) {
            if (boardFen[i] == 'b') {
              i = boardFen.length;
            } else if (boardFen[i] == 'q') {
              numQueens++;
            }
          }
          queen = '<img id="q' + numQueens + '" class="piece" src="../assets/images/pieces/bq.svg"/>';
          fromNode.replaceChildren();
          dropSquare.replaceChildren();
          dropSquare.insertAdjacentHTML('afterbegin', queen);
        }
      } 
    }
    console.log(chess.ascii());
    console.log(chess.fen());
   }
}

// Draw the board and set up the pieces
drawBoard();
placePieces();
