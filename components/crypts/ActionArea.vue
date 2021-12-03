<template lang='pug'>
CTooltip(
  :label='actionTextMap[type]'
  minH='0'
)
  CPseudoBox(as='button'
    ref='actionArea'
    h='100%' 
    w='100%' 
    position='relative' 
    rounded='lg'
    border='1px'
    overflow='hidden'
    :style='areaStyle'
    @mouseup='handleClick'
    :disabled='complete'
  )
    CFlex(
      pos='absolute'
      z-index='6'
      width='100%'
      height='100%'
      top='0'
      left='0'
      direction='column'
      justify='center'
      align='center'
      py='2'
      px='3'
    )
      //- CText(:style='labelStyle')
        | {{ actionTextMap[type] }}
      CText(fontSize='2xl' fontWeight='500')
        | {{ actionIconMap[type] }}

    CFlex(
      pos='absolute'
      z-index='5'
      width='100%'
      height='100%'
      top='0'
      left='0'
      justify='center'
      align='center'
      py='1'
      px='2'
    )
      CText(
        v-if='health > 1 && percentComplete > 0' 
        :style='percentStyleOuter'
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
      CFlex(

      )
        CText(
          v-if='health > 1 && percentComplete > 0' 
          :style='percentStyleInner'
        )
          | {{ percentComplete }}%

    //- Instant progress bar
    CBox(
      h='100%'
      pos='absolute'
      z-index='1'
      :style='progressBarInstantStyle'
    )
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

const completeAnimDuration = 250

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
        key: '🗝',
        locked: '🔒',
        shrine: '🗿',
      },
      actionTextMap: {
        explore: 'Explore',
        door: 'Door',
        crate: 'Crate',
        vase: 'Vase',
        key: 'Key',
        shrine: 'Shrine',
      },
      actionColorMap: {
        explore: '#99D19C',
        door: '#212227',
        crate: '#F7B32B',
        vase: '#F06543',
        shrine: '#F06543',
        key: '#81C3D7',
      }
    }
  },
  computed: {
    ...mapState(['dragging']),
    ...mapState('player', {
      playerDamage (state) { return state.attributes.strength }
    }),
    ...mapGetters('crypts', ['findRoom']),
    percentComplete () {
      let percent = this.damage / this.health * 100
      if (percent > 100) percent = 100

      return Math.floor(percent)
    },
    backgroundColor () {
      return this.adjustHexSL(
        this.actionColorMap[this.type],
        75,
        98
      )
    },
    shadowColor () {
      return this.adjustHexSL(
        this.actionColorMap[this.type],
        75,
        30
      )
    },
    areaStyle () {
      return {
        background: this.backgroundColor,
        'box-shadow': `0 2px 0 0 ${this.shadowColor}`,
        'border-color': this.shadowColor,
        transform: this.complete ? `scale(1.25)` : 'scale(1)',
        opacity: this.complete ? 0 : 1,
        transition: `all ${completeAnimDuration}ms`,
      }
    },
    labelStyle () {
      return {
        'font-size': '64px',
        'font-weight': 900,
        color: this.adjustHexSL(
          this.actionColorMap[this.type],
          65,
          65,
        )
      }
    },
    percentStyle () {
      return {
        'font-size': '64px',
        'font-weight': 900,
      }
    },
    percentStyleOuter () {
      return {
        ...this.percentStyle,
        color: this.actionColorMap[this.type],
      }
    },
    percentStyleInner () {
      return {
        ...this.percentStyle,
        color: this.backgroundColor,
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
    ...mapMutations('player', ['ADD_KEY']),
    ...mapMutations('crypt', ['UPDATE_ROOM']),
    handleClick() {
      if (this.dragging) return

      this.$emit('click')

      this.damage += this.playerDamage

      if (this.damage >= this.health) {
        this.complete = true
        
        setTimeout(() => {
          this.$emit('complete')
          this.$store.dispatch('player/applyXP', this.health)

          if (this.type === 'key')
            this.ADD_KEY()
        }, completeAnimDuration)

      }
    }
  }
}
</script>
