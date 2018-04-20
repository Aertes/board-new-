<template>

  <div class="target-warp">
    <div action="" class="clearfix search-wrap">
      <div class="search">
        <selection :selections="selectTargetOptions" class="role-select styleone"
                   @selectShowOne="selectTagetHandle"></selection>
      </div>
      <div class="search" v-show="B">
        <selection :selections="selectBOptions" class="role-select" ref="B" @selectShowOne="selectBHandle"></selection>
      </div>
      <div class="search">
        <selection :selections="selectTimeOptions" class="role-select" ref="time"
                   @selectShowOne="selectTimeHandle"></selection>
      </div>
      <!--<span><svg-icon sign="icon-search" class="searchIcon"></svg-icon></span>-->
    </div>

    <div class="tables">
      <div class="role-table clearfix">

        <div v-show="isTableStyle==0?true:false">
          <table id="Table0" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
              <th>YearMonth</th>
              <th>Baselline Conversion Target</th>
              <th>Baselline Cost Per Load</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div v-show="isTableStyle==1?true:false">
          <table id="Table1" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
              <th>YearMonth</th>
              <th>Total<br/>Traffic</th>
              <th>Free<br/>Traffic</th>
              <th>Paid<br/>Traffic</th>
              <th>Bounce<br/>Rate</th>
              <th>Conversion<br/>Rate</th>
              <th>UGCR</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div v-show="isTableStyle==2?true:false">
          <table id="Table2" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
              <th>YearMonth</th>
              <th>Total<br/>Traffic</th>
              <th>Free<br/>Traffic</th>
              <th>Paid<br/>Traffic</th>
              <th>Bounce<br/>Rate</th>
              <th>Conversion<br/>Rate</th>
              <th>UGCR</th>
              <th>MQL</th>
              <th>SQL</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div v-show="isTableStyle==3?true:false">
          <table id="Table3" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
              <th>YearMonth</th>
              <th>Registrations Target</th>
              <th>Engagement Rate Target</th>
              <th>Sales Target</th>
              <th>Conversion Target</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div v-show="isTableStyle==4?true:false">
          <table id="Table4" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
            <thead>
            <tr>
              <th>YearMonth</th>
              <th>Target Avg Rating</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'
  import {
    formatThousands
  } from '../../assets/chartsData/index'

  let TARGET_GETDATE = xhrUrls.TARGET_GETDATE
  let TARGET_CAMUPDATE = xhrUrls.TARGET_CAMUPDATE
  let TARGET_CAMSEARCH = xhrUrls.TARGET_CAMSEARCH
  let TARGET_CAMSAVE = xhrUrls.TARGET_CAMSAVE

  let TARGET_COMUPDATE = xhrUrls.TARGET_COMUPDATE
  let TARGET_COMSEARCH = xhrUrls.TARGET_COMSEARCH
  let TARGET_COMSAVE = xhrUrls.TARGET_COMSAVE

  let TARGET_CRMUPDATE = xhrUrls.TARGET_CRMUPDATE
  let TARGET_CRMSEARCH = xhrUrls.TARGET_CRMSEARCH
  let TARGET_CRMSAVE = xhrUrls.TARGET_CRMSAVE

  let TARGET_RBUPDATE = xhrUrls.TARGET_RBUPDATE
  let TARGET_RBSEARCH = xhrUrls.TARGET_RBSEARCH
  let TARGET_RBSAVE = xhrUrls.TARGET_RBSAVE

  export default {
    name: "tartget",
    data() {
      return {
        selectTargetOptions: ['CAMPAIGN', 'COM', 'CRM', 'RATING & REVIEW'],
        selectBOptions: ['B2C', 'B2B'],
        selectTimeOptions: ['ALL TIME'],
        camTableData: '',
        comCTableData: '',
        comBTableData: '',
        crmTableData: '',
        rbTableData: '',
        time: '',
        B: false,
        isTableStyle: 0
      }
    },
    computed: {
      campaignTime() {
        return this.$refs.target.$refs.input.value
      }
    },
    mounted() {

      this.getDate()

      this.getSearch()

      this.tableEdit()

    },
    methods: {
      getSearch() {
        switch (this.isTableStyle) {
          case 0:
            post(TARGET_CAMSEARCH, {
              'month': this.time == 'ALL TIME' ? null : this.time
            }).then(res => {
              let data = res.data.data.data
              this.camTableData = data
            })
            break;
          case 1:
            post(TARGET_COMSEARCH, {
              'month': this.time == 'ALL TIME' ? null : this.time,
              'isB2c': true
            }).then(res => {
              let data = res.data.data.data
              this.comCTableData = data
            })
            break;
          case 2:
            post(TARGET_COMSEARCH, {
              'month': this.time == 'ALL TIME' ? null : this.time,
              'isB2c': false
            }).then(res => {
              let data = res.data.data.data
              this.comBTableData = data
            })
            break;
          case 3:
            post(TARGET_CRMSEARCH, {
              'month': this.time == 'ALL TIME' ? null : this.time
            }).then(res => {
              let data = res.data.data.data
              this.crmTableData = data
            })
            break;
          case 4:
            post(TARGET_RBSEARCH, {
              'month': this.time == 'ALL TIME' ? null : this.time
            }).then(res => {
              let data = res.data.data.data
              this.rbTableData = data
            })
            break;
        }
      },

      getTable() {
        switch (this.isTableStyle) {
          case 0:
            $("#Table0").DataTable({
              searching: false,
              lengthChange: false,
              autoWidth: false,
              info: false,
              bDestroy: true,
              ordering: false,
              pagingType: "simple_numbers",
              pageLength: 7,
              "paging": this.camTableData.length > 7 ? true : false,
              data: this.camTableData,
              columns: [
                {
                  data: 'month',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-type="0" data-month="' + row.month + '" data-baseline="' + row.baseLine + '" data-id="' + row.id + '" data-costLead="' + row.costLead + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'baseLine',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-type="1" data-month="' + row.month + '" data-baseline="' + row.baseLine + '" data-id="' + row.id + '" data-costLead="' + row.costLead + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'costLead',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-type="2" data-month="' + row.month + '" data-baseline="' + row.baseLine + '" data-id="' + row.id + '" data-costLead="' + row.costLead + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                }
              ]
            })
            break;
          case 1:
            $("#Table1").DataTable({
              searching: false,
              lengthChange: false,
              autoWidth: false,
              info: false,
              bDestroy: true,
              ordering: false,
              pagingType: "simple_numbers",
              pageLength: 6,
              "paging": this.comCTableData.length > 6 ? true : false,
              data: this.comCTableData,
              columns: [
                {
                  data: 'month',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="0" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'totalTraffic',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="1" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'freeTraffic',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="2" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'paidTraffic',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="3" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'bounceRate',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="4" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="5" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'ugcr',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="6" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                }
              ]
            })
            break;
          case 2:
            $("#Table2").DataTable({
              searching: false,
              lengthChange: false,
              autoWidth: false,
              info: false,
              bDestroy: true,
              ordering: false,
              pagingType: "simple_numbers",
              pageLength: 6,
              "paging": this.comBTableData.length > 6 ? true : false,
              data: this.comBTableData,
              columns: [
                {
                  data: 'month',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="0" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'totalTraffic',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="1" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'freeTraffic',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="2" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'paidTraffic',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="3" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'bounceRate',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="4" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'conversionRate',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="5" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'ugcr',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="6" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'mql',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="7" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'comSql',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="8" data-month="' + row.month + '" data-totalTraffic="' + row.totalTraffic + '" data-freeTraffic="' + row.freeTraffic + '" data-paidTraffic="' + row.paidTraffic + '" data-bounceRate="' + row.bounceRate + '" data-conversionRate="' + row.conversionRate + '" data-ugcr="' + row.ugcr + '" data-mql="' + row.mql + '" data-comSql="' + row.comSql + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                }
              ]
            })
            break;
          case 3:
            $("#Table3").DataTable({
              searching: false,
              lengthChange: false,
              autoWidth: false,
              info: false,
              bDestroy: true,
              ordering: false,
              pagingType: "simple_numbers",
              pageLength: 7,
              "paging": this.crmTableData.length > 7 ? true : false,
              data: this.crmTableData,
              columns: [
                {
                  data: 'month',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="0" data-month="' + row.month + '" data-registrationsTarget="' + row.registrationsTarget + '" data-engagementTarget="' + row.engagementTarget + '" data-sales="' + row.sales + '" data-conversionTarget="' + row.conversionTarget + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'registrationsTarget',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="1" data-month="' + row.month + '" data-registrationsTarget="' + row.registrationsTarget + '" data-engagementTarget="' + row.engagementTarget + '" data-sales="' + row.sales + '" data-conversionTarget="' + row.conversionTarget + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'engagementTarget',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="2" data-month="' + row.month + '" data-registrationsTarget="' + row.registrationsTarget + '" data-engagementTarget="' + row.engagementTarget + '" data-sales="' + row.sales + '" data-conversionTarget="' + row.conversionTarget + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'sales',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="3" data-month="' + row.month + '" data-registrationsTarget="' + row.registrationsTarget + '" data-engagementTarget="' + row.engagementTarget + '" data-sales="' + row.sales + '" data-conversionTarget="' + row.conversionTarget + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'conversionTarget',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="4" data-month="' + row.month + '" data-registrationsTarget="' + row.registrationsTarget + '" data-engagementTarget="' + row.engagementTarget + '" data-sales="' + row.sales + '" data-conversionTarget="' + row.conversionTarget + '" style="display: none">' +
                      '<span>' + formatThousands(data) + '</span>' +
                      '</div>';
                  }
                }
              ]
            })
            break;
          case 4:
            $("#Table4").DataTable({
              searching: false,
              lengthChange: false,
              autoWidth: false,
              info: false,
              bDestroy: true,
              ordering: false,
              pagingType: "simple_numbers",
              pageLength: 7,
              "paging": this.rbTableData.length > 7 ? true : false,
              data: this.rbTableData,
              columns: [
                {
                  data: 'month',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="0" data-month="' + row.month + '" data-avgRating="' + row.avgRating + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                },
                {
                  data: 'avgRating',
                  render: (data, type, row) => {
                    return '<div class="editInput">' +
                      '<input type="text" class="" value="' + data + '" data-id="' + row.id + '" data-type="1" data-month="' + row.month + '" data-avgRating="' + row.avgRating + '" style="display: none">' +
                      '<span>' + data + '</span>' +
                      '</div>';
                  }
                }
              ]
            })
            break;
        }
      },

      getDate() {
        switch (this.isTableStyle) {
          case 0:
            post(TARGET_GETDATE, 'campaign').then(res => {
              let data = res.data.data
              this.selectTimeOptions = ['ALL TIME']
              data.forEach(val => {
                this.selectTimeOptions.push(val)
              })
            })
            break;
          case 1:
            post(TARGET_GETDATE, 'comB2c').then(res => {
              let data = res.data.data
              this.selectTimeOptions = ['ALL TIME']
              data.forEach(val => {
                this.selectTimeOptions.push(val)
              })
            })
            break;
          case 2:
            post(TARGET_GETDATE, 'comB2b').then(res => {
              let data = res.data.data
              this.selectTimeOptions = ['ALL TIME']
              data.forEach(val => {
                this.selectTimeOptions.push(val)
              })
            })
            break;
          case 3:
            post(TARGET_GETDATE, 'crm').then(res => {
              let data = res.data.data
              this.selectTimeOptions = ['ALL TIME']
              data.forEach(val => {
                this.selectTimeOptions.push(val)
              })
            })
            break;
          case 4:
            post(TARGET_GETDATE, 'reviewRating').then(res => {
              let data = res.data.data
              this.selectTimeOptions = ['ALL TIME']
              data.forEach(val => {
                this.selectTimeOptions.push(val)
              })
            })
            break;
        }
      },

      tableEdit() {
        let that = this
        $(document).on('click', '.editInput', function () {
          $(this).find('input').show().focus().end().find('span').hide()
        })
        $(document).on('blur', '.editInput input', function () {
          $(this).hide().siblings('span').show()
          let month = $(this).data('month')
          let inputVal = $(this).val()
          let type = $(this).data('type')
          let id = $(this).data('id')
          switch (that.isTableStyle){
            case 0:
              let baseLine = $(this).data('baseline')
              let costLead = $(this).data('costlead')
              let data = {
                "baseLine": baseLine,
                "costLead": costLead,
                "id": id,
                "month": month
              }
              switch (type){
                case 0:
                  data.month = inputVal
                  break;
                case 1:
                  data.baseLine = inputVal
                  break;
                case 2:
                  data.costLead = inputVal
                  break;
              }
              post(TARGET_CAMUPDATE, data).then(res => {
                let code = res.data.code
                if (code != 200) {
                  layer.confirm(res.data.errMsg, {
                    title: 'Prompt information',
                    btn: ['Cancel'],
                  })
                } else {
                  if(type==0){
                    $(this).hide().siblings('span').text(inputVal)
                  }else{
                    $(this).hide().siblings('span').text(formatThousands(inputVal))
                  }
                }
              })
              break;
            case 1:
              let totalTraffic = $(this).data('totalTraffic')
              let freeTraffic = $(this).data('freeTraffic')
              let paidTraffic = $(this).data('paidTraffic')
              let bounceRate = $(this).data('bounceRate')
              let conversionRate = $(this).data('conversionRate')
              let ugcr = $(this).data('ugcr')
              let data2 = {
                "month": month,
                "id": id,
                "totalTraffic": totalTraffic,
                "freeTraffic": freeTraffic,
                "paidTraffic": paidTraffic,
                "bounceRate": bounceRate,
                "conversionRate": conversionRate,
                "ugcr": ugcr,
                "isB2c": true
              }
              switch (type){
                case 0:
                  data2.month = inputVal
                  break;
                case 1:
                  data2.totalTraffic = inputVal
                  break;
                case 2:
                  data2.freeTraffic = inputVal
                  break;
                case 3:
                  data2.paidTraffic = inputVal
                  break;
                case 4:
                  data2.bounceRate = inputVal
                  break;
                case 5:
                  data2.conversionRate = inputVal
                  break;
                case 6:
                  data2.ugcr = inputVal
                  break;
              }
              post(TARGET_COMUPDATE, data2).then(res => {
                let code = res.data.code
                if (code != 200) {
                  layer.confirm(res.data.errMsg, {
                    title: 'Prompt information',
                    btn: ['Cancel'],
                  })
                } else {
                  $(this).hide().siblings('span').text(formatThousands(inputVal))
                }
              })
              break;
            case 2:
              let totalTraffic_b = $(this).data('totalTraffic')
              let freeTraffic_b = $(this).data('freeTraffic')
              let paidTraffic_b = $(this).data('paidTraffic')
              let bounceRate_b = $(this).data('bounceRate')
              let conversionRate_b = $(this).data('conversionRate')
              let ugcr_b = $(this).data('ugcr')
              let mql = $(this).data('mql')
              let comSql = $(this).data('comSql')
              let data3 = {
                "month": month,
                "id": id,
                "totalTraffic": totalTraffic,
                "freeTraffic": freeTraffic,
                "paidTraffic": paidTraffic,
                "bounceRate": bounceRate,
                "conversionRate": conversionRate,
                "ugcr": ugcr,
                "mql": mql,
                "comSql": comSql,
                "isB2c": false
              }
              switch (type){
                case 0:
                  data3.month = inputVal
                  break;
                case 1:
                  data3.totalTraffic = inputVal
                  break;
                case 2:
                  data3.freeTraffic = inputVal
                  break;
                case 3:
                  data3.paidTraffic = inputVal
                  break;
                case 4:
                  data3.bounceRate = inputVal
                  break;
                case 5:
                  data3.conversionRate = inputVal
                  break;
                case 6:
                  data3.ugcr = inputVal
                  break;
                case 7:
                  data3.mql = inputVal
                  break;
                case 8:
                  data3.comSql = inputVal
                  break;
              }
              post(TARGET_COMUPDATE, data3).then(res => {
                let code = res.data.code
                if (code != 200) {
                  layer.confirm(res.data.errMsg, {
                    title: 'Prompt information',
                    btn: ['Cancel'],
                  })
                } else {
                  $(this).hide().siblings('span').text(formatThousands(inputVal))
                }
              })
              break;
            case 3:
              let registrationsTarget = $(this).data('registrationsTarget')
              let engagementTarget = $(this).data('engagementTarget')
              let sales = $(this).data('sales')
              let conversionTarget = $(this).data('conversionTarget')
              let data4 = {
                "month": month,
                "id": id,
                "registrationsTarget": registrationsTarget,
                "engagementTarget": engagementTarget,
                "sales": sales,
                "conversionTarget": conversionTarget
              }
              switch (type){
                case 0:
                  data4.month = inputVal
                  break;
                case 1:
                  data4.registrationsTarget = inputVal
                  break;
                case 2:
                  data4.engagementTarget = inputVal
                  break;
                case 3:
                  data4.sales = inputVal
                  break;
                case 4:
                  data4.conversionTarget = inputVal
                  break;
              }
              post(TARGET_CRMUPDATE, data4).then(res => {
                let code = res.data.code
                if (code != 200) {
                  layer.confirm(res.data.errMsg, {
                    title: 'Prompt information',
                    btn: ['Cancel'],
                  })
                } else {
                  $(this).hide().siblings('span').text(formatThousands(inputVal))
                }
              })
              break;
            case 4:
              let avgRating = $(this).data('avgRating')
              let data5 = {
                "month": month,
                "id": id,
                "avgRating": avgRating
              }
              switch (type){
                case 0:
                  data5.month = inputVal
                  break;
                case 1:
                  data5.avgRating = inputVal
                  break;
              }
              post(TARGET_RBUPDATE, data5).then(res => {
                let code = res.data.code
                if (code != 200) {
                  layer.confirm(res.data.errMsg, {
                    title: 'Prompt information',
                    btn: ['Cancel'],
                  })
                } else {
                  $(this).hide().siblings('span').text(formatThousands(inputVal))
                }
              })
              break;
          }
        })
      },

      selectTagetHandle(val) {
        this.B = false
        this.$refs.B.nowIndex = 0
        switch (val){
          case 'CAMPAIGN':
            this.isTableStyle = 0
            break;
          case 'COM':
            this.B = true
            this.isTableStyle = 1
            break;
          case 'CRM':
            this.isTableStyle = 3
            break;
          case 'RATING & REVIEW':
            this.isTableStyle = 4
            break;
        }
      },
      selectBHandle(val) {
        switch (val){
          case 'B2C':
            this.isTableStyle = 1
            break;
          case 'B2B':
            this.isTableStyle = 2
            break;
        }
      },
      selectTimeHandle(val) {
        this.time = val
      },
    },
    watch: {
      camTableData() {
        this.$nextTick(() => {
          this.getTable()
        })
      },
      comCTableData() {
        this.$nextTick(() => {
          this.getTable()
        })
      },
      comBTableData() {
        this.$nextTick(() => {
          this.getTable()
        })
      },
      crmTableData() {
        this.$nextTick(() => {
          this.getTable()
        })
      },
      rbTableData() {
        this.$nextTick(() => {
          this.getTable()
        })
      },
      time() {
        this.$nextTick(() => {
          this.getSearch()
        })
      },
      isTableStyle() {
        this.$nextTick(() => {
          this.getSearch()
          this.getTable()
          this.getDate()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .target-warp
    .search-wrap
      width 100%
    .search
      float left
      margin-right 40px
      .dropdown-wrap
        display inline-block
        height 40px
        line-height 40px
        .dropdown-show
          height 40px
          line-height 40px
        &.styleone
          width 240px
      label
        color #717071
        font-size 22px
        margin-right 15px
        line-height 40px
        display inline-block
      input, select
        margin-right 30px
        appearance none
        border 1px solid #E2DFDE
        border-radius 5px
        height 40px
        line-height 40px
        padding 0 10px
    .searchIcon
      font-size 30px
      color #717071
      margin-top 7px
      cursor pointer
    .tables
      width 100%
      margin-top 30px
      .user-create
        color #2061ae
        font-size 22px
        vertical-align -3px
      .create
        border 1px solid #b3b1b2
        border-radius 5px
        height 55px
        line-height 55px
        cursor pointer
        padding-left 20px
        background rgba(241, 240, 240, 0.7)
        .newUser
          margin-left 10px
          color: #2061ae
        span
          color #838383
          font-size 20px
      .role-table
        margin-top 20px
        position relative
        width 100%
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .role-select
    .dropdown-menu
      max-height none
      overflow visible

  .tab-card
    .role-table
      .dataTables_wrapper
        position static
        text-align center
        line-height 30px

  .editInput
    input
      text-align center
</style>
