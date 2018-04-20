<template>
  <div class="tables-wrap" id="tablesBox">
    <div class="tables-title">
      <span>{{title}} <span class="timeColor">({{Time}})</span></span>
      <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
    </div>
    <div class="clearfix select-wrap">
      <svg-icon sign="icon-date" class="options-icon-date"></svg-icon>

      <selection v-show="selectionOne" :selections="selectOptionsOne" @selectShowOne="selectShowOneHandle"></selection>

      <selection v-show="selectionTwo" :selections="selectOptionsTwo" @selectShowTwo="selectShowTwoHandle"
                 ref="selectionTwoBox"></selection>

      <selection v-show="selectionThree" :selections="selectOptionsThree" @selectShowThree="selectShowThreeHandle"
                 ref="selectionThreeBox"></selection>

      <selection v-show="selectionFour" :selections="selectOptionsFour" @selectShowFour="selectShowFourHandle"
                 ref="selectionFourBox" class="styleone"></selection>

      <selection v-show="selectionFive" :selections="selectOptionsFive" @selectShowFour="selectShowFiveHandle"
                 ref="selectionFiveBox"></selection>

      <!--<selection v-for="item in selectList" :selections="selectOptions"></selection>-->
    </div>
    <div class="tables-container">
      <div class="tableBoxwrap" v-show="isShow1">
        <table id="tableBoxDialog1" class="display" style="width:100%">
          <thead>
          <tr>
            <th>KPI</th>
            <th>Month</th>
            <th>Target</th>
            <th></th>
            <th>YTD</th>
            <th>Target</th>
            <th></th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow5">
        <table id="tableBoxDialog5" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Period</th>
            <th>Spending</th>
            <th>Impression</th>
            <th>Traffic</th>
            <th>Traffic to EC</th>
            <th>Target</th>
            <th></th>
            <th>Traffic to .com</th>
            <th>Target</th>
            <th></th>
            <th>CTR</th>
            <th>Leads</th>
            <th>Cost per lead</th>
            <th>Baseline</th>
            <th></th>
            <th>Conversion%</th>
            <th>Baseline</th>
            <th></th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow6">
        <table id="tableBoxDialog6" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Week</th>
            <th>Period</th>
            <th>Channel</th>
            <th>Spending</th>
            <th>Impression</th>
            <th>Click</th>
            <th>CTR</th>
            <th>Leads</th>
            <th>Cost per lead</th>
            <th>Conversion%</th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow7">
        <table id="tableBoxDialog7" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Marketing Metrics</th>
            <th>Month</th>
            <th>YTD</th>
            <th>Monthly Target</th>
            <th></th>
            <th>YTD Target</th>
            <th></th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow8">
        <table id="tableBoxDialog8" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Marketing Metrics</th>
            <th>Month</th>
            <th>YTD</th>
            <th>Monthly target</th>
            <th></th>
            <th>YTD Target</th>
            <th></th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow9">
        <table id="tableBoxDialog9" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Channel</th>
            <th>Category</th>
            <th>Rate</th>
            <th>&lt; 4.3%</th>
            <th>4.3%-4.8%</th>
            <th>&gt; 4.8%</th>
            <th>Sellout volume</th>
            <th>% of review</th>
            <th>Total review</th>
            <th>Positive</th>
            <th>Neutral</th>
            <th>Negative</th>
            <th>% of negative</th>
            <th>Timely Response</th>
            <th>Timely Reponse%</th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow10">
        <table id="tableBoxDialog10" class="display" style="width:100%">
          <thead>
          <tr>
            <th>Channel</th>
            <th>Category</th>
            <th>Rate</th>
            <th>&lt; 4.3%</th>
            <th>4.3%-4.8%</th>
            <th>&gt; 4.8%</th>
            <th>Sellout volume</th>
            <th>% of review</th>
            <th>Total review</th>
            <th>Positive</th>
            <th>Neutral</th>
            <th>Negative</th>
            <th>% of negative</th>
            <th>Timely Response</th>
            <th>Timely Reponse%</th>
          </tr>
          </thead>
        </table>
      </div>

      <div class="tableBoxwrap" v-show="isShow11">
        <table id="tableBoxDialog11" class="display" style="width:100%">
          <thead>
          <tr>
            <th rowspan="2">Category</th>
            <th rowspan="2">Period</th>
            <th colspan="2">Total</th>
            <th colspan="2">站外</th>
            <th colspan="2">钻展</th>
            <th colspan="2">搜索</th>
            <th colspan="2">其他</th>
          </tr>
          <tr>
            <th>Traffic</th>
            <th>Conversion%</th>
            <th>Traffic</th>
            <th>Conversion%</th>
            <th>Traffic</th>
            <th>Conversion%</th>
            <th>Traffic</th>
            <th>Conversion%</th>
            <th>Traffic</th>
            <th>Conversion%</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {
    get,
    post,
    uploadPost
  } from '../../assets/config/http'
  import {
    dataOvCmaSearch,
    dataOvComB2BSearch,
    dataOvComB2CSearch,
    dataOvCrmSearch,
    dataOvRevSearch,
    dataCmaSearch,
    dataCmafunnelSearch,
    dataComSearch,
    dataCrmSearch,
    dataRevRatSearch,
    dataEcSearch,
    dataEcAllSearch,
    formatThousands
  } from '../../assets/chartsData/index'

  let OVDateUrl = xhrUrls.OV_DATE
  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  let EC_CATEGORY = xhrUrls.EC_CATEGORY

  export default {
    name: "Tables",
    data() {
      return {
        selectOptionsOne: [],
        selectOptionsTwo: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        selectOptionsThree: [],
        selectOptionsFour: [],
        selectOptionsFive: [],
        selectionOne: true,
        selectionTwo: true,
        selectionThree: false,
        selectionFour: false,
        selectionFive: false,
        isShow1: false,
        isShow5: false,
        isShow6: false,
        isShow7: false,
        isShow8: false,
        isShow9: false,
        isShow10: false,
        isShow11: false,
        selectList: 1,
        overview: '',
        title: 'CAMPAIGN',
        name: 'CAMPAIGN',
        titleList: [
          'CAMPAIGN',
          'COM.CN B2B',
          'COM.CN B2C',
          'CRM',
          'RATING & REVIEW',
          'CAMPAIGN TRAFFIC',
          'CAMPAIGN KPI',
          'INDIVIDAL CAMPAIGN PERFORMANCE DASHBOARD',
          'COM.CN MONTH TRAFFIC',
          'COM.CN YTD TRAFFIC',
          'CRM MONTH TRAFFIC',
          'CRM YTD TRAFFIC',
          'RATING & REVIEW YTD',
          'RATING & REVIEW MONTH',
          'EC REPORT',
        ],
        data: [
          {
            "isBar": false,
            "isDetailTable": true,
            "isTable": true,
            "month": ""
          },
          {
            "isB2C": false,
            "isTable": true,
            "month": ""
          },
          {
            "isB2C": true,
            "isTable": true,
            "month": ""
          },
          {
            "isTable": true,
            "month": ""
          },
          {
            "isTable": true,
            "isBar": false,
            "month": ""
          },
          {//cam1表
            "chartType": "bar",
            "isDetailTable": false,
            "isTable": true,
            "month": ""
          },
          {//cam2表
            "chartType": "line",
            "isDetailTable": false,
            "isTable": true,
            "month": ""
          },
          {//cam3表
            "chartType": "funnel",
            "isDetailTable": true,
            "isTable": true,
            "month": ""
          },
          {//com.cn.month
            "isB2C": true,
            "isYTD": false,
            "isTable": false,
            "month": ""
          },
          {//com.cn.YTD
            "isB2C": true,
            "isYTD": true,
            "isTable": false,
            "month": ""
          },
          {//crm.month
            "isTable": true,
            "isYTD": false,
            "month": ""
          },
          {//crm.YTD
            "isTable": true,
            "isYTD": true,
            "month": ""
          },
          {
            "isTable": true,
            "isYTD": true,
            "month": ""
          },
          {
            "isTable": true,
            "isYTD": false,
            "month": ""
          },
          {
            "category": "",
            "isTable": true,
            "month": ""
          }
        ],
        selectOneVal: '',
        selectTwoVal: '',
        locationHash: false,
        Time: '2018/01'
      }
    },
    props: ['tableData'],
    computed: {
      type() {
        return this.$store.state.type
      },
      getStoreYearMonth() {
        return this.$store.getters.getYearMonth
      },
      getMoth() {
        return this.$store.state.month
      },
      month() {
        return this.$store.state.month
      },
      camOneCategory() {
        return this.$store.state.camOneCategory
      },
      camOneTwoCategory() {
        return this.$store.state.camOneTwoCategory
      },
      camCategory() {
        return this.$store.state.camCategory
      },
      camCompaign() {
        return this.$store.state.camCompaign
      },
      camWeek() {
        return this.$store.state.camWeek
      },
      comMarketType() {
        return this.$store.state.comMarketType
      },
      comMarketTypeTwo() {
        return this.$store.state.comMarketTypeTwo
      },
      rrOneChannel() {
        return this.$store.state.rrOneChannel
      },
      rrChannel() {
        return this.$store.state.rrChannel
      },
      ecCategory() {
        return this.$store.state.ecCategory
      },


      camOneCategoryId() {
        return this.$store.state.camOneCategoryId
      },
      camOneTwoCategoryId() {
        return this.$store.state.camOneTwoCategoryId
      },
      camCategoryId() {
        return this.$store.state.camCategoryId
      },
      camCompaignId() {
        return this.$store.state.camCompaignId
      },
      camWeekId() {
        return this.$store.state.camWeekId
      },
      comMarketTypeId() {
        return this.$store.state.comMarketTypeId
      },
      comMarketTypeTwoId() {
        return this.$store.state.comMarketTypeTwoId
      },
      rrOneChannelId() {
        return this.$store.state.rrOneChannelId
      },
      rrChannelId() {
        return this.$store.state.rrChannelId
      },
      ecCategoryId() {
        return this.$store.state.ecCategoryId
      }
    },
    mounted() {

      this.getTimeMonth()

      this.setTime()

      this.getTableData()

      //this.monthChange()

      if (window.location.hash.indexOf("?") != -1) {
        this.locationHash = true
      } else {
        this.locationHash = false
      }

      if (!this.locationHash) this.getSelectData()

    },
    updated() {
      this.locationHash = false
    },
    methods: {
      closeLayerButton() {
        this.$emit('closeLayer')
      },
      getTableData() {
        switch (this.type) {
          case 5:
          case 6:
            this.isShow1 = false
            this.isShow5 = true
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog5').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": this.tableData.length > 8 ? true : false,
              data: this.tableData,
              columns: [
                {data: 'item'},
                {
                  data: 'spending',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'impression',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'traffic',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'trafficEc',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'trafficEcTarget',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'h',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                },
                {
                  data: 'trafficCom',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'trafficComTarget',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'k',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                },
                {
                  data: 'ctr',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'leads',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'costLead',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(data.toFixed(2)) + '</div>'
                  }
                },
                {
                  data: 'baseLine',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(data.toFixed(2)) + '</div>'
                  }
                },
                {
                  data: 'p',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                },
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'baseLineConversion',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 's',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                }
              ]
            })
            break;
          case 7:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = true
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog6').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "scrollX": true,
              "scrollCollapse": true,
              "paging": true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": this.tableData.length > 8 ? true : false,
              data: this.tableData,
              columns: [
                {data: 'week'},
                {
                  data: 'startDate',
                  render: (data, type, row) => {
                    return '<div>' + data + '-' + row.endDate + '</div>'
                  }
                },
                {data: 'channel'},
                {
                  data: 'spending',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'impression',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'click',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'ctr',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'leads',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'costLead',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(data) + '</div>'
                  }
                },
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }

                }
              ]
            })
            break;
          case 8:
          case 9:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = true
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog7').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "paging": this.tableData.length > 8 ? true : false,
              data: this.tableData,
              columns: [
                {data: 'item'},
                {
                  data: 'month',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'ytd',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'target',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'mT',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                },
                {
                  data: 'ytdTarget',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Bounce Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Conversion Rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'yT',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                }
              ]
            })
            break;
          case 10:
          case 11:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = true
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog8').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "paging": this.tableData.length > 8 ? true : false,
              data: this.tableData,
              columns: [
                {data: 'item'},
                {
                  data: 'month',
                  render: (data, type, row) => {
                    if (row.item == "CRM Engagement Rate") {
                      return '<div>' + Math.round(data * 100) + '%</div>'
                    } else {
                      return '<div>' + formatThousands(Math.round(data)) + '</div>'
                    }
                  }
                },
                {
                  data: 'ytd',
                  render: (data, type, row) => {
                    if (row.item == "CRM Engagement Rate") {
                      return '<div>' + Math.round(data * 100) + '%</div>'
                    } else {
                      return '<div>' + formatThousands(Math.round(data)) + '</div>'
                    }
                  }
                },
                {
                  data: 'target',
                  render: (data, type, row) => {
                    if (row.item == "CRM Engagement Rate") {
                      return '<div>' + Math.round(data * 100) + '%</div>'
                    } else {
                      return '<div>' + formatThousands(Math.round(data)) + '</div>'
                    }
                  }
                },
                {
                  data: 'mT',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                },
                {
                  data: 'ytdTarget',
                  render: (data, type, row) => {
                    if (row.item == "CRM Engagement Rate") {
                      return '<div>' + Math.round(data * 100) + '%</div>'
                    } else {
                      return '<div>' + formatThousands(Math.round(data)) + '</div>'
                    }
                  }
                },
                {
                  data: 'yT',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                }
              ]
            })
            break;
          case 12:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = true
            this.isShow10 = false
            this.isShow11 = false
            $('#tableBoxDialog9').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": this.tableData.data.length > 8 ? true : false,
              data: this.tableData.data,
              columns: [
                {data: 'channel'},
                {data: 'category'},
                {data: 'avgRating'},
                {
                  data: 'smallVolume',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'midVolume',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'bigVolume',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'selloutVolume',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'percentReview',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'totalReview',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'positive',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'neutral',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'negative',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'percentNegative',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'timelyResponse',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'timelyResponseRate',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
              ]
            })
            break;
          case 13:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = true
            this.isShow11 = false
            $('#tableBoxDialog10').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": this.tableData.data.length > 8 ? true : false,
              data: this.tableData.data,
              columns: [
                {data: 'channel'},
                {data: 'category'},
                {data: 'avgRating'},
                {
                  data: 'smallVolume',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'midVolume',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'bigVolume',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'selloutVolume',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'percentReview',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'totalReview',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'positive',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'neutral',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'negative',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'percentNegative',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
                {
                  data: 'timelyResponse',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'timelyResponseRate',
                  render: (data, type, row) => {
                    return '<div>' + Math.round(data * 100) + '%</div>'
                  }
                },
              ]
            })
            break;
          case 14:
            this.isShow1 = false
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            this.isShow11 = true
            $('#tableBoxDialog11').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 7,
              "info": false,
              "scrollX": true,
              "scrollCollapse": false,
              "paging": this.tableData.length > 7 ? true : false,
              data: this.tableData,
              columns: [
                {data: 'category'},
                {
                  data: 'period'
                },
                {
                  data: 'traffic1',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'conversionRate1',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'traffic2',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'conversionRate2',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'traffic3',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'conversionRate3',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'traffic4',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'conversionRate4',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
                {
                  data: 'traffic5',
                  render: (data, type, row) => {
                    return '<div>' + formatThousands(Math.round(data)) + '</div>'
                  }
                },
                {
                  data: 'conversionRate5',
                  render: (data, type, row) => {
                    return '<div>' + (data * 100).toFixed(2) + '%</div>'
                  }
                },
              ]
            })
            break;
          default:
            this.isShow1 = true
            this.isShow5 = false
            this.isShow6 = false
            this.isShow7 = false
            this.isShow8 = false
            this.isShow9 = false
            this.isShow10 = false
            $('#tableBoxDialog1').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pagingType": "simple_numbers",
              "pageLength": 8,
              "info": false,
              "paging": this.tableData.length > 8 ? true : false,
              data: this.tableData,
              columns: [
                {data: 'item'},
                {
                  data: 'month',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Rating":
                        return '<div>' + data.toFixed(2) + '</div>'
                        break;
                      case "Traffic(excluding campaign)(M)":
                        return '<div>' + formatThousands(data.toFixed(2)) + '</div>'
                        break;
                      case "Conversion rate ":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'target',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Rating":
                        return '<div>' + data.toFixed(2) + '</div>'
                        break;
                      case "Traffic(excluding campaign)(M)":
                        return '<div>' + formatThousands(formatThousands(data.toFixed(2))) + '</div>'
                        break;
                      case "Conversion rate ":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'mT',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                },
                {
                  data: 'ytd',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Rating":
                        return '<div>' + data.toFixed(2) + '</div>'
                        break;
                      case "Traffic(excluding campaign)(M)":
                        return '<div>' + formatThousands(formatThousands(data.toFixed(2))) + '</div>'
                        break;
                      case "Conversion rate ":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'ytdTarget',
                  render: (data, type, row) => {
                    switch (row.item) {
                      case "Rating":
                        return '<div>' + data.toFixed(2) + '</div>'
                        break;
                      case "Traffic(excluding campaign)(M)":
                        return '<div>' + formatThousands(formatThousands(data.toFixed(2))) + '</div>'
                        break;
                      case "Conversion rate ":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Bounce rate":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "conversion rate(excluding campaign)":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Engagement%":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "Rating":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      case "UGCR":
                        return '<div>' + Math.round(data * 100) + '%</div>'
                        break;
                      default:
                        return '<div>' + formatThousands(Math.round(data)) + '</div>'
                        break;
                    }
                  }
                },
                {
                  data: 'yT',
                  render: (data, type, row) => {
                    if (data == 0) {
                      return '<div></div>'
                    } else if (data == 1) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>'
                    } else if (data == 2) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>'
                    } else if (data == 3) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>'
                    } else if (data == 4) {
                      return '<div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>'
                    }
                  }
                }
              ]
            })
            break;
        }
      },
      setTime() { //dataSearch
        let yearMonth = this.getStoreYearMonth
        this.Time = yearMonth.slice(0, 4) + '/' + yearMonth.slice(4, 6)
        //let num = this.type
        /*this.data[num].isTable = this.isTable
        this.data[num].month = yearMonth*/
        /*if (num == 0) {
          dataOvCmaSearch(this, this.data[num])
        } else if (num == 1) {
          dataOvComB2BSearch(this, this.data[num])
        } else if (num == 2) {
          dataOvComB2CSearch(this, this.data[num])
        } else if (num == 3) {
          dataOvCrmSearch(this, this.data[num])
        } else if (num == 4) {
          dataOvRevSearch(this, this.data[num])
        } else if (num == 5) {
          this.data[num].category = this.camOneCategory
          dataCmaSearch(this, this.data[num])
        } else if (num == 6) {
          this.data[num].category = this.camCategory
          this.data[num].campaign = this.camCompaign
          this.data[num].week = this.camWeek
          dataCmafunnelSearch(this, this.data[num])
        } else if (num == 7) {
          if(this.comMarketType == 'B2C'){
            this.data[num].isB2C = true
          }else if(this.comMarketType == 'B2B'){
            this.data[num].isB2C = false
          }
          dataComSearch(this, this.data[num])
        } else if (num == 8) {
          dataCrmSearch(this, this.data[num])
        } else if (num == 9) {
          this.data[num].channel = this.rrOneChannel
          dataRevRatSearch(this, this.data[num])
        } else if (num == 10) {
          this.data[num].channel = this.rrChannel
          dataRevRatSearch(this, this.data[num])
        } else if (num == 11) {
          this.data[num].category = this.ecCategory
          if(this.ecCategory!=null || this.ecCategory!=undefined){
            dataEcSearch(this, this.data[num])
          }else{
            dataEcAllSearch(this, this.data[num])
          }
        }*/
      },
      ovtableStyle() {
        let tData = this.tableData
        if (this.type == 0) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Traffic to e-commerce(M) '
            } else if (index == 1) {
              val.item = 'Traffic to .com.cn(M) '
            } else if (index == 2) {
              val.item = 'Conversion rate '
            } else if (index == 3) {
              val.item = 'Cost per lead(¥)'
            }
          })
          this.tableData = tData
        } else if (this.type == 1) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Total SQL'
            } else if (index == 1) {
              val.item = 'Total MQL'
            } else if (index == 2) {
              val.item = 'UGCR'
            } else if (index == 3) {
              val.item = 'Total Web Traffic(K)'
            }
          })
          this.tableData = tData
        } else if (this.type == 2) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Traffic(excluding campaign)(M)'
            } else if (index == 1) {
              val.item = 'conversion rate(excluding campaign)'
            } else if (index == 2) {
              val.item = 'UGCR'
            } else if (index == 3) {
              val.item = 'Bounce rate'
            }
          })
          this.tableData = tData
        } else if (this.type == 3) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'New registration(M)'
            } else if (index == 1) {
              val.item = 'Engagement%'
            } else if (index == 2) {
              val.item = 'CRM related sales(M)(¥)'
            }
          })
          this.tableData = tData
        } else if (this.type == 4) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Rating'
            }
          })
          this.tableData = tData
        } else if (this.type == 5 || this.type == 6) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Month'
            } else if (index == 1) {
              val.item = 'YTD'
            } else if (index == 2) {
              val.item = 'Q1'
            } else if (index == 3) {
              val.item = 'Q2'
            } else if (index == 4) {
              val.item = 'Q3'
            } else if (index == 5) {
              val.item = 'Q4'
            }
          })
          this.tableData = tData
        } else if (this.type == 8 || this.type == 9) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'Traffic'
            } else if (index == 1) {
              val.item = 'Free Traffic'
            } else if (index == 2) {
              val.item = 'Paid Traffic'
            } else if (index == 3) {
              val.item = 'Bounce Rate'
            } else if (index == 4) {
              val.item = 'Conversion Rate'
            } else if (index == 5) {
              val.item = 'UGCR'
            } else if (index == 6) {
              val.item = 'MQL'
            } else if (index == 7) {
              val.item = 'SQL'
            }
          })
          this.tableData = tData
        } else if (this.type == 10 || this.type == 11) {
          tData.forEach((val, index) => {
            if (index == 0) {
              val.item = 'CRM Registrations'
            } else if (index == 1) {
              val.item = 'CRM Engagement Rate'
            } else if (index == 2) {
              val.item = 'CRM Sales'
            }
          })
          this.tableData = tData
        }
      },
      getTimeMonth() {
        this.$refs.selectionTwoBox.nowIndex = (this.month - 1)
      },
      getYear() {
        const getYear = new Date().getFullYear().toString()
        this.selectOptionsOne = [getYear]
      },
      monthChange() {
        /*this.$Hub.$on('monthChange', (val) => {
          if (this.type == 0) {
            this.data[0].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 1) {
            this.data[1].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 2) {
            this.data[2].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 3) {
            this.data[3].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
          if (this.type == 3) {
            this.data[4].month = val
            this.Time = val.slice(0, 4) + ' - ' + val.slice(4, 6)
            this.dataSearch()
          }
        })*/
      },
      getCampaignDate(year) {
        post(OVDateUrl, 'campaign').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getComB2bDate(year) {
        post(OVDateUrl, 'comB2b').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getComB2cDate(year) {
        post(OVDateUrl, 'comB2c').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getCrmDate(year) {
        post(OVDateUrl, 'crm').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptions.push(val)
          })
        })
      },
      getReviewRatingDate(year) {
        post(OVDateUrl, 'reviewRating').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      getEcDate(year) {
        post(OVDateUrl, 'reviewRating').then(res => {
          let data = res.data.data
          data.forEach((val) => {
            if (val == year) return
            this.selectOptionsOne.push(val)
          })
        })
      },
      pageinNowIndex() {
        this.pagNowIndex = !this.pagNowIndex
      },
      selectShowOneHandle(val) {

        this.$store.commit('yearVoluation', val)

      },
      selectShowTwoHandle(val) {

        this.$store.commit('monthVoluation', val)

      },
      selectShowThreeHandle(val) {

        this.getSelectData(val)

      },
      selectShowFourHandle(val) {

        if (val == undefined) {
          val = this.camCompaign
        }

        this.$store.commit('camCompaignVoluation', val)

        this.$store.commit('camCompaignIdVoluation', this.$refs.selectionFourBox.nowIndex)

        if (this.camCompaign != null || this.camCompaign != undefined) {
          const url = `${CAM_GETPARAMETER}?category=${this.camCategory}&campaign=${this.camCompaign}`
          this.selectionFive = true
          get(url).then(res => {
            let data = res.data.data
            this.selectOptionsFive = ['ALL PRODUCTS']
            data.forEach((val) => {
              this.selectOptionsFive.push(val)
            })

            if (this.selectTwoVal == this.camCompaign) {
              this.$refs.selectionFiveBox.nowIndex = this.camWeekId
            } else {
              this.$refs.selectionFiveBox.nowIndex = 0
            }

          })
        } else {
          this.selectionFive = false
          this.$store.commit('camWeekVoluation', val)
        }

      },
      selectShowFiveHandle(val) {

        if (val == undefined) {
          val = this.camWeek
        }

        this.$store.commit('camWeekVoluation', val)

        this.$store.commit('camWeekIdVoluation', this.$refs.selectionFiveBox.nowIndex)

      },
      getSelectData(val) {

        const getYear = new Date().getFullYear().toString()

        this.getYear()

        if (this.type === 0) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionFive = false

          this.getCampaignDate(getYear)

        } else if (this.type === 1) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionFive = false

          this.getComB2bDate(getYear)

        } else if (this.type === 2) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionFive = false

          this.getComB2cDate(getYear)

        } else if (this.type === 3) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionFive = false

          this.getCrmDate(getYear)

        } else if (this.type === 4) {

          this.selectionThree = false

          this.selectionFour = false

          this.selectionFive = false

          this.getReviewRatingDate(getYear)

        } else if (this.type === 5) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.camOneCategory
          }

          this.$store.commit('camOneCategoryVoluation', val)

          this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['ALL PRODUCTS']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
            //this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
          })

        } else if (this.type === 6) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.camOneTwoCategory
          }

          this.$store.commit('camOneTwoCategoryVoluation', val)

          this.$store.commit('camOneTwoCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['ALL PRODUCTS']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
            //this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
          })

        } else if (this.type === 7) {

          if (this.selectionFive) {
            this.selectionFive = true
          } else {
            this.selectionFive = false
          }

          this.selectionThree = true

          this.selectionFour = false

          //this.selectionFive = false

          if (val == undefined) {
            val = this.camCategory
          }

          this.$store.commit('camCategoryVoluation', val)

          this.$store.commit('camCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          get(CAM_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['ALL PRODUCTS']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
            //this.$store.commit('camCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
          })

          if (this.camCategory != null || this.camCategory != undefined) {
            const url = `${CAM_GETPARAMETER}?category=${this.camCategory}`
            this.selectionFour = true
            get(url).then(res => {
              let data = res.data.data
              this.selectOptionsFour = ['ALL PRODUCTS']
              data.forEach((val) => {
                this.selectOptionsFour.push(val)
              })
              if (this.selectOneVal == this.camCategory) {
                this.$refs.selectionFourBox.nowIndex = this.camCompaignId
              } else {
                this.$refs.selectionFourBox.nowIndex = 0
              }
              //this.$refs.selectionFourBox.nowIndex = 0
            })
          } else {
            this.selectionFive = false
            this.$store.commit('camCompaignVoluation', val)
            this.$store.commit('camWeekVoluation', val)
          }

        } else if (this.type === 8) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.comMarketType
          }

          this.$store.commit('comMarketTypeVoluation', val)

          this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['B2C', 'B2B']

          //this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionThreeBox.nowIndex)

        } else if (this.type === 9) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.comMarketTypeTwo
          }

          this.$store.commit('comMarketTypeTwoVoluation', val)

          this.$store.commit('comMarketTypeTwoIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['B2C', 'B2B']

          //this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionThreeBox.nowIndex)

        } else if (this.type === 10) {

          this.selectionFive = false

          this.selectionThree = false

          this.selectionFour = false

          this.getCampaignDate(getYear)

        } else if (this.type === 11) {

          this.selectionFive = false

          this.selectionThree = false

          this.selectionFour = false

          this.getCampaignDate(getYear)

        } else if (this.type === 12) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.rrOneChannel
          }

          this.$store.commit('rrOneChannelVoluation', val)

          this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['ALL CHANNEL', 'JD', 'TMALL']

          //this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)

        } else if (this.type === 13) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.rrChannel
          }

          this.$store.commit('rrChannelVoluation', val)

          this.$store.commit('rrChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          this.selectOptionsThree = ['ALL CHANNEL', 'JD', 'TMALL']

          //this.$store.commit('rrChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)

        } else if (this.type === 14) {

          this.selectionThree = true

          this.selectionFour = false

          this.selectionFive = false

          if (val == undefined) {
            val = this.ecCategory
          }

          this.$store.commit('ecCategoryVoluation', val)

          this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)

          this.getCampaignDate(getYear)

          get(EC_CATEGORY).then(res => {
            let data = res.data.data
            this.selectOptionsThree = ['ALL PRODUCTS']
            data.forEach((val) => {
              this.selectOptionsThree.push(val)
            })
            //this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
          })

        }
      }
    },
    watch: {
      type: function (val) {

        switch (this.type){
          case 5:
            this.$refs.selectionThreeBox.nowIndex = this.camOneCategoryId
            break;
          case 6:
            this.$refs.selectionThreeBox.nowIndex = this.camOneTwoCategoryId
            break;
          case 7:
            this.$refs.selectionThreeBox.nowIndex = this.camCategoryId
            if (this.camCompaignId > 0) this.selectionFive = true
            this.selectOneVal = this.camCategory
            this.$refs.selectionFourBox.nowIndex = this.camCompaignId
            this.selectTwoVal = this.camCompaign
            this.$refs.selectionFiveBox.nowIndex = this.camWeekId
            break;
          case 8:
            this.$refs.selectionThreeBox.nowIndex = this.comMarketTypeId
            break;
          case 9:
            this.$refs.selectionThreeBox.nowIndex = this.comMarketTypeTwoId
            break;
          case 12:
            this.$refs.selectionThreeBox.nowIndex = this.rrOneChannelId
            break;
          case 13:
            this.$refs.selectionThreeBox.nowIndex = this.rrChannelId
            break;
          case 14:
            this.$refs.selectionThreeBox.nowIndex = this.ecCategoryId
            break;
        }

        /*if (this.type == 5) {
        } else if (this.type == 6) {
        } else if (this.type == 7) {
        } else if (this.type == 8) {
        }  else if (this.type == 9) {
        } else if (this.type == 12) {
        } else if (this.type == 13) {
        } else if (this.type == 14) {
        }*/

        if(!this.locationHash) {
          this.getSelectData()
        }else{
          switch (this.type){
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 12:
            case 13:
            case 14:
              this.getSelectData()
              break;
          }
        }

        if (val < 5) {
          this.name = `${this.titleList[val]}`
          this.title = `${this.overview} ${this.name}`
        } else {
          this.name = `${this.titleList[val]}`
          this.title = `${this.name}`
        }

        this.setTime()

      },

      tableData() {
        this.$nextTick(() => {

          this.ovtableStyle()

          this.getTableData()

          this.setTime()

        })
      },

      getMoth: function () {
        this.getTimeMonth()
      },

      /*camOneCategory: function () {
        this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.camOneCategoryId
      },
      camCategory: function () {
        this.$store.commit('camCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.camCategoryId
      },
      camCompaign: function () {
        this.$store.commit('camCompaignIdVoluation', this.$refs.selectionFourBox.nowIndex)
        //this.$refs.selectionFourBox.nowIndex = this.camCompaignId
      },
      camWeek: function () {
        this.$store.commit('camWeekIdVoluation', this.$refs.selectionFiveBox.nowIndex)
        //this.$refs.selectionFiveBox.nowIndex = this.camWeekId
      },
      comMarketType: function () {
        this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.comMarketTypeId
      },
      rrOneChannel: function () {
        this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.rrOneChannelId
      },
      rrChannel: function () {
        this.$store.commit('rrChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.rrChannelId
      },
      ecCategory: function () {
        this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        //this.$refs.selectionThreeBox.nowIndex = this.ecCategoryId
      },*/

      camOneCategoryId: function () {
        //this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.camOneCategoryId
      },
      camOneTwoCategoryId: function () {
        //this.$store.commit('camOneCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.camOneTwoCategoryId
      },
      camCategoryId: function () {
        //this.$store.commit('camCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.camCategoryId
      },
      camCompaignId: function () {
        //this.$store.commit('camCompaignIdVoluation', this.$refs.selectionFourBox.nowIndex)
        this.$refs.selectionFourBox.nowIndex = this.camCompaignId
      },
      camWeekId: function () {
        //this.$store.commit('camWeekIdVoluation', this.$refs.selectionFiveBox.nowIndex)
        this.$refs.selectionFiveBox.nowIndex = this.camWeekId
      },
      comMarketTypeId: function () {
        //this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.comMarketTypeId
      },
      comMarketTypeTwoId: function () {
        //this.$store.commit('comMarketTypeIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.comMarketTypeTwoId
      },
      rrOneChannelId: function () {
        //this.$store.commit('rrOneChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.rrOneChannelId
      },
      rrChannelId: function () {
        //this.$store.commit('rrChannelIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.rrChannelId
      },
      ecCategoryId: function () {
        //this.$store.commit('ecCategoryIdVoluation', this.$refs.selectionThreeBox.nowIndex)
        this.$refs.selectionThreeBox.nowIndex = this.ecCategoryId
      }

      /*getStoreYearMonth: function () {
        this.dataSearch()
      },
      month: function () {
        this.getTimeMonth()
      },
      camOneCategory: function () {
        this.dataSearch()
      },
      camCategory: function () {
        this.dataSearch()
      },
      camCompaign: function () {
        this.dataSearch()
      },
      camWeek: function () {
        this.dataSearch()
      },
      comMarketType: function () {
        this.dataSearch()
      },
      rrOneChannel: function () {
        this.dataSearch()
      },
      rrChannel: function () {
        this.dataSearch()
      },
      ecCategory: function () {
        this.dataSearch()
      }*/
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .tables-wrap
    width 1800px
    height 700px
    background-color #fff
    border-radius 15px
    z-index: 99999
    overflow visible
    display none
    .select-wrap
      padding-left 60px
    .dropdown-wrap
      margin-right 30px
      float left
    .styleone
      width 350px
    .options-icon-date
      font-size 28px
      color #A0A0A1
      float left
      margin 4px 18px 0 0
    .tables-title
      position relative
      padding-left 45px
      font-size 35px
      line-height 80px
      color #2061AE
      .timeColor
        color #a0a0a1
      .icon
        e-pos(top:50%, y:-50%)
        right 25px
        font-size 30px
        color #A0A0A1
        cursor pointer
    .tables-container
      position relative
      height 585px
      padding 15px 50px 20px 50px
      font-size 18px
      overflow visible
      #tableBoxDialog1_wrapper
        height 100%
      table
        border-top 1px solid #D6E3F0
        border-left 1px solid #D6E3F0
        border-bottom medium
        border-right medium
        line-height 30px
        text-align center
        thead
          background rgba(186, 215, 237, .42)
        th
        td
          border-bottom 1px solid #D6E3F0
          border-right 1px solid #D6E3F0
          border-top medium
          border-left medium

  #tableBoxDialog6_wrapper
    .dataTables_scroll
      tr > th
        padding: 10px 80px
</style>
