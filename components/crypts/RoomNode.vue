<template lang='pug'>
CGrid(
  w='100%'
  h='100%'
  :template-columns='`repeat(${node.width}, 1fr)`'
  :template-rows='`repeat(${node.height}, 1fr)`'
  :gap='node.room && !roomComplete ? 0 : 2'
  :style='roomStyle'
  rounded='lg'
)
  template(v-if='node.room && !roomAnimComplete')
    CGridItem(
      col-start='0'
      row-start='0'
      :col-span='node.width.toString()'
      :row-span='node.height.toString()'
    )
      ActionArea(
        :type='node.room.type' 
        :health='node.room.health' 
        @complete='handleRoomComplete'
        @anim-complete='handleRoomAnimComplete'
      )

  CGridItem(
    v-if='!node.room || roomComplete'
    v-for='child, idx in node.children' :key='idx'
    :col-start='(Math.abs(child.x - node.x) + 1).toString()'
    :row-start='(Math.abs(child.y - node.y) + 1).toString()'
    :col-span='(Math.floor(node.width / 2) + ([1,3].includes(idx) ? 1 : 0)).toString()'
    :row-span='(Math.floor(node.height / 2) + ([2,3].includes(idx) ? 1 : 0)).toString()'
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
      roomComplete: false,
      roomAnimComplete: false,
    }
  },
  computed: {
    hasRoom () {
      return this.node.room !== null
    },
    hasBackground () {
      return this.node.room?.type === 'crate' ?? false
    },
    health () {
      let health = this.room.width * this.room.height * 2

      return health
    },
    roomStyle () {
      return {
        background: this.hasBackground ? '#CBD5E0' : 'none'
      }
    }
  },
  methods: {
    handleRoomComplete () {
      if (this.node.room.value > 0)
        this.$store.commit('player/CHANGE_MONEY', { change: this.node.room.value })

      this.roomComplete = true
    },
    handleRoomAnimComplete () {
      this.roomAnimComplete = true
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