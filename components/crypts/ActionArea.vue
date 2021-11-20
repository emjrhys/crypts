<template lang='pug'>
CPseudoBox(
  as='button'
  h='100%' 
  w='100%' 
  position='relative' 
  rounded='lg'
  border='1px'
  transition='all 150ms'
  overflow='hidden'
  :style='buttonStyle'
  @click='handleClick'
  :disabled='complete'
)
  CFlex(
    v-if='!complete'
    direction='column'
    justify='flex-start'
    align='flex-start'
    pos='absolute'
    z-index='5'
    width='100%'
    height='100%'
    top='0'
    left='0'
    py='3'
    px='4'
  )
    CText(fontWeight='500')
      | {{ actionIconMap[type] }}&nbsp;&nbsp;{{ actionTextMap[type] }} 

    CText(fontSize='xl' fontWeight='600')
      | {{ percentComplete }}%

  //- Slow progress bar
  CBox(
    h='100%'
    pos='absolute'
    z-index='2'
    transition='width 250ms'
    :style='progressBarStyle'
  )

  //- Instant progress bar
  CBox(
    h='100%'
    pos='absolute'
    z-index='1'
    :style='progressBarInstantStyle'
  )
</template>

<script>
export default {
  name: 'ActionArea',
  props: ['type', 'health'],
  data () {
    return {
      damage: 0,
      complete: false,
      actionIconMap: {
        explore: '🔍',
        door: '🚪',
        collect_money: '💰',
        collect_key: '🗝',
        collect_item: '❓',
        locked: '🔒',
      },
      actionTextMap: {
        explore: 'Explore',
        door: 'Open',
        collect_money: 'Collect',
        collect_key: 'Collect',
        collect_item: 'Collect',
        locked: 'Locked',
      },
      actionColorMap: {
        explore: '#FE9E4D',
        door: '#7F3900'
      }
    }
  },
  computed: {
    percentComplete () {
      let percent = this.damage / this.health * 100
      if (percent > 100) percent = 100

      return Math.floor(percent)
    },
    buttonStyle () {
      return {
        background: this.complete ? '' : '#EDF2F7',
        'border-color': this.actionColorMap[this.type]
      }
    },
    progressBarStyle () {
      return {
        background: this.actionColorMap[this.type],
        width: `${this.percentComplete}%`,
        bottom: 0,
        left: 0
      }
    },
    progressBarInstantStyle () {
      return {
        ...this.progressBarStyle,
        background: '#fff'
      }
    }
  },
  methods: {
    handleClick() {
      if (this.damage >= this.health) {
        this.complete = true
        this.$emit('complete')
      } else {
        this.damage += 1
      }
    }
  }
}
</script>
