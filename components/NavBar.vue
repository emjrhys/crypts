<template lang='pug'>
CFlex(
  w='100vw'
  flex-dir='row'
  justify='space-between'
  align='center'
  py='4'
  px='10'
)
  CFlex(flex='1' justify='flex-start')
    nuxt-link(to='/')
      CHeading(size='lg')
        | 🪦 Crypts

  CFlex(flex='1' justify='center')
    PlayerCard

  CFlex(flex='1' justify='flex-end')
    CButton(@click='reset')
      | Reset
</template>

<script>
import PlayerCard from '~/components/PlayerCard'

export default {
  name: 'NavBar',
  components: { PlayerCard },
  methods: {
    reset () {
      localStorage.removeItem('crypts_save_data')
      window.location.href = '/'
    }
  }
}
</script>