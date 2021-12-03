<template lang='pug'>
CFlex(
  direction='column'
  justify='space-between'
  align='center'
  border-width='1px'
  rounded='lg'
  py='10'
  px='10'
)
  CFlex(direction='column' align='center' textAlign='center')
    CText(fontSize='3xl' fontWeight='700') {{ crypt.name.parts.structure }}
    CText(fontSize='xl' fontWeight='700') of the
    CText(fontSize='4xl' lineHeight='1' fontWeight='700') {{ crypt.name.parts.adjective }} {{ crypt.name.parts.subject }}

  CFlex(mt='8' align='center')
    CButton(
      v-if='crypt.unlocked'
      variant-color='blue'
      @click='explore'
    )
      | Enter

    CButton(
      v-else
      :variant-color='crypt.cost > money ? "gray" : "yellow"'
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