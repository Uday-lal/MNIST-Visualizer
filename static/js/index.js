const board = document.getElementById("board");
const clear = document.getElementById("clear");
const guess = document.getElementById("guess");
const closeButton = document.getElementById("close");
var cursorPos = [];
var mouseDown = false;

board.addEventListener("mousedown", () => {
  mouseDown = true;
});

board.addEventListener("mouseup", () => {
  mouseDown = false;
});

board.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    draw(e);
  }
});

closeButton.addEventListener("click", () => {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
});

function draw(e) {
  if (
    e.clientX >= board.getBoundingClientRect().x &&
    e.clientX <=
      board.getBoundingClientRect().x + board.getBoundingClientRect().width
  ) {
    if (
      e.clientY >= board.getBoundingClientRect().y &&
      e.clientY <=
        board.getBoundingClientRect().y + board.getBoundingClientRect().height
    ) {
      const box = document.createElement("div");
      const posx = Math.round(e.clientX - board.getBoundingClientRect().x - 10);
      const posy = Math.round(e.clientY - board.getBoundingClientRect().y - 10);
      box.className = "box";
      box.style.top = `${posy}px`;
      box.style.left = `${posx}px`;
      board.appendChild(box);
      cursorPos.push([posx, posy]);
    } else {
      mouseDown = false;
    }
  } else {
    mouseDown = false;
  }
}

function openPopup(predictNumber) {
  const popup = document.getElementById("popup");
  const numberSection = document.getElementById("predict");
  const note = document.getElementById("note");
  popup.style.display = "flex";
  if (predictNumber) {
    note.style.display = "block";
    numberSection.style.color = "black";
    numberSection.innerHTML = `The model predict's this number is ${predictNumber}`;
  } else {
    const note = document.getElementById("note");
    note.style.display = "none";
    numberSection.style.color = "red";
    numberSection.innerHTML = ":( Something went wrong!!";
  }
}

clear.addEventListener("click", () => {
  board.innerHTML = null;
  cursorPos = [];
});

guess.addEventListener("click", () => {
  if (cursorPos.length !== 0) {
    fetch("https://my-mnist.herokuapp.com/api/pridict-number", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        corrdinate_offet: cursorPos,
        board_width: board.getBoundingClientRect().width,
        board_height: board.getBoundingClientRect().height,
      }),
    }).then((responce) => {
      if (responce.ok) {
        cursorPos = [];
        board.innerHTML = null;
        responce.json().then((result) => {
          openPopup(result.prediction);
        });
      }
    });
  }
});
