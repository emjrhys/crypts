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

    CText(v-if='health > 1 && percentComplete > 0' fontSize='xl' fontWeight='600')
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
        crate: '📦',
        vase: '🏺',
        collect_money: '💰',
        collect_key: '🗝',
        collect_item: '❓',
        locked: '🔒',
      },
      actionTextMap: {
        explore: 'Explore',
        door: 'Open',
        crate: 'Crate',
        vase: 'Vase',
        collect_money: 'Collect',
        collect_key: 'Collect',
        collect_item: 'Collect',
        locked: 'Locked',
      },
      actionColorMap: {
        explore: '#CBD5E0',
        door: '#7F3900',
        crate: '#F7B32B',
        vase: '#F06543',
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
        'box-shadow': `0 2px 0 0 ${this.actionColorMap[this.type]}`,
        'border-color': this.actionColorMap[this.type]
      }
    },
    progressBarStyle () {
      return {
        background: this.actionColorMap[this.type],
        width: `${this.health === 1 ? 100 : this.percentComplete}%`,
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
      this.damage += 1

      if (this.damage >= this.health) {
        this.complete = true
        this.$emit('complete')
      }
    }
  }
}
</script>
