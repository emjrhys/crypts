<template lang='pug'>
CThemeProvider
  CColorModeProvider
    CBox(font-family='body' as='main' maxWidth='60rem')
      CReset

      CFlex(
        w='100vw'
        h='100vh'
        overflow='hidden'
      )
        Nuxt
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
}
</script>
