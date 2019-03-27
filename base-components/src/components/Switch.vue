<template>
  <button type="button" role="switch" id="switch">
    <span>开</span>
  </button>
</template>
<script>
export default {

}
</script>
<style lang='stylus' scoped>
#switch
  margin 0
  padding 0
  color rgba(0,0,0,0.65)
  font-size 14px
  font-variant tabular-nums
  line-height 1.5
  list-style none
  font-feature-settings 'tnum'
  position relative
  display inline-block
  box-sizing border-box
  min-width 44px
  height 22px
  line-height 20px
  vertical-align middle
  background-color rgba(0,0,0,0.25)
  border 1px solid transparent
  border-radius 100px
  cursor pointer
  transition all .36s
  user-select none
</style>    