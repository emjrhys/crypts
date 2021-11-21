<template lang='pug'>
CFlex(
  w='100vw'
  flex-dir='row'
  justify='space-between'
  align='center'
  py='8'
  px='12'
)
  CHeading(size='lg')
    | 🪦 Crypts

  CHeading(size='md')
    | 💰 {{ $formatCurrency(money) }}
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapState('player', ['money'])
  }
}
</script>