<template lang='pug'>
CBox(
  w='100%'
  maxW='20rem'
  :style='cardStyle'
  pt='3'
  px='5'
  pb='4'
)
  CFlex(direction='column' align='stretch' justify='center')
    CFlex(direction='row' justify='space-between' align='center' mb='1')
      CHeading(size='sm')
        | Level {{ level }}

      CFlex(align='center')
        CText(fontSize='sm' fontWeight='600' :style='walletStyle')
          | {{ $formatCurrency(money) }}

        CText(fontSize='xs' fontWeight='600' :style='walletStyle' ml='2')
          | 🗝️

        CText(fontSize='sm' fontWeight='600' :style='walletStyle' ml='2')
          | {{ keys }}
    
    CProgress(
      :value='progressToNextLevel' 
      h='4px' 
      rounded='sm'
      color='gray'
      :style='progressStyle'
    )
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PlayerCard',
  data () {
    return {
      color: '#127DF8'
    }
  },
  computed: {
    ...mapState('player', ['level', 'xp', 'xpToNextLevel', 'xpToPrevLevel', 'money', 'keys']),
    progressToNextLevel () {
      return (this.xp - this.xpToPrevLevel) / (this.xpToNextLevel - this.xpToPrevLevel) * 100
    },
    cardStyle () {
      return {
        background: this.adjustHexSL(this.color, 65, 97),
        'border-color': this.adjustHexSL(this.color, 65, 85),
        'border-radius': '10px',
        color: this.adjustHexSL(this.color, 75, 20)
      }
    },
    progressStyle () {
      return {
        background: '#fff'
      }
    },
    walletStyle () {
      return {
        // color: this.adjustHexSL('#F7B32B', 100, 20)
      }
    }
  }
}
</script>