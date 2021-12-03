<template lang='pug'>
CPseudoBox(as='button'
  w='100%'
  maxW='20rem'
  :style='cardStyle'
  pt='3'
  px='5'
  pb='4'
  @click='playerModalOpen = true'
)
  CFlex(direction='column' align='stretch' justify='center')
    CFlex(direction='row' justify='space-between' align='center' mb='1')
      CHeading(size='sm')
        | Level {{ level }}

      CText
        | {{ colorMode }}

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

  UpgradeModal(v-model='playerModalOpen')
</template>

<script>
import { mapState } from 'vuex'

import UpgradeModal from '~/components/player/UpgradeModal'

export default {
  name: 'PlayerCard',
  components: {
    UpgradeModal
  },
  inject: ['$chakraColorMode'],
  data () {
    return {
      playerModalOpen: false,
      color: '#127DF8',
    }
  },
  computed: {
    ...mapState('player', ['level', 'xp', 'xpToNextLevel', 'xpToPrevLevel', 'money', 'keys']),
    progressToNextLevel () {
      return (this.xp - this.xpToPrevLevel) / (this.xpToNextLevel - this.xpToPrevLevel) * 100
    },
    colorMode () {
      return this.$chakraColorMode()
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