<template>
  <div class="app-main-wrap" style="margin-left:0;">
    <div class="userbox">
      <div class="tab">
        <ul class="clearfix">
          <li v-for="(tab, index) in tabsName" :class="{active:tab.isActive}">
            <a href="javascript:;" class="tab-link" @click="tabsSwitch(index)">{{tab.name}}</a>
          </li>
        </ul>
      </div>
      <div class="cards clearfix">
        <div class="tab-card" style="display: block;">
          <div class="content">
            <form action="" class="clearfix">
              <div class="search">
                <label for="">User Name</label>
                <input type="text" v-model="searchData.name" placeholder="User Name">
              </div>
              <div class="search">
                <label for="">Account ID</label>
                <input type="text" v-model="searchData.username" placeholder="Account ID">
              </div>
              <div class="search">
                <label for="">Status</label>
                <selection :selections="selectStatusOptions" class="setting" @selectShow="selectStatus"></selection>
              </div>
              <div @click="searchUser">
                <svg-icon sign="icon-search" class="searchIcon"></svg-icon>
              </div>
            </form>
            <div class="user-content clearfix">
              <div class="ztreebox">
                <h4>Department structure</h4>
                <ul class="ztreeDome ztree" id="userZtree">

                </ul>
              </div>
              <div class="tables">
                <div class="create" @click="showCreate">
                  <svg-icon sign="icon-tianjia" class="user-create"></svg-icon>
                  <span class="newUser">New user</span>
                </div>
                <div class="user-table clearfix">
                  <table id="userTable" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Account ID</th>
                      <th>Status</th>
                      <th>Operation</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </div>
              <span id="deluser" hidden>
                <svg-icon sign="icon-trash"></svg-icon>
              </span>
              <span id="edituser" hidden>
                <svg-icon sign="icon-edit"></svg-icon>
              </span>
              <span id="viewuser" hidden>
                <svg-icon sign="icon-chakan01"></svg-icon>
              </span>
              <span id="userDisable" hidden>
                <svg-icon sign="icon-jinyong"></svg-icon>
              </span>
            </div>
          </div>
        </div>
        <div class="tab-card">
          <keep-alive>
            <role-edit v-if="roleEdit" @closeRoleEdit="switchRoleEdit" :toRoleEditId="toRoleEditId" :viewRole="viewRole"
                       :isSave="isSave"></role-edit>
            <role v-else @openRoleEdit="switchRoleEdit" @toRoleEdit="toRoleEdit" @roleView="roleView"></role>
          </keep-alive>
        </div>
        <div class="tab-card">
          <target></target>
        </div>
      </div>
    </div>

    <div class="tables-wrap" id="user" v-show="isShow">
      <div class="tables-title">
        <span class="titles">CREATE USER</span>
        <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
      </div>
      <form action="" autocomplete="off">
        <div class="resg">
          <div>
            <label>User Name</label>
            <label class="userName" v-model="userinfo.name" v-show="!isViewUser">{{userinfo.name}}</label>
            <input type="text" v-show="isViewUser" class="input" name="username" @change="onInput"
                   :class="[isActive.isUserActive? 'active' : '']" v-model="userData.name">
          </div>
          <div v-show="isViewUser">
            <label>Password</label>
            <input type="password" class="input" name="password" @change="onInput"
                   :class="[isActive.isPwdActive? 'active' : '']" minlength="6" v-model="userData.password">
          </div>
          <div v-show="isViewUser">
            <label>Repeated Password</label>
            <input type="password" class="input" name="surePassword" @change="onInput"
                   :class="[isActive.isSurePwdActive? 'active' : '']" minlength="6"
                   v-model="userData.surePassword">
          </div>
          <div>
            <label>Account ID</label>
            <label v-show="!isViewUser">{{userinfo.username}}</label>
            <input type="text" v-show="isViewUser" :disabled='isUpdata' class="input" name="loginAccount"
                   @change="onInput"
                   :class="[isActive.isLogAccActive? 'active' : '']" v-model="userData.username">
          </div>
          <div>
            <label>Department</label>
            <label v-show="!isViewUser">{{userinfo.org}}</label>
            <selection ref='user' v-show="isViewUser"  :selections="selectOrgOptions" :selectionsId='selectOrgOptionsId'
                       @selectShow="selectUserHandle" class="user-select"></selection>
          </div>
          <div>
            <label>System Role</label>
            <label v-show="!isViewUser">{{userinfo.role}}</label>
            <selection ref='role' v-show="isViewUser" :selections="selectRoleOptions" :selectionsId="selectRoleOptionsId"
                       @selectShow="selectRoleHandle" class="user-select" :perm="isDisable"></selection>
          </div>
          <div>
            <label>Account Status</label>
            <div class="radio" v-show="!isViewUser">
              <label for="status1" v-show="userinfo.status == 1">
                Enable
              </label>
              <label for="status2" v-show="userinfo.status == 0">
                Disable
              </label>
            </div>
            <div class="radio" v-show="isViewUser">
              <label for="status1">
                <input type="radio" id="status1" name="newPassword" value="1" :checked=true v-model="userData.status">
                Enable
              </label>
              <label for="status2">
                <input type="radio" id="status2" name="newPassword" value="0" v-model="userData.status">
                Disable
              </label>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <button type="button" v-show="isViewUser" class="confirm" @click="submit">Submit</button>
          <button type="button" class="cancel" @click="closeLayerButton">Cancel</button>
        </div>
      </form>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import {getSessionItem} from "../../assets/config/storage.js"
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post} from '../../assets/config/http'
  import Role from '../../components/role/role'
  import RoleEdit from '../../components/role/edit'
  import Target from '../../components/target/tartget'

  let layerId2;
  const USER_SEARCH = xhrUrls.USER_SEARCH

  export default {
    name: "setting",
    data() {
      return {
        isShow: false,
        isViewUser: false,
        isDisable: false,
        userinfo: {
          name: '',
          username: '',
          org: '',
          role: '',
          status: '',
        },
        searchData: {
          name: '',
          username: '',
          status: '',
          orgid: '',
          start: 0,
          length: 100000,
        },
        tableData: '',
        active: false,
        selectedStatus: '',
        selectStatusOptions: ['All Status', 'Enable', 'Disable'],
        tabsName: [
          {
            name: 'USER',
            isActive: true
          },
          {
            name: 'ROLE',
            isActive: false
          },
          {
            name: 'TARGET',
            isActive: false
          }
        ],
        userData: {
          name: '',
          password: '',
          surePassword: '',
          username: '',
          status: 1,
          orgid: '',
          roleIds: '',
          id: ''
        },
        isEdit: true,
        isUpdata: false,
        selectedRole: '',
        selectedOrg: '',
        selectRoleOptions: [],
        selectOrgOptions: [],
        selectRoleOptionsId: [],
        selectOrgOptionsId: [],
        isActive: {
          isUserActive: false,
          isPwdActive: false,
          isSurePwdActive: false,
          isLogAccActive: false,
        },
        ztreeNodeData: [],
        nodeSetting: {
          view: {
            showIcon: true,
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom
          },
          data: {
            simpleData: {
              enable: true,
              pIdKey: "parentId"
            }
          },
          edit: {
            enable: true
          },
          callback: {
            onClick: this.getOrgId,
            onRename: this.onRename,
            beforeRename: this.beforeRename,
            beforeRemove: this.beforeRemove,
          }
        },
        roleEdit: false,
        toRoleEditId: '',
        viewRole: false,
        isSave: true,
        zTreeObj: '',
        oldName:''
      }
    },
    mounted() {
      const USERINFO = JSON.parse(getSessionItem('USERINFO'))
      if(!USERINFO) this.$router.push({name:'coverpage'})
      this.removeUser();
      this.userEnable();
      this.userDisable();
      this._initZtree();
      this.getTaleData();
      this.viewUserClick();
      this.editUserClick();
    },
    activated() {
      try {
        this.removeStyleNode()
      } catch (e) {
      }
    },
    methods: {
      tabsSwitch(tabIndex) {
        this.tabsSwitchRoleEdit()
        this.searchData.name = ''
        this.searchData.username = ''
        this.searchData.status = ''
        this.searchData.orgid = ''
        this.removeStyleNode();
        this.getTaleData(this.searchData.name, this.searchData.username, this.searchData.status, this.searchData.orgid)
        let tabCardCollection = document.querySelectorAll('.tab-card'),
          len = tabCardCollection.length;
        for (let i = 0; i < len; i++) {
          tabCardCollection[i].style.display = 'none';
          this.tabsName[i].isActive = false;
        }
        this.tabsName[tabIndex].isActive = true;
        tabCardCollection[tabIndex].style.display = "block";
      },

      getTaleData(name, accountId, status, orgId) {
        this.searchData.name = name
        this.searchData.username = accountId
        this.searchData.status = status
        this.searchData.orgid = orgId
        post(USER_SEARCH, this.searchData)
          .then(res => {
            let data = res.data.data.data
            this.tableData = data
          })
      },

      userTable() {
        var that = this;
        $("#userTable").DataTable({
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
          columns: [{
            data: "name",
            render: function (data, type, row) {
              return '<div style="text-align: center; font-weight: 400;">' + data + '</div>';
            }
          },
            {
              data: "username",
              render: function (data, type, row) {
                return '<div style="text-align: center;">' + data + '</div>';
              }
            },
            {
              data: "status",
              render: function (data, type, row) {
                if (data == 1) {
                  return '<div style="text-align: center;">Enable</div>';
                } else {
                  return '<div style="text-align: center;">Disable</div>';
                }
              }
            },
            {
              data: null,
              render: function (data, type, row) {
                let operColor = ''
                let operClassName = ''
                let operTitle = ''
                let html = ''
                if (row.status != 1) {
                  operColor = '#D7D7D7'
                  operClassName = 'userEnable'
                  operTitle = 'Enable'
                } else {
                  operColor = '#1f61ae'
                  operClassName = 'userDisable'
                  operTitle = 'Disable'
                }
                if (row.id != 1) {
                  html += '<a title="DELETE" style="color:red; font-size:18px; cursor: pointer;;margin-left: 10px" class="removeUser" data-id="' + row.id + '">' + $("#deluser").html() + '</a>'
                  html += '<a title="' + operTitle + '" style="color:' + operColor + '; font-size:18px; cursor: pointer;;margin-left: 10px" class="' + operClassName + '" data-id="' + row.id + '">' + $("#userDisable").html() + '</a>'
                }
                return '<div style="text-align: center;">' +
                  '<a title="VIEW" style="color:#1f61ae; font-size:18px; cursor: pointer" class="viewUser" data-id="' + row.id + '">' + $("#viewuser").html() + '</a>' +
                  '<a title="EDIT" style="color: green; font-size:18px; cursor: pointer;margin-left: 10px" class="editUser" data-id="' + row.id + '">' + $("#edituser").html() + '</a>'
                  + html +
                  '</div>';
              }
            }
          ]

        });
      },
      //ztree
      _initZtree() {
        get(xhrUrls.USER_ORG_ZTREE).then(res => {
          let nodeData = res.data.data
          nodeData.forEach((v, i) => {
            this.ztreeNodeData.push({name: v.name, id: v.id, parentId: v.parentId, textName: v.name})
          })
          this.zTreeObj = $.fn.zTree.init($("#userZtree"), this.nodeSetting, this.ztreeNodeData);
          this.zTreeObj.expandAll(true);
        }).catch(err => console.log(err))
      },

      //修改名称
      onRename(event, treeId, treeNode) {
        event.stopImmediatePropagation();
        let Obj = $.fn.zTree.getZTreeObj("userZtree");
        if(this.oldName == treeNode.name || treeNode.name == ''){
          treeNode.name = this.oldName
          Obj.updateNode(treeNode)
          return false
        }else{
          post(xhrUrls.ORG_UPDATE, {name: treeNode.name, id: treeNode.id}).then(res => {
            if (res.data.code == 200) {
              layer.msg('Edit success!', {
                time: 2000,
                skin: 'fontColor'
              })
            } else {
              layer.msg('Edit failure!', {
                time: 2000,
                skin: 'fontColor'
              })
            }
          }).catch(err => console.log(err))
        }

      },

      beforeRename(event, treeId, treeNode){
        debugger
        this.oldName = treeId.name;
      },

      //删除org
      beforeRemove(treeId, treeNode) {
        let id = treeNode.id;
        layer.confirm('Do you want to delete this dept?', {
          title: 'Prompt information',
          btn: ['Confirm', 'Cancel'],
        }, function (index) {
          layer.close(index);
          get(xhrUrls.ORG_DEL + '/' + id).then((res) => {
            if (res.data.code == 200) {
              var treeObj = $.fn.zTree.getZTreeObj(treeId);
              treeObj.removeNode(treeNode);
              layer.msg('Delete success!', {
                time: 2000,
                skin: 'fontColor'
              })
            } else {
              layer.msg(res.data.errMsg, {
                time: 2000,
                skin: 'fontColor'
              })
            }
          }, function (index) {
            layer.close(index);
          })
        }, function (index) {
          layer.close(index);
        })
        return false
      },

      // 增加节点
      addHoverDom(treeId, treeNode) {
        let that = this
        if (treeNode.level == 0) {
          var sObj = $("#" + treeNode.tId + "_span");
          $('.remove').hide();
          if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
          var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='New' onfocus='this.blur();'></span>";
          sObj.after(addStr);
          var btn = $("#addBtn_" + treeNode.tId);
          if (btn) btn.bind("click", function () {
            var zTree = $.fn.zTree.getZTreeObj("userZtree");
            post(xhrUrls.ORG_SAVE, {name: "New dept", status: 1, parentId: treeNode.id}).then(res => {
              if (res.data.code == 200) {
                layer.msg('Add success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
                zTree.addNodes(treeNode, {id: res.data.data.id, pId: treeNode.id, name: "New dept"});
              } else {
                layer.msg('Add failure!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            }).catch(err => console.log(err))
            return false;
          });
        }
      },
      removeHoverDom(treeId, treeNode) {
        $("#addBtn_" + treeNode.tId).unbind().remove();
      },

      //ztreeClick
      getOrgId(event, treeId, treeNode) {
        this.userData.orgid = treeNode.id;
        if (treeNode.id == 1) {
          this.searchData.orgid = ''
        } else {
          this.searchData.orgid = treeNode.id
        }
        this.getTaleData(this.searchData.name, this.searchData.username, this.searchData.status, this.searchData.orgid)
      },

      //移除选中样式
      removeStyleNode() {
        this.zTreeObj.cancelSelectedNode()
      },


      searchUser() {
        this.getTaleData(this.searchData.name, this.searchData.username, this.searchData.status, this.searchData.orgid)
      },

      removeUser() {
        let that = this;
        $(document).off('click', '.removeUser').on('click', '.removeUser', function (event) {
          event.preventDefault();
          var id = $(this).data('id');
          layer.confirm('Do you want to delete this user?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function (index) {
            layer.close(index);
            get(xhrUrls.USER_DEL + '/' + id).then((res) => {
              if (res.data.code == 200) {
                layer.msg('Delete success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                  that.getTaleData(that.searchData.name, that.searchData.username, that.searchData.status, that.searchData.orgid);
                })
              } else {
                layer.msg('Delete failure!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  layer.close(index);
                })
              }
            }, function (index) {
              layer.close(index);
            })
          })

        });
      },

      userEnable() {
        let that = this
        $(document).off('click', '.userEnable').on('click', '.userEnable', function () {
          let id = $(this).data('id')
          layer.confirm('Do you want to enable this user?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(xhrUrls.USER_ENABLE + '/' + id).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Enable success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.getTaleData(that.searchData.name, that.searchData.username, that.searchData.status, that.searchData.orgid);
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

      userDisable() {
        let that = this
        $(document).off('click', '.userDisable').on('click', '.userDisable', function () {
          let id = $(this).data('id')
          layer.confirm('Do you want to disable this user?', {
            title: 'Prompt information',
            btn: ['Confirm', 'Cancel'],
          }, function () {
            get(xhrUrls.USER_DISABLE + '/' + id).then(res => {
              let code = res.data.code
              if (code == 200) {
                layer.msg('Disable success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  this.roleName = ''
                  layer.close(index);
                  that.getTaleData(that.searchData.name, that.searchData.username, that.searchData.status, that.searchData.orgid);
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

      //编辑用户
      editUserClick() {
        let that = this;
        $(document).off('click', '.editUser').on('click', '.editUser', function (event) {
          event.preventDefault();
          let id = $(this).data('id');
          if (id == 1) {
            that.isDisable = true
          }
          that.isViewUser = true
          that.isEdit = false
          that.isUpdata = true
          $('.titles').html('EDIT USER')
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
            if (res.data.code == 200) {
              that.userData.name = res.data.user.name
              that.userData.username = res.data.user.username
              that.selectedOrg = res.data.org.name
              if (res.data.role) {
                that.selectedRole = res.data.role.name
                that.userData.roleIds = res.data.role.id
              }
              that.userData.status = res.data.user.status
              that.userData.id = id
              that.userData.orgid = res.data.org.id
              that.showCreate()
            } else {
              console.log('err')
            }
          }).catch(err => console.log(err))
        })
      },
      //查看用户
      viewUserClick() {
        let that = this
        let one = 0
        $(document).off('click', '.viewUser').on('click', '.viewUser', function (event) {
          event.preventDefault();
          let id = $(this).data('id');
          that.$emit('userView', {id: id})
          $('.titles').html('USER DETAILS')
          get(xhrUrls.USER_VIEW + '/' + id).then((res) => {
            if (res.data.code == 200) {
              that.$set(that.userinfo, 'name', res.data.user.name)
              that.$set(that.userinfo, 'username', res.data.user.username)
              that.$set(that.userinfo, 'org', res.data.org.name)
              that.$set(that.userinfo, 'role', res.data.role.name)
              that.$set(that.userinfo, 'status', res.data.user.status)
              that.isViewUser = false
              that.layerOpen2('user')
            } else {
              console.log('err')
            }
          }).catch(err => console.log(err))

        })

      },

      //关闭上传弹窗
      closeLayerButton() {
        layer.close(layerId2)
        this.userData.name = ''
        this.userData.password = ''
        this.userData.surePassword = ''
        this.userData.username = ''
        this.userData.orgid = ''
        this.userinfo.name = ''
        this.userinfo.username = ''
        this.userinfo.org = ''
        this.userinfo.role = ''
        this.userinfo.status = ''
        this.selectRoleOptions = []
        this.selectOrgOptions = []
        this.selectRoleOptionsId = []
        this.selectOrgOptionsId = []
        this.isActive.isUserActive = false;
        this.isActive.isPwdActive = false;
        this.isActive.isSurePwdActive = false;
        this.isActive.isLogAccActive = false;
      },

      layerOpen2(id) {
        layerId2 = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`),
          resize: false,
        })
      },
      showCreate(obj) {
        this.layerOpen2('user')
        this.isViewUser = true
        if (this.isEdit) {
          $('.titles').html('CREATE USER')
          this.isUpdata = false
        } else {
          $('.titles').html('EDIT USER')
          this.isEdit = true
        }
        $('.cancel').html('Cancel').css('background-color', 'orange')
        // let roleId = this.userData.roleIds;
        // let orgid = this.userData.orgid;
        post(xhrUrls.ROLE_SEARCH, {}).then(res => {
          let data = res.data.data.data;
          data.forEach((v, j) => {
            this.selectRoleOptions.push(v.name);
            this.selectRoleOptionsId.push(v.id)
            if (j == 0 && !this.userData.roleIds) {
              this.userData.roleIds = v.id
            }
            if (this.userData.roleIds == v.id) {
              console.log(j)
              this.$refs.role.nowIndex = j
            }
          });
        }).catch(err => console.log(err))

        post(xhrUrls.ORG_SEARCH, {}).then(res => {
          let data = res.data.data;
          data.forEach((v, i) => {
            this.selectOrgOptions.push(v.name);
            this.selectOrgOptionsId.push(v.id);
            if (i == 0 && !this.userData.orgid) {
              this.userData.orgid = v.id
            }
            if (this.userData.orgid == v.id) {
              this.$refs.user.nowIndex = i
            }
          });
        }).catch(err => console.log(err))
      },
      selectStatus(val) {
        switch (val.id) {
          case 1:
            this.searchData.status = 1;
            break;
          case 2:
            this.searchData.status = 0;
            break;
          default:
            this.searchData.status = "";
            break;
        }
      },
      selectUserHandle(val) {
        this.userData.orgid = val.dataId
      },
      selectRoleHandle(val) {
        console.log(val)
        this.userData.roleIds = val.dataId
      },

      onInput() {
        if (this.userData.name != '') {
          this.isActive.isUserActive = false;
        }
        if (this.userData.password != '') {
          this.isActive.isPwdActive = false;
        }
        if (this.userData.surePassword != '') {
          this.isActive.isSurePwdActive = false;
        }
        if (this.userData.username != '') {
          post(xhrUrls.USER_VALID_USERNAME, this.userData.username).then(res => {
            let data = res.data
            if (!data) {
              this.isActive.isLogAccActive = true;
              return false
            } else {
              this.isActive.isLogAccActive = false;
              return false
            }
          }).catch(err => console.log(err))
        }
      },
      submit() {
        let that = this;
        let canSubmit = true;
        if (this.userData.name == '') {
          this.isActive.isUserActive = true;
          canSubmit = false;
        }
        if (this.userData.name == '') {
          this.isActive.isUserActive = true;
          canSubmit = false;
        }
        if (this.userData.username == '') {
          this.isActive.isLogAccActive = true;
          canSubmit = false;
        }
        if (this.isUpdata) {
          //修改用户时不填代表不修改密码
          if ((this.userData.surePassword != '' || this.userData.password != '')
            && this.userData.password != this.userData.surePassword) {
            this.isActive.isPwdActive = true;
            this.isActive.isSurePwdActive = true;
            canSubmit = false;
          }

          if (!canSubmit) {
            return false;
          }

          // this.data.id = id
          post(xhrUrls.USER_EDIT, this.userData)
            .then(res => {
              if (res.data.code == 200) {
                that.isShow = false
                layer.msg('Update success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  that.closeLayerButton()
                  that.getTaleData(that.searchData.name, that.searchData.username, that.searchData.status, that.searchData.orgid);
                  layer.close(index);
                })
              } else {
                layer.msg('Edit failure!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  that.isActive.isUserActive = true;
                  layer.close(index);
                })
              }
            }).catch(err => console.log(err));
        } else {

          //创建用户时密码必填
          if (this.userData.password == '' || this.userData.surePassword == ''
            || this.userData.password != this.userData.surePassword) {
            this.isActive.isPwdActive = true;
            this.isActive.isSurePwdActive = true;
            canSubmit = false;
          }

          if (!canSubmit) {
            return false;
          }

          post(xhrUrls.USER_SAVE, this.userData)
            .then(res => {
              if (res.data.code == 200) {
                that.isShow = false
                layer.msg('Create user success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function (index) {
                  that.closeLayerButton()
                  that.getTaleData(that.searchData.name, that.searchData.username, that.searchData.status, that.searchData.orgid);
                  layer.close(index);
                })
              } else {
                this.isActive.isLogAccActive = true;
                layer.msg(res.data.errMsg, {
                  time: 2000,
                  skin: 'fontColor'
                })
              }
            })
            .catch(err => console.log(err));
        }
      },

      switchRoleEdit() {
        this.roleEdit = !this.roleEdit
        this.viewRole = false
        this.isSave = true
        this.toRoleEditId = ''
      },

      tabsSwitchRoleEdit() {
        this.roleEdit = false
        this.viewRole = false
        this.toRoleEditId = ''
      },
      toRoleEdit(val) {
        this.roleEdit = !this.roleEdit
        this.viewRole = false
        this.isSave = false
        this.toRoleEditId = val.id
      },
      roleView(val) {
        this.roleEdit = !this.roleEdit
        this.viewRole = true
        this.toRoleEditId = val.id
      }

    },
    components: {
      Role,
      RoleEdit,
      Target,
    },
    watch: {
      tableData() {
        this.$nextTick(() => {
          this.userTable();
        })
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/style/mixin.styl"
  .app-main-wrap
    position relative
    margin-left 315px
    .options-bar
      padding 20px 0
      border-radius 10px
      background-color #fff
      .options-icon-date
        font-size 28px
        color #A0A0A1
        float left
        margin 4px 18px 0 39px
      .options-menu
        position absolute
        right 0
        margin-right 25px
        width 50px
        height 60px
        z-index 5000
        padding-left 15px
        &:hover .dashboard-operation
          display block
        .icon
          font-size 35px
          color #74A5D4
          cursor pointer
        .dashboard-operation
          display none
          position absolute
          right -24px
          top 60px
          line-height 60px
          background-color #F5F6F8
          border-radius 10px
          white-space nowrap
          z-index 9999
          .a-wrap
            border-radius 10px
            overflow hidden
          a
            display block
            padding 0 25px
            border-bottom 1px solid #E8E9E9
            &:last-of-type
              border-bottom medium
            &:hover
              background-color #fff
          .icon
            font-size 27px
            color #74A5D4
          .upload-icon
            font-size 32px
          span
            margin-left 15px
            font-size 20px
            color #A0A0A1
            vertical-align middle
          .triangle
            position absolute
            top -15px
            right 20px
            width 44px
            height 15px
      .dropdown-wrap
        margin-right 50px
        float left
        span
          font-size 18px
      .styleone
        width 350px
    .dashboard-all-wrap
      margin-top 25px

  .userbox
    .tab
      margin-top 40px
      ul > li
        float left
        background url("../../assets/img/tab.png") no-repeat left bottom
        border-top-left-radius 10px
        border-top-right-radius 10px
        &.active
          background url("../../assets/img/tab_active.jpg") no-repeat center
          transition: all .3s linear
        .tab-link
          color #fff;
          width 140px
          height 40px
          display block
          text-align center
          line-height 40px
          font-size 18px
    .cards
      /*background #fff*/
      width 100%
      padding 40px 0
      .tab-card
        float left
        display none
        width 100%
        .content
          width 100%
          form
            width 100%
          .search
            float left
            .dropdown-wrap
              display inline-block
              height 35px
              line-height 35px
              .dropdown-show
                height 35px
                line-height 35px
                span
                  font-size 18px
            label
              color #717071
              font-size 18px
              margin-right 15px
              line-height 35px
              display inline-block
            input, select
              margin-right 30px
              appearance none
              border 1px solid #E2DFDE
              border-radius 5px
              width 200px
              height 35px
              line-height 35px
              padding 0 10px
          .searchIcon
            color #717071
            font-size 20px
            margin-left 30px
            height 35px
            line-height 35px
            cursor pointer
          .user-content
            width 100%
            margin-top 30px
            .ztreebox
              width 20%
              height 360px
              float left
              border 1px solid #d6e3f0
              border-radius 5px
              padding 0
              .ztreeDome
                max-height 315px
                overflow auto
              h4
                height 40px
                line-height 40px
                text-align center
                color #fff
                border-bottom 1px solid #1f61ae
                font-size 18px
                font-weight 400
                background #1f61ae
                border-radius 5px 5px 0 0
            .tables
              margin-left 22%
              padding-top 1px
              .user-create
                color #fff
                font-size 18px
                e-pos(top:50%, y:-50%)
              .create
                border 1px solid #1f61ae
                border-radius 5px 5px 0 0
                height 40px
                cursor pointer
                padding-left 20px
                background #1f61ae
                line-height 40px
                position relative
                .newUser
                  margin-left 30px
                  color #fff
                  line-height 40px
                  display inline-block
                  position absolute;
                  margin-top -3px
                span
                  color #fff
                  font-size 18px
              .user-table
                // margin-top 20px
                position relative
                width 100%

  #user
    width 600px
    .tables-title
      position: relative
      padding-left: 20px
      font-size: 20px
      line-height: 60px
      height 50px
      color: #a0a0a1
      .icon
        e-pos(top:60%, y:-50%)
        right: 20px
        font-size: 20px
        color: #A0A0A1
        cursor: pointer
    .resg
      padding 0 20px
      div
        height 40px
        line-height 40px
        width 100%
        margin 10px 0
        .dropdown-wrap
          position relative
          display inline-block
          width 60%
          height 35px
          outline none
          .dropdown-show
            position relative
            width 100%
            height 35px
            line-height 35px
            cursor pointer
            span
              font-size 18px
            .arrow-down
              e-pos(top:50%, y:-50%)
              right 10px
              font-size 18px
              color #A0A0A1
            input
              width 100%
              height 100%
              padding-left 10px
              padding-right 35px
              appearance none
              border 1px solid #E2DFDE
              border-radius 5px
              color #A0A0A1
              font-size 18px
              &:disabled
                background-color #fff
        label
          font-size 20px
          display inline-block
          width 40%
          float left
          color #a0a0a1
        .radio
          input
            vertical-align -1px
          label
            width 20%
        .input
          width 60%
          height 35px
          line-height 35px
          padding-left 10px
          padding-right 35px
          appearance none
          border 1px solid #E2DFDE
          border-radius 5px
          font-size 18px
          float right
          &:disabled
            border 0
            background #fff
        .active
          border-color: #e78b70
    .submit-btn
      text-align center
      margin 30px 0
      button
        height 35px
        background-color #74A5D4
        border-radius 5px
        color #fff
        border medium
        outline none
        cursor pointer
        padding 0 20px
        font-size 18px
      .confirm
        margin-right 10px
      .cancel
        margin-left 10px
        background-color orange


</style>

<style lang="stylus" rel="stylesheet/stylus">
  .user-select
    .dropdown-menu
      max-height 100px
      overflow auto
      top 36px
      line-height 35px
      font-size 18px
    .dropdown-show
      height 35px
      line-height 35px
      font-size 18px
  .setting
    .dropdown-menu
      top 36px
      line-height 35px
      font-size 18px
    .dropdown-show
      span
        font-size 18px;
</style>
