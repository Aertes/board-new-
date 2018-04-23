<template>
  <div class="dotcom-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color2"></i>Dotcom Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="test" class="select-colorOrange"></selection>
        </div>
        <div class="icon-box">
          <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
          <svg-icon sign="icon-link" class="link-icon"></svg-icon>
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
            <div>YTD</div>
          </th>
          <th :colspan="2">
            <div>Month Target</div>
          </th>
          <th :colspan="2">
            <div>YTD Target</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in b2cTableData" :class="{odd: index%2 == 0, even: index%2 != 0}"
            v-if="ecTableData.length >= 0">
          <td>
            <div>{{item.category}}</div>
          </td>
          <td>
            <div>{{item.period}}</div>
          </td>
          <td>
            <div>{{item.traffic1 | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.conversionRate1 | percentile}}</div>
          </td>
          <td>
            <div>{{item.traffic2 | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.conversionRate2 | percentile}}</div>
          </td>
          <td>
            <div>{{item.traffic3 | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.conversionRate3 | percentile}}</div>
          </td>
          <td>
            <div>{{item.traffic4 | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.conversionRate4 | percentile}}</div>
          </td>
          <td>
            <div>{{item.traffic5 | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.conversionRate5 | percentile}}</div>
          </td>
        </tr>
        <tr v-else>
          <td class="noData" :colspan="12">
            <div>Temporarily no data</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!---------------->
    <div class="table-name">B2B</div>
    <div>
      I am Table
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  import xhrUrls from '../../assets/config/xhrUrls';
  import {get, post} from '../../assets/config/http';

  const COM_SEARCH = xhrUrls.COM_SEARCH;

  export default {
    name: "dotcom",
    data() {
      return {
        b2cTableData: [],
        b2bTableData: [],
        searchData: {
          isB2C: true,
          month: "201803"
        }
      }
    },

    mounted() {
      this.getB2CtableData()

      this.getB2BtableData()
    },

    methods: {

      getB2CtableData() {
        this.searchData.isB2C = true
        post(COM_SEARCH, this.searchData).then(res => {
          let data = res.data
          if(data.code == 200){
            this.b2cTableData = data.data
          }else{
            console.log(data.errMsg)
          }
          debugger
        }).catch(err => console.log(err))
      },

      getB2BtableData() {
        this.searchData.isB2C = false
        post(COM_SEARCH, this.searchData).then(res => {
          let data = res.data
          if(data.code == 200){
            this.b2bTableData = data.data
          }else{
            console.log(data.errMsg)
          }
          debugger
        }).catch(err => console.log(err))
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
      }
    },
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
