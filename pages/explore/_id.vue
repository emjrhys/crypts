<template lang='pug'>
CFlex(
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
      | {{ name }}
    CButton(ml='2' @click='goBack')
      | Back to Crypts

  CGrid(
    flex='1' 
    :template-columns='`repeat(${gridSize}, 1fr)`' 
    gap='6'
    p='20'
  )
    CGridItem(
      v-for='room, idx in crypt.rooms' :key='idx'
      :col-start='(room.x + 1).toString()'
      :row-start='(room.y + 1).toString()'
      :col-span='room.width.toString()'
      :row-span='room.height.toString()'
    )
      Room(:room='room')
      
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import Room from '~/components/crypts/Room'

const cryptGenerator = () => {
  return {

  }
}

export default {
  name: 'Crypt',
  components: { Room },
  data () {
    return {
      name: 'Caverns of the Dank Prince',
      gridSize: 6,
      crypt: {
        rooms: [
          {
            type: 'room',
            x: 0,
            y: 0,
            width: 3,
            height: 3,
            locked: false,
            internalWidth: 4,
            internalHeight: 4,
            actionAreas: [
              {
                action: 'explore',
                x: 0,
                y: 0,
                width: 2,
                height: 1
              },
              {
                action: 'explore',
                x: 0,
                y: 1,
                width: 1,
                height: 2
              },
            ]
          }, 
          {
            type: 'door',
            x: 3,
            y: 1,
            width: 1,
            height: 1,
            locked: false
          }, 
          {
            type: 'door',
            x: 1,
            y: 3,
            width: 1,
            height: 1,
            locked: false
          }, 
          {
            type: 'room',
            x: 4,
            y: 0,
            width: 2,
            height: 3,
            locked: true
          }, 
          {
            type: 'room',
            x: 0,
            y: 4,
            width: 2,
            height: 3,
            locked: true
          }, 
          {
            type: 'locked_door',
            x: 4,
            y: 3,
            width: 1,
            height: 1,
            locked: true
          }, 
          {
            type: 'treasure_room',
            x: 3,
            y: 4,
            width: 3,
            height: 3,
            locked: true
          }
        ],
      }
    }
  },
  computed: {
    ...mapState('crypts', ['crypts'])
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>