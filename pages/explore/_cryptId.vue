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
)
  //- Header
  CFlex(justify='space-between' align='center' mb='3')
    CHeading(size='lg')
      | {{ crypt.name }}
    CButton(ml='2' @click='goBack')
      | Back to Crypts

  //- CGrid(
  //-   flex='1' 
  //-   :template-columns='`repeat(${gridSize}, 1fr)`' 
  //-   gap='6'
  //-   p='20'
  //- )
  //-   CGridItem(
  //-     v-for='room, idx in crypt.rooms' :key='idx'
  //-     :col-start='(room.x + 1).toString()'
  //-     :row-start='(room.y + 1).toString()'
  //-     :col-span='room.width.toString()'
  //-     :row-span='room.height.toString()'
  //-   )
  //-     Room(:room='room')
      
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import ActionArea from '~/components/crypts/ActionArea'

export default {
  name: 'Crypt',
  components: { ActionArea },
  data () {
    return {
      name: 'Caverns of the Dank Prince',
    }
  },
  computed: {
    cryptId () {
      return this.$route.params.cryptId
    },
    crypt () {
      return this.$store.getters['crypts/getCryptById'](this.cryptId)
    },
    rooms () {
      console.log('got here')
      const rooms = this.$store.getters['crypts/cryptTreeToArray'](this.cryptId)
      return rooms
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>