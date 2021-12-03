import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

const baseAttributes = { // AKA attributes
  // Core
  vim: 5, // maxEnergy = vim * 5
  vigor: 5, // maxHealth = vigor * 10

  // Exploration
  perception: 5,
  luck: 5,

  // Combat
  strength: 5,
  evasion: 5,
}

const initialState = () => ({
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  xpToPrevLevel: 0,

  // Wallet
  money: 1,
  keys: 0,
  skillPoints: 0,
  attribPoints: 0,

  // Skills & Attributes
  skills: {},
  attributes: baseAttributes,
  
  // Stats
  energy: baseAttributes.vim * 5,
  health: baseAttributes.vigor * 10,
  maxEnergy: baseAttributes.vim * 5,
  maxHealth: baseAttributes.vigor * 10,
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
    state.level += 1

    state.energy = state.maxEnergy
    state.health = state.maxHealth
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