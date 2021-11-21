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

  const generateNewRoom = (depth, cumulativeValue, parentType, nominalDepth) => {
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

    const getValue = (type, cumulativeValue) => {
      switch (type) {
        case 'explore':
          return 1 * (Math.random() + 1) * (1.1 ** cumulativeValue)
        case 'crate':
          return 2 * (Math.random() + 1) * (1.1 ** cumulativeValue)
        case 'vase':
          return 5 * (Math.random() + 1) * (1.1 ** cumulativeValue)
      }
    }

    let roomChance = 0.85
    if (parentType !== null) {
      roomChance += 0.1

      if (depth === 0) {
        roomChance -= 0.35

        if (parentType === 'crate')
          roomChance += 0.4
      }
    }
    
    roomChance = roomChance ** (nominalDepth + 1)
    
    
    let type = null
    // Roll to create base level
    if (depth === 0) {
      type = 'vase'

      // Crate
    } else if (depth >= 1 && depth <= 2 && Math.random() <= 0.35) {
      type = 'crate'

      // Explore
    } else if (Math.random() <= roomChance) {
      type = 'explore'

    } else {
      return null
    }

    const health = getHealth(type, depth)
    const value = getValue(type, cumulativeValue)
    return new CryptRoom(type, health, value)
  }

  const generateCryptTree = (depth, width, height) => {

    const recursiveGenerateHelper = (x, y, width, height, { depth, maxDepth, cumulativeValue, parentType=null }) => {
      const nominalDepth = maxDepth - depth
      const node = new CryptTreeNode(x, y, width, height, nominalDepth)

      node.room = generateNewRoom(depth, cumulativeValue, parentType, nominalDepth)

      // Basecase; if at lowest depth, node is a leaf
      if (depth === 0)
        return node

      const additionalParams = {
        cumulativeValue: cumulativeValue + (node.room?.value ?? 0),
        depth: depth - 1, 
        maxDepth,
        parentType: node.room?.type ?? null
      }

      node.addChild(recursiveGenerateHelper(x, y, width + [-1, 0, 1].random(), height + [-1, 0, 1].random(), additionalParams))
      node.addChild(recursiveGenerateHelper(x + Math.floor(width / 2), y, width + [-1, 0, 1].random(), height + [-1, 0, 1].random(), additionalParams))
      node.addChild(recursiveGenerateHelper(x, y + Math.floor(height / 2), width + [-1, 0, 1].random(), height + [-1, 0, 1].random(), additionalParams))
      node.addChild(recursiveGenerateHelper(x + Math.floor(width / 2), y + Math.floor(height / 2), width + [-1, 0, 1].random(), height + [-1, 0, 1].random(), additionalParams))

      return node
    }

    const cryptTreeRoot = recursiveGenerateHelper(0, 0, width, height, { depth: depth, maxDepth: depth, cumulativeValue: 0 })
    
    // TODO: clean up empty nodes in tree?
    // TODO: tell sophie that I accidentally typed TYPO
    return JSON.parse(JSON.stringify(cryptTreeRoot))
  }

  inject('crypts', {
    generateCryptTree
  })
}