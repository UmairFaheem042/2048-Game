document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".game-board");
  const scoreDisplay = document.querySelector(".score h2");
  const resultDisplay = document.querySelector(".result h2");
  const retryBtn = document.querySelector(".retryBtn");
  const controlContainer = document.querySelector('.controls');
  const upBtn = document.querySelector('.up');
  const downBtn = document.querySelector('.down');
  const leftBtn = document.querySelector('.left');
  const rightBtn = document.querySelector('.right');

  gridDisplay.classList.remove("noFocus");

  document.querySelector(".result").style.display = "none";

  const width = 4;
  let squares = [];
  let colors = [
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#1e3a8a",
    "#172554",
    "#333333",
  ];

  // game board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement("div");
      square.classList.add("cell");
      square.innerHTML = "";
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  createBoard();

  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      updateColor();
      checkForGameOver();
    } else generate();
  }

  // Swipe Right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [+totalOne, +totalTwo, +totalThree, +totalFour];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;

        let zeros = Array(missing).fill("");
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Swipe Left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [+totalOne, +totalTwo, +totalThree, +totalFour];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;

        let zeros = Array(missing).fill("");
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Swipe Down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [+totalOne, +totalTwo, +totalThree, +totalFour];

      let filterColumn = column.filter((num) => num);
      let missing = 4 - filterColumn.length;
      let zeros = Array(missing).fill("");
      let newColumn = zeros.concat(filterColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // Swipe Up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [+totalOne, +totalTwo, +totalThree, +totalFour];

      let filterColumn = column.filter((num) => num);
      let missing = 4 - filterColumn.length;
      let zeros = Array(missing).fill("");
      let newColumn = filterColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = "";
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = "";
      }
    }
    checkForWin();
  }

  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }

  document.addEventListener("keyup", control);

  upBtn.addEventListener('click', keyUp);
  leftBtn.addEventListener('click', keyLeft);
  downBtn.addEventListener('click', keyDown);
  rightBtn.addEventListener('click', keyRight);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  // checking if 2048 is formed
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        gridDisplay.classList.add("noFocus");
        controlContainer.classList.add("noFocus");
        document.querySelector(".result").style.display = "flex";
        resultDisplay.innerHTML = "You Win!";
        document.querySelector(".result").style.backgroundColor = "#333";
        resultDisplay.style.color = "palegreen";
        document.removeEventListener("keyup", control);
      }
    }
  }

  // checking if board is full
  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) zeros++;
    }
    if (zeros === 0) {
      gridDisplay.classList.add("noFocus");
      controlContainer.classList.add("noFocus");
      document.querySelector(".result").style.display = "flex";
      resultDisplay.innerHTML = "You Lose!";
      document.querySelector(".result").style.backgroundColor = "#333";
      resultDisplay.style.color = "palevioletred";
      document.removeEventListener("keyup", control);
    }
  }

  function updateColor() {
    for (let i = 0; i < 16; i++) {
      console.log(squares[i]);
      let value = squares[i].innerHTML;
      if (value == 2) {
        squares[i].style.backgroundColor = colors[0];
      } else if (value == 4) {
        squares[i].style.backgroundColor = colors[1];
      } else if (value == 8) {
        squares[i].style.backgroundColor = colors[2];
      } else if (value == 16) {
        squares[i].style.backgroundColor = colors[3];
      } else if (value == 32) {
        squares[i].style.backgroundColor = colors[4];
      } else if (value == 64) {
        squares[i].style.backgroundColor = colors[5];
      } else if (value == 128) {
        squares[i].style.backgroundColor = colors[6];
      } else if (value == 256) {
        squares[i].style.backgroundColor = colors[7];
      } else if (value == 512) {
        squares[i].style.backgroundColor = colors[8];
      } else if (value == 1024) {
        squares[i].style.backgroundColor = colors[9];
      } else if (value == 2048) {
        squares[i].style.backgroundColor = colors[10];
      } else {
        squares[i].style.backgroundColor = "#ddd";
      }
    }
  }

  retryBtn.addEventListener("click", () => {
    document.location.reload(true);
  });
});
