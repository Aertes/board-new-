<template>
  <div class="dropdown-wrap" v-click-outside="toggleUp"><!--@blur="toggleUp"-->
    <div class="dropdown-show" @click="toggleDrop">
      <span ref="span" :data-id="selectionsId[nowIndex]" class="j-select-val">{{selections[nowIndex]}}</span>
      <svg-icon sign="icon-arrow-down" class="arrow-down"></svg-icon>
    </div>
    <ul class="dropdown-menu" v-show="isShow">
      <li v-for="(items,index) in selections" @click="chooseSelection(index)" class="j-select-val-list">{{items}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import ClickOutside from '../../assets/js/clickoutside';
  export default {
    name: "selection",
    directives: {
      ClickOutside
    },
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
      selectionsId: {
        type: Array,
        default: () => ['0']
      },
      perm: {
        type: Boolean,
        default: () => false
      },
    },
    mounted() {
    },
    methods: {
      toggleDrop() {
        if (this.perm) return
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
        this.$emit('selectShow', {val: this.selections[this.nowIndex], id: this.nowIndex, dataId: this.selectionsId[this.nowIndex]})
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
    background-color #00B0F0
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
        position relative
        display inline-block
        padding-left 15px
        padding-right 40px
        appearance none
        z-index 20
    .dropdown-menu
      position absolute
      top 41px
      min-width 100%
      font-size 20px
      color #fff
      line-height 40px
      z-index 10
      white-space: nowrap;
      border 1px solid #D9D9D9
      text-align center
      z-index 99999992
      li
        padding 0 10px
        background-color #fff
        color #808080
        border-bottom 1px solid #D9D9D9
        cursor: pointer
        &:last-of-type
          border-bottom medium
        &:hover
          background-color #12BCFF
          color #fff

  .select-colorOrange
    background-color #FFC000
    .dropdown-menu
      li
        background-color #fff
        &:hover
          background-color #FFC000
          color #fff

  .select-colorDarkseaGreen
    background-color #92D050
    .dropdown-menu
      li
        background-color #fff
        &:hover
          background-color #92D050
          color #fff

  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .dropdown-wrap
      height 60px !important
      line-height 60px !important
      .dropdown-show
        font-size 23px !important

    .dropdown-menu
      top 61px !important
      line-height 60px !important
      font-size 23px !important
</style>
