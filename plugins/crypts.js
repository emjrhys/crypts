export default ({ app, store }, inject) => {
  class CryptRoom {
    type
    health
    value

    constructor (type, health, value) {
      this.type = type
      this.health = health
      this.value = value
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

  const generateNewRoom = (depth) => {
    let type = 'explore'
    
    if (depth === 0) {
      type = 'vase'
    } else if (depth === 1 && Math.random() <= 0.5) {
      type = 'crate'
    }

    const getHealth = (type, depth) => {
      switch (type) {
        case 'explore':
          return 1.176 ** depth * 8
        case 'crate':
          return 1.776 ** depth * 15
        case 'vase':
          return 1
      }
    }

    const getValue = (type, depth) => {
      switch (type) {
        case 'explore':
          return 0
        case 'crate':
          return (Math.random() + 0.5) * 2
        case 'vase':
          return (Math.random() + 0.5) * 5
      }
    }

    const health = getHealth(type, depth)
    const value = getValue(type, depth)
    return new CryptRoom(type, health, value)
  }

  const generateCryptTree = (depth) => {
    const roomChance = 0.65
    const size = 2 ** depth
    const parentRoomMultiplier = 1.25

    const recursiveGenerateHelper = (x, y, width, height, depth, maxDepth, hasAncestorRoom=false) => {
      const nominalDepth = maxDepth - depth
      const node = new CryptTreeNode(x, y, width, height, nominalDepth)

      // Roll to create room
      if (Math.random() <= roomChance ** (nominalDepth + 1)) {
        node.room = generateNewRoom(depth)
      }
    
      // Basecase; if at lowest depth, node is a leaf
      if (depth === 0)
        return node
    
      // Vertical split if even, horizontal if odd
      if (depth % 2 === 0) {
        node.addChild(recursiveGenerateHelper(x, y, width, height / 2, depth - 1, maxDepth, node.room !== null || hasAncestorRoom))
        node.addChild(recursiveGenerateHelper(x, y + height / 2, width, height / 2, depth - 1, maxDepth, node.room !== null || hasAncestorRoom))
      } else {
        node.addChild(recursiveGenerateHelper(x, y, width / 2, height, depth - 1, maxDepth, node.room !== null || hasAncestorRoom))
        node.addChild(recursiveGenerateHelper(x + width / 2, y, width / 2, height, depth - 1, maxDepth, node.room !== null || hasAncestorRoom))
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