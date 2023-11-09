import { graph } from "./board"
import { animateTravails, instantiateNotifier } from "./ui"

function generateImage(name) {
  const image = document.createElement("img")
  image.src = `./images/${name}.png`
  image.classList.add(name)
  return image
}

function createKnight() {
  return generateImage("knight")
}

function createLocator() {
  return generateImage("end")
}

function isKnightActive() {
  return document.querySelector(".knight")
}

function hasEndFixed() {
  return document.querySelector(".end")
}

function instantiateActions() {
  const buttonElements = document.querySelectorAll(".main__actions button")

  buttonElements.forEach((button) => {
    switch (button.id) {
      case "place-knight":
        buttonEvent(
          button,
          toggleClickEvent,
          (e) => {
            e.target.append(createKnight())
          },
          isKnightActive
        )
        break
      case "select-end":
        buttonEvent(
          button,
          toggleClickEvent,
          (e) => {
            e.target.append(createLocator())
          },
          () => {
            if (isKnightActive() && hasEndFixed()) return true
            if (!isKnightActive() || hasEndFixed()) {
              instantiateNotifier()
              return true
            }
          }
        )
        break
      case "random-knight":
        buttonEvent(button, placeKnightRandomly)
        break
      case "travail":
        buttonEvent(button, travail)
        break
      default:
        buttonEvent(button, clearMoves)
    }
  })
}

function toggleClickEvent(functionForExecution, evaluation) {
  const board = document.querySelector(".main__chessboard")
  if (evaluation() || board.classList.contains("active")) return

  board.classList.add("active")

  function handleClick(e) {
    functionForExecution(e)
    board.classList.remove("active")
    board.removeEventListener("click", handleClick)
  }

  board.addEventListener("click", handleClick)
}

function placeKnightRandomly() {
  if (isKnightActive()) return

  if (document.querySelector(".active")) {
    const board = document.querySelector(".main__chessboard")
    board.replaceWith(board.cloneNode(true))
  }

  const randomCoordinate = Math.floor(Math.random() * 64)

  const targetSquare = document.querySelector(
    `.main__chessboard div:nth-child(${randomCoordinate})`
  )
  targetSquare.append(createKnight())
}

async function travail() {
  if (!isKnightActive() || !hasEndFixed()) return instantiateNotifier()

  const start = document.querySelector(".knight").parentElement.dataset.coords
  const end = document.querySelector(".end").parentElement.dataset.coords

  await animateTravails(graph.knightMoves(start, end))
  hasEndFixed().remove()
}

function clearMoves() {
  ;[isKnightActive(), hasEndFixed()].forEach((el) => {
    if (el) el.remove()
  })

  const board = document.querySelector(".main__chessboard")
  if (board.classList.contains("active")) {
    board.classList.remove("active")
    board.replaceWith(board.cloneNode(true))
  }
}

function buttonEvent(button, primaryFunction, executableFunction, evaluation) {
  button.addEventListener("click", (e) => {
    primaryFunction(executableFunction, evaluation)
  })
}

export { instantiateActions, isKnightActive, createKnight }
