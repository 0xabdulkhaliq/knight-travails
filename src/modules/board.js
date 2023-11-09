function Graph() {
  return {
    chessBoard: new Map(),

    addVertices(size = 8) {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          this.chessBoard.set(`${[x, y]}`, [])
        }
      }
    },

    addEdges(board = this.chessBoard) {
      for (const [pos] of board) {
        const positionArray = pos.split(",")

        const x = parseInt(positionArray[0])
        const y = parseInt(positionArray[1])

        const direction = {
          1: [x + 1, y + 2],
          2: [x + 2, y + 1],
          4: [x + 2, y - 1],
          5: [x + 1, y - 2],
          7: [x - 1, y - 2],
          8: [x - 2, y - 1],
          10: [x - 2, y + 1],
          11: [x - 1, y + 2]
        }

        for (const clock in direction) {
          const move = direction[clock].toString()

          if (board.has(move) && !board.get(pos).includes(move)) {
            this.chessBoard.get(pos).push(move)
          }
        }
      }
    },

    knightMoves(start, finish, board = this.chessBoard) {
      const visited = new Set()
      const queue = []

      let bestPossiblePath

      queue.push([start, [start]])

      while (queue.length > 0 && !bestPossiblePath) {
        const [currentNode, path] = queue.shift()

        visited.add(currentNode)
        if (currentNode === finish) {
          bestPossiblePath = path
        }

        const neighbours = board.get(currentNode)
        for (const position of neighbours) {
          if (!visited.has(position)) {
            queue.push([position, [...path, position]])
          }
        }
      }

      return bestPossiblePath
    }
  }
}

const graph = new Graph()
graph.addVertices()
graph.addEdges()

export { graph }
