import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

const initialState = () => ({
  activeCryptId: null,
  crypts: {},
})

export const state = initialState

export const mutations = {
  CREATE_CRYPT (state, newCrypt) {
    Vue.set(state.crypts, newCrypt.id, newCrypt)
  },
  UPDATE_ROOM (state, { cryptId, x, y, depth, roomData }) {
    
  },
  UNLOCK_CRYPT (state, { id }) {
    state.crypts[id].unlocked = true
  },
  SET_ACTIVE_CRYPT (state, { id }) {
    state.activeCryptId = id
  }
}

export const getters = {
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
    const depth = 5
    const cost = 12.50 ** Object.keys(state.crypts).length

    const crypt = {
      name, 
      depth, 
      cost,
      unlocked: false,
      id: `crypt-${cost}`,
      root: this.$crypts.generateCryptTree(depth)
    }

    console.log(crypt)

    commit('CREATE_CRYPT', crypt)
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
  },
  goToCrypt ({ commit }, { id }) {
    commit('SET_ACTIVE_CRYPT', { id })
    this.$router.push(`/explore/${id}`)
  }
}

