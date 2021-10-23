const board = document.getElementById("board");

board.addEventListener("click", (e) => {
  const box = document.createElement("div");
  box.className = "box";
  box.style.top = `${Math.round(
    e.clientY - board.getBoundingClientRect().y
  )}px`;
  box.style.left = `${Math.round(
    e.clientX - board.getBoundingClientRect().x
  )}px`;
  console.log(box.style.top);
  console.log(box.style.left);
  board.appendChild(box);
});
