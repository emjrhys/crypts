<template lang='pug'>
CGrid(
  v-if='crypt'
  :style='cryptStyle'
  :templateColumns='`repeat(${cryptWidth}, ${600}px)`'
  :templateRows='`repeat(${cryptHeight}, ${600}px)`'
  gap='10'
)
  template(v-for='column, x in crypt.map')
    template(v-for='room, y in column' v-if='room !== null')
      CGridItem(
        :col-start='x.toString()'
        :row-start='y.toString()'
      )
        Room(:room='crypt.map[x][y]')     
</template>

<script>
import Room from '~/components/crypts/Room'

export default {
  name: 'Crypt',
  components: { Room },
  props: ['cameraOffset'],
  computed: {
    cryptId () {
      return this.$route.params.cryptId
    },
    crypt () {
      return this.$store.getters['crypts/getCryptById'](this.cryptId)
    },
    cryptWidth () {
      return this.crypt.map.length
    },
    cryptHeight () {
      return this.crypt.map[0].length
    },
    cryptStyle () {
      return {
        transform: `scale(1) translate(${this.cameraOffset.x}px, ${this.cameraOffset.y}px)`,
      }
    },
  }
}
</script>