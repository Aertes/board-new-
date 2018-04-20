<template>
  <div class="nav-bar-wrap clearfix">

    <div class="pc-nav-bar clearfix">
      <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></div>
      <h1>One China Digital Performance Dashboard</h1>
      <div class="selection-box">
        <selection :selections="yearList" ref="yearBox"></selection>
        <selection :selections="monthList" ref="monthBox"></selection>
      </div>
      <div class="page">
        Page <span>{{type}}</span>/7
      </div>
      <div class="user-info">
        <div class="after-login">
          <svg-icon sign="icon-upload" class="upload-icon"></svg-icon>
          <svg-icon sign="icon-setting" class="setting-icon"></svg-icon>
          <svg-icon sign="icon-user" class="user-icon"></svg-icon>
          <svg-icon sign="icon-turn-off" class="turn-off-icon"></svg-icon>
          <div class="user-operation-hover">
            <svg-icon sign="icon-more" class="more-icon"></svg-icon>
            <div class="user-operation box-shadow">
              <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
              <div class="a-wrap">
                <a href="javascript:;" @click="linkTo('coverpage',1)">
                  <i class="color-line color1"></i>
                  <span>Cover Page</span>
                </a>
                <a href="javascript:;" @click="linkTo('overview',2)">
                  <i class="color-line color2"></i>
                  <span>Overview</span>
                </a>
                <a href="javascript:;" @click="linkTo('campaign',3)">
                  <i class="color-line color3"></i>
                  <span>Campaign</span>
                </a>
                <a href="javascript:;" @click="linkTo('dotcom',4)">
                  <i class="color-line color4"></i>
                  <span>Dotcom</span>
                </a>
                <a href="javascript:;" @click="linkTo('crm',5)">
                  <i class="color-line color5"></i>
                  <span>CRM</span>
                </a>
                <a href="javascript:;" @click="linkTo('ratingreview',6)">
                  <i class="color-line color6"></i>
                  <span>Rating & Review</span>
                </a>
                <a href="javascript:;" @click="linkTo('ecommerce',7)">
                  <i class="color-line color7"></i>
                  <span>eCommerce</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile-nav-bar">
      <div class="clearfix">
        <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></div>
        <h1>One China Digital Performance Dashboard</h1>
        <div class="user-info">
          <div class="after-login">
            <span @click="sideSlideShow"><svg-icon sign="icon-more" class="more-icon"></svg-icon></span>
            <div class="user-operation user-operation-mobile box-shadow" :class="{active:sideSlide}">
              <p class="title">
                <svg-icon sign="icon-date"></svg-icon>
                <span>REPORT NAVIGATION</span>
              </p>
              <div class="a-wrap">
                <a href="javascript:;" @click="linkTo('coverpage',1)">
                  <i class="color-line color1"></i>
                  <span>Cover Page</span>
                </a>
                <a href="javascript:;" @click="linkTo('overview',2)">
                  <i class="color-line color2"></i>
                  <span>Overview</span>
                </a>
                <a href="javascript:;" @click="linkTo('campaign',3)">
                  <i class="color-line color3"></i>
                  <span>Campaign</span>
                </a>
                <a href="javascript:;" @click="linkTo('dotcom',4)">
                  <i class="color-line color4"></i>
                  <span>Dotcom</span>
                </a>
                <a href="javascript:;" @click="linkTo('crm',5)">
                  <i class="color-line color5"></i>
                  <span>CRM</span>
                </a>
                <a href="javascript:;" @click="linkTo('ratingreview',6)">
                  <i class="color-line color6"></i>
                  <span>Rating & Review</span>
                </a>
                <a href="javascript:;" @click="linkTo('ecommerce',7)">
                  <i class="color-line color7"></i>
                  <span>eCommerce</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="clearfix tools-wrap">
        <div class="selection-box">
          <selection :selections="yearList" ref="yearBoxM"></selection>
          <selection :selections="monthList" ref="monthBoxM"></selection>
        </div>
        <div class="page fr">
          Page <span>{{type}}</span>/7
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "NavBar",
    data() {
      return {
        yearList: ['2018'],
        monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        sideSlide: false,
        pageNum: 1
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      getYearMonth() {
        return this.$store.getters.getYearMonth
      },
      getYear() {
        return this.$store.state.year
      },
      getMonth() {
        return this.$store.state.month
      }
    },
    mounted() {

      this.getTimeMonth()

    },
    methods: {

      sideSlideShow() {

        this.sideSlide = !this.sideSlide

      },

      linkTo(val,typeNum) {

        this.$router.push({name: val})

        this.$store.commit('voluation',typeNum)

        this.sideSlide = false

      },

      getTimeMonth() {

        this.$refs.monthBox.nowIndex = this.getMonth

        this.$refs.monthBoxM.nowIndex = this.getMonth

      }
    },
    watch: {
      getMonth() {
        this.getTimeMonth()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';
  .nav-bar-wrap
    margin-bottom 20px
    line-height 56px
    .logo
      float left
      width 110px
      height 56px
      img
        width 100%
        height 100%
    h1
      float left
      margin 0 35px 0 25px
      font-size 25px
      color #a0a0a1
      font-weight normal
      text-shadow 1px 1px 2px rgba(173, 160, 161, 0.6)
    .selection-box
      float left
      .dropdown-wrap
        margin-top 8px
        &:last-of-type
          margin-left 10px
    .mobile-nav-bar
      .more-icon
        font-size 50px !important
        margin-left 0 !important
    .mobile-nav-bar
      display none
    .tools-wrap
      margin-top 20px
      line-height 50px
      .selection-box
        .dropdown-wrap
          margin-top 0
    .page
      float left
      font-size 22px
      margin-left 35px
      color #B5B5B5
      &.fr
        float right
    .user-info
      float right
      color #2061AE
      .after-login
        position relative
        cursor pointer
        .icon
          font-size 23px
          margin-left 15px
        .upload-icon
          font-size 27px
        .user-icon
          font-size 23px
        .user-operation-hover
          display inline-block
          &:hover
            .user-operation
              display block
        .user-operation
          position absolute
          right -24px
          top 60px
          line-height 50px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 99999
          display none
          .a-wrap
            border-radius 10px
            overflow hidden
            a
              display block
              padding 0 20px
              border-bottom 1px solid #E8E9E9
              &:last-of-type
                border-bottom medium
              &:hover
                background-color #fff
          .color-line
            display inline-block
            width 8px
            height 26px
            vertical-align middle
            &.color1
              background-color #A6A6A6
            &.color2
              background-color #D9D9D9
            &.color3
              background-color #9DC3E6
            &.color4
              background-color #FFC000
            &.color5
              background-color #CC99FF
            &.color6
              background-color #C5E0B4
            &.color7
              background-color #FF89B9
          span
            margin-left 10px
            font-size 18px
            color #A0A0A1
            vertical-align middle
          .triangle
            position absolute
            top -15px
            right 13px
            width 44px
            height 15px
        .user-operation-mobile
          position fixed
          top 0
          bottom 0
          left 0
          right auto
          display block
          width 50%
          transform translateX(-110%)
          transition transform .2s linear
          line-height 70px
          border-radius 0
          span
            font-size 26px
          &.active
            transform translateX(0)
          .title
            span
              font-size 28px
          .a-wrap
            a
              padding-left 40px
              &:hover
                background-color #F5F6F8
              &.link-active
                span
                  color #00B0F0

  #editPassword
    width 700px
    .tables-title
      position: relative
      padding-left: 45px
      font-size: 30px
      line-height: 80px
      height 60px
      color: #a0a0a1
      .icon
        e-pos(top:50%, y:-50%)
        right: 25px
        font-size: 30px
        color: #A0A0A1
        cursor: pointer
    .resg
      padding 0 60px 0 50px
      div
        height 50px
        line-height 50px
        width 100%
        margin 20px 0
        label
          font-size 22px
          display inline-block
          width 40%
          float left
          color #a0a0a1
        input
          width 60%
          height 100%
          padding-left 10px
          padding-right 35px
          appearance none
          border 1px solid #E2DFDE
          border-radius 5px
          font-size 21px
          float right
        .active
          border-color: #e78b70
    .submit-btn
      text-align center
      button
        height 40px
        background-color #2061AE
        border-radius 10px
        color #fff
        border medium
        outline none
        cursor pointer
        padding 0 20px
        font-size 24px
      .confirm
        margin-right 10px
      .cancel
        margin-left 10px
        background-color #ccc

  @media screen and (max-width: 1235px)
    .pc-nav-bar
      display none

    .mobile-nav-bar
      display block !important
</style>
