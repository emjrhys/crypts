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
  @mouseup='handleClick'
  :disabled='complete'
)
</template>