<template lang='pug'>
CThemeProvider
  CColorModeProvider
    CBox(font-family='body' as='main')
      CReset
      Nuxt
</template>

<script>
import { mapState } from 'vuex'

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
    CBox
  }
}
</script>
