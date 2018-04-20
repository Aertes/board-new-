<template>
    <div class="cover-page-wrap">
      <div class="table-nav clearfix">
        <h3><i class="color-line color"></i>Cover Page</h3>
      </div>
      <div class="content">
        <p class="one">Philips One China Digital Dashboard</p>
        <p class="two"><span>2018/03</span> Performance Review</p>
        <p class="three" @click="incrementType">Start here <span  ><svg-icon sign="icon-link" class="arrow-right"></svg-icon></span></p>
        <p class="four">BC&D China</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "cover-page",
    data(){
      return {

      }
    },
    type() {
      return this.$store.state.type
    },
    mounted() {
    },
    methods: {
      incrementType() {
        this.$router.push({name:'overview'})
        this.$store.commit('increment')
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
  .cover-page-wrap
    position relative
    .table-nav
      .color-line
        &.color
          background-color #a6a6a6
    .content
      background url("../../assets/img/bglog.png") center center no-repeat
      background-size cover
      text-align center
      .one
        font-size 35px
        padding-top 150px
      .two
        font-size 30px
        padding-top 20px
        span
          color #2E75B6
      .three
        font-size 30px
        padding-top 40px
        padding-bottom  60px
        width 200px
        cursor pointer
      .four
        font-size 30px
        padding-top 20px
        padding-bottom  80px
        color: #7F7F7F

</style>
