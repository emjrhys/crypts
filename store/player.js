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
  // Level
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  xpToPrevLevel: 0,

  // Skills & Attributes
  attributes: baseAttributes,
  skills: {},
  call: {},
  
  // Stats
  energy: baseAttributes.vim * 5,
  health: baseAttributes.vigor * 10,
  maxEnergy: baseAttributes.vim * 5,
  maxHealth: baseAttributes.vigor * 10,

  // Possessions
  money: 1,
  keys: 0,
  upgradePoints: {
    attribute: 0,
    skill: 0,
    call: 0,
  },
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
    // Calculate XP to next level
    state.xpToPrevLevel = state.xpToNextLevel
    state.xpToNextLevel = state.xp + state.xpToPrevLevel * 1.63 ** state.level
    state.level += 1

    // Refill health and energy
    state.energy = state.maxEnergy
    state.health = state.maxHealth

    // Give upgrade points
    state.upgradePoints.attribute++
    
    // Bonus AP on multiples of 3
    if (state.level % 3 === 0)
      state.upgradePoints.attribute++

    // Skill point every other level
    if (state.level % 2 === 0)
      state.upgradePoints.skill++

    // Calling point every 5 levels, 2 on 10s
    if (state.level % 10 === 0)
      state.upgradePoints.call += 2
    else if (state.level % 5 === 0)
      state.upgradePoints.call++
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