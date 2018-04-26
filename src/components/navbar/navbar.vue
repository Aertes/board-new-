<template>
  <div class="nav-bar-wrap clearfix">

    <div class="pc-nav-bar clearfix">
      <a href="javascript:;"  class="logo box-shadow"  @click="linkTo('coverpage',1)"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></a>
      <h1>One China Digital Performance Dashboard</h1>
      <div class="selection-box">
        <selection :selections="yearList" ref="yearBox"></selection>
        <selection :selections="monthList" ref="monthBox" @selectShow="selectShowHandle"></selection>
      </div>
      <div class="page">
        Page <span>{{type}}</span>/7
      </div>
      <div class="user-info">
        <div class="after-login">
          <span  title="Upload"><svg-icon sign="icon-upload" class="upload-icon" :class="{none:isUser}"></svg-icon></span>
          <span  title="Setting"><svg-icon sign="icon-setting" class="setting-icon" :class="{none:isUser}" title="Setting"></svg-icon></span>
          <div class="user-operation-hover" :class="{noHover:isUser}">
            <span @click="goToLogin"><svg-icon sign="icon-user" class="user-icon"></svg-icon></span>
            <div class="user-operation box-shadow">
              <img src="../../assets/img/triangle.png" alt="triangle" class="triangle">
              <div class="a-wrap">
                <a href="javascript:;" @click="showEditPass">
                  <i class="color-line color7"></i>
                  <span>PROFILE</span>
                </a>
              </div>
            </div>
          </div>
          <span @click="outLogin" title="Out Login"><svg-icon sign="icon-turn-off" class="turn-off-icon" :class="{none:isUser}"></svg-icon></span>
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
        <a href="javascript:;"  class="logo box-shadow"  @click="linkTo('coverpage',1)"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></a>
        <h1>One China Digital Performance Dashboard</h1>
        <div class="user-info">
          <div class="after-login user-operation-mobile-wrap" :class="{active:sideSlide}">
            <i class="shadow-cover" @click="sideSlideShow"></i>
            <span @click="sideSlideShow"><svg-icon sign="icon-more" class="more-icon"></svg-icon></span>
            <div class="user-operation user-operation-mobile" :class="{active:sideSlide}">
              <p class="title">
                <svg-icon sign="icon-addr" class="addr-icon"></svg-icon>
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
          <selection :selections="monthList" ref="monthBoxM" @selectShow="selectShowHandle"></selection>
        </div>
        <div class="page fr">
          Page <span>{{type}}</span>/7
        </div>
      </div>

    </div>

    <div class="tables-wrap" id="editPassword" v-show="isShow">
      <div class="tables-title">
        <span class="title">PROFILE</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
      <form action="" autocomplete="off">
        <div class="resg">
          <div>
            <label>User Name</label>
            <label for="">{{data.username}}</label>
          </div>
          <div>
            <label>Old Password</label>
            <input type="password" name="oldPassword" @change="onInput" :class="[isOldActive? 'active' : '']" v-model="data.password">
          </div>
          <div>
            <label>New Password</label>
            <input type="password" name="newPassword" @change="onInput" :class="[isNewActive? 'active' : '']" minlength="6" v-model="data.newPassword">
          </div>
          <div>
            <label>Repeated Password</label>
            <input type="password" name="surePassword" @change="onInput" :class="[isSureActive? 'active' : '']" minlength="6"  v-model="data.surePassword">
          </div>
        </div>
        <div class="submit-btn">
          <button type="button" class="confirm" @click="submit">Submit</button>
          <button type="button" class="cancel" @click="closeLayerButton">Cancel</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getSessionItem} from "../../assets/config/storage.js"
  import {removeSessionItem} from "../../assets/config/storage.js"
  import {get, post} from "../../assets/config/http"
  import xhrUrls from '../../assets/config/xhrUrls'

  export default {
    name: "NavBar",
    data() {
      return {
        yearList: ['2018'],
        monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        sideSlide: false,
        pageNum: 1,
        layerId:null,
        isUser: true,
        isShow: false,
        isErr: false,
        USERINFO: null,
        isOldActive:false,
        isNewActive:false,
        isSureActive:false,
        data: {
          password: '',
          newPassword: '',
          surePassword: '',
          id: '',
          username: ''
        }
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      getYearMonth() {
        return this.$store.getters.getYearMonth
      },
      getTypeOfName() {
        return this.$store.getters.typeOfName
      },
      getYear() {
        return this.$store.state.year
      },
      getMonth() {
        return this.$store.state.month
      }
    },
    mounted() {

      const USERINFO = JSON.parse(getSessionItem('USERINFO'))

      this.USERINFO = USERINFO

      this.USERINFO ? this.isUser = false : this.isUser = true

      try{
        this.data.id = USERINFO.id;

        this.data.username = USERINFO.username;
      }catch(e){}

      this.getTimeMonth()

    },
    methods: {

      sideSlideShow() {

        this.sideSlide = !this.sideSlide

      },

      linkTo(val, typeNum) {

        this.$router.push({name: val})

        this.$store.commit('voluation', typeNum)

        this.sideSlide = false

      },

      getTimeMonth() {

        this.$refs.monthBox.nowIndex = this.getMonth

        this.$refs.monthBoxM.nowIndex = this.getMonth

      },

      selectShowHandle(val) {
        this.$store.commit('monthVoluation', val.id)
      },

      goToLogin() {

        if (this.USERINFO) return

        this.$router.push({name: "login",query: { type: `${this.getTypeOfName}` }});

      },

      outLogin() {
        get(xhrUrls.LOGOUT).then((res) => {

          this.$router.push({name: "login",query: { type: `${this.getTypeOfName}` }});

          this.USERINFO = removeSessionItem('USERINFO')

        }).catch((err) => {

          console.log(err);

        })
      },

      layerOpen(id) {
        this.layerId = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`)
        })
      },

      closeLayerButton() {
        layer.close(this.layerId)
        this.data.password = ''
        this.data.newPassword = ''
        this.data.surePassword = ''
        this.isOldActive=false
        this.isNewActive=false
        this.isSureActive=false
      },

      showEditPass(){
        this.layerOpen('editPassword')
      },

      onInput() {
        if (this.data.password != '') {
          this.isOldActive = false;
        }
        if (this.data.newPassword != '') {
          this.isNewActive = false;
        }
        if (this.data.surePassword != '') {
          this.isSureActive = false;
        }
      },

      submit(){
        let that = this
        if(this.data.password == '' && this.data.newPassword == '' && this.data.surePassword == ''){
          this.isOldActive = true;
          this.isNewActive = true;
          this.isSureActive = true;
        }
        if (this.data.password == '') {
          this.isOldActive = true;
        }
        if (this.data.newPassword == '') {
          this.isNewActive = true;
        }
        if (this.data.surePassword == '') {
          this.isSureActive = true;
        }
        if (this.data.newPassword != this.data.surePassword) {
          this.isNewActive = true;
          this.isSureActive = true;
        }
        if (this.data.password != '' && this.data.newPassword != '' && this.data.surePassword != '' && this.data.newPassword == this.data.surePassword) {
          post(xhrUrls.EDIT_PWD, this.data)
            .then(res => {
              if (res.data.code == 200) {
                layer.msg('Password update success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  layer.close(index);
                  that.$router.push({path: "/"});
                  that.USERINFO = removeSessionItem('USERINFO')
                  layer.close(this.layerId)
                })
              } else {
                that.isOldActive=true
                layer.msg('Please enter the correct old password ！', {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  layer.close(index);
                })
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },

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
      .user-operation-mobile-wrap
        .shadow-cover
          position fixed
          top 0
          bottom 0
          left 0
          right 0
          z-index 10
          background-color rgba(0,0,0,.5)
          transition all .5s linear
          display none
        &.active
          .shadow-cover
            display block
      .after-login
        position relative
        cursor pointer
        .icon
          font-size 26px
          margin-left 15px
        .upload-icon
          font-size 27px
        .user-icon
          font-size 23px
        .user-operation-hover
          position relative
          display inline-block
          &.noHover
            &:hover
              .user-operation
                display none
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
          transform translateX(-100%)
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
    width 500px
    .tables-title
      position: relative
      padding-left: 20px
      font-size: 24px
      line-height: 45px
      height 45px
      color: #a0a0a1
      .icon
        e-pos(top:50%, y:-50%)
        right: 20px
        font-size: 24px
        color: #A0A0A1
        cursor: pointer
    .resg
      padding 0 20px
      div
        height 40px
        line-height 40px
        width 100%
        margin 10px 0
        label
          font-size 20px
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
      padding 20px 0
      button
        background-color #00b0f0
        border-radius 5px
        color #fff
        border medium
        outline none
        cursor pointer
        padding 5px 15px
        font-size 18px
      .confirm
        margin-right 10px
      .cancel
        margin-left 10px
        background-color #ccc

  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .pc-nav-bar
      display none
    .mobile-nav-bar
      display block !important
</style>
