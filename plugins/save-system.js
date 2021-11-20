import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  window.onNuxtReady(() => {
    console.log('loaded')
    createPersistedState({
      key: 'crypts_save_data',
      paths: ['player', 'crypts']
    })(store)
  })
}