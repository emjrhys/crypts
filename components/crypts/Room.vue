<template lang='pug'>
CBox(
  height='100%'
  width='100%'
  :style='roomStyle'
  rounded='lg'
  p='3'
)
  RoomNode(:node='room')
</template>

<script>
import RoomNode from '~/components/crypts/RoomNode'

export default {
  name: 'Room',
  components: { RoomNode },
  props: ['room'],
  computed: {
    roomStyle () {
      return {
        background: '#F7FAFC',
      }
    },
  }
}
</script>