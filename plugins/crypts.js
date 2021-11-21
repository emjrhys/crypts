export default ({ app, store }, inject) => {
  class CryptRoom {
    type
    health
    damage = 0

    constructor (type, depth) {
      this.type = type
      this.health = 1.276 ** depth * 10
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

    constructor (x, y, width, height, depth, maxDepth) {
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

  const generateCryptTree = (depth) => {
    const roomChance = 0.65
    const size = 2 ** depth

    const recursiveGenerateHelper = (x, y, width, height, depth, maxDepth) => {
      const nominalDepth = maxDepth - depth
      const node = new CryptTreeNode(x, y, width, height, nominalDepth)

      // Roll to create room
      if (Math.random() <= roomChance ** nominalDepth) {
        node.room = new CryptRoom('explore', depth)
      }
    
      // Basecase; if at lowest depth, node is a leaf
      if (depth === 0)
        return node
    
      // Vertical split if even, horizontal if odd
      if (depth % 2 === 0) {
        node.addChild(recursiveGenerateHelper(x, y, width, height / 2, depth - 1, maxDepth))
        node.addChild(recursiveGenerateHelper(x, y + height / 2, width, height / 2, depth - 1, maxDepth))
      } else {
        node.addChild(recursiveGenerateHelper(x, y, width / 2, height, depth - 1, maxDepth))
        node.addChild(recursiveGenerateHelper(x + width / 2, y, width / 2, height, depth - 1, maxDepth))
      }

      return node
    }

    const cryptTreeRoot = recursiveGenerateHelper(0, 0, size, size, depth, depth)
    
    // TODO: clean up empty nodes in tree
    // TODO: tell sophie that I accidentally typed TYPO
    return JSON.parse(JSON.stringify(cryptTreeRoot))
  }

  inject('crypts', {
    generateCryptTree
  })
}