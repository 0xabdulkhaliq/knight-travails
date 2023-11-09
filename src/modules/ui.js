import { createKnight, isKnightActive } from "./button"

async function instantiateNotifier() {
  const notifier = document.createElement("div")
  notifier.innerHTML = `
       <div class="main__notifier">
          <div class="notifier__decor" aria-hidden="true">i</div>
          <h2 class="notifier__text">You want to Place Knight and then Select End to Travail</h2>
        </div>
  `
  notifier.classList.add("main__notifier--wrap")
  document.querySelector("main").append(notifier)

  await new Promise((resolve) => setTimeout(resolve, 50))
  notifier.classList.toggle("main__notifier--active")

  await new Promise((resolve) => setTimeout(resolve, 4000))
  notifier.classList.toggle("main__notifier--active")

  await new Promise((resolve) => setTimeout(resolve, 600))
  notifier.remove()
}

async function animateTravails(moves) {
  const width = document.querySelector(".white").offsetWidth
  const knight = isKnightActive()

  let previousXCoord = 0
  let translateXCoords = 0
  let translateYCoords = 0

  for (let i = 1; i < moves.length; i++) {
    const [previousY, previousX] = moves[i - 1].split(",").map(Number)
    const [currentY, currentX] = moves[i].split(",").map(Number)

    const translateX = (currentX - previousX) * width
    const translateY = (currentY - previousY) * width
    translateXCoords += translateX
    translateYCoords += translateY

    await new Promise((resolve) => setTimeout(resolve, 1000))
    knight.style.transform = `translate(${previousXCoord}px, ${translateYCoords}px)`
    await new Promise((resolve) => setTimeout(resolve, 1000))
    knight.style.transform = `translate(${translateXCoords}px, ${translateYCoords}px)`
    previousXCoord = translateXCoords
  }

  setTimeout(() => {
    const endPoint = document.querySelector(`[data-coords="${moves[moves.length - 1]}"]`)
    endPoint.append(createKnight())
    knight.remove()
  }, 750)
}

function createBoard() {
  const chessBoard = document.querySelector(".main__chessboard")

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const square = document.createElement("div")

      if (y % 2 === 0) x % 2 === 0 ? square.classList.add("white") : square.classList.add("black")
      else x % 2 === 0 ? square.classList.add("black") : square.classList.add("white")

      square.dataset.coords = `${y},${x}`
      chessBoard.append(square)
    }
  }
}

export { createBoard, animateTravails, instantiateNotifier }
