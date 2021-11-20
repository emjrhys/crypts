<template lang='pug'>
CGrid(
  w='100%'
  h='100%'
  :template-columns='`repeat(${node.width}, 1fr)`'
  gap='3'
)
  template(v-if='node.room && !roomComplete')
    CGridItem(
      :col-start='(node.x + 1).toString()'
      :row-start='(node.y + 1).toString()'
      :col-span='node.width.toString()'
      :row-span='node.height.toString()'
    )
      ActionArea(:room='node.room' @complete='handleRoomComplete')

  template(v-else v-for='child in node.children')
    CGridItem(
      :col-start='(child.x + 1).toString()'
      :row-start='(child.y + 1).toString()'
      :col-span='child.width.toString()'
      :row-span='child.height.toString()'
    )
      RoomNode(:node='child')
</template>

<script>
import ActionArea from '~/components/crypts/ActionArea'

export default {
  name: 'RoomNode',
  components: { ActionArea },
  props: ['node'],
  data () {
    return {
      roomComplete: false
    }
  },
  computed: {
    hasRoom () {
      return this.node.room !== null
    },
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
  },
  methods: {
    handleRoomComplete () {
      this.roomComplete = true
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