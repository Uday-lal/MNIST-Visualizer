const board = document.getElementById("board");
const clear = document.getElementById("clear");
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
      box.className = "box";
      box.style.top = `${Math.round(
        e.clientY - board.getBoundingClientRect().y - 10
      )}px`;
      box.style.left = `${Math.round(
        e.clientX - board.getBoundingClientRect().x - 10
      )}px`;
      board.appendChild(box);
    } else {
      mouseDown = false;
    }
  } else {
    mouseDown = false;
  }
}

clear.addEventListener("click", () => {
  board.innerHTML = null;
});
