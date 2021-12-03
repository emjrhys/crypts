import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

const initialState = () => ({
  activeCryptId: null,
  cryptSlots: 1,
  crypts: {},
})

export const state = initialState

export const mutations = {
  CREATE_CRYPT (state, newCrypt) {
    Vue.set(state.crypts, newCrypt.id, newCrypt)
  },
  UPDATE_ROOM (state, { cryptId, x, y, depth, roomData }) {
    let crypt = state.crypts[cryptId]

    
  },
  UNLOCK_CRYPT (state, { id }) {
    state.crypts[id].unlocked = true
  },
  SET_ACTIVE_CRYPT (state, { id }) {
    state.activeCryptId = id
  }
}

export const getters = {
  getCryptsAsArray: (state) => () => {
    return Object.values(state.crypts)
  },
  getCryptCount: (state) => () => {
    return Object.keys(state.crypts).length
  },
  getCryptById: (state) => (id) => {
    return state.crypts[id]
  },
  findRoom: (state) => (cryptId, x, y, depth) => {
    const crypt = state.crypts[cryptId]
  }
}

export const actions = {
  generateCrypt ({ state, commit }) {
    const numCrypts = Object.keys(state.crypts).length
    const name = this.$generateDungeonName()
    const depth = numCrypts + 1
    const cost = depth === 1 ? 1 : 10 * 1.234 ** (numCrypts - 1)

    const crypt = {
      name: name.text,
      nameParts: name.parts, 
      depth, 
      cost,
      unlocked: false,
      id: name.id,
      ...this.$crypts.generateCrypt(depth)
    }

    console.log(crypt)

    commit('CREATE_CRYPT', crypt)
  },
  purchaseCrypt ({ rootState, commit, getters, dispatch }, { id }) {
    const cryptCost = getters.getCryptById(id).cost
    const numCrypts = getters.getCryptCount()

    if (cryptCost > rootState.player.money)
      throw new Error('Not enough money!!')
    else {
      commit('player/CHANGE_MONEY', { change: cryptCost * -1 }, { root: true })
      commit('UNLOCK_CRYPT', { id })
    }

    dispatch('generateCrypt')
  },
  goToCrypt ({ commit }, { id }) {
    commit('SET_ACTIVE_CRYPT', { id })
    this.$router.push(`/explore/${id}`)
  }
}

