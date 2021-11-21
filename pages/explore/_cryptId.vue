<template lang='pug'>
CFlex(
  v-if='crypt'
  direction='column'
  justify='center'
  height='100vh'
  width='100vw'
  py='4'
  px='5'
  overflow='scroll'
  :style='cryptStyle'
)
  //- Header
  CFlex(justify='space-between' align='center' mb='3')
    CHeading(size='lg')
      | {{ crypt.name.text }}
    CButton(ml='2' @click='goBack')
      | Back to Crypts

  CFlex(flex='1' justify='center' align='center')
    CBox(
      w='1000px' 
      h='400px'
      rounded='lg'
      p='3'
      :style='roomStyle'
    )
      RoomNode(:node='crypt.root')      
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import RoomNode from '~/components/crypts/RoomNode'

export default {
  name: 'Crypt',
  components: { RoomNode },
  data () {
    return {
      name: 'Caverns of the Dank Prince',
    }
  },
  computed: {
    cryptId () {
      console.log('here')
      return this.$route.params.cryptId
    },
    crypt () {
      return this.$store.getters['crypts/getCryptById'](this.cryptId)
    },
    cryptSize () {
      return 2 ** this.crypt.depth
    },
    cryptStyle () {
      return {
      }
    },
    roomStyle () {
      return {
        background: '#F7FAFC'
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>