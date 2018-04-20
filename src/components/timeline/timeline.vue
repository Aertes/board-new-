<template>
  <div class="timeline-wrap">
    <i class="line"></i>
    <div class="time-month">
      <span v-for="(item,index) in line" :class="{active:selected==index}" @click="chooseMonth(index)">{{ item }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "TimeLine",
    data() {
      return {
        selected:0,
        line: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    computed: {
      getMoth() {
        return this.$store.state.month
      }
    },
    mounted(){
      /*const getMoth = new Date().getMonth().toString()*/
      this.getTimeMonth()
    },
    methods: {
      chooseMonth(index) {
        const getMoth = (index+1).toString()
        this.selected = index
        this.$store.commit('monthVoluation',index+1)
        //this.$Hub.$emit('monthChange',getMoth)
      },
      getTimeMonth(){
        this.selected = (this.getMoth-1)
      }
    },
    watch:{
      getMoth:function () {
        this.getTimeMonth()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .timeline-wrap
    position relative
    float right
    width 70px
    height 650px
    .line
      display block
      width 2px
      height 650px
      background-color #D1D1D2
    .time-month
      position absolute
      width 100%
      height 100%
      left 0
      top -47px
      span
        position absolute
        left 0
        left 50%
        width 30px
        height 30px
        margin-left -15px
        line-height 27px
        font-size 16px
        border 1px solid #c9caca
        border-radius 50%
        color #c9caca
        background-color #F2F2F2
        text-align center
        cursor pointer
        for row in 1 2 3 4 5 6 7 8 9 10 11 12
          &:nth-child({row})
            top 55px * row
      .active
        width 42px
        height 42px
        line-height 41px
        left 50%
        font-size 23px
        color #fff
        margin-top -8px
        margin-left -21px
        border medium
        background url("../../assets/img/timeline_active.png") no-repeat center #F2F2F2
        background-size cover
        transition: all .2s linear
        -ms-transition: all .2s linear
</style>
