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
  CFlex(justify='center' align='center' mb='3' position='relative' z-index='10')
    CHeading(size='md')
      | {{ crypt.name.text }}

  CFlex(
    flex='1' 
    justify='center' 
    align='center' 
    position='relative'
    @mousedown='handleMouseDown'
    @mousemove='handleMouseMove'
    @mouseup='handleMouseUp'
    @wheel.prevent='handleScroll'
  )
    CBox(
      position='absolute'
      :w='`${500 * crypt.depth}px`' 
      :h='`${500 * crypt.depth}px`' 
      rounded='lg'
      p='3'
      userSelect='none'
      :style='roomStyle'
    )
      RoomNode(:node='crypt.root')     
</template>

<script>
import _ from 'lodash'
import { mapState, mapGetters, mapMutations } from 'vuex'

import RoomNode from '~/components/crypts/RoomNode'

export default {
  name: 'Crypt',
  components: { RoomNode },
  data () {
    return {
      name: 'Caverns of the Dank Prince',
      dragging: false,
      dragStartCoords: { x: 0, y: 0 },
      currentDragOffset: { x: 0, y: 0 },
      cameraOffset: { x: 0, y: 0 },
      dragSensitivity: 1.5,
      dragTimeout: null,
      zoomMin: 0,
      zoomMax: 0.5,
      zoomLevel: 0
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
        transform: `scale(${0.5 + this.zoomLevel}) translate(${this.cameraOffset.x + this.currentDragOffset.x}px, ${this.cameraOffset.y + this.currentDragOffset.y}px)`
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    },
    handleMouseDown (e) {
      this.dragStartCoords.x = e.clientX
      this.dragStartCoords.y = e.clientY
      this.currentDragOffset = { x: 0, y: 0 }

      this.dragTimeout = setTimeout(() => {
        this.dragging = true
      }, 50)
    },
    handleMouseMove: _.debounce(function (e) {
      if (this.dragging) {
        this.currentDragOffset = { 
          x: (e.clientX - this.dragStartCoords.x) * this.dragSensitivity, 
          y: (e.clientY - this.dragStartCoords.y) * this.dragSensitivity
        }
      }
    }, ),
    handleMouseUp (e) {
      clearTimeout(this.dragTimeout)

      this.dragging = false
      this.cameraOffset.x += this.currentDragOffset.x
      this.cameraOffset.y += this.currentDragOffset.y
      this.currentDragOffset = { x: 0, y: 0 }
    },
    handleScroll (e) {
      this.zoomLevel -= e.deltaY / 1000

      if (this.zoomLevel < this.zoomMin) this.zoomLevel = this.zoomMin
      if (this.zoomLevel > this.zoomMax) this.zoomLevel = this.zoomMax
    }
  }
}
</script>