<template lang='pug'>
CGrid(
  gridTemplateColumns='repeat(3, 1fr)'
  gap='6'
  py='0'
  px='8'  
)
  CryptCard(
    v-for='crypt in crypts' :key='crypt.id'
    :crypt='crypt'
  )
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import CryptCard from '~/components/CryptCard'

export default {
  name: 'Home',
  components: {
    CryptCard
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
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
    ...mapState('crypts', ['crypts']),
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
  methods: {
    showToast () {
      this.$toast({
        title: 'Toast',
        description: 'This is a toast',
        status: 'info',
        duration: 2000,
        isClosable: false
      })
    }
  },
  mounted () {
    if (this.$store.getters['crypts/getCryptCount']() === 0)
      this.$store.dispatch('crypts/generateCrypt')
  }
}
</script>
