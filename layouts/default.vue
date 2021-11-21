<template lang='pug'>
CThemeProvider
  CColorModeProvider
    CBox(font-family='body' as='main' maxWidth='60rem')
      CReset
      CFlex(
        direction='column'
        w='100vw'
        h='100vh'
        overflow='hidden'
      )
        NavBar
        Nuxt(flex='1')
</template>

<script>
import NavBar from '~/components/NavBar'

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
    NavBar
  }
}
</script>
