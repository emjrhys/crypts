<template lang='pug'>
CFlex(
  v-if='crypt'
  w='100%'
  h='100%'
  minW='0'
  minH='0'
  maxW='800px'
  maxH='800px'
  direction='column'
  justify='center'
  align='stretch'
  px='3'
)
  CFlex(
    h='2rem'
    justify='center'
    align='center'
  )
    CButton(
      v-if='northDoor'
      display='flex'
      justify='center'
      align='center'
      :style='northSouthDoorStyle'
      p='0'
      @click='currentCoords.y--'
    )
      | 🚪

  CFlex(
    flex='1' 
    minH='0' 
    justify='center' 
    align='stretch'
  )
    CFlex(
      w='2rem'
      direction='column'
      justify='center'
      align='center'
    )
      CButton(
        v-if='westDoor'
        display='flex'
        justify='center'
        align='center'
        :style='eastWestDoorStyle'
        @click='currentCoords.x--'
      )
        | 🚪

    CBox(
      flex='1'
      height='100%'
      minH='0'
      p='3'
    )
      Room(:room='crypt.map[coords.x][coords.y]' :key='`${coords.x}:${coords.y}`')

    //- East Door
    CFlex(
      w='2rem'
      direction='column'
      justify='center'
      align='center'
    )
      CButton(
        v-if='eastDoor' 
        display='flex'
        justify='center'
        align='center'
        :style='eastWestDoorStyle'
        @click='currentCoords.x++'
      )
        | 🚪

  CFlex(
    h='2rem'
    justify='center'
    align='center'
  )
    CButton(
      v-if='southDoor' 
      display='flex'
      justify='center'
      align='center'
      :style='northSouthDoorStyle'
      @click='currentCoords.y++'
    )
      | 🚪

</template>

<script>
import Room from '~/components/crypts/Room'
import Door from '~/components/crypts/Door'

export default {
  name: 'Crypt',
  components: { Room, Door },
  data () {
    return {
      currentCoords: { x: 0, y: 0 },
    }
  },
  computed: {
    /* Crypt Properties */
    cryptId () { return this.$route.params.cryptId },
    crypt () { return this.$store.getters['crypts/getCryptById'](this.cryptId) },
    cryptWidth () { return this.crypt.map.length },
    cryptHeight () { return this.crypt.map[0].length },
    cryptStyle () {
      return {
        transform: `scale(1) translate(${this.cameraOffset.x}px, ${this.cameraOffset.y}px)`,
      }
    },

    /* Room Properties */
    coords () {
      return {
        x: this.crypt.startCoords.x + this.currentCoords.x,
        y: this.crypt.startCoords.y + this.currentCoords.y,
      }
    },
    currentRoom () {
      return this.crypt.map[this.coords.x][this.coords.y]
    },

    northDoor () { return this.crypt.map[this.coords.x][this.coords.y - 1] ?? null },
    eastDoor () { return this.crypt.map[this.coords.x + 1][this.coords.y] ?? null },
    southDoor () { return this.crypt.map[this.coords.x][this.coords.y + 1] ?? null },
    westDoor () { return this.crypt.map[this.coords.x - 1][this.coords.y] ?? null },

    eastWestDoorStyle () {
      return {
        padding: '0',
        height: '6rem'
      }
    },
    northSouthDoorStyle () {
      return {
        padding: '0',
        width: '6rem'
      }
    },
  },
}
</script>