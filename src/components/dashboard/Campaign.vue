<template>
  <div class="campaign-wrap campaign-table">

    <div v-show="chartShow">
      <div class="table-nav clearfix">
        <h3><i class="color-line color1"></i>Campaign Performance Overview</h3>
        <div class="tool-box clearfix">
          <div class="selection-box">
            <selection :selections="selectListOne" class="select-colorOrange" @selectShow="selectShowOneHandle"
                       ref="selectOptionOne"></selection>
          </div>
          <div class="icon-box">
            <span title="Show Chartbar" @click="chartShowButton(0)">
              <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
            </span>
            <span class="qrcode" @mouseenter="qrcodeShow(1)" @mouseleave="qrcodeHide(1)">
              <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
              <div class="qrcode-warp" v-show="isQrShow1">
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
      <div class="table-box">
        <div class="cam-per-ov">
          <table id="camTableOv" class="data-table" style="width:100%">
            <thead>
            <tr>
              <th>
                <div>Period</div>
              </th>
              <th class="triangle Spending"><!-- @click="tips('Spending', 'Spending')"-->
                <a class="hint--right hint--success hint--medium" aria-label="All cost on digital campaign."><div>Spending</div></a>
              </th>
              <th class="triangle Impression"><!-- @click="tips('Impression', 'Impression')"-->
                <a class="hint--right hint--success hint--medium" aria-label="A single instance of an online advertisement being displayed."><div>Impression</div></a>
              </th>
              <th class="triangle Traffic"><!-- @click="tips('Traffic', 'Traffic')"-->
                <a class="hint--right hint--success hint--medium" aria-label="The amount of visitors and visits a Web site receives."><div>Traffic</div></a>
              </th>
              <th class="triangle EC"><!-- @click="tips('Traffic to EC', 'EC')"-->
                <a class="hint--right hint--success hint--medium" aria-label="The amount of visitors and visits a Web site receives."><div>Traffic to EC</div></a>
              </th>
              <th>
                <div>Target</div>
              </th>
              <th></th>
              <th class="triangle com"><!-- @click="tips('Traffic to .com', 'com')"-->
                <a class="hint--right hint--success hint--medium" aria-label="The amount of visitors and visits a Web site receives."><div>Traffic to .com</div></a>
              </th>
              <th>
                <div>Target</div>
              </th>
              <th></th>
              <th class="triangle CTR"><!-- @click="tips('CTR', 'CTR')"-->
                <a class="hint--right hint--success hint--medium" aria-label="The amount of visitors and visits a Web site receives."><div>CTR</div></a>
              </th>
              <th class="triangle Leads"><!-- @click="tips('Leads', 'Leads')"-->
                <a class="hint--right hint--success hint--medium" aria-label="Number of B2C visits that resulted in a click on the buy button."><div>Leads</div></a>
              </th>
              <th class="triangle Cost"><!-- @click="tips('Cost per lead', 'Cost')"-->
                <a class="hint--right hint--success hint--medium" aria-label="Cost per lead (CPL) is one form of performance-based adverting.Online advertising payment model in which payment is based on the number of qualifying leads generated."><div>Cost per lead</div></a>
              </th>
              <th class="triangle Baseline1"><!-- @click="tips('Baseline1', 'Baseline1')"-->
                <a class="hint--right hint--success hint--medium" aria-label="Baseline is the performance in the last rolling 12M."><div>Baseline</div></a>
              </th>
              <th></th>
              <th class="triangle Conversion"><!-- @click="tips('Conversion%', 'Conversion')"-->
                <a class="hint--left hint--success hint--large" aria-label="Buy lead conversion shows the value of the conversion points used on the Philips digital platform.For B2C, the conversion point refers to the buy button clicks. For B2B, conversion points are represented by leads generated for completed HS lead form."><div>Conversion%</div></a>
              </th>
              <th class="triangle Baseline2"><!-- @click="tips('Baseline2', 'Baseline2')"-->
                <a class="hint--left hint--success hint--medium" aria-label="Baseline is the performance in the last 12M."><div>Baseline</div></a>
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
            <span title="Show Chartbar" @click="chartShowButtonT(0)">
              <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
            </span>
            <span class="qrcode" @mouseenter="qrcodeShow(2)" @mouseleave="qrcodeHide(2)">
              <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
              <div class="qrcode-warp" v-show="isQrShow2">
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

    <!---------------------------------------------------------------------------------------------------------------->

    <div class="chart-wrap" :class="{active:isChart}">
      <div class="table-nav clearfix">
        <h3><i class="color-line color1"></i>Campaign Performance Overview</h3>
        <div class="tool-box clearfix">
          <div class="selection-box">
            <selection :selections="selectListOne" class="select-colorOrange" @selectShow="selectShowOneHandle" ref="selectOptionOneC"></selection>
          </div>
          <div class="chart-icon-box" @click="chartShowButton(1)">
            <svg-icon sign="icon-arrow-left-c" class="arrow-icon"></svg-icon><span class="back-botton">Back</span>
          </div>
        </div>
      </div>
      <div class="chart-cont-wrap">
        <div class="chart-list-wrap clearfix">
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Impression</span></p>
            <div class="chart-cont-list-cont" id="myEchart0"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Traffic</span></p>
            <div class="chart-cont-list-cont" id="myEchart1"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>CTR</span></p>
            <div class="chart-cont-list-cont" id="myEchart2"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Leads</span></p>
            <div class="chart-cont-list-cont" id="myEchart3"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Cost per lead</span></p>
            <div class="chart-cont-list-cont" id="myEchart4"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Conversion</span></p>
            <div class="chart-cont-list-cont" id="myEchart5"></div>
          </div>
        </div>
      </div>
    </div>

    <!---------------------------------------------------------------------------------------------------------------->

    <div class="chart-wrap" :class="{active:isChartT}">
      <div class="table-nav clearfix">
        <h3><i class="color-line color1"></i>Individual Campaign Performance Analysis</h3>
        <div class="tool-box clearfix">
          <div class="selection-box">
            <selection :selections="selectListOne" class="select-colorOrange" @selectShow="selectShowTwoHandle"
                       ref="selectOptionTwoC"></selection>
            <selection :selections="selectListTwo" class="select-colorDarkseaGreen"
                       @selectShow="selectShowThreeHandle" ref="selectOptionThreeC"></selection>
          </div>
          <div class="chart-icon-box" @click="chartShowButtonT(1)">
            <svg-icon sign="icon-arrow-left-c" class="arrow-icon"></svg-icon><span class="back-botton">Back</span>
          </div>
        </div>
      </div>
      <div class="table-name color">{{category}}</div>
      <div class="chart-cont-wrap T mobile">
        <div class="chart-list-wrap clearfix">
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Impression</span></p>
            <div class="chart-cont-list-cont" id="myEchartT0"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Traffic</span></p>
            <div class="chart-cont-list-cont" id="myEchartT1"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>CTR</span></p>
            <div class="chart-cont-list-cont" id="myEchartT2"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Leads</span></p>
            <div class="chart-cont-list-cont" id="myEchartT3"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Cost per lead</span></p>
            <div class="chart-cont-list-cont" id="myEchartT4"></div>
          </div>
          <div class="chart-cont-list">
            <p class="chart-cont-list-cont-t"><span>Conversion</span></p>
            <div class="chart-cont-list-cont" id="myEchartT5"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls';
  import {getQueryString, getHashString} from '../../assets/config/urlQuery';
  import {get, post} from '../../assets/config/http';
  import {
    formatThousands
  } from '../../assets/chartsData/index'

  const CMA_SEARCH = xhrUrls.CMA_SEARCH;
  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  let CMA_SEARCHCHART = xhrUrls.CMA_SEARCHCHART
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
        chartData1: {
          category: '',
          chartType: '1',
          month: ''
        },
        chartData2: {
          category: '',
          campaign: '',
          chartType: '2'
        },
        isMonth: '',
        url: '',
        isQrShow1: false,
        isQrShow2: false,
        locationHash: false,
        isSelectTwo: false,
        isChart:false,
        isChartT:false,
        chartOption:{
          tooltip: {
            trigger: "axis",
            confine: true,
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为："line" | "shadow"
            },
            formatter:''
          },
          color:['#b1be19','#4abfe0','#b7a1db'],
          legend: {
            left:'right',
            data: '',
            textStyle:{
              color:'#a0a0a1'
            }
          },
          grid: {
            left: "1%",
            right: "0%",
            bottom: "5%",
            top: "30px",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: '',
              axisPointer: {
                type: "shadow"
              },
              axisLine: {
                lineStyle:{
                  type: 'solid',
                  color:'#ddd'
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#a0a0a1'
                }
              },
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "",
              min: 0,
              nameTextStyle: {
                color: '#a0a0a1'
              },
              axisLine: {
                lineStyle:{
                  type: 'solid',
                  color:'#ddd'
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#a0a0a1'
                },
                formatter: ''
              },
              splitLine:{
                show: true,
                lineStyle:{
                  type: 'solid',
                  color:'#ddd'
                },
              }
            }
          ],
          series: '',
        },
        charts:[]
      }
    },
    computed: {
      getYearMonth() {
        return this.$store.getters.getYearMonth
      },
      chartShow() {
        if(this.isChart || this.isChartT){
          return false
        }else{
          return true
        }

      },

    },
    mounted() {

      this.$Hub.$on('CampaignUploadData', ()=>{
        this.getOvTableData()
        this.getOvTableData()
      })

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
        this.getChartData()
      }

      window.onresize = ()=>{
        this.charts.forEach(val=>{
          val.resize()
        })
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

      getChartData(){
        this.chartData1.category = this.campaign
        this.chartData1.month = this.getYearMonth
        post(CMA_SEARCHCHART,this.chartData1).then(res => {
          let data = res.data.data
          data.forEach((val,index)=>{
            /*val.series.forEach(val=>{
              if(val.name == 'This year'){
                val.lineStyle = {
                  type: 'solid',
                  color:'#b1be19'
                }
              }else if(val.name == 'Last Year'){
                val.lineStyle = {
                  type: 'solid',
                  color:'#4abfe0'
                }

              }else if(val.name == 'Target'){
                val.lineStyle = {
                  type: 'solid',
                  color:'#b7a1db'
                }
              }
            })*/
            this.chartOption.legend.data = val.legend
            this.chartOption.xAxis[0].data = val.xAxis
            this.chartOption.series = val.series
            let dom = document.getElementById('myEchart'+index)
            let myEchart = this.$echarts.init(dom)
            switch (index){
              case 0:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value/1000000)+'M'
                }
                this.chartOption.yAxis[0].name = '(Million)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + formatThousands(Math.round(val.value)) + '<br/>';
                  })
                  return res;
                }
                break;
              case 1:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value/1000)+'K'
                }
                this.chartOption.yAxis[0].name = '(Thousand)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + formatThousands(Math.round(val.value)) + '<br/>';
                  })
                  return res;
                }
                break;
              case 2:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value*100).toFixed(2)+'%'
                }
                this.chartOption.yAxis[0].name = '(%)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + (val.value*100).toFixed(2) + '%' + '<br/>';
                  })
                  return res;
                }
                break;
              case 3:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value/1000)+'K'
                }
                this.chartOption.yAxis[0].name = '(Thousand)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + formatThousands(Math.round(val.value)) + '<br/>';
                  })
                  return res;
                }
                break;
              case 4:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return value
                }
                this.chartOption.yAxis[0].name = ''
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + Math.round(val.value) + '<br/>';
                  })
                  return res;
                }
                break;
              case 5:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value*100).toFixed(2)+'%'
                }
                this.chartOption.yAxis[0].name = '(%)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + (val.value*100).toFixed(2) + '%' + '<br/>';
                  })
                  return res;
                }
                break;
            }
            myEchart.setOption(this.chartOption, {
              notMerge: true
            });
            this.charts.push(myEchart)
          })
        }).catch(err => console.log(err))
      },

      getChartDataT(){
        this.chartData2.campaign = this.category
        this.chartData2.category = this.campaignTwo
        post(CMA_SEARCHCHART,this.chartData2).then(res => {
          let data = res.data.data
          data.forEach((val,index)=>{
            this.chartOption.legend.data = val.legend
            this.chartOption.xAxis[0].data = val.xAxis
            this.chartOption.series = val.series
            let dom = document.getElementById('myEchartT'+index)
            let myEchart = this.$echarts.init(dom)
            switch (index){
              case 0:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value/1000000)+'M'
                }
                this.chartOption.yAxis[0].name = '(Million)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + formatThousands(Math.round(val.value)) + '<br/>';
                  })
                  return res;
                }
                break;
              case 1:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value/1000)+'K'
                }
                this.chartOption.yAxis[0].name = '(Thousand)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + formatThousands(Math.round(val.value)) + '<br/>';
                  })
                  return res;
                }
                break;
              case 2:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value*100).toFixed(2)+'%'
                }
                this.chartOption.yAxis[0].name = '(%)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + (val.value*100).toFixed(2) + '%' + '<br/>';
                  })
                  return res;
                }
                break;
              case 3:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value/1000)+'K'
                }
                this.chartOption.yAxis[0].name = '(Thousand)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + formatThousands(Math.round(val.value)) + '<br/>';
                  })
                  return res;
                }
                break;
              case 4:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return value
                }
                this.chartOption.yAxis[0].name = ''
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + Math.round(val.value) + '<br/>';
                  })
                  return res;
                }
                break;
              case 5:
                this.chartOption.yAxis[0].axisLabel.formatter = function (value,index){
                  return (value*100).toFixed(2)+'%'
                }
                this.chartOption.yAxis[0].name = '(%)'
                this.chartOption.tooltip.formatter = function(value){
                  let res = value[0].name + '<br/>';
                  value.forEach(val=>{
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + val.color + '"></span>' + val.seriesName + '：' + (val.value*100).toFixed(2) + '%' + '<br/>';
                  })
                  return res;
                }
                break;
            }
            myEchart.setOption(this.chartOption, {
              notMerge: true
            });
            this.charts.push(myEchart)
          })
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
            }
            k = i;
          }
          rowIndex++;
        }
        this.camTableAnData = data
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
        $('.qrcodeCanvas').html('')
        $('.qrcodeCanvas').qrcode({width: 150,height: 150,text: baseUrl});
        switch (id) {
          case 1:
            this.isQrShow1 = true
            break;
          case 2:
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

          this.$refs.selectOptionOne.nowIndex = val.id

          this.$refs.selectOptionOneC.nowIndex = val.id

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

          this.$refs.selectOptionTwo.nowIndex = val.id

          this.$refs.selectOptionTwoC.nowIndex = val.id

        }

      },

      selectShowThreeHandle(val) {

        if (!this.locationHash) {

          this.isSelectTwo = false

          val.val == 'All Categories' ? this.category = '' : this.category = val.val

          this.categoryId = val.id

          this.$refs.selectOptionThree.nowIndex = val.id

          this.$refs.selectOptionThreeC.nowIndex = val.id

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

        this.$refs.selectOptionOneC.nowIndex = campaignId

        this.getOvTableData()

        this.getChartData()

        this.isSelectTwo = true

        get(`${CAM_GETPARAMETER}?category=${campaignTwoId == 0 ? CAM_GETPARAMETER_CATEGOTY : campaignTwo}`).then(res => {

          let data = res.data.data

          this.selectListTwo = []

          data.forEach(val => {

            this.selectListTwo.push(val)

          })

        })

        this.$refs.selectOptionTwo.nowIndex = campaignTwoId

        this.$refs.selectOptionTwoC.nowIndex = campaignTwoId

        this.$refs.selectOptionThree.nowIndex = categoryId

        this.$refs.selectOptionThreeC.nowIndex = categoryId

        campaignTwo == 'null' ? this.campaignTwo = null : this.campaignTwo = campaignTwo

        this.campaignTwoId = campaignTwoId

        this.category = category

        this.categoryId = categoryId

        this.getAnTableData()

        this.getChartDataT()

      },

      weekStr: (params) => {
        let num = params.substr(4);
        if (num % 2 == 0) {
          return true
        } else {
          return false
        }
      },

      chartShowButton(type){
        if(type==0){
          this.isChart=true
        }else if(type==1){
          this.isChart=false
        }
      },

      chartShowButtonT(type){
        if(type==0){
          this.isChartT=true
        }else if(type==1){
          this.isChartT=false
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
      }
    },
    watch: {
      selectListTwo() {
        if (!this.locationHash && !this.isSelectTwo) this.category = this.selectListTwo[0]
      },
      campaign() {
        if (!this.locationHash) {
          this.getOvTableData()
          this.getChartData()
        }
      },
      campaignTwo() {
        if (!this.locationHash) {
          this.getAnTableData()
          this.getChartDataT()
        }
      },
      category() {
        if (!this.locationHash && !this.isSelectTwo) {
          this.getAnTableData()
          this.getChartDataT()
        }
      },
      getYearMonth() {
        this.getOvTableData()
        this.getChartData()
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
      a
        display block
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
