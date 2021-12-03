import Vue from 'vue'
/*
 * Other stores:
 * shop, crypts, player, settings
 */

const initialState = () => ({
  dragging: false,
})

export const state = initialState

export const mutations = {
  SET_DRAG_STATE (state, dragging) {
    state.dragging = dragging
  },
}

export const getters = {

}

export const actions = {

}