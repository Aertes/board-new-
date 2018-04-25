<template>
  <div class="overview-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color"></i>Digital Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="icon-box">
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
    <div class="table-box">
      <table id="OVTable" class="data-table" style="width:100%" v-if="OVTableData.length!=0">
        <thead>
        <tr>
          <th></th>
          <th></th>
          <th><div>KPI</div></th>
          <th>
            <div>Month</div>
          </th>
          <th>
            <div>Target</div>
          </th>
          <th></th>
          <th>
            <div>YTD</div>
          </th>
          <th>
            <div>Target</div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="12" style="background-color: #EEECE1; font-weight: bold">
              <div>B2C</div>
            </td>
            <td rowspan="4" style="background-color: #DAEEF3; font-weight: bold">
              <div>Campaign</div>
            </td>
            <td @click="tips('B2Ccam1')" class="B2Ccam1">
              <div class="floatL">Traffic to e-commerce</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[0].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[0].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[0].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[0].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[0].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[0].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[0].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[0].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[0].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[0].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[0].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[0].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccam2')" class="B2Ccam2">
              <div class="floatL">Traffic to .com.cn</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[1].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[1].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[1].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[1].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[1].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[1].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[1].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[1].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[1].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[1].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[1].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[1].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccam3')" class="B2Ccam3">
              <div class="floatL">Conversion rate </div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[2].month | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[2].target | percentile}}</div>
            </td>

            <td v-if="OVTableData[2].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[2].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[2].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[2].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[2].ytd | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[2].ytdTarget | percentile}}</div>
            </td>
            <td v-if="OVTableData[2].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[2].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[2].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[2].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccam4')" class="B2Ccam4">
              <div class="floatL">Cost per lead(¥)</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[3].month | round}}</div>
            </td>
            <td>
              <div>{{OVTableData[3].target | round}}</div>
            </td>

            <td v-if="OVTableData[3].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[3].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[3].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[3].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[3].ytd | round}}</div>
            </td>
            <td>
              <div>{{OVTableData[3].ytdTarget | round}}</div>
            </td>
            <td v-if="OVTableData[3].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[3].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[3].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[3].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>

          <tr>
            <td rowspan="4" style="background-color: #FFFFCC; font-weight: bold">
              <div>Philips.com.cn</div>
            </td>
            <td>
              <div class="floatL">Traffic(excluding campaign)(M)</div>
            </td>
            <td>
              <div>{{OVTableData[4].month}}</div>
            </td>
            <td>
              <div>{{OVTableData[4].target}}</div>
            </td>

            <td v-if="OVTableData[4].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[4].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[4].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[4].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[4].ytd}}</div>
            </td>
            <td>
              <div>{{OVTableData[4].ytdTarget}}</div>
            </td>
            <td v-if="OVTableData[4].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[4].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[4].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[4].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="floatL">conversion rate(excluding campaign)</div>
            </td>
            <td>
              <div>{{OVTableData[5].month | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[5].target | percentile}}</div>
            </td>

            <td v-if="OVTableData[5].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[5].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[5].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[5].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[5].ytd | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[5].ytdTarget | percentile}}</div>
            </td>
            <td v-if="OVTableData[5].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[5].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[5].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[5].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccom1')" class="B2Ccom1">
              <div class="floatL">UGCR</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[6].month | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[6].target | percentile}}</div>
            </td>

            <td v-if="OVTableData[6].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[6].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[6].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[6].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[6].ytd | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[6].ytdTarget | percentile}}</div>
            </td>
            <td v-if="OVTableData[6].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[6].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[6].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[6].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccom2')" class="B2Ccom2">
              <div class="floatL">Bounce rate</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[7].month | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[7].target | percentile}}</div>
            </td>

            <td v-if="OVTableData[7].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[7].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[7].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[7].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[7].ytd | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[7].ytdTarget | percentile}}</div>
            </td>
            <td v-if="OVTableData[7].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[7].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[7].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[7].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #D8E4BC; font-weight: bold">
              <div>Review & rating</div>
            </td>
            <td @click="tips('B2CRR')" class="B2CRR">
              <div class="floatL">Rating</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[8].month | roundTow}}</div>
            </td>
            <td>
              <div>{{OVTableData[8].target | roundTow}}</div>
            </td>

            <td v-if="OVTableData[8].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[8].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[8].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[8].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[8].ytd | roundTow}}</div>
            </td>
            <td>
              <div>{{OVTableData[8].ytdTarget | roundTow}}</div>
            </td>
            <td v-if="OVTableData[8].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[8].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[8].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[8].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>

          <tr>
            <td rowspan="3" style="background-color: #E4DFEC; font-weight: bold">
              <div>CRM</div>
            </td>
            <td @click="tips('B2Ccrm1')" class="B2Ccrm1">
              <div class="floatL">New registration(k)</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[9].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[9].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[9].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[9].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[9].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[9].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[9].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[9].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[9].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[9].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[9].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[9].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccrm2')" class="B2Ccrm2">
              <div class="floatL">Engagement%</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[10].month | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[10].target | percentile}}</div>
            </td>

            <td v-if="OVTableData[10].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[10].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[10].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[10].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[10].ytd | percentile}}</div>
            </td>
            <td>
              <div>{{OVTableData[10].ytdTarget | percentile}}</div>
            </td>
            <td v-if="OVTableData[10].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[10].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[10].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[10].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Ccrm3')" class="B2Ccrm3">
              <div class="floatL">CRM sales(M)(¥)</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[11].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[11].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[11].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[11].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[11].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[11].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[11].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[11].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[11].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[11].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[11].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[11].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>

          <tr>
            <td rowspan="12" style="background-color: #FFF; font-weight: bold">
              <div>B2B</div>
            </td>
            <td rowspan="4" style="background-color: #FFFFCC; font-weight: bold">
              <div>Philips.com.cn</div>
            </td>
            <td @click="tips('B2Bcom1')" class="B2Bcom1">
              <div class="floatL">Total SQL</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[12].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[12].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[12].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[12].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[12].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[12].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[12].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[12].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[12].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[12].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[12].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[12].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td @click="tips('B2Bcom2')" class="B2Bcom2">
              <div class="floatL">Total MQL</div>
              <svg-icon sign="icon-gantanhao" class="gantanhao-icon icon-tanhao"></svg-icon>
            </td>
            <td>
              <div>{{OVTableData[13].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[13].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[13].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[13].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[13].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[13].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[13].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[13].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[13].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[13].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[13].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[13].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="floatL">UGCR</div>
            </td>
            <td>
              <div>{{OVTableData[14].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[14].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[14].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[14].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[14].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[14].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[14].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[14].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[14].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[14].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[14].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[14].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="floatL">Total Web Traffic(K)</div>
            </td>
            <td>
              <div>{{OVTableData[15].month | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[15].target | formatThousands}}</div>
            </td>

            <td v-if="OVTableData[15].mT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[15].mT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[15].mT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[15].mT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
            </td>
            <td>
              <div>{{OVTableData[15].ytd | formatThousands}}</div>
            </td>
            <td>
              <div>{{OVTableData[15].ytdTarget | formatThousands}}</div>
            </td>
            <td v-if="OVTableData[15].yT==1" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #CECECE"></div>
            </td>
            <td v-else-if="OVTableData[15].yT==2" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #68A490"></div>
            </td>
            <td v-else-if="OVTableData[15].yT==3" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #F3C883"></div>
            </td>
            <td v-else="OVTableData[15].yT==4" width="50">
              <div style="width: 15px;height: 15px;border-radius: 50%;background-color: #D65532"></div>
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
  const OV_SEARCH = xhrUrls.OV_SEARCH;
  export default {
    name: "overview",
    data() {
      return {
        OVTableData: [],
        searchDataOV: {
          month: '',
        },
        url: '',
        isQrShow: false,
        locationHash: false
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

      if (!this.locationHash) {
        this.getOverViewtableData()
      }else{
        this.getUrl()
      }

    },
    updated() {
      this.locationHash = false
    },
    methods:{

      getOverViewtableData() {
        this.searchDataOV.month = this.getYearMonth
        post(OV_SEARCH, this.searchDataOV).then(res => {
          let data = res.data
          if (data.code == 200) {
            this.OVTableData = data.data
          } else {
            console.log(data.errMsg)
          }
        }).catch(err => console.log(err))
      },

      copyURL() {
        this.url = `${window.location}?yearMonth=${this.getYearMonth}`;
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
        this.url = `${window.location}?yearMonth=${this.getYearMonth}`;
        this.isQrShow = true
      },

      qrcodeHide() {
        this.isQrShow = false
      },

      tips(id) {
        let tipsVal = ''
        switch (id) {
          case 'B2Ccam1':
            tipsVal = 'The amount of visitors and visits JD/Tmall and other EC website receives.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccam2':
            tipsVal = 'The amount of visitors and visits .com.cn site receives.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccam3':
            tipsVal = 'the value of the conversion points used on the Philips digital platform.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccam4':
            tipsVal = 'Online advertising payment model in which payment is based on the number of qualifying leads generated.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccom1':
            tipsVal = 'User goal complete rate. It is about Consumer survey bounced upon Philips website when viewing it.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccom2':
            tipsVal = 'The bounce rate is the percentage of visits with only 1 page view.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2CRR':
            tipsVal = 'The product rating provided from EC website by consumers.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccrm1':
            tipsVal = 'For Mobile registration, this figure indicates the number of members registered with mobile phone number mainly via CRM microsite, plus call center and ASC; For WeChat followers, this figure indicates the number of members following Philips WeChat account.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccrm2':
            tipsVal = 'For engagement rate, measure the how much users were actively interacting with us.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Ccrm3':
            tipsVal = 'The sales on FSS.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Bcom1':
            tipsVal = 'Sales qualified leads.'
            this.tipsContent(tipsVal, id)
            break
          case 'B2Bcom2':
            tipsVal = 'MKT qualified leads.'
            this.tipsContent(tipsVal, id)
            break
          default:
            break
        }
      },

      tipsContent(tipsVal, id) {
        layer.tips(tipsVal, '.' + id, {
          tips: [2, '#FFF2CC'],
          skin: 'fontColorBg',
        });
      },

      getUrl(){
        if(getHashString('yearMonth')==this.getYearMonth){
          this.getOverViewtableData()
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
        return (Number(params) * 100).toFixed(0) + '%'
      },
      round: (params) => {
        if (!params) return 0
        return params.toFixed(0)
      },
      roundTow: (params) => {
        if (!params) return 0
        return params.toFixed(2)
      }
    },
    watch:{
      getYearMonth() {
        this.getOverViewtableData()
      }
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
      background #B4B4B4
      th
        padding 10px 0
        border 1px solid #B3B3B3
        cursor pointer
        color #fff
        font-weight normal
        font-style italic
        white-space pre-wrap
        word-wrap break-word
        &:nth-child(1)
          width 60px
        &:nth-child(2)
          width 130px
        &:nth-child(3)
          width 300px
        &:nth-child(6),&:nth-child(9)
          width 60px
  tbody
    tr
      &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4)
        td
          background-color #DAEEF3
      &:nth-child(5),&:nth-child(6),&:nth-child(7),&:nth-child(8)
        td
          background-color #FFFFCC
      &:nth-child(9)
        td
          background-color #D8E4BC
      &:nth-child(10),&:nth-child(11),&:nth-child(12)
        td
          background-color #E4DFEC
      &:nth-child(13),&:nth-child(14),&:nth-child(15),&:nth-child(16)
        td
          background-color #FFFFCC
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
        position relative
        .floatL
          float left
          padding-left 10px
        .icon-tanhao
          position absolute
          right 10px
          top 50%
          transform translateY(-50%)
        .gantanhao-icon
          color #C0D2E4
          font-size 20px
          cursor pointer
      .hidden
        display none

  @media screen and (max-width: 1235px) and (-webkit-min-device-pixel-ratio: 2) , (min-device-pixel-ratio: 2) , (-webkit-min-device-pixel-ratio: 2.75) , (min-device-pixel-ratio: 2.75) , (-webkit-min-device-pixel-ratio: 3) , (min-device-pixel-ratio: 3)
    .data-table
      tr
        td
        th
          &:nth-child(1)
            width 40px!important
          &:nth-child(2)
            width 130px!important
          &:nth-child(3)
            width 280px!important
          padding 0 !important
          .icon-tanhao
            font-size 12px!important
          &:nth-child(6),&:nth-child(9)
            width 30px!important
          div
            transform scale(.7)!important
        &:nth-child(1),&:nth-child(5),&:nth-child(9),&:nth-child(13)
          td
            &:nth-child(3)
              div
                transform-origin 25px
        &:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(6),&:nth-child(7),&:nth-child(8),&:nth-child(11),&:nth-child(12),&:nth-child(14),&:nth-child(15),&:nth-child(16)
          td
            &:nth-child(1)
              div
                transform-origin 25px
        &:nth-child(10),&:nth-child(5)
          td
            &:nth-child(2)
              div
                transform-origin 25px
    .tool-box
      display none
</style>

