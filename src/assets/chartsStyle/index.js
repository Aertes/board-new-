let defaultOption = {
  title: {
    text: 'NoData'
  },
  legend: {
    data: ['NoData']
  },
  xAxis: {
    data: ["NoData"]
  },
  yAxis: {},
  series: [{
    name: 'NoData',
    type: 'bar',
    data: [0, 0, 0, 0, 0, 0]
  }]
}

let indicator = [
  {
    "text": "RATE",
    "max": 600
  }, {
    "text": "% of negative",
    "max": 600
  }, {
    "text": "Timely Reponse%",
    "max": 600
  }, {
    "text": "% of review",
    "max": 600
  }
]
// 千分位格式化
function formatThousands(params) {
  return (params + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

function chartTypeOne(legendDate, xAxisData, yAxisName1, yAxisName2, series) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "cross" // 默认为直线，可选为：'line' | 'shadow'
      }/*,
      formatter:function(params){
        var relVal = params[0].name+"<br/>";
        relVal += params[0].seriesName+ ' : ' + params[0].value+"<br/>";
        relVal += params[1].seriesName+ ' : ' +params[1].value+"<br/>";
        relVal += params[2].seriesName+ ' : ' + (params[2].value*100)+"%<br/>";
        relVal += params[3].seriesName+ ' : ' + params[3].value;
        return relVal;
      }*/
    },
    legend: {
      data: legendDate,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    barWidth: 20,
    xAxis: {
      type: "category",
      data: xAxisData
    },
    yAxis: [
      {
        type: "value",
        name: yAxisName1,
        min: 0,
        // max: 250,
        // interval: 50,
        axisLabel: {
          formatter: "{value}"
        }
      },
      {
        type: "value",
        name: yAxisName2,
        axisLabel: {
          formatter: function (value, index) {
            var text = value * 100 + '%';
            return text;
          }
        }
      }
    ],
    series: series
  }
}

function chartTypeTwo(legendDate, seriesData) {
  return {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      x: 'center',
      data: legendDate
    },
    radar: [{
      indicator: indicator,
      center: ["50%", "40%"],
      radius: 80
    }],
    series: [{
      type: "radar",
      tooltip: {
        trigger: "item"
      },
      itemStyle: {
        normal: {
          areaStyle: {
            type: "default"
          }
        }
      },
      data: seriesData
    }]
  }
}

function chartTypeFour(xAxisData, seriesData1, seriesData2) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为："line" | "shadow"
      },
      formatter: function (params) {
        var tar = params[1];
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      }
    },
    barWidth: 20,
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      splitLine: {
        show: false
      },
      data: xAxisData
    },
    yAxis: {
      type: "value"
    },
    series: [{
      name: "辅助",
      type: "bar",
      stack: "总量",
      itemStyle: {
        normal: {
          barBorderColor: "rgba(0,0,0,0)",
          color: "rgba(0,0,0,0)"
        },
        emphasis: {
          barBorderColor: "rgba(0,0,0,0)",
          color: "rgba(0,0,0,0)"
        }
      },
      data: seriesData1
    },
      {
        name: "Traffic",
        type: "bar",
        stack: "总量",
        data: seriesData2
      }
    ]
  }
}

function chartTypeFive(legendDate, yAxisData, seriesData1, seriesData2, seriesData3, seriesData4, seriesData5) {

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为："line" | "shadow"
      }
    },
    legend: {
      data: legendDate
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "value"
    },
    yAxis: {
      type: "category",
      data: yAxisData
    },
    series: [{
      name: "站外",
      type: "bar",
      stack: "总量",
      data: seriesData1
    },
      {
        name: "钻展",
        type: "bar",
        stack: "总量",
        data: seriesData2
      },
      {
        name: "搜索",
        type: "bar",
        stack: "总量",
        data: seriesData3
      },
      {
        name: "其它",
        type: "bar",
        stack: "总量",
        data: seriesData4
      },
      {
        name: "Total",
        type: "bar",
        stack: "总量",
        data: seriesData5
      }
    ]
  }
}

//compaign1 bar
function chartTypeSix(legendDate, xAxisData, seriesData) {

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为："line" | "shadow"
      }
    },
    legend: {
      data: legendDate
    },
    barWidth: 20,
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "category",
      data: xAxisData,
      axisPointer: {
        type: "shadow"
      }
    }],
    yAxis: [{
      type: "value",
      name: "Traffic",
      min: 0
    }],
    series: seriesData
  }

}

//compaign2 line
function chartTypeSeven(legendDate, xAxisData, cpl, conversionRate) {

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        crossStyle: {
          color: '#999'
        }
      }
    },
    barWidth: 20,
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    legend: {
      data: legendDate
    },
    xAxis: [{
      type: 'category',
      data: xAxisData,
      axisPointer: {
        type: 'shadow'
      }
    }],
    yAxis: [{
      type: 'value',
      name: 'CPL(￥)',
      min: 0
    },
      {
        type: 'value',
        name: 'Rate',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [{
      name: 'Cost per lead',
      type: 'bar',
      data: cpl
    },
      {
        name: 'Conversion rate',
        type: 'line',
        yAxisIndex: 1,
        data: conversionRate
      }
    ]
  }

}

//compaign3 funnl
function chartTypeThree(legendDate, seriesData) {

  return {
    tooltip: {
      trigger: "item",
      formatter: (name)=>{
        return '<p>' + name.seriesName + '</p><p>' + name.data.name + ':' +formatThousands(name.data.value)+'</p>'
      }
    },
    legend: {
      data: legendDate
    },
    calculable: true,
    series: [{
      name: "漏斗图",
      type: "funnel",
      left: "10%",
      top: 60,
      bottom: 60,
      width: "80%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      gap: 2,
      label: {
        normal: {
          show: true,
          position: "inside"
        },
        emphasis: {
          textStyle: {
            fontSize: 20
          }
        }
      },
      labelLine: {
        normal: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid"
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: "#fff",
          borderWidth: 1
        }
      },
      data: seriesData
    }]
  }

}

//com.cn-crm
function chartTypeEight(legendDate,xAxisData,seriesData){
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为："line" | "shadow"
        }
      },
      legend: {
        data: legendDate
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      barWidth: 20,
      xAxis: [{
        type: "category",
        data: xAxisData,
        axisPointer: {
          type: "shadow"
        }
      }],
      yAxis: [{
        type: "value",
        name: "Traffic",
        min: 0
      },
        {
          type: "value",
          name: "Rate",
          min: 0,
          axisLabel: {
            formatter: "{value} %"
          }
        }
      ],
      series: seriesData
    }
}

export {
  defaultOption,
  chartTypeOne,
  chartTypeTwo,
  chartTypeThree,
  chartTypeFour,
  chartTypeFive,
  chartTypeSix,
  chartTypeSeven,
  chartTypeEight
}
