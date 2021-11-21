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
    pos='absolute'
    z-index='5'
    width='100%'
    height='100%'
    top='0'
    left='0'
    justify='center'
    align='center'
    py='2'
    px='3'
  )
    CText(fontSize='xl' fontWeight='500' :style='labelStyle')
      | {{ actionIconMap[type] }} {{ actionTextMap[type] }} 

  CFlex(
    pos='absolute'
    z-index='5'
    width='100%'
    height='100%'
    top='0'
    left='0'
    justify='flex-end'
    align='flex-start'
    py='1'
    px='2'
  )
    CText(
      v-if='health > 1 && percentComplete > 0' 
      fontSize='xl' 
      fontWeight='700' 
      :style='percentStyle'
    )
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
import { mapState } from 'vuex'

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
        explore: '#D4CDF4',
        door: '#7F3900',
        crate: '#F7B32B',
        vase: '#F06543',
      }
    }
  },
  computed: {
    ...mapState('player', {
      playerDamage (state) { return state.damage }
    }),
    percentComplete () {
      let percent = this.damage / this.health * 100
      if (percent > 100) percent = 100

      return Math.floor(percent)
    },
    progressColor () {
      return this.adjustHexSL(
        this.actionColorMap[this.type],
        100,
        85
      )
    },
    backgroundColor () {
      return this.adjustHexSL(
        this.actionColorMap[this.type],
        75,
        97.5
      )
    },
    shadowColor () {
      return this.adjustHexSL(
        this.actionColorMap[this.type],
        75,
        65
      )
    },
    labelColor () {
      return this.adjustHexSL(
        this.actionColorMap[this.type],
        75,
        25
      )
    },
    buttonStyle () {
      return {
        background: this.complete ? '' : this.backgroundColor,
        'box-shadow': `0 2px 0 0 ${this.shadowColor}`,
        'border-color': this.shadowColor
      }
    },
    labelStyle () {
      return {
        color: this.labelColor
      }
    },
    percentStyle () {
      return {
        color: this.shadowColor
      }
    },
    progressBarStyle () {
      return {
        background: this.progressColor,
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
      this.damage += this.playerDamage

      if (this.damage >= this.health) {
        this.complete = true
        this.$emit('complete')
        this.$store.dispatch('player/applyXP', this.health)
      }
    }
  }
}
</script>
