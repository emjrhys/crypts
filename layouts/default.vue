<template lang='pug'>
CThemeProvider
  CColorModeProvider
    CBox(v-bind='mainStyles[colorMode]' font-family='body' as='main' maxWidth='60rem')
      CReset
      CFlex(
        w='100vw'
        h='100vh'
        direction='column'
        justify='space-between'
        align='stretch'
        overflow='hidden'
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
  
        Nuxt

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
import PlayerCard from '~/components/PlayerCard'

import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    PlayerCard
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
}
</script>
