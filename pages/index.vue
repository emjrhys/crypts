<template lang='pug'>
CFlex(
  direction='column'
  justify='space-between'
  align='stretch'
  v-bind="mainStyles[colorMode]"
)
  CHeading(
    textAlign='center'
    mb='5'
  )
    | Crypts

  CGrid(
    flex='1'
    gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'
    gap='6'
    py='0'
    px='8'  
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
  inject: ['$chakraColorMode', '$toggleColorMode'],
  components: {
    CryptCard,
  },
  data () {
    return {
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  computed: {
    ...mapState('player', ['money']),
    ...mapState('crypts', ['crypts', 'cryptSlots']),
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
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
