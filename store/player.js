import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

const initialState = () => ({
  level: 1,
  xp: 0,
  money: 1
})

export const state = initialState

export const mutations = {
  CHANGE_MONEY (state, { change }) { 
    if (change < 0 && state.money + change < 0)
      return false
    
    state.money += change
    return true
  },
}

export const getters = {

}

export const actions = {

}