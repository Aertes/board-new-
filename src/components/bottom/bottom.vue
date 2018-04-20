<template>
  <div class="bottom-wrap">
    <h5>Highlight
      <span @click="showHight">
        <svg-icon sign="icon-tianjia"></svg-icon>
      </span>
    </h5>
    <ul>
      <li v-for="(item, index) in HighLightData" >
        <input type="text" :id="item.id" :value="item.content" @blur="HighLightUpdata(item.id, item.month, item.type)">
        <p>
          <span :id="item.id" @click="HighLightEdit()">{{item.content}}</span>
          <span class="del" @click="highLightDel(item.id)"><svg-icon sign="icon-closed"></svg-icon></span>
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
        time: '201801',
        type: [
          'overview',
          'campaign',
          'dotcom',
          'ratingreview',
          'ecommerce'
        ],
        HighLightData: '',
        isEdit: false,
        isContext: false,
        isShow: false,
        isIndex: 0,
        context: ''
      }
    },
    mounted() {
      this.getHighLight()
    },
    methods: {

      getHighLight() {
        post(HIGHT_LIGHT_SEARCH, {month: this.time}).then(res => {
          let data = res.data;
          data.code == 200 ? this.HighLightData = data.data : console.log(data.errMsg)
          console.log(data);
        }).catch(err => console.log(err))
      },

      HighLightEdit() {
        this.isEdit = true;
        $('#'+event.target.id).parents('li').addClass('edit').siblings().removeClass('edit')
      },

      HighLightUpdata(id, month, type) {
        let newVal = event.currentTarget.value
        let that = event.currentTarget.id
        let data = {
          content: newVal,
          id: id,
          month: this.time,
          type: type
        }
        post(HIGHT_LIGHT_UPDATE, data).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.isEdit = false
            this.layerMsg('Updata success!')
            this.getHighLight()
            $('#'+that).parents('li').removeClass('edit')
            // $('#' + id).html(newVal)
          } else {
            this.isEdit = false
            this.layerMsg('Updata failure!')
            console.log(data.errMsg)
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
            month: this.time,
            type: this.type[2]
          }
          post(HIGHT_LIGHT_SAVE, data).then(res => {
            let data = res.data;
            if (data.code == 200) {
              this.closeLayerButton()
              this.layerMsg('Create success!')
              this.getHighLight()
            } else {
              this.closeLayerButton()
              this.layerMsg('Create failure!')
              console.log(data.errMsg)
            }
          }).catch(err => console.log(err))
        }
      },

      highLightDel(id) {
        get(HIGHT_LIGHT_DELETE +'/'+id).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.layerMsg('Delete success!')
            this.getHighLight()
          } else {
            this.layerMsg('Delete failure!')
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      closeLayerButton() {
        layer.close(layerId)
        this.context = ''
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
            &.del
              width: 18px
              height: 18px
              display inline-block
          .icon
            font-size 18px
            display none
          &:hover
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
        border 0
        color #ffffff
        border-radius 5px
        padding 5px 15px
        cursor pointer
        &.confirm
          background #00b0f0
          margin-right 5px
        &.cancel
          background #C9C5C5
          margin-left 5px

  @media screen and (max-width: 1235px)
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
            .icon
              display none !important
</style>
