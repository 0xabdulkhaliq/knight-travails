import { createKnight, isKnightActive } from "./button"

function instantiateNotifier() {
  const notifier = document.querySelector(".main__notifier--wrap")
  notifier.classList.toggle("main__notifier--active")

  setTimeout(() => {
    notifier.classList.toggle("main__notifier--active")
  }, 4000)
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
