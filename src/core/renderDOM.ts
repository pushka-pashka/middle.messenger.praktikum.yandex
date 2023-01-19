import Block from "./Block";

export default function renderDOM(block: Block, rootQuery = "#app") {
  const root = document.querySelector(rootQuery);

  root!.innerHTML = "";
  root!.appendChild(block.getContent());
}
