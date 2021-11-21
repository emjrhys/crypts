<template lang='pug'>
CFlex(
  v-if='crypt'
  direction='column'
  justify='center'
  height='100vh'
  width='100vw'
  overflow='scroll'
  :style='cryptStyle'
)
  CFlex(justify='center' align='center' mb='3')
    CHeading(size='md')
      | {{ crypt.name.text }}

  CFlex(
    flex='1' 
    justify='center' 
    align='center' 
    position='relative'
  )
    CBox(
      position='absolute'
      w='3000px' 
      h='3000px'
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
        background: '#F7FAFC',
        transform: 'scale(0.5)'
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