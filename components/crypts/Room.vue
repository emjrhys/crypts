<template lang='pug'>
CBox(
  w='100%'
  h='100%'
  rounded='lg'
  :style='roomStyle'
  overflow='hidden'
  p='2'
)
  CGrid(
    w='100%'
    h='100%'
    :template-columns='`repeat(${room.internalWidth}, 1fr)`'
    gap='3'
  )
    CGridItem(
      v-for='area, idx in room.actionAreas' :key='idx'
      :col-start='(area.x + 1).toString()'
      :row-start='(area.y + 1).toString()'
      :col-span='area.width.toString()'
      :row-span='area.height.toString()'
    )
      ActionArea(:action='area.action' :health='area.width * area.height * 3.687')
</template>

<script>
import ActionArea from '~/components/crypts/ActionArea'

export default {
  name: 'Room',
  components: { ActionArea },
  props: ['room'],
  data () {
    return {
    }
  },
  computed: {
    health () {
      let health = this.room.width * this.room.height * 2

      return health
    },
    action () {
      switch (this.room.type) {
        case 'room':
          return 'explore'
          case 'treasure_room':
            return 'explore'
        case 'door':
          return 'door'
        case 'locked_door':
          return 'locked'
      }
    },
    roomStyle () {
      return {
      }
    }
  }
}
</script>
/**
Room types:
explore
fight?
treasure
key
chest
door
trees (need axe)
stone/minerals (need pickaxe)

Crafting?
 */