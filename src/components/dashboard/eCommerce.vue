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
            </div>
          </span>
          <span @click="copyURL">
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
            <th @click="tips('Traffic', 'Traffic')" class="triangle Traffic"><div>Traffic</div></th>
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
            <td><div>{{item.period}}</div></td>
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
  import {get, post} from '../../assets/config/http';

  const EC_SEARCH = xhrUrls.EC_SEARCH;
  export default {
    name: "e-commerce",
    data() {
      return {
        ecTableData: [],
        dataSearch: {
          category: 'MG',
          month: '201803'
        },
        url:'',
        isQrShow:false
      }
    },
    mounted() {
      this.getEcTableData()
    },
    methods: {
      getEcTableData() {
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
        layer.tips(tipsVal, '.' + id, {
          tips: [2, '#FFF2CC'],
          skin: 'fontColorBg',
        });
      },

      copyURL() {
        let baseUrl;
        baseUrl = `${window.location.origin}/dashboard/#/dashboard?istable=1&type=cam&yearMonth=${this.dataSearch.month}`;
        this.url = baseUrl;
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
        let baseUrl;
        baseUrl = `${window.location.origin}/dashboard/#/dashboard?istable=1&type=cam&yearMonth=${this.dataSearch.month}`;
        this.url = baseUrl;
        this.isQrShow = true
      },

      qrcodeHide(){
        this.isQrShow = false
      },

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
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
  .color7
    background-color #ff89b9

  .data-table
    border-collapse collapse
    border none
    table-layout fixed
    thead > tr
      background #DA9694
      th
        padding 10px 0
        border 1px solid #B3B3B3
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
      border 1px solid #B3B3B3
      text-align center
      white-space pre-wrap
      word-wrap break-word
      &.noData
        font-size 14px
        padding 10px 0
        text-align center
    .hidden
      display none
</style>
