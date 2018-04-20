<template>
  <div class="roleEdit-wrap">
    <div action="" class="clearfix search-wrap">
      <div class="search">
        <label for="roleName">Role Name <span style="color: red">*</span></label>
        <input id="roleName" type="text" placeholder="Please enter a character name" v-model="roleName"
               ref="roleNameInput" :disabled="viewRole" :class="{helpStyle:helpOne}" @change="checkName">
        <span class="help" :class="{none:!helpOne}">Role name is empty!</span>
      </div>
      <div class="search">
        <label>Status</label>
        <selection :selections="selectStatusOptions" class="role-select" ref="roleSelect" :perm="viewRole"></selection>
      </div>
      <div class="search">
        <label>Role Permission <span style="color:red;">*</span></label>
        <div class="role-tree" :class="{helpStyle:helpTwo}">
          <p class="title">Authority Structure</p>
          <div class="role-tree-cont">
            <ul class="ztreeDome ztree" id="roleZtree">
            </ul>
          </div>
        </div>
        <span class="help" :class="{none:!helpTwo}">Role permission is empty!</span>
      </div>
      <div class="search role-tree-wrap">
        <label></label>
        <div class="button-wrap">
          <button class="box-shadow save-button" :hidden="viewRole || !isSave" @click="saveRole">Save</button>
          <button class="box-shadow save-button" :hidden="viewRole || isSave" @click="saveRole">Update</button>
          <button class="box-shadow cancel-button" :hidden="viewRole" @click="goBack">Cancel</button>
          <button class="box-shadow back-button" :hidden="!viewRole" @click="goBack">Back</button>
        </div>
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
    name: "roleEdit",
    data() {
      return {
        selectStatusOptions: ['Enable', 'Disable'],
        tableData: '',
        ztreeNodeData: [],
        nodeSetting: {
          check: {
            enable: this.viewRole,
            chkboxType: {"Y": "ps", "N": "ps"}
          },
          data: {
            simpleData: {
              enable: true,
              pIdKey: "parentId"
            }
          }
        },
        roleName: '',
        treeId: [],
        helpOne: false,
        helpTwo: false
      }
    },
    props: ['toRoleEditId', 'viewRole', 'isSave'],
    mounted() {
      this.helpOne = false
      this.helpTwo = false
    },
    activated() {
      try {
        this.helpOne = false
        this.helpTwo = false
        if (this.toRoleEditId == '') {
          this.getTreeData()
        } else {
          this.getRoleEdit()
        }
      } catch (e) {
      }
    },
    methods: {
      getRoleEdit() {
        this.ztreeNodeData = [];
        get(`${ROLE_GETROLE}${this.toRoleEditId}`).then(res => {
          let nodeData = res.data.nodes
          let roleData = res.data.role
          this.roleName = roleData.name
          if (roleData.status == 1) {
            this.$refs.roleSelect.nowIndex = 0
          } else {
            this.$refs.roleSelect.nowIndex = 1
          }
          nodeData.forEach((v, i) => {
            this.ztreeNodeData.push({
              name: v.name,
              id: v.id,
              parentId: v.parentId,
              checked: (v.checked == 'TRUE' ? true : false)
            })
          })
          this.nodeSetting.check.enable = !this.viewRole
          $.fn.zTree.init($("#roleZtree"), this.nodeSetting, this.ztreeNodeData).expandAll(true);
        }).catch(err => console.log(err))
      },
      getTreeData() {
        this.ztreeNodeData = []
        post(ROLE_TREE, {}).then(res => {
          let nodeData = res.data.resultList
          this.roleName = ''
          this.$refs.roleSelect.nowIndex = 0
          nodeData.forEach((v, i) => {
            this.ztreeNodeData.push({name: v.name, id: v.id, parentId: v.parentId})
          })
          this.nodeSetting.check.enable = true
          $.fn.zTree.init($("#roleZtree"), this.nodeSetting, this.ztreeNodeData).expandAll(true);
        }).catch(err => console.log(err))
      },
      goBack() {
        this.$emit('closeRoleEdit')
      },
      checkName(){
        if(this.roleName != '') this.helpOne = false;
      },
      treeNodes() {
        let that = this
        let treeObj = $.fn.zTree.getZTreeObj("roleZtree")
        let status = this.$refs.roleSelect.nowIndex
        let nodes = treeObj.getCheckedNodes(true)
        this.treeId = []
        $.each(nodes, function (i) {
          if (i == 0) {
            that.treeId = nodes[i].id;
          } else {
            that.treeId += "," + nodes[i].id + "";
          }
        });
      },
      saveRole() {
        let that = this
        this.treeNodes()
        this.helpOne = false
        this.helpTwo = false
        if (this.treeId == '' && this.roleName == '') {
          this.helpOne = true
          this.helpTwo = true
        }else if (this.roleName == '') {
          this.helpOne = true
        }else if (this.treeId == '') {
          this.helpTwo = true
        }else{
          if (this.isSave) {
            post(ROLE_SAVE, {
              "name": this.roleName,
              "permissions": this.treeId,
              "status": status
            }).then(res => {
              if (res.data.code == 200) {
                layer.msg('Save Success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                  that.goBack()
                })
              } else {
                layer.msg(res.data.errMsg, {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            })
          } else {
            post(ROLE_UPDATE, {
              "name": this.roleName,
              "permissions": this.treeId,
              "status": status,
              "id": this.toRoleEditId
            }).then(res => {
              if (res.data.code == 200) {
                layer.msg('Update success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                  that.goBack()
                })
              } else {
                layer.msg(res.data.errMsg, {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .roleEdit-wrap
    .search-wrap
      width 100%
    .search
      margin-bottom 20px
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
        width 35%
        text-align right
      input, select
        margin-right 10px
        appearance none
        border 1px solid #E2DFDE
        border-radius 5px
        width 400px
        height 40px
        line-height 40px
        padding 0 10px
        font-size 21px
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

    .role-tree-wrap
      margin-bottom 0
    .role-tree
      display inline-block
      border 1px solid #ECECEC
      width 400px
      height 345px
      vertical-align top
      margin-right 10px
      margin-bottom 0
      overflow hidden
      .title
        background-color #528FBA
        color #fff
        text-align center
        font-size 16px
        line-height 40px
      .role-tree-cont
        padding-top 10px
        padding-left 10px
        height 305px
        overflow auto
    .button-wrap
      display inline-block
      width 400px
      text-align center
      vertical-align top
      .save-button
      .back-button
      .cancel-button
        width 100px
        height 35px
        margin 0 20px
        background-color #74A5D4
        border-radius 10px
        color #fff
        border medium
        outline none
        cursor pointer
      .cancel-button
        background-color #FFA500
      .back-button
        background-color #00AEEA

  .help
    display inline-block
    color red
    font-size 21px
    line-height 40px
    vertical-align top

  .helpStyle
    border 1px solid #e78b70 !important
</style>
