<template>
  <div class="e-commerce-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color7"></i>eCommerce Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="icon-box">
          <span class="qrcode" @mouseenter="qrcodeShow" @mouseleave="qrcodeHide">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow">
              <qrcode :value="url" :options="{ size: 150 }"></qrcode>
              <span>Please scan the QR code</span>
            </div>
          </span>
          <span @click="copyURL" title="Copy URL">
            <svg-icon sign="icon-link" class="link-icon"></svg-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="table-box">
      <div class="ind-cam-per">
        <table id="ecTable" class="data-table" style="width:100%">
          <thead>
          <tr>
            <th rowspan="2"><div>Category</div></th>
            <th rowspan="2"><div>Period</div></th>
            <th colspan="2"><div>Total</div></th>
            <th colspan="2"><div>站外</div></th>
            <th colspan="2"><div>钻展</div></th>
            <th colspan="2"><div>搜索</div></th>
            <th colspan="2"><div>其他</div></th>
          </tr>
          <tr>
            <th @click="tips('Traffic', 'Traffic')" class="triangle Traffic"><div>Traffic</div>
              <div class="tips-warp">
                <div class="tips-content">Buy lead conversion shows the value of the conversion points used on the Philips digital platform.For B2C, the conversion point refers to the buy button clicks. For B2B, conversion points are.</div>
              </div>
            </th>
            <th @click="tips('Conversion', 'Conversion')" class="triangle Conversion"><div>Conversion%</div></th>
            <th><div>Traffic</div></th>
            <th><div>Conversion%</div></th>
            <th><div>Traffic</div></th>
            <th><div>Conversion%</div></th>
            <th><div>Traffic</div></th>
            <th><div>Conversion%</div></th>
            <th><div>Traffic</div></th>
            <th><div>Conversion%</div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in ecTableData" :class="{odd: index%2 == 0, even: index%2 != 0}" v-if="ecTableData.length >= 0">
            <td><div>{{item.category}}</div></td>
            <td><div>{{getYearMonth | periodMonth}}</div></td>
            <td><div>{{item.traffic1 | formatThousands}}</div></td>
            <td><div>{{item.conversionRate1 | percentile}}</div></td>
            <td><div>{{item.traffic2 | formatThousands}}</div></td>
            <td><div>{{item.conversionRate2 | percentile}}</div></td>
            <td><div>{{item.traffic3 | formatThousands}}</div></td>
            <td><div>{{item.conversionRate3 | percentile}}</div></td>
            <td><div>{{item.traffic4 | formatThousands}}</div></td>
            <td><div>{{item.conversionRate4 | percentile}}</div></td>
            <td><div>{{item.traffic5 | formatThousands}}</div></td>
            <td><div>{{item.conversionRate5 | percentile}}</div></td>
          </tr>
          <tr v-else ><td class="noData" :colspan="12"> <div>Temporarily no data</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls';
  import {getQueryString, getHashString} from '../../assets/config/urlQuery';
  import {get, post} from '../../assets/config/http';
  const EC_SEARCH = xhrUrls.EC_SEARCH;
  export default {
    name: "e-commerce",
    data() {
      return {
        ecTableData: [],
        dataSearch: {
          month: ''
        },
        url:'',
        isQrShow:false
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
        this.getEcTableData()
      }else{
        this.getUrl()
      }

    },
    updated() {
      this.locationHash = false
    },
    methods: {
      getEcTableData() {
        this.dataSearch.month = this.getYearMonth
        post(EC_SEARCH, this.dataSearch).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.ecTableData = data.data
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      tips(val, id) {
        let tipsVal = ''
        switch (val) {
          case 'Traffic':
            tipsVal = 'The amount of visitors and visits a Web site receives.'
            this.tipsContent(tipsVal, id)
            break
          case 'Conversion':
            tipsVal = 'Buy lead conversion shows the value of the conversion points used on the Philips digital platform.For B2C, the conversion point refers to the buy button clicks. For B2B, conversion points are.'
            this.tipsContent(tipsVal, id)
            break
        }
      },

      tipsContent(tipsVal, id) {
        let div = document.createElement('div')
        let html = ''
        debugger

        $('.'+id).append(div)
        div.innerHTML = tipsVal

        // layer.tips(tipsVal, '.' + id, {
        //   time:2000,
        //   tips: [2, '#FFEDB2'],
        //   skin: 'fontColorBg',
        // });

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

      qrcodeHide(){
        this.isQrShow = false
      },

      getUrl(){
        if(getHashString('yearMonth')==this.getYearMonth){
          this.getEcTableData()
        }
      }
    },
    filters: {
      formatThousands: (params) => {
        if (!params) return 0
        let str = Math.round(params).toFixed(0)
        return (str + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      },
      percentile: (params) => {
        if (!params) return 0
        return (Number(params) * 100).toFixed(2) + '%'
      },
      round: (params) => {
        if (!params) return 0
        return params.toFixed(2)
      },
      periodMonth: (parmas)=>{
        let  month = parmas.substr(4, 2)
        switch (month){
          case "01":
            return 'Jan'
            break
          case "02":
            return 'Feb'
            break
          case "03":
            return 'Mar'
            break
          case "04":
            return 'Apr'
            break
          case "05":
            return 'May'
            break
          case "06":
            return 'Jun'
            break
          case "07":
            return 'Jul'
            break
          case "08":
            return 'Aug'
            break
          case "09":
            return 'Sep'
            break
          case "10":
            return 'Oct'
            break
          case "11":
            return 'Nov'
            break
          case "12":
            return 'Dec'
            break
        }
      }
    },
    watch:{
      getYearMonth() {
        this.getEcTableData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
  .color7
    background-color #ff89b9
  .tips-warp
    width 210px
    position absolute
    top 0
    right -230px
    z-index 10
    .tips-content
      position relative
      padding 5px 10px
      background-color #FFF2CC
      border 1px solid #F4B183
      color #7F7F7F
      text-align left
      &:before
        content ''
        position absolute
        top 15px
        left -20px
        width: 0
        height: 0
        border-top 10px solid transparent
        border-right 20px solid #F4B183
        border-bottom 5px solid transparent
      &:after
        content ''
        position absolute
        top 15px
        left -18px
        width: 0
        height: 0
        border-top 10px solid transparent
        border-right 20px solid #FFF2CC
        border-bottom 5px solid transparent
  .data-table
    border-collapse collapse
    border none
    table-layout fixed
    thead > tr
      background #DA9694
      th
        padding 10px 0
        border 1px solid #ddd
        cursor pointer
        color #fff
        font-weight normal
        font-style italic
        white-space pre-wrap
        word-wrap break-word
      .triangle
        position relative
        &:before
          position absolute
          content ' '
          width 0
          height 0
          border-top 8px solid #FF0000
          border-left 8px solid transparent
          top 0
          right 0

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
      &.noData
        font-size 14px
        padding 10px 0
        text-align center
    .hidden
      display none
  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .data-table
      tr
        td
        th
          padding 0 !important
          .icon-tanhao
            font-size 12px!important
          div
            transform scale(.7)!important
    .tool-box
      display none
</style>
