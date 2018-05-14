<template>
  <div class="dotcom-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color2"></i>Dotcom Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="icon-box">
          <span class="qrcode" @mouseenter="qrcodeShow" @mouseleave="qrcodeHide">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow">
              <div class="qrcodeCanvas"></div>
              <span>Please scan the QR code</span>
            </div>
          </span>
          <span @click="copyURL" title="Click to copy this page link">
            <svg-icon sign="icon-link" class="link-icon"></svg-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="table-name">B2C</div>
    <div class="table-box">
      <table id="b2cTable" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>
            <div>Marketing Metrics</div>
          </th>
          <th>
            <div>Month</div>
          </th>
          <th>
            <div>Month Target</div>
          </th>
          <th></th>
          <th>
            <div>YTD</div>
          </th>
          <th>
            <div>YTD Target</div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in b2cTableData" :class="{odd: index%2 == 0, even: index%2 != 0}"
            v-if="b2cTableData.length >= 0">
          <td :id="'tipss'+index"><!-- @click="tips(index, 'tipss'+index)"-->
            <a class="hint--success hint--medium" :class="{'hint--large':index==4, 'hint--right': index == 0 || index == 3 || index == 4 || index == 5}" :aria-label="getTipsCont(index)">
              <div class="floatL">{{item.name}}</div>
              <svg-icon v-if="index==0||index==3||index==4||index==5" sign="icon-gantanhao" class="gantanhao-icon  icon-tanhao"></svg-icon>
            </a>
          </td>
          <td>
            <div>{{item.month | formatThousands(item.name)}}</div>
          </td>
          <td>
            <div>{{item.target | formatThousands(item.name)}}</div>
          </td>
          <td v-if="item.mT==0" width ="10%">
            <!--<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>-->
          </td>
          <td v-else-if="item.mT==1" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
          </td>
          <td v-else-if="item.mT==2" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
          </td>
          <td v-else-if="item.mT==3" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
          </td>
          <td v-else="item.mT==4" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
          </td>
          <td>
            <div>{{item.ytd | formatThousands(item.name)}}</div>
          </td>
          <td>
            <div>{{item.ytdTarget | formatThousands(item.name)}}</div>
          </td>
          <td v-if="item.yT==0" width ="10%">
            <!--<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>-->
          </td>
          <td v-else-if="item.yT==1" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
          </td>
          <td v-else-if="item.yT==2" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
          </td>
          <td v-else-if="item.yT==3" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
          </td>
          <td v-else="item.yT==4" width ="10%">
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

    <!---------------->
    <div class="table-name">B2B</div>
    <div>
      <table id="b2bTable" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>
            <div>Marketing Metrics</div>
          </th>
          <th>
            <div>Month</div>
          </th>
          <th>
            <div>Month Target</div>
          </th>
          <th></th>
          <th>
            <div>YTD</div>
          </th>
          <th>
            <div>YTD Target</div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in b2bTableData" :class="{odd: index%2 == 0, even: index%2 != 0}" v-if="b2bTableData.length >= 0">
          <td :id="'tip'+index"><!-- @click="tips(index, 'tip'+index)"-->

            <a class="hint--success hint--medium" :class="{'hint--large':index==4, 'hint--right': index == 0 || index == 3 || index == 4 || index == 5 || index == 6 || index == 7}" :aria-label="getTipsCont(index)">
              <div class="floatL">{{item.name}}</div>
              <svg-icon v-if="index==0||index==3||index==4||index==5||index==6||index==7" sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </a>

          </td>
          <td>
            <div>{{item.month | formatThousands(item.name)}}</div>
          </td>
          <td>
            <div>{{item.target | formatThousands(item.name)}}</div>
          </td>
          <td v-if="item.mT==0" width ="10%">
            <!--<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>-->
          </td>
          <td v-else-if="item.mT==1" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
          </td>
          <td v-else-if="item.mT==2" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
          </td>
          <td v-else-if="item.mT==3" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
          </td>
          <td v-else="item.mT==4" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
          </td>
          <td>
            <div>{{item.ytd | formatThousands(item.name)}}</div>
          </td>
          <td>
            <div>{{item.ytdTarget | formatThousands(item.name)}}</div>
          </td>
          <td v-if="item.yT==0" width ="10%">
            <!--<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>-->
          </td>
          <td v-else-if="item.yT==1" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
          </td>
          <td v-else-if="item.yT==2" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
          </td>
          <td v-else-if="item.yT==3" width ="10%">
            <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
          </td>
          <td v-else="item.yT==4" width ="10%">
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

  const COM_SEARCH = xhrUrls.COM_SEARCH;
  export default {
    name: "dotcom",
    data() {
      return {
        b2cTableData: [],
        b2bTableData: [],
        selectListOne: ['All Categories'],
        searchDataB2C: {
          isB2C: true,
          month: '',
          title: ['Traffic', '-Free traffic', '-Paid traffic', 'Bounce Rate', 'Conversion Rate', 'UGCR']
        },
        searchDataB2B: {
          isB2C: false,
          month: '',
          title: ['Traffic', '-Free traffic', '-Paid traffic', 'Bounce Rate', 'Conversion Rate', 'UGCR', 'MQL', 'SQl']
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

      this.$Hub.$on('ComUploadData', ()=>{
        this.getB2CtableData()
        this.getB2BtableData()
      })

      if (window.location.hash.indexOf("?") != -1) {
        this.locationHash = true
      } else {
        this.locationHash = false
      }

      if (!this.locationHash) {
        this.getB2CtableData()
        this.getB2BtableData()
      } else {
        this.getUrl()
      }

    },
    updated() {
      this.locationHash = false
    },
    methods: {

      getB2CtableData() {
        let B2Ctitle = this.searchDataB2C.title
        this.searchDataB2C.month = this.getYearMonth
        post(COM_SEARCH, this.searchDataB2C).then(res => {
          let data = res.data
          if (data.code == 200) {
            let _tableDataB2C = data.data
            for (let i = 0; i < _tableDataB2C.length; i++) {
              _tableDataB2C[i].name = B2Ctitle[i]
            }
            this.b2cTableData = _tableDataB2C
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      getB2BtableData() {
        let B2Btitle = this.searchDataB2B.title
        this.searchDataB2B.month = this.getYearMonth
        post(COM_SEARCH, this.searchDataB2B).then(res => {
          let data = res.data
          if (data.code == 200) {
            let _tableDataB2B = data.data
            for (let i = 0; i < _tableDataB2B.length; i++) {
              _tableDataB2B[i].name = B2Btitle[i]
            }
            this.b2bTableData = _tableDataB2B
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
          this.layerMsg("Page URL has been copied successfully!")
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
        let baseUrl = `${window.location}?yearMonth=${this.getYearMonth}`;
        $('.qrcodeCanvas').html('')
        $('.qrcodeCanvas').qrcode({width: 150,height: 150,text: baseUrl});
        this.isQrShow = true
      },

      qrcodeHide() {
        this.isQrShow = false
      },

      getTipsCont(i){
        switch (i) {
          case 0:
            return 'The process of clicking through an online advertisement to the advertiser’s destination.'
            break;
          case 3:
            return  'The bounce rate is the percentage of visits with only 1 page view.'
            break;
          case 4:
            return  'Buy lead conversion shows the value of the conversion points used on the Philips digital platform. For B2C, the conversion point refers to the buy button clicks. For B2B, conversion points are represented by leads generated for completed HS lead form.'
            break;
          case 5:
            return  'User goal complete rate. It is about consumer survey bounced upon Philips website when viewing it.'
            break;
          case 6:
            return  'MKT qualified lead.'
            break;
          case 7:
            return  'Sales qualified leads.'
            break;
        }
      },

      tips(i, id) {
        let tipsVal = ''
        switch (i) {
          case 0:
            tipsVal = 'The process of clicking through an online advertisement to the advertiser’s destination.'
            this.tipsContent(tipsVal, id)
            break
          case 3:
            tipsVal = 'The bounce rate is the percentage of visits with only 1 page view.'
            this.tipsContent(tipsVal, id)
            break
          case 4:
            tipsVal = 'Buy lead conversion shows the value of the conversion points used on the Philips digital platform. For B2C, the conversion point refers to the buy button clicks. For B2B, conversion points are represented by leads generated for completed HS lead form.'
            this.tipsContent(tipsVal, id)
            break
          case 5:
            tipsVal = 'User goal complete rate. It is about consumer survey bounced upon Philips website when viewing it.'
            this.tipsContent(tipsVal, id)
            break
          case 6:
            tipsVal = 'MKT qualified lead.'
            this.tipsContent(tipsVal, id)
            break
          case 7:
            tipsVal = 'Sales qualified leads.'
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

      getUrl() {
        if (getHashString('yearMonth') == this.getYearMonth) {
          this.getB2CtableData()
          this.getB2BtableData()
        }
      }

    },
    filters: {
      formatThousands: (params, name) => {
        if (!params) return 0
        if (name == 'Bounce Rate' || name == 'Conversion Rate' || name == 'UGCR') {
          return (Number(params) * 100).toFixed(2) + '%'
        } else {
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
    watch: {
      getYearMonth() {
        this.getB2CtableData()
        this.getB2BtableData()
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
    a
      display block
    thead > tr
      background #FF9933
      th
        padding 10px 0
        border 1px solid #ddd
        cursor pointer
        color #fff
        font-weight normal
        font-style italic
        white-space pre-wrap
        word-wrap break-word
        &:nth-child(1)
          width 330px
        &:nth-child(4),&:nth-child(7)
          width 60px
  tbody > tr
    &.odd
      background-color #F2F2F2
    &.even
      background-color #FFFFFF
    td
      padding 10px 0
      border 1px solid #ddd
      text-align center
      white-space pre-wrap
      word-wrap break-word
      &:nth-child(1)
        text-align left
        padding 0 10px
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
          cursor pointer
      &.noData
        font-size 14px
        padding 10px 0
        text-align center
    .hidden
      display none

  #b2bTable
    thead > tr
      background #E26B0A

  @media screen and (max-device-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .data-table
      tr
        td
        th
          &:nth-child(4),&:nth-child(7)
            width 30px
          &:nth-child(1)
            width 200px !important
          padding 0 !important
          .icon-tanhao
            font-size 12px !important
          div
            transform scale(.7) !important
        td
          &:nth-child(1)
            div
              transform-origin 25px
    .tool-box
      display none
</style>
