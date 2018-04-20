<template>
  <div class="campaign-table">
    <div class="cam-per-ov">
      <table id="camTableOv" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>Period</th>
          <th @click="tips('Spending', 'Spending')" class="triangle Spending">Spending</th>
          <th @click="tips('Impression', 'Impression')" class="triangle Impression">Impression</th>
          <th @click="tips('Traffic', 'Traffic')" class="triangle Traffic">Traffic</th>
          <th @click="tips('Traffic to EC', 'EC')" class="triangle EC">Traffic to EC</th>
          <th>Target</th>
          <th></th>
          <th @click="tips('Traffic to .com', 'com')" class="triangle com">Traffic to .com</th>
          <th>Target</th>
          <th></th>
          <th @click="tips('CTR', 'CTR')" class="triangle CTR">CTR</th>
          <th @click="tips('Leads', 'Leads')" class="triangle Leads">Leads</th>
          <th @click="tips('Cost per lead', 'Cost')" class="triangle Cost">Cost per lead</th>
          <th @click="tips('Baseline1', 'Baseline1')" class="triangle Baseline1">Baseline</th>
          <th></th>
          <th @click="tips('Conversion%', 'Conversion')" class="triangle Conversion">Conversion%</th>
          <th @click="tips('Baseline2', 'Baseline2')" class="triangle Baseline2">Baseline</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in camTableOvData">
          <td>{{item.title}}</td>
          <td>{{item.spending | formatThousands }}</td>
          <td>{{item.impression | formatThousands }}</td>
          <td>{{item.traffic | formatThousands }}</td>
          <td>{{item.trafficEc | formatThousands }}</td>
          <td>{{item.trafficEcTarget | formatThousands }}</td>
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
          <td>{{item.trafficCom | formatThousands }}</td>
          <td>{{item.trafficComTarget | formatThousands }}</td>
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
          <td>{{item.ctr | percentile }}</td>
          <td>{{item.leads | formatThousands }}</td>
          <td>{{item.costLead | round }}</td>
          <td>{{item.baseLine | formatThousands }}</td>
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
          <td>{{item.conversionRate | percentile }}</td>
          <td>{{item.baseLineConversion | percentile }}</td>
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

    <div class="ind-cam-per">
      <table id="camTableAn" class="data-table" style="width:100%">
        <thead>
        <tr>
          <th>Month</th>
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
        <tbody>
          <tr v-for="(item, index) in camTableAnData">
            <td :rowSpan="0" >{{item.month}}</td>
            <td >{{item.startDate}}-{{item.endDate}}</td>
            <td >{{item.channel}}</td>
            <td >{{item.spending | formatThousands }}</td>
            <td >{{item.impression | formatThousands }}</td>
            <td >{{item.click | formatThousands }}</td>
            <td >{{item.ctr | percentile }}</td>
            <td >{{item.leads | formatThousands }}</td>
            <td >{{item.costLead | round }}</td>
            <td >{{item.conversionRate | percentile }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls';
  import {get, post} from '../../assets/config/http';

  const CMA_SEARCH = xhrUrls.CMA_SEARCH;
  export default {
    name: "table",
    data() {
      return {
        camTableOvData: [],
        camTableAnData: [],
        OvTableSearch: {
          isDetailTable: false,
          isTable: true,
          month: "201803",
        },
        AnTableSearch: {
          campaign: "MG-Mini cleanser launch campaign-2018Q1",
          category: "MG",
          isDetailTable: true,
        },
        monthIndex: {
          Jan:0,
          Feb:0,
          Mar:0,
          Apr:0,
          May:0,
          Jun:0,
          Jul:0,
          Aug:0,
          Sept:0,
          Oct:0,
          Nov:0,
          Dec:0,
        },
        timeIndex: [],
        weekIndex:0,
      }
    },
    mounted() {
      this.getOvTableData()
      this.getAnTableData()
    },
    methods: {
      getOvTableData() {
        post(CMA_SEARCH, this.OvTableSearch).then(res => {
          let data = res.data;
          if (data.code == 200) {
            this.camTableOvData = data.data;
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

      getAnTableData() {
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

      // combineCell(list){
      //   let field;
      //   for (field in list) {
      //     var k = 0;
      //     while (k < list.length) {
      //       list[k][field + 'span'] = 1;
      //       list[k][field + 'dis'] = false;
      //       for (var i = k + 1; i <= list.length - 1; i++) {
      //         if (list[k][field] == list[i][field] && list[k][field] != '') {
      //           list[k][field + 'span']++;
      //           list[k][field + 'dis'] = false;
      //           list[i][field + 'span'] = 1;
      //           list[i][field + 'dis'] = true;
      //         } else {
      //           break;
      //         }
      //       }
      //       k = i;
      //     }
      //   }
      //   return this.camTableAnData = list;
      // },

      columnIndex(data) {
        let Date = [], month = [], week = [], time=[];
        data.forEach((v, i)=>{
          if(v.type == 'week'){
            Date.push({
              week:data[i].week,
              data: v
            })
          }else{
            Date.push({
              month:data[i].month,
              data:v
            })
          }
        })
        Date.forEach((j, k)=>{
          let count = 0;
          Date.forEach((n, m)=>{
            if(j.type == 'week'){
              if(j.week == n.week){
                count++
              }
            }else{
              if(j.month == n.month){
                count++
              }
            }
          })
          if(j.type == 'week'){
            week.push({
              week: j.week,
              data: j.data
            })
          }else{
            month.push({
              month: j.month,
              data: j.data
            })
          }
        })
        console.log(Date)
        console.log(week)
        console.log(month)

        // Date.forEach((v, i)=>{
        //   let count = 0
        //   Date.forEach((s, j)=>{
        //     if(v == s){
        //       count ++
        //     }
        //   })
        //   arr.push({
        //     data:v,
        //     count:count
        //   })
        // })

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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .campaign-table
    .data-table
      border-collapse collapse
      border none
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
      td
        padding 10px 0
        border 1px solid #B3B3B3
        text-align center
        white-space pre-wrap


</style>
