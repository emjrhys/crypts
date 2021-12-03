import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

const initialState = () => ({
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  xpToPrevLevel: 0,
  money: 1,
  keys: 0,
  damage: 1
})

export const state = initialState

export const mutations = {
  CHANGE_MONEY (state, { change }) { 
    if (change < 0 && state.money + change < 0)
      return false
    
    state.money += change
    return true
  },
  ADD_XP (state, xpChange) {
    if (xpChange <= 0) return
    state.xp += xpChange
  },
  ADD_KEY (state) { state.keys++ },
  USE_KEY (state) { 
    if (state.keys === 0) return
    state.keys-- 
  },
  LEVEL_UP (state) {
    state.xpToPrevLevel = state.xpToNextLevel
    state.xpToNextLevel = state.xp + state.xpToPrevLevel * 1.63 ** state.level
    state.damage = state.damage + 1.25 ** state.level
    state.level += 1
  }
}

export const getters = {

}

export const actions = {
  applyXP ({ state, commit, dispatch }, xpChange) {
    commit('ADD_XP', xpChange)

    if (state.xp >= state.xpToNextLevel)
      dispatch('levelUp')
  },
  levelUp ({ commit }) {
    commit('LEVEL_UP')
  }
}