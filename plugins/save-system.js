import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'crypts_save_data',
      paths: ['player', 'crypts']
    })(store)
  })
}