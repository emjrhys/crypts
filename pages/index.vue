<template lang='pug'>
CBox(
  h='100vh'
  w='100vw'
  d='flex'
  flex-dir='column'
  justify-content='space-between'
  align-items='stretch'
  overflow='hidden'
  v-bind='mainStyles[colorMode]'
)
  CFlex(
    width='100%'
    justify='center'
    align='center'
    z-index='1000'
    py='3'
    px='5'
  )
    PlayerCard

  CFlex(v-if='$route.name === "index"')
    CryptCard(
      v-for='crypt, key, index in crypts' :key='crypt.id'
      :crypt='crypt'
    )

  nuxt-child(v-else)

  CFlex(
    width='100%'
    justify='space-between'
    align='center'
    py='4'
    px='5'
  )
    nuxt-link(to='/')
      CButton(size='sm' pl='1')
        CIcon(name='chevron-left' size='20px')
        | Crypts

    CFlex(
      align='center'
    )
      //- Shop button
      CButton(size='sm' disabled)
        CText(mr='2')
          | 🛍️
        CText
          | Shop

      CIconButton(
        ml='3'
        :icon='colorMode === "light" ? "moon" : "sun"'
        :aria-label='`Switch to ${colorMode === "light" ? "dark" : "light"} mode`'
        @click='toggleColorMode'
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

    console.log(this.$route.name)
  }
}
</script>
