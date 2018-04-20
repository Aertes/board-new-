import {
  defaultOption,
  chartTypeOne,
  chartTypeTwo,
  chartTypeThree,
  chartTypeFour,
  chartTypeFive,
  chartTypeSix,
  chartTypeSeven,
  chartTypeEight
} from '../../assets/chartsStyle/index'
import xhrUrls from '../../assets/config/xhrUrls'
import {get, post, uploadPost} from '../../assets/config/http'

// 千分位格式化
function formatThousands(params) {
  return (params + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}


//表一 堆积图+折线图

// OverView
function dataOvCmaSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDate.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          let val
          if (data.chartDate[i].type === 'line') {
            val = (data.chartDate[i].data[0] * 100).toFixed(0) + '%'
          } else {
            if (data.chartDate[i].name == "Cost per lead(¥)"){
              val = data.chartDate[i].data[0]
            }else{
              val = data.chartDate[i].data[0].toFixed(0)
            }
          }
          that.DData.push([data.chartDate[i].name, formatThousands(val)])
        }

        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)
      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvComB2BSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDate.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          let val
          if (data.chartDate[i].type === 'line') {
            val = (data.chartDate[i].data[0] * 100).toFixed(0) + '%'
          } else {
            val = data.chartDate[i].data[0]
          }
          that.DData.push([data.chartDate[i].name, formatThousands(val)])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvComB2CSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDate.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          let val
          if (data.chartDate[i].type === 'line') {
            val = (data.chartDate[i].data[0] * 100).toFixed(0) + '%'
          } else {
            val = data.chartDate[i].data[0]
          }
          that.DData.push([data.chartDate[i].name, formatThousands(val)])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvCrmSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_CRM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_CRM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDate.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          let val
          if (data.chartDate[i].type === 'line') {
            val = (data.chartDate[i].data[0] * 100).toFixed(0) + '%'
          } else {
            val = data.chartDate[i].data[0]
          }
          that.DData.push([data.chartDate[i].name, formatThousands(val)])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

function dataOvRevSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.OV_RV_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.OV_RV_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.chartDate.length
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        for (let i = 0; i < num; i++) {
          let val
          if (data.chartDate[i].type === 'line') {
            val = (data.chartDate[i].data[0] * 100).toFixed(0) + '%'
          } else {
            val = data.chartDate[i].data[0]
          }
          that.DData.push([data.chartDate[i].name, formatThousands(val)])
        }
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)

      }).catch(
      error => console.log(error)
    )
  }
}

// campaign
function dataCmaSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = res.data.right
        let legendDate = data.chartDataName
        let xAxisData = data.chartX
        let yAxisName1 = data.chartLeftY
        let yAxisName2 = data.chartRightY
        let series = data.chartDate
        that.DData = []
        debugger
        that.DData.push(['Spending', formatThousands(num.spending)])
        that.DData.push(['Cost per lead', formatThousands(num.costLead)])
        that.DData.push(['Conversion', (num.conversionRate * 100).toFixed(0) + '%'])
        that.DData.push(['CTR', (num.ctr * 100).toFixed(0) + '%'])
        that.dashBoardoption = chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series)
      }).catch(
      error => console.log(error)
    )
  }
}

//表二 （雷达图）
// Review & Rating
function dataRevRatSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.RV_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.RV_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = data.summary
        let legendDate = data.legend
        let series = data.data
        that.DData = []
        for (let i = 0; i < num.length; i++) {
          let value = num[i].value.toFixed(0)
          that.DData.push([num[i].name, formatThousands(value)])
        }
        that.dashBoardoption = chartTypeTwo(legendDate, series)
      }).catch(
      error => console.log(error)
    )
  }
}

//表四
// EC单个分类
function dataEcSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.EC_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.EC_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let xAxisData = data.xAxis
        let seriesData1 = data.series1
        let seriesData2 = data.series2
        
        that.DData = []
        that.DData.push(['Total Traffic', formatThousands(res.data.right.traffic)])
        that.DData.push(['Total Conversion', (res.data.right.conversionRate * 100).toFixed(2) + '%'])
        that.dashBoardoption = chartTypeFour(xAxisData, seriesData1, seriesData2)
      }).catch(
      error => console.log(error)
    )
  }
}

//表五
// EC全部分类
function dataEcAllSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.EC_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.EC_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let legendDate = data.legend
        let yAxisData = data.yAxis
        let seriesData1 = data.series[0]
        let seriesData2 = data.series[1]
        let seriesData3 = data.series[2]
        let seriesData4 = data.series[3]
        let seriesData5 = data.series[4]
        that.DData = []
        that.DData.push(['Total Traffic', formatThousands(res.data.right.traffic)])
        that.DData.push(['Total Conversion', (res.data.right.conversionRate * 100).toFixed(2) + '%'])
        that.dashBoardoption = chartTypeFive(legendDate, yAxisData, seriesData1, seriesData2, seriesData3, seriesData4, seriesData5)
      }).catch(
      error => console.log(error)
    )
  }
}


/************************************************************/

// campaign 1
function dataCmaBarSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = res.data.right
        let legendDate = data.legend
        let xAxisData = data.xAxis
        let seriesData = data.series
        let spending = num.spending.toFixed(0)
        that.DData = []
        that.DData.push(['Spending', formatThousands(spending)])
        that.DData.push(['Cost per lead', num.costLead])
        that.DData.push(['Conversion', (num.conversionRate * 100).toFixed(0) + '%'])
        that.DData.push(['CTR', (num.ctr * 100).toFixed(0) + '%'])
        that.dashBoardoption = chartTypeSix(legendDate, xAxisData, seriesData)
      }).catch(
      error => console.log(error)
    )
  }
}

// campaign 2
function dataCmaLineSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = res.data.right
        let legendDate = data.legend
        let xAxisData = data.xAxis
        let cpl = data.cpl
        let conversionRate = data.conversionRate
        let spending = num.spending.toFixed(0)
        that.DData = []
        that.DData.push(['Spending', formatThousands(spending)])
        that.DData.push(['Cost per lead', num.costLead])
        that.DData.push(['Conversion', (num.conversionRate * 100).toFixed(0) + '%'])
        that.DData.push(['CTR', (num.ctr * 100).toFixed(0) + '%'])
        that.dashBoardoption = chartTypeSeven(legendDate, xAxisData, cpl, conversionRate)
      }).catch(
      error => console.log(error)
    )
  }
}

// campaign 3
function dataCmafunnelSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.CMA_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = res.data.right
        let legendDate = data.legend
        let series = data.data
        let spending = num.spending.toFixed(0)
        that.DData = []
        that.DData.push(['Spending', formatThousands(spending)])
        that.DData.push(['Cost per lead', num.costLead])
        that.DData.push(['Conversion', (num.conversionRate * 100).toFixed(0) + '%'])
        that.DData.push(['CTR', (num.ctr * 100).toFixed(0) + '%'])
        that.dashBoardoption = chartTypeThree(legendDate, series)
      }).catch(
      error => console.log(error)
    )
  }
}

// com.cn
function dataComSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.COM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = res.data.right
        let legendDate = data.legend
        let xAxisData = data.xAxis
        let seriesData = data.series
        let totalTraffic = num.totalTraffic.toFixed(0)
        that.DData = []
        that.DData.push(['Bounce Rate', (num.bounceRate * 100).toFixed(0) + '%'])
        that.DData.push(['Conversion Rate', (num.conversionRate * 100).toFixed(0) + '%'])
        that.DData.push(['UGCR', (num.ugcr * 100).toFixed(0) + '%'])
        that.DData.push(['Traffic', formatThousands(totalTraffic)])
        seriesData.forEach(val => {
          if (val.name == 'Month Target') {
            val.itemStyle = {
              "normal": {
                "lineStyle": {
                  "width": 2,
                  "type": "dotted"
                }
              }
            }
          }
        })
        that.dashBoardoption = chartTypeEight(legendDate, xAxisData, seriesData)
      }).catch(
      error => console.log(error)
    )
  }
}

// crm
function dataCrmSearch(that, data) {
  if (data.isTable) {
    post(xhrUrls.CRM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        that.dashBoardTableData = data
      }).catch(
      error => console.log(error)
    )
  } else {
    post(xhrUrls.CRM_SEARCH, data)
      .then(res => {
        let data = res.data.data
        let num = res.data.right
        let legendDate = data.legend
        let xAxisData = data.xAxis
        let seriesData = data.series
        let registration = num.registration.toFixed(0)
        let sale = num.sale.toFixed(0)
        that.DData = []
        that.DData.push(['Registration', formatThousands(registration)])
        that.DData.push(['Engagement Rate', (num.engagement * 100).toFixed(0) + '%'])
        that.DData.push(['Sale', formatThousands(sale)])
        seriesData.forEach(val => {
          if (val.name == 'Month Target') {
            val.itemStyle = {
              "normal": {
                "lineStyle": {
                  "width": 2,
                  "type": "dotted"
                }
              }
            }
          }
        })

        that.dashBoardoption = chartTypeEight(legendDate, xAxisData, seriesData)
      }).catch(
      error => console.log(error)
    )
  }
}


export {
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
  formatThousands,
  dataCmaBarSearch,
  dataCmaLineSearch
}
