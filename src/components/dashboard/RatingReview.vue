<template>
  <div class="rating-review-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color4"></i>Review & Rating Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="selectListOne" class="select-colorOrange" @selectShow="selectShowOneHandle"
                     ref="selectOptionOne"></selection>
        </div>
        <div class="icon-box">
          <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
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
    <div class="table-name">Year-to-date</div>
    <div class="table-box">
      <table id="yearTable" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>
            <div>Category</div>
          </th>
          <th>
            <div>Rate</div>
          </th>
          <th>
            <div>Over 4.3%</div>
          </th>
          <th>
            <div>Below 4.5%</div>
          </th>
          <th>
            <div>Over 4.8%</div>
          </th>
          <th>
            <div>Sellout volume</div>
          </th>
          <th>
            <div>%of review</div>
          </th>
          <th>
            <div>Total review</div>
          </th>
          <th>
            <div>Positive</div>
          </th>
          <th>
            <div>Neutral</div>
          </th>
          <th>
            <div>Negative</div>
          </th>
          <th>
            <div>%of negative</div>
          </th>
          <th>
            <div>Timely Response</div>
          </th>
          <th>
            <div>Timely Response%</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in yearTableData" :class="{odd: index%2 == 0, even: index%2 != 0}"
            v-if="yearTableData.length >= 0">
          <td>
            <div class="floatL">{{item.category}}</div>
          </td>
          <td>
            <div>{{item.avgRating | round}}</div>
          </td>
          <td>
            <div>{{item.smallVolume | percentile}}</div>
          </td>
          <td>
            <div>{{item.midVolume | percentile}}</div>
          </td>
          <td>
            <div>{{item.bigVolume | percentile}}</div>
          </td>
          <td>
            <div>{{item.selloutVolume | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.percentReview | percentile}}</div>
          </td>
          <td>
            <div>{{item.totalReview | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.positive | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.neutral | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.negative | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.percentNegative | percentile}}</div>
          </td>
          <td>
            <div>{{item.timelyResponse | strikethrough}}</div>
          </td>
          <td>
            <div>{{item.timelyResponseRate | strikethrough}}</div>
          </td>
        </tr>
        <tr v-else>
          <td class="noData" :colspan="14">
            <div>Temporarily no data</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!---------------->
    <div class="table-name">By month</div>
    <div>
      <table id="monthTable" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>
            <div>Category</div>
          </th>
          <th>
            <div>Rate</div>
          </th>
          <th>
            <div>Over 4.3%</div>
          </th>
          <th>
            <div>Below 4.5%</div>
          </th>
          <th>
            <div>Over 4.8%</div>
          </th>
          <th>
            <div>Sellout volume</div>
          </th>
          <th>
            <div>%of review</div>
          </th>
          <th>
            <div>Total review</div>
          </th>
          <th>
            <div>Positive</div>
          </th>
          <th>
            <div>Neutral</div>
          </th>
          <th>
            <div>Negative</div>
          </th>
          <th>
            <div>%of negative</div>
          </th>
          <th>
            <div>Timely Response</div>
          </th>
          <th>
            <div>Timely Response%</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in monthTableData" :class="{odd: index%2 == 0, even: index%2 != 0}"
            v-if="monthTableData.length >= 0">
          <td>
            <div class="floatL">{{item.category}}</div>
          </td>
          <td>
            <div>{{item.avgRating | round}}</div>
          </td>
          <td>
            <div>{{item.smallVolume | percentile}}</div>
          </td>
          <td>
            <div>{{item.midVolume | percentile}}</div>
          </td>
          <td>
            <div>{{item.bigVolume | percentile}}</div>
          </td>
          <td>
            <div>{{item.selloutVolume | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.percentReview | percentile}}</div>
          </td>
          <td>
            <div>{{item.totalReview | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.positive | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.neutral | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.negative | formatThousands}}</div>
          </td>
          <td>
            <div>{{item.percentNegative | percentile}}</div>
          </td>
          <td>
            <div>{{item.timelyResponse | strikethrough}}</div>
          </td>
          <td>
            <div>{{item.timelyResponseRate | strikethrough}}</div>
          </td>
        </tr>
        <tr v-else>
          <td class="noData" :colspan="14">
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

  const RV_SEARCH = xhrUrls.RV_SEARCH;
  const RV_CHANNEL = xhrUrls.RV_CHANNEL;
  export default {
    name: "rating-review",
    data() {
      return {
        yearTableData: [],
        monthTableData: [],
        selectListOne: ['All Channels'],
        channel: null,
        channelId: 0,
        searchDataYear: {
          isYTD: true,
          month: '',
          channel: ''
        },
        searchDataMonth: {
          isYTD: false,
          month: "",
          channel: ''
        },
        url: '',
        isQrShow: false
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
        this.getChannelList()
        this.getYeartableData()
        this.getMonthtableData()
      }

    },
    methods: {

      getYeartableData() {
        this.searchDataYear.channel = this.channel
        this.searchDataYear.month = this.getYearMonth
        post(RV_SEARCH, this.searchDataYear).then(res => {
          let data = res.data
          if (data.code == 200) {
            this.yearTableData = data.data.data
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      getMonthtableData() {
        this.searchDataMonth.channel = this.channel
        this.searchDataMonth.month = this.getYearMonth
        post(RV_SEARCH, this.searchDataMonth).then(res => {
          let data = res.data
          if (data.code == 200) {
            this.monthTableData = data.data.data
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      getChannelList() {
        get(RV_CHANNEL).then(res => {
          let data = res.data.data
          data.forEach(val => {
            this.selectListOne.push(val)
          })
        })
      },

      copyURL() {
        this.url = `${window.location}?yearMonth=${this.getYearMonth}&channel=${this.channel}&channelId=${this.channelId}`;
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
        this.url = `${window.location}?yearMonth=${this.getYearMonth}&channel=${this.channel}&channelId=${this.channelId}`;
        this.isQrShow = true
      },

      qrcodeHide() {
        this.isQrShow = false
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

      selectShowOneHandle(val) {

        if (!this.locationHash) {

          val.val == 'All Channels' ? this.channel = null : this.channel = val.val

          this.channelId = val.id

        }

      },

      getUrl() {

        let channel = getHashString('channel')

        let channelId = getHashString('channelId')

        this.getChannelList()

        channel == 'null' ? this.channel = null : this.channel = channel

        this.$refs.selectOptionOne.nowIndex = channelId

        this.getYeartableData()

        this.getMonthtableData()

      }

    },
    filters: {
      formatThousands: (params) => {
        if (!params) return 0
        let str = Math.round(params).toFixed(0)
        return (str + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      },
      percentile: (params) => {
        if (!params) return 0 + '%'
        return (Number(params) * 100).toFixed(0) + '%'
      },
      round: (params) => {
        if (!params) return 0
        return params.toFixed(2)
      },
      strikethrough: (params) => {
        if (!params) return '-'
      }
    },
    watch: {
      channel() {
        if (!this.locationHash) {
          this.getYeartableData()
          this.getMonthtableData()
        }
      },
      getYearMonth() {
        this.getYeartableData()
        this.getMonthtableData()
      },
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
      background #92D050
      th
        padding 10px 0
        border 1px solid #B3B3B3
        cursor pointer
        color #fff
        font-weight normal
        font-style italic
        white-space pre-wrap
        word-wrap break-word

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

  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .data-table
      tr
        td
        th
          padding 0 !important
          div
            transform scale(.7)

</style>
