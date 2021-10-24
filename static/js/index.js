const board = document.getElementById("board");
const clear = document.getElementById("clear");
const guess = document.getElementById("guess");
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

clear.addEventListener("click", () => {
  board.innerHTML = null;
  cursorPos = [];
});

guess.addEventListener("click", () => {
  if (cursorPos.length !== 0) {
    fetch("http://127.0.0.1:8000/api/pridict-number", {
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
          console.log(result);
        });
      }
    });
  }
});
