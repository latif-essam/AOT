// setting up the grid with jquery,
// and adding some classes and meta data to define the location of each element in the grid
const player1 = document.getElementById("health1");
const player2 = document.getElementById("health2");
let c = 1;

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    $(".game-container").append(
      `<div class="grid-item" data-x=${i} data-n=${c} data-y=${j} ></div>`
    );
    c++;
  }
}

// set the walls = walls are unavailable postion player can't go on it
// reusable fn for generating numbers between two numbers
const randomNumbers = (from, to) => Math.floor(Math.random() * to) + from;
const wall = randomNumbers(0, 10);
// getting all the board cells
const boardCells = $(".grid-item").toArray();

let cells = [];
for (let i = 0; i < boardCells.length; i++) {
  let object = {
    x: boardCells[i].dataset.x,
    y: boardCells[i].dataset.y,
  };
  cells[i] = object;
}

// getting the array of weapones
const weapones = [
  {
    name: "weapon1",
    power: 20,
  },
  {
    name: "weapon2",
    power: 50,
  },
  {
    name: "weapon3",
    power: 70,
  },
  {
    name: "weapon4",
    power: 35,
  },
];
// setting players
const players = [
  {
    name: "player_one",
    title: "Player 1",
    health: 100,
    power: 10,
    img: "",
    turn: true,
  },
  {
    name: "player_two",
    title: "Player 2",
    health: 100,
    power: 10,
    img: "",
    turn: false,
  },
];

const createWalls = () => {
  // creating number of walls
  for (let i = 0; i < 4; i++) {
    // getting random cell selections by (x,y)

    let randomX = randomNumbers(1, 8);
    let randomY = randomNumbers(1, 8);
    for (let j = 0; j < boardCells.length; j++) {
      if (
        boardCells[j].classList.value == "grid-item empty" &&
        boardCells[j].dataset.x == randomX &&
        boardCells[j].dataset.y == randomY
      ) {
        boardCells[j].classList.remove("empty");
        boardCells[j].classList.add("unavailable");
      } else {
        boardCells[j].classList.add("empty");
      }
    }
  }
};

// create weapones
const createWeapones = () => {
  // creating number of weapones, note we need to change 4 with weapones.length if we want to add more weapones
  for (let i = 0; i < 4; i++) {
    // getting random cell selections by (x,y)
    let randomX = randomNumbers(1, 8);
    let randomY = randomNumbers(1, 8);
    for (let j = 0; j < boardCells.length; j++) {
      if (
        boardCells[j].classList.value == "grid-item empty" &&
        boardCells[j].dataset.x == randomX &&
        boardCells[j].dataset.y == randomY
      ) {
        boardCells[j].classList.remove("empty");
        boardCells[j].classList.add(weapones[i].name);
      }
    }
  }
};

// create Players
const createPlayers = () => {
  // getting random cell selections by (x,y)
  // player 1
  let randomXPlayer1 = randomNumbers(0, 9);
  let randomYPlayer1 = randomNumbers(0, 1);

  // player 2
  let randomXPlayer2 = randomNumbers(1, 9);
  let randomYPlayer2 = randomNumbers(9, 0);

  for (let j = 0; j < boardCells.length; j++) {
    if (
      boardCells[j].classList.value == "grid-item empty" &&
      boardCells[j].dataset.x == randomXPlayer1 &&
      boardCells[j].dataset.y == randomYPlayer1
    ) {
      boardCells[j].classList.remove("empty");
      boardCells[j].classList.add(players[0].name);
      boardCells[j].setAttribute("id", players[0].name);
    }
    if (
      boardCells[j].classList.value == "grid-item empty" &&
      boardCells[j].dataset.x == randomXPlayer2 &&
      boardCells[j].dataset.y == randomYPlayer2
    ) {
      boardCells[j].classList.remove("empty");
      boardCells[j].classList.add(players[1].name);
      boardCells[j].setAttribute("id", players[1].name);
    }
  }
};

// get the player corrent position
let playerLocation = [];
const playersLocation = () => {
  for (let j = 0; j < boardCells.length; j++) {
    if (
      boardCells[j].classList.value == "grid-item player_one" ||
      boardCells[j].classList.value == "grid-item player_two"
    ) {
      playerLocation.push(boardCells[j].dataset.x);
      playerLocation.push(boardCells[j].dataset.y);
    }
  }
};
console.log(playerLocation);
// move player
const walk = () => {
  for (let j = 0; j < boardCells.length; j++) {
    if (boardCells[j].classList.value == "grid-item player_one") {
      console.log(boardCells[j].classList.value);
      if (players[0].turn) {
        for (let x = 0; x < boardCells.length; x++) {
          // @ts-ignore
          if (boardCells[x].classList == "grid-item empty") {
            boardCells[j].classList.add("vet");
          }
        }
      }
    }
    if (boardCells[j].classList.value == "grid-item player_two") {
      for (let x = 0; x < 3; x++) {
        // @ts-ignore
        if (boardCells[j + x].classList == "grid-item empty") {
          boardCells[j + x].classList.add("vet");
        }
      }
    }
  }
};
// set an event listener
const player_one = document.querySelector("#player_one");
const player_two = document.querySelector("#player_two");
let power1 = document.querySelector("#power1");
let power2 = document.querySelector("#power2");

const setPlayerValues = () => {
  player1.innerHTML = players[0].health.toString();
  player2.innerHTML = players[1].health.toString();
  power1.innerHTML = players[0].power.toString();
  power2.innerHTML = players[1].power.toString();
};

// Turn fn to determine player turn.
const setTurn = () => {
  let turn;
  if (players[0].turn) {
    turn = 1;
    players[0].turn = false;
    players[1].turn = true;
  } else {
    turn = 2;
    players[1].turn = false;
    players[0].turn = true;
  }
  return turn;
};

const availableMoves = (turn) => {
  if (turn === 1) {
    player_one.addEventListener("click", () => {
      for (let i = 0; i < boardCells.length; i++) {
        if (boardCells[i].dataset.n == "empty") {
          // boardCells[cells[]].classList.add("vine");
          console.log("dodo");
        }
      }
      for (let i = 0; i < 3; i++) {}
    });
  }
};

// let currentTurn = setTurn();
// if ((currentTurn = 1)) {
//   player_one.addEventListener("click", setPostion);
// } else {
//   player_two.addEventListener("click", setPostion);
// }

createWalls();
createWeapones();
createPlayers();
walk();
playersLocation();
setPlayerValues();

player_one.addEventListener("click", () => console.log("lol"));
