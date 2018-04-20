<template>
  <div class="app-wrapper">
    <span @click="decrementType" v-if="type!=1"><svg-icon sign="icon-arrow-left" class="arrow-left"></svg-icon></span>
    <span @click="incrementType" v-if="this.type!=1 && this.type!=7"><svg-icon sign="icon-arrow-right" class="arrow-right"></svg-icon></span>
    <nav-bar></nav-bar>
    <div class="clear">
      <app-main></app-main>
    </div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <bottom v-if="isCoverPage"></bottom>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import NavBar from '../navbar/navbar'
  import AppMain from '../appmain/appmain'
  import Bottom from '../bottom/bottom'

  export default ({
    data() {
      return {
        isCoverPage: true,
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
      },
      typesOfName() {
        return this.$store.getters.typesOfName
      }
    },
    mounted() {

      this.hideHighlight()

      this.setType()

    },
    methods: {
      hideHighlight() {
        if (this.$route.name == 'coverpage') {
          this.isCoverPage = false
        } else {
          this.isCoverPage = true
        }
      },
      setType(){
        let name = this.$route.name
        switch(name){
          case 'coverpage':
            this.$store.commit('voluation',1)
            break;
          case 'overview':
            this.$store.commit('voluation',2)
            break;
          case 'campaign':
            this.$store.commit('voluation',3)
            break;
          case 'dotcom':
            this.$store.commit('voluation',4)
            break;
          case 'crm':
            this.$store.commit('voluation',5)
            break;
          case 'ratingreview':
            this.$store.commit('voluation',6)
            break;
          case 'ecommerce':
            this.$store.commit('voluation',7)
            break;
        }
      },
      setRouter(){
        let type = this.type
        switch(type){
          case 1:
            this.$router.push({name: 'coverpage'})
            break;
          case 2:
            this.$router.push({name: 'overview'})
            break;
          case 3:
            this.$router.push({name: 'campaign'})
            break;
          case 4:
            this.$router.push({name: 'dotcom'})
            break;
          case 5:
            this.$router.push({name: 'crm'})
            break;
          case 6:
            this.$router.push({name: 'ratingreview'})
            break;
          case 7:
            this.$router.push({name: 'ecommerce'})
            break;
        }
      },
      incrementType() {
        this.$store.commit('increment')
      },
      decrementType() {
        this.$store.commit('decrement')
      }
    },
    watch: {
      $route() {
        this.hideHighlight()
      },
      type() {
        this.setRouter()
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
