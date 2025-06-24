const cells = ["", "", "", "", "", "", "", "", ""];
const cells_num = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winning_cells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function aiCellPick() {
  let random_item = getWinNumber("O");
  console.log("Random Item", random_item);
  if (random_item === undefined) {
    random_item = getWinNumber("X");
  }
  if (random_item === undefined) {
    random_item = cells_num[Math.floor(Math.random() * cells_num.length)];
  }
  return random_item;
}

function getWinNumber(sign) {
  let temp_cells = cells;

  for (let index = 0; index < temp_cells.length; index++) {
    if (temp_cells[index] === "") {
      temp_cells[index] = sign;
      if (checkWin(temp_cells)) {
        return index;
      }
      temp_cells[index] = "";
    }
    temp_cells = cells;
  }
}
function checkWin(new_cells) {
  for (let i = 0; i < winning_cells.length; i++) {
    const [a, b, c] = winning_cells[i];
    if (
      new_cells[a] &&
      new_cells[a] === new_cells[b] &&
      new_cells[a] === new_cells[c]
    ) {
      return true;
    }
  }
  return false;
}
function getWinnner() {
  for (let i = 0; i < winning_cells.length; i++) {
    const [a, b, c] = winning_cells[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      document.getElementById(
        "result"
      ).textContent = `Player ${cells[a]} wins!`;
      return;
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("tictactoe-game");
  // create board
  for (let index = 0; index < 9; index++) {
    const cell = document.createElement("div");
    cell.id = "cell_" + index;
    cell.textContent = "";
    // design the cell
    cell.className = `
      w-[60px] h-[60px] 
      border border-gray-500 
      flex items-center justify-center 
      text-2xl font-bold 
      cursor-pointer 
      hover:bg-gray-200
      transition 
      rounded
    `;
    // add click event
    cell.addEventListener("click", () => {
      // PLAYER PICK
      cell.textContent = "X";
      cell.style.color = "red";
      cell.style.pointerEvents = "none"; // disable further clicks
      cells[index] = "X";
      cells_num.splice(cells_num.indexOf(index), 1);
      // AI PICK
      ai_num = aiCellPick();
      const ai_cell = document.getElementById("cell_" + ai_num);
      ai_cell.textContent = "O";
      ai_cell.style.color = "blue";
      ai_cell.style.pointerEvents = "none"; // disable further clicks
      cells_num.splice(cells_num.indexOf(ai_num), 1);
      cells[ai_num] = "O";
      // CHECK WIN
      getWinnner();
      console.log(cells);
    });
    board.appendChild(cell);
  }
});
//   // Create 9 cells
//   for (let i = 0; i < 9; i++) {
//     const cell = document.createElement("div");
//     cell.classList.add("cell");
//     cell.dataset.index = i;

//     // Click handler
//     cell.addEventListener("click", handleMove, { once: true });

//     board.appendChild(cell);
//   }

// let currentPlayer = "X";

// function handleMove(event) {
//   const cell = event.target;
//   cell.textContent = currentPlayer;
//   currentPlayer = currentPlayer === "X" ? "O" : "X";
// }
