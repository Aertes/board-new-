<script src="../../../node_modules/amfe-flexible/index.js"></script>
<template>
  <div class="campaign-wrap campaign-table">

    <div class="table-nav clearfix">
      <h3><i class="color-line color1"></i>Campaign Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="selectList1" class="select-colorOrange" @selectShow="selectShowOneHandle"></selection>
        </div>
        <div class="icon-box">
          <span>
            <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
          </span>
          <span class="qrcode" @mouseenter="qrcodeShow(1)" @mouseleave="qrcodeHide(1)">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow1">
              <qrcode :value="url" :options="{ size: 150 }"></qrcode>
            </div>
          </span>
          <span @click="copyURL(1)">
            <svg-icon sign="icon-link" class="link-icon"></svg-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="table-box">
      <div class="cam-per-ov">
        <table id="camTableOv" class="data-table" style="width:100%">
          <thead>
          <tr>
            <th><div>Period</div></th>
            <th @click="tips('Spending', 'Spending')" class="triangle Spending"><div>Spending</div></th>
            <th @click="tips('Impression', 'Impression')" class="triangle Impression"><div>Impression</div></th>
            <th @click="tips('Traffic', 'Traffic')" class="triangle Traffic"><div>Traffic</div></th>
            <th @click="tips('Traffic to EC', 'EC')" class="triangle EC"><div>Traffic to EC</div></th>
            <th><div>Target</div></th>
            <th></th>
            <th @click="tips('Traffic to .com', 'com')" class="triangle com"><div>Traffic to .com</div></th>
            <th><div>Target</div></th>
            <th></th>
            <th @click="tips('CTR', 'CTR')" class="triangle CTR"><div>CTR</div></th>
            <th @click="tips('Leads', 'Leads')" class="triangle Leads"><div>Leads</div></th>
            <th @click="tips('Cost per lead', 'Cost')" class="triangle Cost"><div>Cost per lead</div></th>
            <th @click="tips('Baseline1', 'Baseline1')" class="triangle Baseline1"><div>Baseline</div></th>
            <th></th>
            <th @click="tips('Conversion%', 'Conversion')" class="triangle Conversion"><div>Conversion%</div></th>
            <th @click="tips('Baseline2', 'Baseline2')" class="triangle Baseline2"><div>Baseline</div></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in camTableOvData" :class="{even: index%2 == 0, odd: index%2 != 0}">
            <td><div>{{item.title}}</div></td>
            <td><div>{{item.spending | formatThousands }}</div></td>
            <td><div>{{item.impression | formatThousands }}</div></td>
            <td><div>{{item.traffic | formatThousands }}</div></td>
            <td><div>{{item.trafficEc | formatThousands }}</div></td>
            <td><div>{{item.trafficEcTarget | formatThousands }}</div></td>
            <td v-if="item.h==1">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="item.h==2">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="item.h==3">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="item.h==4">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td><div>{{item.trafficCom | formatThousands }}</div></td>
            <td><div>{{item.trafficComTarget | formatThousands }}</div></td>
            <td v-if="item.k==1">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="item.k==2">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="item.k==3">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="item.k==4">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td><div>{{item.ctr | percentile }}</div></td>
            <td><div>{{item.leads | formatThousands }}</div></td>
            <td><div>{{item.costLead | round }}</div></td>
            <td><div>{{item.baseLine | formatThousands }}</div></td>
            <td v-if="item.p==1">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="item.p==2">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="item.p==3">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="item.p==4">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td><div>{{item.conversionRate | percentile }}</div></td>
            <td><div>{{item.baseLineConversion | percentile }}</div></td>
            <td v-if="item.s==1">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="item.s==2">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="item.s==3">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="item.s==4">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!---------------->

    <div class="table-nav clearfix">
      <h3><i class="color-line color1"></i>Individual Campaign Performance Analysis</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="selectList1" class="select-colorOrange" @selectShow="selectShowTwoHandle"></selection>
          <selection :selections="selectList2" class="select-colorDarkseaGreen"
                     @selectShow="selectShowThreeHandle" ref="selectOption"></selection>
        </div>
        <div class="icon-box">
          <span>
            <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
          </span>
          <span class="qrcode" @mouseenter="qrcodeShow(2)" @mouseleave="qrcodeHide(2)">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow2">
              <qrcode :value="url" :options="{ size: 150 }"></qrcode>
            </div>
          </span>
          <span @click="copyURL(2)">
            <svg-icon sign="icon-link" class="link-icon"></svg-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="table-name color">Campaign name</div>
    <div>
      <div class="ind-cam-per">
        <table id="camTableAn" class="data-table" style="width:100%">
          <thead>
          <tr>
            <th><div>{{isMonth}}</div></th>
            <th><div>Period</div></th>
            <th><div>Channel</div></th>
            <th><div>Spending</div></th>
            <th><div>Impression</div></th>
            <th><div>Click</div></th>
            <th><div>CTR</div></th>
            <th><div>Leads</div></th>
            <th><div>Cost per lead</div></th>
            <th><div>Conversion%</div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in camTableAnData">
            <td :rowspan="item.monthspan" :class="{hidden: item.monthdis}" v-if="item.type == 'month'"><div>{{item.month}}</div></td>
            <td :rowspan="item.weekspan" :class="{hidden: item.weekdis}" v-else="item.type == 'week'"><div>{{item.week}}</div></td>
            <td :rowspan="item.endDatespan" :class="{hidden: item.endDatedis}"><div>{{item.startDate}}-{{item.endDate}}</div></td>
            <td><div>{{item.channel}}</div></td>
            <td><div>{{item.spending | formatThousands }}</div></td>
            <td><div>{{item.impression | formatThousands }}</div></td>
            <td><div>{{item.click | formatThousands }}</div></td>
            <td><div>{{item.ctr | percentile }}</div></td>
            <td><div>{{item.leads | formatThousands }}</div></td>
            <td><div>{{item.costLead | round }}</div></td>
            <td><div>{{item.conversionRate | percentile }}</div></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls';
  import {get, post} from '../../assets/config/http';

  const CMA_SEARCH = xhrUrls.CMA_SEARCH;

  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER

  export default {
    name: "campaign",
    data() {
      return {
        camTableOvData: [],
        camTableAnData: [],
        selectList1: ['All Categories'],
        selectList2: ['All Categories'],
        selectVal1: '',
        selectVal2: '',
        selectVal3: '',
        OvTableSearch: {
          campaign: '',
          isTable: true,
          month: '',
          isDetailTable: false
        },
        AnTableSearch: {
          campaign: '',
          category: '',
          isDetailTable: true,
        },
        isMonth: '',
        url: '',
        isQrShow1:false,
        isQrShow2:false
      }
    },
    computed: {
      getYearMonth() {
        return this.$store.getters.getYearMonth
      }
    },
    mounted() {

      this.getOvTableData()

      this.getAnTableData()

      this.getSelectList()

    },
    methods: {
      getOvTableData() {
        this.OvTableSearch.campaign = this.selectVal1
        this.OvTableSearch.month = this.getYearMonth
        post(CMA_SEARCH, this.OvTableSearch).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.camTableOvData = data.data;
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      getAnTableData() {
        this.AnTableSearch.campaign = this.selectVal2
        this.AnTableSearch.category = this.selectVal3
        post(CMA_SEARCH, this.AnTableSearch).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.camTableAnData = data.data;
            this.columnIndex(this.camTableAnData)
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      tips(val, id) {
        let tipsVal = ''
        switch (val) {
          case 'Spending':
            tipsVal = 'All cost on digital campaign.'
            this.tipsContent(tipsVal, id)
            break
          case 'Impression':
            tipsVal = 'A single instance of an online advertisement being displayed.'
            this.tipsContent(tipsVal, id)
            break
          case 'Traffic':
            tipsVal = 'The process of clicking through an online advertisement to the advertiser’s destination.'
            this.tipsContent(tipsVal, id)
            break
          case 'Traffic to EC':
            tipsVal = 'The traffic to EC channel.'
            this.tipsContent(tipsVal, id)
            break
          case 'Traffic to .com':
            tipsVal = 'The traffic to .com.'
            this.tipsContent(tipsVal, id)
            break
          case 'CTR':
            tipsVal = 'The average number of click-throughs per hundred ad impressions, expressed as a percentage.'
            this.tipsContent(tipsVal, id)
            break
          case 'Leads':
            tipsVal = 'Number of B2C visits that resulted in a click on the buy button.\n'
            this.tipsContent(tipsVal, id)
            break
          case 'Cost per lead':
            tipsVal = 'Cost per lead (CPL) is one form of performance-based adverting.Online advertising payment model in which payment is based on the number of qualifying leads generated.'
            this.tipsContent(tipsVal, id)
            break
          case 'Baseline1':
            tipsVal = 'Baseline is the performance in the last rolling 12M.'
            this.tipsContent(tipsVal, id)
            break
          case 'Conversion%':
            tipsVal = 'Buy lead conversion shows the value of the conversion points used on the Philips digital platform.For B2C, the conversion point refers to the buy button clicks. For B2B, conversion points are represented by leads generated for completed HS lead form.'
            this.tipsContent(tipsVal, id)
            break
          case 'Baseline2':
            tipsVal = 'Baseline is the performance in the last 12M.'
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

      columnIndex(data) {
        let rowIndex = 0;
        if (data[0].type == 'month') {
          this.isMonth = 'Month'
        } else {
          this.isMonth = 'Week'
        }
        for (let row in data[0]) {
          let k = 0;
          while (k < data.length) {
            data[k][row + 'span'] = 1;
            data[k][row + 'dis'] = false;
            for (var i = k + 1; i <= data.length - 1; i++) {
              if (data[k][row] == data[i][row] && data[k][row] != '' || rowIndex < 2) {
                data[k][row + 'span']++;
                data[k][row + 'dis'] = false;
                data[i][row + 'span'] = 1;
                data[i][row + 'dis'] = true;
              } else {
                break;
              }
            }
            k = i;
          }
          rowIndex++;
        }
        this.camTableAnData = data
      },

      copyURL(id) {
        let baseUrl;
        baseUrl = `${window.location.origin}/dashboard/#/dashboard?istable=sdasdsd&type=cam&yearMonth=${this.OvTableSearch.month}`;
        switch (id) {
          case 1:
            this.url = baseUrl;
            let input1 = document.createElement('input')
            document.body.appendChild(input1)
            input1.setAttribute('value', this.url)
            input1.select()
            if (document.execCommand('copy')) {
              document.execCommand('copy')
              this.layerMsg("Copy success !")
            }
            document.body.removeChild(input)
            break
          case 2:
            this.url = baseUrl
            let input = document.createElement('input')
            document.body.appendChild(input)
            input.setAttribute('value', this.url)
            input.select()
            if (document.execCommand('copy')) {
              document.execCommand('copy')
              this.layerMsg("Copy success !")
            }
            document.body.removeChild(input)
            break
        }
      },
      layerMsg(err) {
        layer.msg(err, {
          time: 2000,
          skin: 'fontColor'
        })
      },

      qrcodeShow(id) {
        let baseUrl;
        baseUrl = `${window.location.origin}/dashboard/#/dashboard?istable=sdasdsd&type=cam&yearMonth=${this.OvTableSearch.month}`;
        switch (id) {
          case 1:
            this.url = baseUrl;
            this.isQrShow1 = true
            break
          case 2:
            this.url = baseUrl
            this.isQrShow2 = true
            break
        }
      },

      qrcodeHide(id){
        switch (id) {
          case 1:
            this.isQrShow1 = false
            break
          case 2:
            this.isQrShow2 = false
            break
        }
      },

      getSelectList() {
        get(CAM_CATEGORY).then(res => {
          let data = res.data.data
          data.forEach(val => {
            this.selectList1.push(val)
          })

        })
      },

      selectShowOneHandle(val) {

        val.val == 'All Categories' ? this.selectVal1 = '' : this.selectVal1 = val.val

      },

      selectShowTwoHandle(val) {

        let url = `${CAM_GETPARAMETER}?category=${val.val}`
        get(url).then(res => {
          let data = res.data.data
          this.selectList2 = ['All Categories']
          data.forEach(val => {
            this.selectList2.push(val)
          })
        })

        this.$refs.selectOption.nowIndex = 0

        val.val == 'All Categories' ? this.selectVal2 = '' : this.selectVal2 = val.val

      },

      selectShowThreeHandle(val) {

        val.val == 'All Categories' ? this.selectVal3 = '' : this.selectVal3 = val.val

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
    watch: {
      selectVal1(){
        this.getOvTableData()
      },
      selectVal2(){
        this.getAnTableData()
      },
      selectVal3(){
        this.getAnTableData()
      },
      getYearMonth(){
        this.getOvTableData()
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
  .campaign-table
    .data-table
      border-collapse collapse
      border none
      table-layout fixed
      thead > tr
        background #538DD5
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
      .hidden
        display none
  #url1, #url2
    display none
  @media screen and (max-width: 1235px)
    .campaign-table
      .data-table
        tr
          td
          th
            padding 0!important
            div
              transform scale(.7)

</style>
