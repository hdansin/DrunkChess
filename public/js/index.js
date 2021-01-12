function drawBoard () {
  console.log('Darwing Board');
  const lightSquare = '<div class="lightSquare"';
  const darkSquare = '<div class="darkSquare"';
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

drawBoard();
