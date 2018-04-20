<template>
  <ul class="side-bar-wrap box-shadow">
    <li v-for="(item,index) in sideList" :class="{active:selected==index}" @click="chooseDashboard(index)">{{item}}</li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "sidebar",
    data() {
      return {
        selected: 0,
        sideList: [
          'OVERVIEW',
          'CAMPAIGN',
          'COM.CN',
          'CRM',
          'RATING & REVIEW',
          'EC REPORT',
        ]
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted(){
        this.$Hub.$on('setSiderBarIndex',()=>{
          this.selected = -1
        })
    },
    methods: {
      chooseDashboard(index) {
        this.$Hub.$emit('closeSetting')
        let typeVal
        this.selected = index
        if(index==0){
          typeVal = 0
        }else if(index==1){
          typeVal = 5
        }else if(index==2){
          typeVal = 8
        }else if(index==3){
          typeVal = 10
        }else if(index==4){
          typeVal = 12
        }else if(index==5){
          typeVal = 14
        }
        this.voluation(typeVal)
        this.$Hub.$emit('wheelDown')
      },
      voluation(val){
        this.$store.commit('voluation',val)
      }
    },
    watch:{
      type: function (val) {
        if(val<5){
          this.selected = 0
        }else if(val===5){
          this.selected = 1
        }else if(val===6){
          this.selected = 1
        }else if(val===7){
          this.selected = 1
        }else if(val===8){
          this.selected = 2
        }else if(val===9){
          this.selected = 2
        }else if(val===10){
          this.selected = 3
        }else if(val===11){
          this.selected = 3
        }else if(val===12){
          this.selected = 4
        }else if(val===13){
          this.selected = 4
        }else if(val===14){
          this.selected = 5
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .side-bar-wrap
    position absolute
    top 119px
    bottom 0
    left 0
    width 280px
    float left
    line-height 120px
    background #2F7BC0
    background linear-gradient(to bottom, #2061AE, #2F81C4)
    border-radius 10px 10px 0 0
    text-align center
    overflow hidden
    color #fff
    font-size 24px
    li
      cursor pointer
      background url("../../assets/img/sidebarBg.png") no-repeat left bottom
      &.active
        background url("../../assets/img/sidebarBg_active.png") no-repeat center
        transition: all .3s linear
</style>
