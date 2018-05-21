<template>
  <div class="cover-page-wrap">
    <div class="table-nav clearfix">
      <h3><i class="color-line color"></i>Cover Page</h3>
      <div class="tool-box clearfix">
        <div class="icon-box">
          <span class="qrcode" @mouseenter="qrcodeShow" @mouseleave="qrcodeHide">
              <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
              <div class="qrcode-warp" v-show="isQrShow">
                <div class="qrcodeCanvas"></div>
                <span>Please scan the QR code</span>
        </div>
        </span>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="wrap">
      <p class="one">Philips One China Digital Dashboard</p>
      <p class="two"><span>{{time}}</span> Performance Review</p>
      <p class="three"><span @click="incrementType">Start here <svg-icon sign="icon-right" class="arrow-right"></svg-icon></span></p>
      <p class="four">BC&D China</p>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "cover-page",
    data() {
      return {
        time: '',
        isQrShow: false,
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      getYearMonth() {
        return this.$store.getters.getYearMonth
      }
    },
    mounted() {
      this.getTime()
    },
    methods: {
      incrementType() {
        this.$router.push({
          name: 'overview'
        })
        this.$store.commit('increment')
      },
      getTime() {
        let val = this.getYearMonth
        this.time = val.slice(0, 4) + '/' + val.slice(4, 6)
      },
      qrcodeShow() {
        let nowTime, baseUrl;
        let nowDateYear = new Date().getFullYear()
        let nowDateMonth = new Date().getMonth() + 1
        if (nowDateMonth < 10) {
  
          nowTime = nowDateYear + '0' + nowDateMonth
  
        } else {
  
          nowTime = nowDateYear.toString() + nowDateMonth.toString()
  
        }
        if(QRCODE_URL){
          baseUrl = `http://www.philipsreport.cn`;
        }else{
          baseUrl = `${window.location}`;
        }
        $('.qrcodeCanvas').html('')
        $('.qrcodeCanvas').qrcode({
          width: 150,
          height: 150,
          text: baseUrl
        });
        this.isQrShow = true
      },
      qrcodeHide() {
        this.isQrShow = false
      },
    },
    watch: {
      getYearMonth() {
        this.getTime()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  @import "../appmain/appmain.styl"
  .cover-page-wrap
    position relative
    .table-nav
      .color-line
        &.color
          background-color #a6a6a6
    .content
      position fixed
      top 136px
      bottom 0
      left 60px
      right 60px
      background url("../../assets/img/bglog.png") center center no-repeat
      background-size cover
      text-align center
      .wrap
        e-pos(top:50%,y:-50%)
        left 0
        right 0
      .one
        font-size 45px
      .two
        font-size 40px
        padding-top 40px
        span
          color #2E75B6
      .three
        font-size 40px
        padding-top 60px
        padding-bottom  60px
        span
          cursor pointer
      .four
        font-size 30px
        padding-top 50px
        color: #7F7F7F
      .arrow-right
        font-size 55px
        margin-left 10px
  @media screen and (max-device-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .content
      top 216px!important
      bottom 0!important
      left 10px!important
      right 10px!important
      .one
        font-size 35px!important
      .two
        font-size 30px!important
        padding-top 40px!important
      .three
        font-size 30px!important
        padding-top 50px!important
        padding-bottom  50px!important
        cursor pointer
      .four
        font-size 30px!important
        padding-top 50px!important
</style>
