<template lang='pug'>
CThemeProvider
  CColorModeProvider
    CBox(font-family='body' as='main' maxWidth='60rem')
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
          py='3'
          px='5'
        )
          PlayerCard

        Nuxt
        
        //- Bottom na
        CFlex(
          width='100%'
          justify='space-between'
          align='center'
          py='4'
          px='5'
        )
          //- Left
          CFlex(
            flex='1'
            justify='flex-start'
            align='center'
          )
            //- Back to crypts button
            CBox
              nuxt-link(v-if='$route.name !== "index"' to='/')
                CButton(size='sm' pl='1')
                  CIcon(name='chevron-left' size='20px')
                  | Crypts


          //- Center
          CFlex(
            flex='1'
            justify='center'
            align='center'
          )
            //- Clear save data and reload
            CButton(size='sm' @click='clearSaveData')
              CText
                | Reset
          
          //- Right
          CFlex(
            flex='1'
            justify='flex-end'
            align='center'
          )
            //- Shop button
            CButton(size='sm' disabled)
              CText(mr='2')
                | 🛍️
              CText
                | Shop
          
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
  methods: {
    clearSaveData () {
      localStorage.removeItem('crypts_save_data')
      window.location.href = '/'
    },
  }
}
</script>
