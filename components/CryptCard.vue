<template lang='pug'>
CBox(
  align='left'
  border-width='1px'
  rounded='md'
  mb='2'
  px='3'
  py='2'
)
  CFlex(direction='column' justify='space-between' align='center')
    CHeading(as='h2') {{ crypt.name.parts.structure }}
    CHeading(as='h5') of the
    CHeading(as='h1') {{ crypt.name.parts.adjective }} {{ crypt.name.parts.subject }}

    CFlex(align='center')
      CButton(
        v-if='crypt.unlocked'
        variant-color='green'
        @click='explore'
      )
        | Explore

      CButton(
        v-else
        mt='3'
        @click='purchase' 
        :disabled='crypt.cost > money'
      )
        | {{ $formatCurrency(crypt.cost) }}
      
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CryptCard',
  props: ['crypt'],
  computed: {
    ...mapState('player', ['money'])
  },
  methods: {
    purchase () {
      this.$store.dispatch('crypts/purchaseCrypt', { id: this.crypt.id })
    }, 
    explore () {
      this.$router.push(`/explore/${this.crypt.id}`)
    }
  }
}
</script>