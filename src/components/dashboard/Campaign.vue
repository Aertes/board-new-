<script src="../../../node_modules/amfe-flexible/index.js"></script>
<template>
  <div class="campaign-wrap campaign-table">

    <div class="table-nav clearfix">
      <h3><i class="color-line color1"></i>Campaign Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="selectListOne" class="select-colorOrange" @selectShow="selectShowOneHandle"
                     ref="selectOptionOne"></selection>
        </div>
        <div class="icon-box">
          <span title="Show Chartbar">
            <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
          </span>
          <span class="qrcode" @mouseenter="qrcodeShow(1)" @mouseleave="qrcodeHide(1)">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow1">
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
      <div class="cam-per-ov">
        <table id="camTableOv" class="data-table" style="width:100%">
          <thead>
          <tr>
            <th>
              <div>Period</div>
            </th>
            <th @click="tips('Spending', 'Spending')" class="triangle Spending">
              <div>Spending</div>
            </th>
            <th @click="tips('Impression', 'Impression')" class="triangle Impression">
              <div>Impression</div>
            </th>
            <th @click="tips('Traffic', 'Traffic')" class="triangle Traffic">
              <div>Traffic</div>
            </th>
            <th @click="tips('Traffic to EC', 'EC')" class="triangle EC">
              <div>Traffic to EC</div>
            </th>
            <th>
              <div>Target</div>
            </th>
            <th></th>
            <th @click="tips('Traffic to .com', 'com')" class="triangle com">
              <div>Traffic to .com</div>
            </th>
            <th>
              <div>Target</div>
            </th>
            <th></th>
            <th @click="tips('CTR', 'CTR')" class="triangle CTR">
              <div>CTR</div>
            </th>
            <th @click="tips('Leads', 'Leads')" class="triangle Leads">
              <div>Leads</div>
            </th>
            <th @click="tips('Cost per lead', 'Cost')" class="triangle Cost">
              <div>Cost per lead</div>
            </th>
            <th @click="tips('Baseline1', 'Baseline1')" class="triangle Baseline1">
              <div>Baseline</div>
            </th>
            <th></th>
            <th @click="tips('Conversion%', 'Conversion')" class="triangle Conversion">
              <div>Conversion%</div>
            </th>
            <th @click="tips('Baseline2', 'Baseline2')" class="triangle Baseline2">
              <div>Baseline</div>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in camTableOvData" :class="{even: index%2 == 0, odd: index%2 != 0}">
            <td>
              <div>{{item.title}}</div>
            </td>
            <td>
              <div>{{item.spending | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.impression | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.traffic | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.trafficEc | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.trafficEcTarget | formatThousands }}</div>
            </td>
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
            <td>
              <div>{{item.trafficCom | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.trafficComTarget | formatThousands }}</div>
            </td>
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
            <td>
              <div>{{item.ctr | percentile }}</div>
            </td>
            <td>
              <div>{{item.leads | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.costLead | round }}</div>
            </td>
            <td>
              <div>{{item.costLeadTarget | formatThousands }}</div>
            </td>
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
            <td>
              <div>{{item.conversionRate | percentile }}</div>
            </td>
            <td>
              <div>{{item.conversionRateTarget  | percentile }}</div>
            </td>
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
          <selection :selections="selectListOne" class="select-colorOrange" @selectShow="selectShowTwoHandle"
                     ref="selectOptionTwo"></selection>
          <selection :selections="selectListTwo" class="select-colorDarkseaGreen"
                     @selectShow="selectShowThreeHandle" ref="selectOptionThree"></selection>
        </div>
        <div class="icon-box">
          <span title="Show Chartbar">
            <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
          </span>
          <span class="qrcode" @mouseenter="qrcodeShow(2)" @mouseleave="qrcodeHide(2)">
            <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
            <div class="qrcode-warp" v-show="isQrShow2">
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
    <div class="table-name color">{{category}}</div>
    <div>
      <div class="ind-cam-per">
        <table id="camTableAn" class="data-table" style="width:100%">
          <thead>
          <tr>
            <th>
              <div>{{isMonth}}</div>
            </th>
            <th>
              <div>Period</div>
            </th>
            <th>
              <div>Channel</div>
            </th>
            <th>
              <div>Spending</div>
            </th>
            <th>
              <div>Impression</div>
            </th>
            <th>
              <div>Click</div>
            </th>
            <th>
              <div>CTR</div>
            </th>
            <th>
              <div>Leads</div>
            </th>
            <th>
              <div>Cost per lead</div>
            </th>
            <th>
              <div>Conversion%</div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in camOverAllTable" v-if="item.type == 'week'" class="even">
            <td :rowspan="item.weekspan" :class="{hidden: item.weekdis}">
              <div>{{item.week}}</div>
            </td>
            <td :rowspan="item.endDatespan" :class="{hidden: item.week == 'Overall'&&item.endDatedis}">
              <div>{{item.startDate}}-{{item.endDate}}</div>
            </td>
            <td>
              <div>{{item.channel}}</div>
            </td>
            <td>
              <div>{{item.spending | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.impression | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.click | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.ctr | percentile }}</div>
            </td>
            <td>
              <div>{{item.leads | formatThousands }}</div>
            </td>
            <td>
              <div>{{item.costLead | round }}</div>
            </td>
            <td>
              <div>{{item.conversionRate | percentile }}</div>
            </td>
          </tr>
          <tr v-for="(item, index) in camWeekTable">
            <td :rowspan="item.weekspan" :class="{odd: item.isColor, even: !item.isColor, hidden: item.weekdis}">
              <div>{{item.week}}</div>
            </td>
            <td :rowspan="item.endDatespan" :class="{odd: item.isColor, even: !item.isColor, hidden: item.endDatedis}">
              <div>{{item.startDate}}-{{item.endDate}}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.channel}}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.spending | formatThousands }}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.impression | formatThousands }}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.click | formatThousands }}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.ctr | percentile }}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.leads | formatThousands }}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.costLead | round }}</div>
            </td>
            <td :class="{odd: item.isColor, even: !item.isColor}">
              <div>{{item.conversionRate | percentile }}</div>
            </td>
          </tr>
          <tr v-for="(item, index) in camMonthTable" v-if="item.type == 'month'" >
            <td :rowspan="item.monthspan" :class="{odd: !item.isColor, even: item.isColor,  hidden: item.monthdis}">
              <div>{{item.month}}</div>
            </td>
            <td :rowspan="item.endDatespan" :class="{odd: !item.isColor,  even: item.isColor, hidden: item.endDatedis}">
              <div>{{item.startDate}}-{{item.endDate}}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.channel}}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.spending | formatThousands }}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.impression | formatThousands }}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.click | formatThousands }}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.ctr | percentile }}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.leads | formatThousands }}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.costLead | round }}</div>
            </td>
            <td :class="{odd: !item.isColor, even: item.isColor}">
              <div>{{item.conversionRate | percentile }}</div>
            </td>
          </tr>
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

  const CMA_SEARCH = xhrUrls.CMA_SEARCH;
  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  export default {
    name: "campaign",
    data() {
      return {
        camTableOvData: [],
        camTableAnData: [],
        camWeekTable: [],
        camOverAllTable: [],
        camMonthTable: [],
        selectListOne: ['All Categories'],
        selectListTwo: [],
        campaign: null,
        campaignId: 0,
        campaignTwo: null,
        campaignTwoId: 0,
        category: null,
        categoryId: 0,
        OvTableSearch: {
          category: '',
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
        isQrShow1: false,
        isQrShow2: false,
        locationHash: false,
        isSelectTwo: false,
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

      if (this.locationHash) {
        this.getUrl()
      } else {
        this.getCategoryList()
        this.getCampaignList()
        this.getOvTableData()
      }

    },
    updated() {
      this.locationHash = false
    },
    methods: {
      getOvTableData() {
        this.OvTableSearch.category = this.campaign
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
        this.AnTableSearch.campaign = this.category
        this.AnTableSearch.category = this.campaignTwo
        post(CMA_SEARCH, this.AnTableSearch).then(res => {
          let data = res.data;
          this.camWeekTable = []
          this.camMonthTable = []
          this.camOverAllTable = []
          if (data.code == 200) {
            data.data.forEach((v, i) => {
              if (v.type == 'week' && v.week != 'Overall') {
                this.camWeekTable.push(v)
                this.columnIndex(this.camWeekTable)
              } else if (v.type == 'month') {
                this.camMonthTable.push(v)
                this.columnIndex(this.camMonthTable)
              } else {
                this.camOverAllTable.push(v)
                this.columnIndex(this.camOverAllTable)
              }
            })
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
          tips: [2, '#FFEDB2'],
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
                data[i][row + 'odd'] = true;
              } else {
                break;
              }
              // if (data[k].week != 'Overall') {
              //
              // } else {
              //   break
              // }
            }
            k = i;
          }
          rowIndex++;
        }
        this.camTableAnData = data
        // console.log(data)
      },

      copyURL() {

        this.url = `${window.location}?yearMonth=${this.getYearMonth}&campaign=${this.campaign}&campaignId=${this.campaignId}&campaignTwo=${this.campaignTwo}&campaignTwoId=${this.campaignTwoId}&category=${this.category}&categoryId=${this.categoryId}`;

        let input = document.createElement('input')

        document.body.appendChild(input)

        input.setAttribute('value', encodeURI(this.url))

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

      qrcodeShow(id) {
        let baseUrl = `${window.location}?yearMonth=${this.getYearMonth}&campaign=${this.campaign}&campaignId=${this.campaignId}&campaignTwo=${this.campaignTwo}&campaignTwoId=${this.campaignTwoId}&category=${this.category}&categoryId=${this.categoryId}`;
        switch (id) {
          case 1:
            this.url = baseUrl;
            this.isQrShow1 = true
            break;
          case 2:
            this.url = baseUrl;
            this.isQrShow2 = true
            break;
        }
      },

      qrcodeHide(id) {
        switch (id) {
          case 1:
            this.isQrShow1 = false
            break
          case 2:
            this.isQrShow2 = false
            break
        }
      },

      getCategoryList() {

        get(CAM_CATEGORY).then(res => {
          let data = res.data.data
          data.forEach(val => {
            this.selectListOne.push(val)
          })
        })

      },

      getCampaignList() {

        get(`${CAM_GETPARAMETER}?category=All%20Categories`).then(res => {
          let data = res.data.data
          this.selectListTwo = []
          data.forEach(val => {
            this.selectListTwo.push(val)
          })
        })

      },

      selectShowOneHandle(val) {

        if (!this.locationHash) {

          val.val == 'All Categories' ? this.campaign = null : this.campaign = val.val

          this.campaignId = val.id

        }

      },

      selectShowTwoHandle(val) {

        if (!this.locationHash) {

          get(`${CAM_GETPARAMETER}?category=${val.val}`).then(res => {
            let data = res.data.data
            this.selectListTwo = []
            data.forEach(val => {
              this.selectListTwo.push(val)
            })
          })

          this.$refs.selectOptionThree.nowIndex = 0

          val.val == 'All Categories' ? this.campaignTwo = null : this.campaignTwo = val.val

          this.campaignTwoId = val.id

        }

      },

      selectShowThreeHandle(val) {

        if (!this.locationHash) {

          this.isSelectTwo = false

          val.val == 'All Categories' ? this.category = '' : this.category = val.val

          this.categoryId = val.id

        }

      },

      getUrl() {

        let CAM_GETPARAMETER_CATEGOTY = 'All Categories'

        let campaign = getHashString('campaign')
        let campaignId = getHashString('campaignId')

        let campaignTwo = getHashString('campaignTwo')
        let campaignTwoId = getHashString('campaignTwoId')

        let category = getHashString('category')
        let categoryId = getHashString('categoryId')

        this.getCategoryList()

        campaign == 'null' ? this.campaign = null : this.campaign = campaign

        this.$refs.selectOptionOne.nowIndex = campaignId

        this.getOvTableData()

        this.isSelectTwo = true

        get(`${CAM_GETPARAMETER}?category=${campaignTwoId == 0 ? CAM_GETPARAMETER_CATEGOTY : campaignTwo}`).then(res => {

          let data = res.data.data

          this.selectListTwo = []

          data.forEach(val => {

            this.selectListTwo.push(val)

          })

        })

        this.$refs.selectOptionTwo.nowIndex = campaignTwoId

        this.$refs.selectOptionThree.nowIndex = categoryId

        campaignTwo == 'null' ? this.campaignTwo = null : this.campaignTwo = campaignTwo

        this.campaignTwoId = campaignTwoId

        this.category = category

        this.categoryId = categoryId

        this.getAnTableData()

      },

      weekStr: (params) => {
        let num = params.substr(4);
        if (num % 2 == 0) {
          return true
        } else {
          return false
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

    },
    watch: {
      selectListTwo() {
        if (!this.locationHash && !this.isSelectTwo) this.category = this.selectListTwo[0]
      },
      campaign() {
        if (!this.locationHash) this.getOvTableData()
      },
      campaignTwo() {
        if (!this.locationHash) this.getAnTableData()
      },
      category() {
        if (!this.locationHash && !this.isSelectTwo) this.getAnTableData()
      },
      getYearMonth() {
        this.getOvTableData()
      }
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
        &.odd
          background-color #F2F2F2
        &.even
          background-color #FFFFFF
      .hidden
        display none

  #camTableAn
    th
      &:nth-child(2)
        width 190px

  #camTableOv
    th
      &:nth-child(7), &:nth-child(10), &:nth-child(15), &:nth-child(18)
        width 30px

  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .data-table
      tr
        td
        th
          padding 0 !important
          div
            transform scale(.7)

    #camTableAn
      th
        &:nth-child(2)
          width 100px

</style>
