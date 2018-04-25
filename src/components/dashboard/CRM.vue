<template>
  <div class="c-r-m-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color3"></i>CRM Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="icon-box">
          <span class="qrcode" @mouseenter="qrcodeShow" @mouseleave="qrcodeHide">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow">
              <qrcode :value="url" :options="{ size: 150 }"></qrcode>
              <span>Please scan the QR code</span>
            </div>
          </span>
          <span @click="copyURL">
            <svg-icon sign="icon-link" class="link-icon"></svg-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="table-box">
      <table id="CRMTable" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>
            <div>Marketing Metrics</div>
          </th>
          <th>
            <div>Month</div>
          </th>
          <th>
            <div>YTD</div>
          </th>
          <th>
            <div>Month Target</div>
          </th>
          <th></th>
          <th>
            <div>YTD Target</div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in CRMTableData" :class="{odd: index%2 == 0, even: index%2 != 0}"
            v-if="CRMTableData.length >= 0">
          <td @click="tips(index, 'tipss'+index)" :id="'tipss'+index">
            <div class="floatL">{{item.name}}</div>
            <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
          </td>
          <td>
            <div>{{item.month | formatThousands(item.name) }}</div>
          </td>
          <td>
            <div>{{item.ytd | formatThousands(item.name) }}</div>
          </td>
          <td>
            <div>{{item.target | formatThousands(item.name) }}</div>
          </td>
          <td v-if="item.mT==1">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
          </td>
          <td v-else-if="item.mT==2">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
          </td>
          <td v-else-if="item.mT==3">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
          </td>
          <td v-else="item.mT==4">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
          </td>
          <td>
            <div>{{item.ytdTarget | formatThousands(item.name) }}</div>
          </td>
          <td v-if="item.yT==1">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
          </td>
          <td v-else-if="item.yT==2">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
          </td>
          <td v-else-if="item.yT==3">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
          </td>
          <td v-else="item.yT==4">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
          </td>
        </tr>
        <tr v-else>
          <td class="noData" :colspan="7">
            <div>Temporarily no data</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls';
  import {getQueryString, getHashString} from '../../assets/config/urlQuery';
  import {get, post} from '../../assets/config/http';
  const CRM_SEARCH = xhrUrls.CRM_SEARCH;
  export default {
    name: "c-r-m",
    data() {
      return {
        CRMTableData: [],
        searchDataCRM: {
          month: '',
          title: ['CRM Registrations', 'CRM Engagement Rate (rolling 6 months)', 'CRM Sales(M)(￥)']
        },
        url: '',
        isQrShow: false,
        locationHash: false
      }
    },
    computed: {
      getYearMonth() {
        return this.$store.getters.getYearMonth
      }
    },
    mounted() {

      if (window.location.hash.indexOf("?") != -1) {
        this.locationHash = true
      } else {
        this.locationHash = false
      }

      if (!this.locationHash) {
        this.getCRMtableData()
      }else{
        this.getUrl()
      }

    },
    updated() {
      this.locationHash = false
    },
    methods:{

      getCRMtableData() {
        let CRMtitle = this.searchDataCRM.title
        this.searchDataCRM.month = this.getYearMonth
        post(CRM_SEARCH, this.searchDataCRM).then(res => {
          let data = res.data
          if (data.code == 200) {
            let _tableDataCRM = data.data
            for (let i = 0; i < _tableDataCRM.length; i++) {
              _tableDataCRM[i].name = CRMtitle[i]
            }
            this.CRMTableData = _tableDataCRM
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      copyURL() {
        this.url = `${window.location}?yearMonth=${this.getYearMonth}`;
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', this.url)
        input.select()
        if (document.execCommand('copy')) {
          document.execCommand('copy')
          this.layerMsg("Copy success !")
        }
        document.body.removeChild(input)
      },

      layerMsg(err) {
        layer.msg(err, {
          time: 2000,
          skin: 'fontColor'
        })
      },

      qrcodeShow() {
        this.url = `${window.location}?yearMonth=${this.getYearMonth}`;
        this.isQrShow = true
      },

      qrcodeHide() {
        this.isQrShow = false
      },

      tips(i, id) {
        let tipsVal = ''
        switch (i) {
          case 0:
            tipsVal = 'For Mobile registration, this figure indicates the number of members registered with mobile phone number mainly via CRM microsite, plus call center and ASC.'
            this.tipsContent(tipsVal, id)
            break
          case 1:
            tipsVal = 'For engagement rate, measure the how much users were actively interacting with us.'
            this.tipsContent(tipsVal, id)
            break
          case 2:
            tipsVal = 'The sales on FSS.'
            this.tipsContent(tipsVal, id)
            break
          default:
            break
        }
      },

      tipsContent(tipsVal, id) {
        layer.tips(tipsVal, '#' + id, {
          tips: [2, '#FFF2CC'],
          skin: 'fontColorBg',
        });
      },

      getUrl(){
        if(getHashString('yearMonth')==this.getYearMonth){
          this.getCRMtableData()
        }
      }
    },
    filters: {
      formatThousands: (params, name) => {
        if (!params) return 0
        if(name == 'CRM Engagement Rate (rolling 6 months)'){
          return (Number(params) * 100).toFixed(0) + '%'
        }else{
          let str = Math.round(params).toFixed(0)
          return (str + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
      },
      percentile: (params) => {
        if (!params) return 0
        return (Number(params) * 100).toFixed(2) + '%'
      },
      round: (params) => {
        if (!params) return 0
        return params.toFixed(2)
      }
    },
    watch:{
      getYearMonth() {
        this.getCRMtableData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
  .data-table
    border-collapse collapse
    border none
    table-layout fixed
    thead > tr
      background #FF9933
      th
        padding 10px 0
        border 1px solid #B3B3B3
        cursor pointer
        color #fff
        font-weight normal
        font-style italic
        white-space pre-wrap
        word-wrap break-word
        &:nth-child(1)
          width 400px
        &:nth-child(5), &:nth-child(7)
          width 60px

  tbody > tr
    &.odd
      background-color #F2F2F2
    &.even
      background-color #FFFFFF
    td
      padding 10px 0
      border 1px solid #B3B3B3
      text-align center
      white-space pre-wrap
      word-wrap break-word
      &:nth-child(1)
        text-align left
        padding 0 10px
        cursor pointer
        position relative
        .floatL
          float left
        .icon-tanhao
          position absolute
          right 10px
          top 50%
          transform translateY(-50%)
        .gantanhao-icon
          color #C0D2E4
          font-size 20px
      &.noData
        font-size 14px
        padding 10px 0
        text-align center
    .hidden
      display none

  #CRMTable
    thead > tr
      background #B1A0C7
  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .data-table
      tr
        td
        th
          &:nth-child(1)
            width 310px!important
          &:nth-child(5), &:nth-child(7)
            width 30px!important
          padding 0 !important
          .icon-tanhao
            font-size 12px!important
          div
            transform scale(.7)!important
        td
          &:nth-child(1)
            div
              transform-origin 25px
    .tool-box
      display none
</style>
