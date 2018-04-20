<template>
  <div class="bigbox">
    <div class="nav-bar-wrap clearfix">
      <div class="logo box-shadow"><img src="../../assets/img/logo.png" alt="philips" width="198" height="100"></div>
      <h1>ONE CHINA DIGITAL PERFORMANCE DASHBOARD</h1>
    </div>
    <div class="bg">
      <div class="form-wrapper">
        <!-- <h2>WELCOME!</h2> -->
        <form class="submit box-shadow" action="" autocomplete="off">
          <div class="err input">
            <p>{{isError}}</p>
          </div>
          <div class="input username">
            <input type="text" @keyup.enter="submit" name='username' @change="onInput" :class="[isUserActive? 'active' : '']" v-model="loginDate.username" placeholder="USER NAME" autocomplete="off">
            <svg-icon sign="icon-user"></svg-icon>
          </div>
          <div class="input password">
            <input type="password" @keyup.enter="submit" name='password' @change="onInput" :class="[isPassActive? 'active' : '']" v-model="loginDate.password" placeholder="PASSWORD">
            <svg-icon sign="icon-Cord"></svg-icon>
          </div>
          <div class="input code">
            <input type="text" @keyup.enter="submit" name='code' maxlength="4" @change="onInput" :class="[isCodeActive? 'active' : '']" v-model="loginDate.code" placeholder="VERIFICATION CODE">
            <img class="code-img" :src="codeUrl" alt="">
            <span @click="getCode">
  							<svg-icon class="code" sign="icon-refresh"></svg-icon>
  						</span>
          </div>
          <button type="button" @click="submit">LOGIN</button>
        </form>
      </div>
    </div>
    <div class="footer-wrapper">
      <p class="one">@2014-2016 PHILIPS ELETRONICS N.V ALL RIGHTS RESERVED 沪ICP 09062110号</p>
      <p class="two">公安备案号：沪公网安备31010602001824号</p>
    </div>
    <div class="loading" v-show="isShow">
      <img src="../../assets/img/loading.gif" alt="">
    </div>
    <div class="mark" v-show="isShow"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from "../../assets/config/xhrUrls";
  import {
    post
  } from "../../assets/config/http"
  import {
    setSessionItem
  } from "../../assets/config/storage.js"
  
  export default {
    name: "login",
    data() {
      return {
        isShow: false,
        isUserActive: false,
        isPassActive: false,
        isCodeActive: false,
        isError:'',
        userInfo: {},
        codeUrl: "",
        baseUrl: "",
        loginDate: {
          username: "",
          password: "",
          code: "",
          withCredentials: true
        },
        USERINFO: {}
      };
    },
    computed: {},
    methods: {
      getCode() {
        this.codeUrl = xhrUrls.CODE + "?" + new Date().getTime();
      },
      submit() {
        if (this.loginDate.username == "" && this.loginDate.password == "" && this.loginDate.code == "") {
          this.isUserActive = true;
          this.isPassActive = true;
          this.isCodeActive = true;
          this.isError = 'Please enter login information'
          return
        }
        if (this.loginDate.username == "") {
          this.isUserActive = true;
          this.isError = 'Please enter your username'
          return
        }
        if (this.loginDate.password == "") {
          this.isPassActive = true;
          this.isError = 'Please enter the password'
          return
        }
        if (this.loginDate.code == "") {
          this.isCodeActive = true;
          this.isError = 'Please enter the verification code'
          return
        }
        if (this.loginDate.username != "" & this.loginDate.password != "" & this.loginDate.code != "") {
          this.isShow = true
          post(xhrUrls.LOGIN, this.loginDate)
            .then(res => {
              if (res.data.code == 200) {
                setTimeout(() => {
                  this.isShow = false
                  this.$router.push({
                    path: "/dashboard"
                  });
                  setSessionItem('USERINFO', JSON.stringify(res.data.data))
                }, 1000);
              } else {
                setTimeout(() => {
                  this.isShow = false
                  this.codeUrl = xhrUrls.CODE + "?" + new Date().getTime();
                  switch (res.data.code) {
                    case 201:
                      this.isCodeActive = true;
                      this.isError = 'Verification code invaild'
                      break;
                    default:
                      this.isUserActive = true;
                      this.isPassActive = true;
                      this.isError = 'Account or password invaild'
                      break;
                  }
                }, 1000);
              }
            })
            .catch(err => {
              setTimeout(() => {
                this.isShow = false
              }, 1000);
              this.isActive = true;
              console.log(err);
            });
        }
      },
      onInput() {
        if (this.loginDate.username != '') {
          this.isUserActive = false;
          this.isError = ''
        }
        if (this.loginDate.password != '') {
          this.isPassActive = false;
          this.isError = ''
        }
        if (this.loginDate.code != '') {
          this.isCodeActive = false;
          this.isError = ''
        }
      }
    },
    mounted() {
      this.getCode();
      this.isShow = false
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';
.app-wrapper {
	position: relative;
	height: 100%
}

.mark {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.3;
    overflow: hidden;
    background-color: #f9f9f9;
  }
.loading{
  e-pos(top: 40%, y: -50%, left: 50%, x:-50%);
  z-index : 10001;
}


.nav-bar-wrap
    margin: 0 39px;
    line-height 100px
    position absolute
    z-index 1
    width 100%
    .logo
      float left
      width 198px
      height 100px
      margin-left 20px
      img
        width 100%
        height 100%
    h1
      float left
      margin-left 60px
      font-size 37px
      color #a0a0a1
      font-weight normal
      text-shadow: 5px 5px 5px #bbbbbb;
    .user-info
      float right
      color #2061AE
      .before-login
        font-size 33px
      .after-login
        position relative
        cursor pointer
        .user-name
          margin-right 24px
          font-size 33px
          vertical-align top
        .user-icon
          font-size 29px

  .bg{
    background:url('../../assets/img/bg.jpg') no-repeat center;
    background-size: cover;
    margin 0
    position: absolute;
    width: 100%;
    bottom: 80px;
    top: 0;
    overflow: hidden;
  }
  .form-wrapper {
	  e-pos(left:50%, x:-50%, top:50%, y:-50%);
    width: 550px;

    h2 {
      margin: 0 0 30px;
      text-align: center;
      font-size: 34px;
      color: #1f61ae;
    }

    .submit {
      background-color: #fff;
      text-align: center;
      border-radius: 10px;
      padding: 35px 0 55px;
      .input {
        padding: 20px 60px;
        position: relative;

        .code {
          cursor: pointer;
          position: relative;
        }
        span {
          e-pos(top:50%, y:-50%);
          right: 80px;
          width: 50px;
          height: 50px;
          cursor: pointer;

          .icon {
            right: 0;
          }
        }

        .icon {
          e-pos(top:50%, y:-50%);
          right: 80px;
          color: #1f61ae;
          font-size: 26px;
        }

        .code-img {
          e-pos(top:50%, y:-50%);
          right: 120px;
          height: 40px;
          width: 100px;
          text-align: center;
        }

        .active {
          border-color: #e78b70;
        }

        input {
          width: 100%;
          height: 55px;
          border: 1px solid #6c6b6b;
          border-radius: 10px;
          padding: 3px 15px 0;
          font-size: 24px;
          outline: none;
        }
        
      }
      .err{
        color: #f00;
        font-size: 22px;
        text-align: left;
        padding: 0 60px;
        height: 30px;
      }
      button {
        width: 270px;
        height: 50px;
        background-color: #1f61ae;
        color: #ffffff;
        border: 0;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 30px;
        font-size: 26px;
        outline: none;
        padding-top 1px
      }
    }
  }
.footer-wrapper
  height 80px
  text-align center
  color #ebeff6
  background-color:#1f61ad
  position absolute
  bottom 0
  width 100%
  font-size 16px
  .one
    padding 20px 0 10px
    margin-bottom 0

</style>

