<template lang='pug'>
CFlex(
  w='100vw'
  flex-dir='row'
  justify='space-between'
  align='center'
  py='4'
  px='10'
)
  CFlex(flex='1' justify='flex-start')
    nuxt-link(to='/')
      CHeading(size='lg')
        | 🪦 Crypts

  CFlex(flex='1' justify='flex-end' align='center')
    CText(fontSize='md' fontWeight='600' mr='5')
      | {{ $formatCurrency(money) }}

    CButton(@click='reset')
      | Reset
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
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
    reset () {
      localStorage.removeItem('crypts_save_data')
      window.location.href = '/'
    },
    showToast () {
      this.$toast({
        title: 'Toast',
        description: 'This is a toast',
        status: 'info',
        duration: 2000,
        isClosable: false
      })
    }
  }
}
</script>