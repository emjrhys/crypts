import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

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
  room = null
  children = []

  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.room = room
    this.this.children = this.children
  }

  addChild (child) {
    this.children.push(child)
  }
}

class CryptTree {
  depth
  size
  root

  constructor (depth) {
    this.depth = depth
    this.size = 2 ** depth

    this.root = generateCryptTree(depth, size)
  }
}

const generateCryptTree = (depth, size) => {
  const roomChance = 0.65

  const recursionHelper = (x, y, width, height, depth) => {
    const node = new CryptTreeNode(x, y, width, height)

    // Roll to create room
    if (Math.random() <= roomChance) {
      node.room = new CryptRoom('explore', depth)
    }
  
    // Basecase; if at lowest depth, node is a leaf
    if (depth === 0)
      return node
  
    // Vertical split if even, horizontal if odd
    if (depth % 2 === 0) {
      node.addChild(generateCryptTree(x, y, width, height / 2, depth - 1))
      node.addChild(generateCryptTree(x, y + height / 2, width, height / 2, depth - 1))
    } else {
      node.addChild(generateCryptTree(x, y, width / 2, height, depth - 1))
      node.addChild(generateCryptTree(x + width / 2, y, width / 2, height, depth - 1))
    }

    return node
  }

  return recursionHelper(0, 0, size, size, depth)
}


const initialState = () => ({
  crypts: {},
})

export const state = initialState

export const mutations = {
  CREATE_NEW_CRYPT (state, { id, name, depth, cost }) {
    Vue.set(state.crypts, id, { 
      unlocked: false,
      id,
      name, 
      depth, 
      cost,
      tree: new CryptTree(depth)
    })
  },
  UNLOCK_CRYPT (state, { id }) {
    state.crypts[id].unlocked= true
  }
}

export const getters = {
  cryptTreeToArray: (state) => () => {
    let roomArray = []
    
    ((node) => {
      if (node.room !== null)
        roomArray.push(node.room)
  
      for (let i = 0; i < node.children.length; i++)
        getRooms(node.children[i])
    })(state.crypt.root)
  
    return roomArray
  },
  getCryptCount: (state) => () => {
    return Object.keys(state.crypts).length
  },
  getCryptById: (state) => (id) => {
    return state.crypts[id]
  }
}

export const actions = {
  generateCrypt ({ state, commit }) {
    const name = this.$generateDungeonName()
    const depth = 4
    const cost = Object.keys(state.crypts).length ** 3.5 + 1

    commit('CREATE_NEW_CRYPT', { id: `crypt-${cost}`, name, depth, cost })
  },
  purchaseCrypt ({ rootState, commit, getters, dispatch }, { id }) {
    const cryptCost = getters.getCryptById(id).cost

    if (cryptCost > rootState.player.money)
      throw new Error('Not enough money!!')
    else {
      commit('player/CHANGE_MONEY', { change: cryptCost * -1 }, { root: true })
      commit('UNLOCK_CRYPT', { id })
    }

    dispatch('generateCrypt')
  }
}

