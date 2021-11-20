<template lang='pug'>
CFlex(
  v-bind='mainStyles[colorMode]'
  direction='column'
  justify='center'
  align='center'
  w='100vw'
  h='100vh'
  px='5'
  py='3'
  overflow='hidden'
)
  CBox(
    flex-dir='column'
    justify='center'
    align='center'
    w='100%'
    maxW='40rem'
    h='100%'
    mt='2'
  )
    //- Header
    CFlex(justify='space-between' align='center' mb='3')
      CHeading(size='lg')
        | 🪦 Crypts

      CHeading(size='md')
        | 💰 {{ $formatCurrency(money) }}

    //- Crypts
    CFlex(flex='1' overflow='auto' height='100%' direction='column')
      CryptCard(
        v-for='crypt in crypts' :key='crypt.id'
        :crypt='crypt'
      )
        
    CModal(:is-open='showModal')
      CModalOverlay

      CModalContent
        CModalHeader
          | Are you sure?

        CModalBody 
          | Deleting user cannot be undone

        CModalFooter
          CButton(@click='showModal = false')
            | Cancel
          
          CButton(
            margin-left='3'
            variant-color='red'
            @click='showModal = false'
          )
            | Delete User
        
        CModalCloseButton(@click='showModal = false')
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
    console.log(this.$store.getters['crypts/getCryptCount']())
    // if ()
    // this.$store.dispatch('crypts/generateCrypt')
  }
}
</script>
