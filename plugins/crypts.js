export default ({ app, store }, inject) => {
  function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
  }

  class ActionArea {
    type
    health
    value

    constructor (type, health, value) {
      this.type = type
      this.health = health
      this.value = value
    }
  }

  class RoomTreeNode {
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
    const rollForRoom = (depth, nominalDepth, parentType) => {
      let baseChance = 0.5
      if (parentType !== null) {
        baseChance += 0.1

        if (depth === 0) {
          if (parentType === 'crate')
            baseChance += 0.25
        }
      }

      baseChance = baseChance ** (nominalDepth + 1)

      const typeRollers = {
        explore: {
          roll: () => depth !== 0 && Math.random() <= baseChance,
          required: (() => nominalDepth === 0)()
        },
        shrine: {
          roll: () => depth === 1 && Math.random() <= (baseChance / 5)
        },
        crate: {
          roll: () => depth >= 1 && depth <= 2 && Math.random() <= (baseChance / 3)
        },
        key: {
          roll: () => depth === 0 && Math.random() <= ((baseChance + (parentType === 'crate') ? 0.25 : 0) / 5)
        },
        vase: {
          roll: () => depth === 0 && Math.random() <= ((baseChance + (parentType === 'crate') ? -0.1 : 0.25) / 2)
        },
      }
      
      // Always create an explore at the top level
      for (const [key, value] of Object.entries(typeRollers)) {
        if (value.roll() || value.required) {
          return key
        }
      }

      return null
    }

    const getHealth = (type, depth) => {
      switch (type) {
        case 'explore':
          return 1.176 ** depth * 8
        case 'crate':
          return 1.776 ** depth * 15
        default:
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
        case 'key':
          return 0
      }
    }
    
    let type = rollForRoom(depth, nominalDepth, parentType)
    if (type === null) return null

    const health = getHealth(type, depth)
    const value = getValue(type, cumulativeValue)
    return new ActionArea(type, health, value)
  }

  const generateCrypt = (level) => {
    let numRooms = 5 + Math.floor(3 * Math.log(level))
    const mapSize = 5 + Math.floor(1 * Math.log(level))
    let map = createArray(mapSize, mapSize)

    const startCoords = { x: Math.floor(mapSize / 2), y: Math.floor(mapSize / 2) }

    let coordQueue = [{ x: startCoords.x, y: startCoords.y }]
    while (numRooms > 0 && coordQueue.length > 0) {
      let { x, y } = coordQueue.shift()

      map[x][y] = generateRoomTree(3, 5, 5)
      numRooms--

      if (x > 0 && typeof map[x-1][y] === 'undefined' && Math.random() <= 0.65)
        coordQueue.push({ x: x - 1, y })
      if (x < mapSize - 1 && typeof map[x+1][y] === 'undefined' && Math.random() <= 0.65)
        coordQueue.push({ x: x + 1, y })
      if (y > 0 && typeof map[x][y-1] === 'undefined' && Math.random() <= 0.65)
        coordQueue.push({ x, y: y - 1 })
      if (y < mapSize - 1 && typeof map[x][y+1] === 'undefined' && Math.random() <= 0.65)
        coordQueue.push({ x, y: y + 1 })
    }
    
    return JSON.parse(JSON.stringify({ map, startCoords }))
  }

  const generateRoomTree = (depth, width, height) => {

    const recursiveGenerateHelper = (x, y, width, height, { depth, maxDepth, cumulativeValue, parentType=null }) => {
      const nominalDepth = maxDepth - depth
      const node = new RoomTreeNode(x, y, width, height, nominalDepth)

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
    return cryptTreeRoot
  }



  inject('crypts', {
    generateCrypt
  })
}