const board = document.getElementById("board");
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
  const box = document.createElement("div");
  box.className = "box";
  box.style.top = `${Math.round(
    e.clientY - board.getBoundingClientRect().y
  )}px`;
  box.style.left = `${Math.round(
    e.clientX - board.getBoundingClientRect().x
  )}px`;
  board.appendChild(box);
}
