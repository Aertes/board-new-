<template>
  <div class="chart-tables-container" id="tableWrap">
    <div class="clearfix table-set">
      <!--<button class="box-shadow download-button" @click="downloadUrl">DOWNLOAD</button>-->
      <!--<span @click="openTables"><svg-icon sign="icon-enlarge" class="enlarge"></svg-icon></span>-->
      <label>
        <input type="checkbox" v-model="checked">
        <svg-icon :sign="checked ? 'icon-checked' : 'icon-check'" class="checkBox"></svg-icon>
        <span>Set as default view</span>
      </label>
    </div>

    <div class="tableBoxwrap" width="100%" v-show="isShow1">
      <table id="tableBox1" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow5">

      <table id="tableBox5" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow6">
      <table id="tableBox6" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow7">
      <table id="tableBox7" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow8">
      <table id="tableBox8" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow9">
      <table id="tableBox9" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow10">
      <table id="tableBox10" class="display" style="width:100%">
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

    <div class="tableBoxwrap" width="100%" v-show="isShow11">
      <table id="tableBox11" class="display" style="width:100%">
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
</template>

<script type="text/ecmascript-6">
  import {
    setLocalItem,
    getLocalItem,
    removeLocalItem
  } from '../../assets/config/storage'
  import {
    formatThousands
  } from '../../assets/chartsData/index'

  export default {
    name: "chart-table",
    data() {
      return {
        checked: false,
        isShow1: false,
        isShow5: false,
        isShow6: false,
        isShow7: false,
        isShow8: false,
        isShow9: false,
        isShow10: false,
        isShow11: false,
        table1: null,
        table5: null,
        table6: null,
        table7: null,
        table8: null,
        table9: null,
        table10: null,
        table11: null
      }
    },
    props: ['tableData'],
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {

      this.defaultViews()

      this.getTableData()

    },
    methods: {
      bindScrollbar() {
        $("#charContainer").mCustomScrollbar({
          axis: "x",
          theme: "light-3",
          advanced: {autoExpandHorizontalScroll: true}
        });
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
            this.table5 = $('#tableBox5').DataTable({
              "searching": false,
              "lengthChange": false,
              "ordering": false,
              'bDestroy': true,
              "pageLength": 8,
              "pagingType": "simple_numbers",
              "info": false,
              "scrollX": true,
              "scrollCollapse": true,
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
            $('#tableBox6').DataTable({
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
            $('#tableBox7').DataTable({
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
            $('#tableBox8').DataTable({
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
            this.table9 = $('#tableBox9').DataTable({
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
            this.table10 = $('#tableBox10').DataTable({
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
            this.table11 = $('#tableBox11').DataTable({
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
            $('#tableBox1').DataTable({
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
      openTables() {
        this.$Hub.$emit('showTables', {id: 'tablesBox', tableData: this.tableData})
      },
      defaultViews() {
        this.checked = getLocalItem('isTableDefaultShow')
      },
      closeLoading() {
        this.$emit('closeLoading')
      },
      downloadUrl() {
        this.$emit('downloadUrl', {isTable: '1'})
      }
    },
    watch: {
      tableData() {
        this.$nextTick(() => {

          this.ovtableStyle()

          this.getTableData()

          this.closeLoading()

          this.$Hub.$emit('sentData', {tableData: this.tableData})

        })
      },
      checked() {

        if (this.checked) {

          setLocalItem('isTableDefaultShow', true)

        } else {

          removeLocalItem('isTableDefaultShow')

        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .chart-tables-container
    position relative
    width 100%
    height 100%
    font-size 18px
    // overflow auto
    .tableBoxwrap
      height 100%
    .table-set
      position absolute
      left 0
      bottom 10px
      z-index 1
      .download-button
        width 200px
        height 40px
        margin-right 10px
        background-color #2061AE
        border-radius 10px
        color #fff
        border medium
        outline none
        cursor pointer
      label
        .checkBox
          vertical-align -6px
          color #2061AE
          font-size 25px
          margin-right 5px
        input
          display none
        span
          font-size 20px
      .enlarge
        vertical-align -8px
        font-size 30px
        color #2061AE
        margin-right 20px
        cursor pointer
    table
      border-top 1px solid #D6E3F0
      border-left 1px solid #D6E3F0
      border-bottom medium
      border-right medium
      line-height 30px
      text-align center
      thead
        background rgba(186, 215, 237, .42);
      th
      td
        border-bottom 1px solid #D6E3F0
        border-right 1px solid #D6E3F0
        border-top medium
        border-left medium
</style>
