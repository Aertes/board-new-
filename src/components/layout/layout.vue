<template>
  <div class="app-wrapper">
    <svg-icon sign="icon-arrow-left" class="arrow-left"></svg-icon>
    <svg-icon sign="icon-arrow-right" class="arrow-right"></svg-icon>
    <nav-bar></nav-bar>
    <div class="clear">
      <app-main></app-main>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import NavBar from '../navbar/navbar'
  import AppMain from '../appmain/appmain'
  import Bottom from '../bottom/bottom'

  export default ({
    data() {
      return {}
    },
    props: {
      routes: {
        type: Array
      }
    },
    components: {
      NavBar,
      AppMain,
      Bottom
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {
      //console.log(this.routes.name)
    },
    methods: {},
    watch:{
      $route() {
        console.log(this.$route)
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl'
  .app-wrapper
    padding 0 60px
    .arrow-right
    .arrow-left
      position fixed
      top 50%
      transform translateY(-50%)
      color #2498F3
      font-size 55px
      cursor pointer
    .arrow-right
      right 0
    .arrow-left
      left 0

  @media screen and (max-width: 1235px)
    .app-wrapper
      padding 0 10px
    .arrow-right
    .arrow-left
      display none
</style>
