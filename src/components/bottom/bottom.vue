<template>
  <div class="bottom-wrap">
    <h5>
      <span v-if="HighLightShow">Highlight</span>
      <span v-else style="color: #A6A6A6">No Highlight</span>
      <span @click="showHight" title="Add Highlight" :class="{none:!isUser}">
        <svg-icon sign="icon-tianjia"></svg-icon>
      </span>
    </h5>
    <ul>
      <li v-for="(item, index) in HighLightData" >
        <input type="text" :id="item.id" :value="item.content" @blur="HighLightUpdata(item.id, item.month, item.type)">
        <p>
          <span :id="item.id" @click="HighLightEdit()">{{item.content}}<span class="del" @click="highLightDel(item.id)" v-if="isUser"><svg-icon sign="icon-closed"></svg-icon></span></span>
        </p>
      </li>
    </ul>

    <div id="highLight" v-show="isShow">
      <div class="tables-title">
        <span class="titles">Create HightLight</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
      <div class="content">
        <textarea name="content" :class="{err:isContext}" v-model="context" id="content" cols="45" rows="8"></textarea>
      </div>
      <div class="submit-btn">
        <button type="button" class="confirm" @click="highLightSubmit">Submit</button>
        <button type="button" class="cancel" @click="closeLayerButton">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSessionItem} from "../../assets/config/storage.js"
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post} from '../../assets/config/http'
  let layerId;
  const HIGHT_LIGHT_SEARCH = xhrUrls.HIGHT_LIGHT_SEARCH
  const HIGHT_LIGHT_SAVE = xhrUrls.HIGHT_LIGHT_SAVE
  const HIGHT_LIGHT_UPDATE = xhrUrls.HIGHT_LIGHT_UPDATE
  const HIGHT_LIGHT_DELETE = xhrUrls.HIGHT_LIGHT_DELETE

  export default {
    name: "bottom",
    data() {
      return {
        HighLightData: '',
        isEdit: false,
        isContext: false,
        isShow: false,
        isIndex: 0,
        context: '',
        locationHash: false,
        USERINFO: null,
        isUser:false,
        HighLightShow:true
      }
    },
    computed: {
      getYearMonth() {
        return this.$store.getters.getYearMonth
      },
      getTypeOfName() {
        return this.$store.getters.typeOfName
      }
    },
    mounted() {

      const USERINFO = JSON.parse(getSessionItem('USERINFO'))

      this.USERINFO = USERINFO

      this.USERINFO ? this.isUser = true : this.isUser = false

      try{
        let per = USERINFO.permissions
        let perNum = 0
        per.forEach((v, i) => {
          if (v.indexOf(':upload') != -1) {
            perNum++
          }
        });
        perNum == 0 ? this.isUser = false : this.isUser = true
      }catch(e){}

      if (window.location.hash.indexOf("?") != -1) {
        this.locationHash = true
      } else {
        this.locationHash = false
      }

      if(!this.locationHash) this.getHighLight(this.$route.name)

    },
    methods: {

      getHighLight(val) {
        if(val == 'overview'){
          val = ''
        }
        post(HIGHT_LIGHT_SEARCH, {month: this.getYearMonth, type: val}).then(res => {
          let data = res.data;
          data.code == 200 ? this.HighLightData = data.data : console.log(data.errMsg)
        }).catch(err => console.log(err))
      },

      HighLightEdit() {
        let dpr = window.devicePixelRatio || 1
        let id = `#${event.target.id}`
        if(dpr>1 || !this.isUser) return
        this.isEdit = true;
        $(id).parents('li').addClass('edit').siblings().removeClass('edit').end().find('input').focus()
      },

      HighLightUpdata(id, month, type) {
        let newVal = event.currentTarget.value
        let that = event.currentTarget.id
        let data = {
          content: newVal,
          id: id,
          month: this.getYearMonth,
          type: type
        }
        if(newVal==''){
          this.layerMsg('Can not edit with empty!')
          return
        }
        post(HIGHT_LIGHT_UPDATE, data).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.isEdit = false
            this.layerMsg('Updata success!')
            this.getHighLight(this.getTypeOfName)
            $('#'+that).parents('li').removeClass('edit')
          } else {
            this.isEdit = false
            this.layerMsg('Updata failure!')
          }
        }).catch(err => console.log(err))
      },

      showHight() {
        this.layerOpen('highLight')
      },

      highLightSubmit() {
        if (this.context == '') {
          this.isContext = true
        } else {
          let data = {
            content: this.context,
            month: this.getYearMonth,
            type: this.getTypeOfName
          }
          post(HIGHT_LIGHT_SAVE, data).then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.closeLayerButton()
              this.layerMsg('Create success!')
              this.getHighLight(this.getTypeOfName)
            } else {
              this.closeLayerButton()
              this.layerMsg('Create failure!')
            }
          }).catch(err => console.log(err))
        }
      },

      highLightDel(id) {
        get(HIGHT_LIGHT_DELETE +'/'+id).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.layerMsg('Delete success!')
            this.getHighLight(this.getTypeOfName)
          } else {
            this.layerMsg('Delete failure!')
          }
        }).catch(err => console.log(err))
      },

      closeLayerButton() {
        layer.close(layerId)
        this.context = ''
        this.isContext = false
      },

      layerOpen(id) {
        layerId = layer.prompt({
          formType: 1,
          title: false,
          closeBtn: 0,
          btn: [],
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`),
          resize: false,
        })
      },

      layerMsg(err){
        layer.msg(err, {
          time: 2000,
          skin: 'fontColor'
        })
      }
    },
    watch:{
      getTypeOfName(){
        this.getHighLight(this.getTypeOfName)
      },
      getYearMonth(){
        this.getHighLight(this.getTypeOfName)
      },
      HighLightData(){
        if(this.HighLightData.length==0){
          this.HighLightShow = false
        }else{
          this.HighLightShow = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';
  .bottom-wrap
    font-size 20px
    margin-top 30px
    h5
      margin-bottom 20px
      font-weight normal
      font-size 25px
      color #C89000
    .icon
      color #A3A2A2
      font-size 20px
      vertical-align -2px
      margin-left 15px
      cursor pointer
    ul
      padding-bottom 20px
      li
        position relative
        padding-left 30px
        margin-bottom 5px
        &:after
          e-pos(top:50%, y:-50%)
          left 0
          content ''
          width 8px
          height 8px
          background-color black
          border-radius 50%
        input
          display none
          width 100%
          height 35px
          font-size 20px
          border 1px solid #eaeaea
          padding 0 10px
        p
          display inline-block
          span
            line-height 30px
            display inline-block
            -webkit-text-size-adjust: none
            text-size-adjust: none
            .del
              width: 18px
              height: 18px
              display none
            .icon
              font-size 18px
              display none
          &:hover
            .del
              display inline-block
            .icon
              display inline-block
        &.edit
          input
            display block
          p
            display none
    .tables-title
      position: relative
      font-size: 20px
      line-height: 30px
      height 30px
      color: #a0a0a1
      margin-bottom 20px
      .icon
        e-pos(top:50%, y:-50%)
        right: 0px
        font-size: 20px
        color: #A0A0A1
        cursor: pointer
    .content
      textarea
        padding 10px
        box-sizing border-box
        font-size 18px
        &.err
          border-color red;
    .submit-btn
      margin-top 20px
      text-align center
      button
        font-size 18px
        border medium
        outline none
        color #ffffff
        border-radius 5px
        padding 5px 15px
        cursor pointer
        &.confirm
          background #74a5d4
          margin-right 5px
        &.cancel
          background orange
          margin-left 5px

  @media screen and (max-device-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .bottom-wrap
      .icon
        display none
      ul
        li
          margin-bottom 10px
          input
            height 60px
            font-size 20px
          span
            line-height 40px
          &:hover
            .del
              display none !important
            .icon
              display none !important
</style>
