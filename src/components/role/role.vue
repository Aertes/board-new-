<template>

  <div class="role-wrap">

    <span id="roleDel" hidden><span @click="roleDel"><svg-icon sign="icon-trash"></svg-icon></span></span>
    <span id="roleEdit" hidden><svg-icon sign="icon-edit"></svg-icon></span>
    <span id="roleView" hidden><svg-icon sign="icon-chakan01"></svg-icon></span>
    <span id="roleDisable" hidden><svg-icon sign="icon-jinyong"></svg-icon></span>

    <div action="" class="clearfix search-wrap">
      <div class="search">
        <label for="roleName">Role Name</label>
        <input id="roleName" type="text" placeholder="Role Name" v-model="roleName">
      </div>
      <div class="search">
        <label>Status</label>
        <selection :selections="selectStatusOptions" class="role-select" ref="roleSelect"></selection>
      </div>
      <span @click="roleSearch"><svg-icon sign="icon-search" class="searchIcon"></svg-icon></span>
    </div>

    <div class="tables">
      <div class="create" @click="openRoleEdit">
        <svg-icon sign="icon-tianjia" class="user-create"></svg-icon>
        <span class="newUser">New role</span>
      </div>
      <div class="role-table clearfix">
        <table id="roleTable" class="display" style="width:100%" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th>Role Name</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'

  let ROLE_SEARCH = xhrUrls.ROLE_SEARCH
  let ROLE_DELETE = xhrUrls.ROLE_DELETE
  let ROLE_DISABLE = xhrUrls.ROLE_DISABLE
  let ROLE_ENABLE = xhrUrls.ROLE_ENABLE
  let ROLE_TREE = xhrUrls.ROLE_TREE
  let ROLE_GETROLE = xhrUrls.ROLE_GETROLE
  let ROLE_SAVE = xhrUrls.ROLE_SAVE
  let ROLE_UPDATE = xhrUrls.ROLE_UPDATE

  export default {
    name: "role",
    data() {
      return {
        selectStatusOptions: ['ALL PRODUCTS', 'Enable', 'Disable'],
        tableData: '',
        roleData: {
          search: {
            "name": '',
            "status": ''
          }
        },
        roleName: '',
      }
    },
    mounted() {

      this.getTaleData()

      this.roleDel()

      this.roleDisable()

      this.roleEnable()

      this.roleEdit()

      this.roleView()

    },
    activated(){
      try{
        this.getTaleData()
      }catch (e){}
    },
    methods: {

      getTaleData(name, status) {
        this.roleData.search.name = name
        this.roleData.search.status = status
        post(ROLE_SEARCH, this.roleData.search)
          .then(res => {
            let data = res.data.data.data
            this.tableData = data
          })
      },

      getRoleTable() {
        $('#roleTable').DataTable({
          searching: false,
          lengthChange: false,
          autoWidth: false,
          info: false,
          bDestroy: true,
          ordering: false,
          pagingType: "simple_numbers",
          pageLength: 6,
          "paging": this.tableData.length > 6 ? true : false,
          data: this.tableData,
          columns: [
            {
              data: 'name',
              render: (data, type, row) => {
                return '<div>' + data + '</div>';
              }
            },
            {
              data: 'status',
              render: (data, type, row) => {
                if (data == 1) {
                  return '<div">Enable</div>';
                } else {
                  return '<div>Disable</div>';
                }
              }
            },
            {
              data: null,
              render: (data, type, row) => {
                let operColor = ''
                let operClassName = ''
                let operTitle = ''
                if (row.status != 1) {
                  operColor = '#D7D7D7'
                  operClassName = 'roleEnable'
                  operTitle = 'Enable'
                } else {
                  operColor = '#74A5D4'
                  operClassName = 'roleDisable'
                  operTitle = 'Disable'
                }
                return '<div style="text-align: center;">' +
                  '<a title="View" style="color:#74A5D4; font-size:18px; cursor: pointer" class="roleView" data-id="' + row.id + '">' + $("#roleView").html() + '</a>' +
                  '<a title="Edit" style="color:#87B562; font-size:18px; cursor: pointer;margin-left: 11px" class="roleEdit" data-id="' + row.id + '">' + $("#roleEdit").html() + '</a>' +
                  '<a title="Delete" style="color:#DE8B7A; font-size:18px; cursor: pointer;;margin-left: 10px" class="roleDel" data-id="' + row.id + '">' + $("#roleDel").html() + '</a>' +
                  '<a title="'+ operTitle +'" style="color:'+ operColor +'; font-size:18px; cursor: pointer;;margin-left: 10px" class="'+ operClassName +'" data-id="' + row.id + '">' + $("#roleDisable").html() + '</a>'
                '</div>';
              }
            }
          ]
        })
      },

      roleSearch() {

        let index = this.$refs.roleSelect.nowIndex

        let status = this.$refs.roleSelect.selections[index]

        if (status == 'ALL PRODUCTS') {
          status = ''
        } else if (status == 'Enable') {
          status = '1'
        } else if (status == 'Disable') {
          status = '0'
        }

        this.getTaleData(this.roleName, status)

      },

      roleDel() {
        let that = this
        $(document).off('click', '.roleDel').on('click', '.roleDel', function () {
          let id = $(this).data('id')
          layer.confirm('Do you delete this Role?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(`${ROLE_DELETE}${id}`).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Successfully Deleted!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.getTaleData()
                })
              } else {
                layer.confirm(res.data.errMsg, {
                  title: 'Prompt information',
                  btn: ['Cancel'],
                })
              }
            })
          })
        })
      },

      roleEnable(){
        let that = this
        $(document).off('click', '.roleEnable').on('click', '.roleEnable', function () {
          let id = $(this).data('id')
          layer.confirm('Do you enable this Role?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(`${ROLE_ENABLE}${id}`).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Successfully Enable!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.getTaleData()
                })
              } else {
                layer.confirm(res.data.errMsg, {
                  title: 'Prompt information',
                  btn: ['Cancel'],
                })
              }
            })
          })
        })
      },

      roleDisable() {
        let that = this
        $(document).off('click', '.roleDisable').on('click', '.roleDisable', function () {
          let id = $(this).data('id')
          layer.confirm('Do you disable this Role?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(`${ROLE_DISABLE}${id}`).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Successfully Enable!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.getTaleData()
                })
              } else {
                layer.confirm(res.data.errMsg, {
                  title: 'Prompt information',
                  btn: ['Cancel'],
                })
              }
            })
          })
        })
      },

      roleEdit(){
        let that = this
        $(document).off('click', '.roleEdit').on('click', '.roleEdit', function () {
          let id = $(this).data('id')
          let name = $(this).data('name')
          let permissionlist = $(this).data('permissionlist')
          let status = $(this).data('status')
          that.$emit('toRoleEdit',{
            id:id
          })
        })
      },

      roleView(){
        let that = this
        $(document).off('click', '.roleView').on('click', '.roleView', function () {
          let id = $(this).data('id')
          let name = $(this).data('name')
          let permissionlist = $(this).data('permissionlist')
          let status = $(this).data('status')
          that.roleId = id
          that.$emit('roleView',{
            id:id
          })
        })
      },

      openRoleEdit(){
        this.$emit('openRoleEdit')
      }

    },
    watch: {
      tableData() {
        this.$nextTick(() => {
          this.getRoleTable()
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "../../assets/style/mixin.styl"
  .role-wrap
    .search-wrap
      width 100%
    .search
      float left
      .dropdown-wrap
        display inline-block
        height 40px
        line-height 40px
        .dropdown-show
          height 40px
          line-height 40px
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
      margin-left 30px
      margin-top 7px
      cursor pointer
    .tables
      width 100%
      margin-top 30px
      .user-create
        color #fff
        font-size 22px
        e-pos(top:50%, y:-50%)
      .create
        border 1px solid #1f61ae
        border-radius 5px 5px 0 0
        height 55px
        line-height 55px
        cursor pointer
        padding-left 20px
        background #1f61ae
        position relative
        .newUser
          margin-left 35px
          color #fff
          line-height 55px
          display inline-block
          position absolute;
          margin-top -3px
        span
          color #fff
          font-size 20px
      .role-table
        // margin-top 20px
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

</style>
