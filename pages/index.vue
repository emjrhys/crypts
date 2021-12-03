<template lang='pug'>
CFlex(
  direction='row'
)
  CryptCard(
    v-for='crypt, key, index in crypts' :key='crypt.id'
    :crypt='crypt'
  )
</template>

<script>
import { mapState } from 'vuex'

import CryptCard from '~/components/CryptCard'

export default {
  name: 'Home',
  components: {
    CryptCard,
  },
  computed: {
    ...mapState('player', ['money']),
    ...mapState('crypts', ['crypts', 'cryptSlots']),
  },
  mounted () {
    if (this.$store.getters['crypts/getCryptCount']() === 0) {
      this.$store.dispatch('crypts/generateCrypt')
      this.$store.dispatch('crypts/purchaseCrypt', {
        id: this.$store.getters['crypts/getCryptsAsArray']()[0].id
      })
    }
  }
}
</script>
