export default ({ app, store }, inject) => {
  class CryptRoom {
    type
    health
    damage = 0
    depthFactor = 1.678

    constructor (type, depth) {
      this.type = type
      this.health = (depth + 1) ** 1.678
    }
  }

  class CryptTreeNode {
    x
    y
    width
    height
    depth
    room = null
    children = []

    constructor (x, y, width, height, depth) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.depth = depth
    }

    addChild (child) {
      this.children.push(child)
    }
  }

  console.log(store)

  const generateCryptTree = (depth) => {
    const roomChance = 0.65
    const size = 2 ** depth

    const recursiveGenerateHelper = (x, y, width, height, depth) => {
      const node = new CryptTreeNode(x, y, width, height, depth)

      // Roll to create room
      if (Math.random() <= roomChance) {
        node.room = new CryptRoom('explore', depth)
      }
    
      // Basecase; if at lowest depth, node is a leaf
      if (depth === 0)
        return node
    
      // Vertical split if even, horizontal if odd
      if (depth % 2 === 0) {
        node.addChild(recursiveGenerateHelper(x, y, width, height / 2, depth - 1))
        node.addChild(recursiveGenerateHelper(x, y + height / 2, width, height / 2, depth - 1))
      } else {
        node.addChild(recursiveGenerateHelper(x, y, width / 2, height, depth - 1))
        node.addChild(recursiveGenerateHelper(x + width / 2, y, width / 2, height, depth - 1))
      }

      return node
    }

    const cryptTreeRoot = recursiveGenerateHelper(0, 0, size, size, depth)

    return JSON.parse(JSON.stringify(getRoomsFromCryptTree(cryptTreeRoot)))
  }

  const getRoomsFromCryptTree = (cryptTreeRoot) => {
    const recursiveCleanupHelper = (node) => {
      let room = node.room

      if (node.children.length === 0) return room ? [{ room }] : []

      return [{ room, children: [...recursiveCleanupHelper(node.children[0]), ...recursiveCleanupHelper(node.children[0])] }]
    }

    let roomTree = recursiveCleanupHelper(cryptTreeRoot)

    return roomTree
  }

  inject('crypts', {
    generateCryptTree
  })
}