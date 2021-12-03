<template lang='pug'>
CModal(
  :is-open='active'
  :on-close='close'
  :block-scroll-on-mount='true'
)
  CModalContent(
    ref='content'
    rounded='lg'
    h='80%'
  )
    CModalHeader
      | Modal Title

    CModalBody
      CFlex(
        justify='space-between'
        align='center'
      )
        CText
          | {{ upgradePoints.attribute }} AP

        CText
          | {{ upgradePoints.skill }} SP

        CText
          | {{ upgradePoints.call }} CP

    CModalFooter
      CFlex
      CButton(
        variant-color='blue'
        mr='3'
        @click='active = false'
      )
        | Close

      CButton Secondary Action

  CModalOverlay 
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UpgradeModal',
  props: ['value'],
  computed: {
    ...mapState('player', ['level', 'upgradePoints']),
    active: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    close () {
      this.active = false
    }
  }
}
</script>