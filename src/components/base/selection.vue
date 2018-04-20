<template>
  <a href="javascript:;" class="dropdown-wrap" @blur="toggleUp">
    <div class="dropdown-show" @click="toggleDrop">
      <span ref="input" :data-id="selectionsId[nowIndex]">{{selections[nowIndex]}}</span>
      <svg-icon sign="icon-arrow-down" class="arrow-down"></svg-icon>
    </div>
    <ul class="dropdown-menu" v-show="isShow">
      <li v-for="(items,index) in selections" @click="chooseSelection(index)">{{items}}</li>
    </ul>
  </a>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "selection",
    data() {
      return {
        isShow: false,
        nowIndex: 0
      }
    },
    props: {
      selections: {
        type: Array,
        default: () => ['test']
      },
      selectionsId:{
        type: Array,
        default: () => ['0']
      },
      perm:{
        type:Boolean,
        default: ()=> false
      }
    },
    methods: {
      toggleDrop() {
        if(this.perm) return
        this.isShow = !this.isShow
      },
      toggleUp(e) {
        this.isShow = false
      },
      chooseSelection(index) {
        this.nowIndex = index
        this.isShow = false
      }
    },
    watch: {
      nowIndex: function () {
        this.$emit('selectShow', this.selections[this.nowIndex])
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin'
  .dropdown-wrap
    position relative
    display inline-block
    height 40px
    line-height 40px
    outline none
    color #fff
    background-color #00B0F0/*修改的*/
    border-radius 5px
    vertical-align top
    .dropdown-show
      position relative
      cursor pointer
      font-size 20px
      .arrow-down
        e-pos(top:50%, y:-50%)
        right 10px
      span
        display inline-block
        padding-left 15px
        padding-right 40px
        appearance none
    .dropdown-menu
      position absolute
      top 41px
      min-width 100%
      font-size 20px
      color #fff
      line-height 40px
      z-index 10
      li
        padding 0 10px
        background-color #00B0F0 //修改的
        border-bottom 1px solid #eaeaea
        border-radius 5px
        cursor: pointer
        &:last-of-type
          border-bottom medium
        &:hover
          opacity .8
  .select-colorOrange
    background-color #FFC000
    .dropdown-menu
      li
        background-color #FFC000
  .select-colorDarkseaGreen
    background-color #92D050
    .dropdown-menu
      li
        background-color #92D050

  @media screen and (max-width: 1235px)
    .dropdown-wrap
      height 60px!important
      line-height 60px!important
      .dropdown-show
        font-size 23px!important
    .dropdown-menu
      top 61px!important
      line-height 60px!important
      font-size 23px!important
</style>
