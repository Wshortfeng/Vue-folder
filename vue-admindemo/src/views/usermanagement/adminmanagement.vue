<template>
  <div class="adminmanagement  content-padding">
    <el-radio-group v-model="active" style="margin-bottom: 19px;">
      <el-radio-button :label="item.value" v-for="(item,index) in options" :key="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <div class="search-box" v-if="active==1">
      <div class="search-item">
        <span>手机号：</span>
        <el-input v-model="account" placeholder="请输入手机号" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>角色分组：</span>
        <el-select v-model="roleId" filterable placeholder="请搜索或选择角色分组" class="mg_right1 " maxlength="50">
          <el-option label="全部" value="" selected="selected"></el-option>
          <el-option v-for="(item,index) in roleData" :key="index" :label="item.roleName" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
      <el-button type="primary" @click="showbox(0,'user')" class="right_btn" v-if="permission1_1_1||isAdmin">新增</el-button>
    </div>
    <div class="search-box" v-if="active==2" style="height:40px;">
      <div class="search-item">
        <span>角色分组：</span>
        <el-select v-model="group" filterable placeholder="请搜索或选择角色分组" class="mg_right1 " maxlength="50">
          <el-option v-for="(item,index) in roleData" :key="index" :label="item.roleName" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="confirmbtn()"  v-if="permission1_5_1||isAdmin">确定</el-button>
      </div>
    </div>
    <div class="search-box" v-if="active==3">
      <div class="search-item">
        <span>分组名称：</span>
        <el-input v-model="roleName" placeholder="请输入分组名称" class="keyword mg_right1" maxlength="50"></el-input>
      </div>

      <el-button type="primary" @click="serchKey()">搜索</el-button>
      <el-button type="primary" @click="showbox(0,'group')" class="right_btn" v-if="permission1_4_1||isAdmin">新增</el-button>
    </div>
    <div class="adminmanagement-main">
      <div class="adminmanagement-content tablecontent" v-if="active==1">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="手机号" >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.account">
                <p slot="reference">{{scope.row.account}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="真实姓名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.nickName">
                <p slot="reference">{{scope.row.nickName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="角色分组">
            <template slot-scope="scope">
              <p>{{scope.row.roleName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','user',scope.row.nickName)" v-if="permission1_1_2||isAdmin">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'editpassword','user',scope.row.nickName)" v-if="permission1_1_3||isAdmin">修改密码</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'disable','user',scope.row.nickName)" v-if="scope.row.isDisable==1&&(permission1_1_4||isAdmin)">禁用</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'enable','user',scope.row.nickName)" v-if="scope.row.isDisable==2&&(permission1_1_5||isAdmin)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
      <div class="adminmanagement-content tablecontent" v-if="active==2" style="padding-left:80px;" >
        <el-tree ref="tree" :data="data2"  show-checkbox node-key="id" :expand-on-click-node="true" :default-checked-keys="checkedList" :props="defaultProps" default-expand-all>
        </el-tree>
      </div>
      <div class="adminmanagement-content tablecontent" v-if="active==3">
        <el-table :data="tableData2" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading2">
          <el-table-column label="分组名称" >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.roleName">
                <p slot="reference">{{scope.row.roleName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.phone">
                <p slot="reference">{{scope.row.phone}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','group',scope.row.roleName)" v-if="permission1_4_2||isAdmin">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del','group',scope.row.roleName)" v-if="permission1_4_3||isAdmin">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total2>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pagesize" :total="total2">
        </el-pagination>
      </div>
    </div>
    <!-- 新增编辑平台用户 -->
    <el-dialog :visible.sync="showaddeditbox" width="500px" class="deepbackground editbox" center style="padding:15px 20px;" @close="close('addeditbox')">
      <p class="headerTitle">{{title}}</p>
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline addeditbox" :rules="addeditboxRules" label-width="100px">
        <el-form-item prop="account" label="手机号：">
          <el-input v-model="addeditbox.account" placeholder="请输入手机号" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="真实姓名：">
          <el-input v-model="addeditbox.nickName" placeholder="请输入真实姓名" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="roleId" label="角色分组：">
          <el-select v-model="addeditbox.roleId" filterable placeholder="请选择角色分组" class="mg_right1">
            <el-option v-for="(item,index) in roleData" :key="index" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="password" label="密码：" v-if="type==0">
          <el-input v-model="addeditbox.password" type="password" placeholder="请输入密码" maxlength="30"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm('addeditbox')">确 定</el-button>
        <el-button type="primary" @click="close('addeditbox')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增编辑分组 -->
    <el-dialog :visible.sync="showaddeditbox1" width="500px" class="deepbackground editbox" center style="padding:15px 20px;" @close="close('addeditbox1')">
      <p class="headerTitle">{{title1}}</p>
      <el-form ref="addeditbox1" :model="addeditbox1" class="demo-form-inline addeditbox" :rules="addeditboxRules1" label-width="100px">
        <el-form-item prop="roleName" label="分组名称：">
          <el-input v-model="addeditbox1.roleName" placeholder="请输入分组名称" maxlength="30"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm('addeditbox1')">确 定</el-button>
        <el-button type="primary" @click="close('addeditbox1')">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑密码 -->
    <el-dialog :visible.sync="showaddeditbox2" width="500px" class="deepbackground editbox" center style="padding:15px 20px;" @close="close('addeditbox2')">
      <p class="headerTitle">修改密码</p>
      <el-form ref="addeditbox2" :model="addeditbox2" class="demo-form-inline addeditbox" :rules="addeditboxRules2" label-width="100px">
        <el-form-item prop="password" label="新密码：">
          <el-input v-model="addeditbox2.password" placeholder="请输入新密码" maxlength="20" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="password1" label="确认密码：">
          <el-input v-model="addeditbox2.password1" placeholder="请输入确认密码" maxlength="20" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm('addeditbox2')">确 定</el-button>
        <el-button type="primary" @click="close('addeditbox2')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "adminmanagement",
  data() {
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("手机号为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          this.$notify.error({
            duration: "2000",
            title: "错误",
            message: "手机号格式错误"
          });
          return callback(new Error(" "));
        } else {
          callback();
        }
      }
    };
    var isPassword = (rule, value, callback) => {
      //密码验证
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("密码为6~20个字符"));
      } else {
        if (!this.$utils.isPsd(value)) {
          return callback(new Error("密码格式错误"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.addeditbox2.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      isAdmin:false,
      permission1_1_1:false,
      permission1_1_2:false,
      permission1_1_3:false,
      permission1_1_4:false,
      permission1_1_5:false,
      permission1_2_1:false,
      permission1_2_2:false,
      permission1_2_3:false,
      permission1_2_4:false,
      permission1_2_5:false,
      permission1_3_1:false,
      permission1_3_2:false,
      permission1_3_3:false,
      permission1_3_4:false,
      permission1_3_5:false,
      permission1_3_6:false,
      permission1_4_1:false,
      permission1_4_2:false,
      permission1_4_3:false,
      permission1_5_1:false,
      isloading: false,
      isloading2: false,
      active: "1",
      roleId: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      currentPage2: 1, //初始页
      total2: 0, //总数
      account: "",
      group: "",
      groupName: "",
      permission: "",
      roleName: "",
      tableData: [],
      tableData2: [],
      roleData: [], //角色分组下拉数组
      options: [
        { name: "平台用户管理", value: "1" },
        { name: "权限管理", value: "2" },
        { name: "角色分组管理", value: "3" }
      ],
      showaddeditbox: false,
      addeditbox: {
        account: "",
        password: undefined,
        nickName: "",
        roleId: ""
      },
      addeditboxRules: {
        account: [
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: isPassword,
            trigger: "blur"
          }
        ],
        nickName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        roleId: [
          { required: true, message: "请选择角色分组", trigger: "change" }
        ]
      },
      type: 0,
      id: "",
      title: "新增用户",
      type1: 0,
      id1: "",
      id2: "",
      title1: "新增分组",
      showaddeditbox1: false,
      addeditbox1: {
        roleName: "",
        permission: ""
      },
      addeditboxRules1: {
        roleName: [
          { required: true, message: "请输入分组名称", trigger: "blur" }
        ]
      },
      showaddeditbox2: false,
      addeditbox2: {
        account: "",
        nickName: "",
        roleId: "",
        password: "",
        password1: ""
      },
      addeditboxRules2: {
        password: [
          {
            required: true,
            validator: isPassword,
            trigger: "blur"
          }
        ],
        password1: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      },
      checkedList: [],
      data2: [
        {
          id: "permission1_0_0",
          label: "用户管理",
          children: [
            {
              id: "permission1_1_0",
              label: "平台用户管理",
              children: [
                {
                  id: "permission1_1_1",
                  label: "新增"
                },
                {
                  id: "permission1_1_2",
                  label: "编辑"
                },
                {
                  id: "permission1_1_3",
                  label: "修改密码"
                },
                {
                  id: "permission1_1_4",
                  label: "禁用"
                },
                {
                  id: "permission1_1_5",
                  label: "启用"
                }
              ]
            },
            {
              id: "permission1_2_0",
              label: "标注方用户管理",
              children: [
                {
                  id: "permission1_2_1",
                  label: "审核"
                },
                {
                  id: "permission1_2_2",
                  label: "查看"
                },
                {
                  id: "permission1_2_3",
                  label: "编辑"
                },
                {
                  id: "permission1_2_4",
                  label: "禁用"
                },
                {
                  id: "permission1_2_5",
                  label: "启用"
                },{
                  id: "permission1_2_6",
                  label: "评定"
                }
              ]
            },
            {
              id: "permission1_3_0",
              label: "项目方用户管理",
              children: [
                {
                  id: "permission1_3_1",
                  label: "审核"
                },
                {
                  id: "permission1_3_2",
                  label: "查看"
                },
                {
                  id: "permission1_3_3",
                  label: "编辑"
                },
                {
                  id: "permission1_3_4",
                  label: "禁用"
                },
                {
                  id: "permission1_3_5",
                  label: "启用"
                },

              ]
            },
            {
              id: "permission1_4_0",
              label: "角色分组管理",
              children: [
                {
                  id: "permission1_4_1",
                  label: "新增"
                },
                {
                  id: "permission1_4_2",
                  label: "编辑"
                },
                {
                  id: "permission1_4_3",
                  label: "删除"
                }
              ]
            },
            {
              id: "permission1_5_0",
              label: "平台方权限管理",
              children: [
                {
                  id: "permission1_5_1",
                  label: "确定"
                }
              ]
            }
          ]
        },
        {
          id: "permission2_0_0",
          label: "项目管理",
          children: [
            {
              id: "permission2_1_0",
              label: "项目管理",
              children: [
                {
                  id: "permission2_1_1",
                  label: "审核"
                },
                {
                  id: "permission2_1_2",
                  label: "查看"
                },
                {
                  id: "permission2_1_3",
                  label: "编辑"
                },
                {
                  id: "permission2_1_4",
                  label: "下载数据"
                }
              ]
            },
            {
              id: "permission2_2_0",
              label: "项目详情",
              children: [
                {
                  id: "permission2_2_1",
                  label: "查看"
                },
                {
                  id: "permission2_2_2",
                  label: "暂停"
                },
                {
                  id: "permission2_2_3",
                  label: "提交验收"
                },
                {
                  id: "permission2_2_4",
                  label: "平台改判验收通过"
                },
                {
                  id: "permission2_2_5",
                  label: "结束"
                }
              ]
            },
            {
              id: "permission2_3_0",
              label: "批次详情",
              children: [
                {
                  id: "permission2_3_1",
                  label: "暂停"
                },
                {
                  id: "permission2_3_2",
                  label: "分配审核员"
                },
                {
                  id: "permission2_3_3",
                  label: "延期"
                },
                {
                  id: "permission2_3_4",
                  label: "提交验收"
                },
                {
                  id: "permission2_3_5",
                  label: "平台改判通过"
                }
              ]
            }
          ]
        },
        {
          id: "permission3_0_0",
          label: "疑难杂症",
          children: [
            {
              id: "permission3_1_0",
              label: "疑难杂症列表",
              children: [
                {
                  id: "permission3_1_1",
                  label: "查看"
                },
                {
                  id: "permission3_1_2",
                  label: "人工分配"
                },
                {
                  id: "permission3_1_3",
                  label: "暂停"
                },
                 {
                  id: "permission3_1_4",
                  label: "开启"
                },
                {
                  id: "permission3_1_5",
                  label: "结束"
                }
              ]
            }
          ]
        },
        {
          id: "permission4_0_0",
          label: "资金管理",
          children: [
            {
              id: "permission4_1_0",
              label: "收支统计",
              children: [
                {
                  id: "permission4_1_1",
                  label: "资金托管"
                },
                {
                  id: "permission4_1_2",
                  label: "余额返还"
                },
                {
                  id: "permission4_1_3",
                  label: "资金维护"
                }
              ]
            },
            {
              id: "permission4_2_0",
              label: "提现管理",
              children: [
                {
                  id: "permission4_2_1",
                  label: "审核"
                },
                {
                  id: "permission4_2_2",
                  label: "提现成功"
                },
                {
                  id: "permission4_2_3",
                  label: "提现失败"
                }
              ]
            }
          ]
        },
        {
          id: "permission5_0_0",
          label: "标注工具管理",
          children: [
            {
              id: "permission5_1_0",
              label: "系统标注工具",
              children: [
                {
                  id: "permission5_1_1",
                  label: "新增"
                },
                {
                  id: "permission5_1_2",
                  label: "编辑"
                },
                {
                  id: "permission5_1_3",
                  label: "删除"
                }
              ]
            },
             {
              id: "permission5_2_0",
              label: "系统标注工具",
              children: [
                {
                  id: "permission5_2_1",
                  label: "审核"
                },
                {
                  id: "permission5_2_2",
                  label: "删除"
                },
              ]
            }
          ]
        },
        {
          id: "permission6_0_0",
          label: "项目问题管理",
          children: [
            {
              id: "permission6_1_0",
              label: "系统默认问题",
              children: [
                {
                  id: "permission6_1_1",
                  label: "新增"
                },
                {
                  id: "permission6_1_2",
                  label: "编辑"
                },
                {
                  id: "permission6_1_3",
                  label: "删除"
                },
              ]
            },
            {
              id: "permission6_2_0",
              label: "用户定义问题",
              children: [
                {
                  id: "permission6_2_1",
                  label: "审核"
                },
                {
                  id: "permission6_2_2",
                  label: "删除"
                }
              ]
            }
          ]
        },
        {
          id: "permission7_0_0",
          label: "系统设置",
          children: [
            {
              id: "permission7_1_0",
              label: "资质标签类别",
              children: [
                {
                  id: "permission7_1_1",
                  label: "新增"
                },
                {
                  id: "permission7_1_2",
                  label: "编辑"
                },
                {
                  id: "permission7_1_3",
                  label: "删除"
                }
              ]
            },
            {
              id: "permission7_2_0",
              label: "资质标签管理",
              children: [
                {
                  id: "permission7_2_1",
                  label: "新增"
                },
                {
                  id: "permission7_2_2",
                  label: "编辑"
                },
                {
                  id: "permission7_2_3",
                  label: "删除"
                }
              ]
            },
            // {
            //   id: "permission7_3_0",
            //   label: "项目示例管理",
            //   children: [
            //     {
            //       id: "permission7_3_1",
            //       label: "新增"
            //     },
            //     {
            //       id: "permission7_3_2",
            //       label: "编辑"
            //     },
            //     {
            //       id: "permission7_3_3",
            //       label: "删除"
            //     }
            //   ]
            // },
            {
              id: "permission7_4_0",
              label: "系统日志查询",
              children: []
            },
            {
              id: "permission7_5_0",
              label: "系统设置",
              children: [
                {
                  id: "permission7_5_1",
                  label: "保存"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    roleId() {
      this.currentPage = 1;
      this.getUserList();
    },
    active(value) {
      if (value == 1) {
        this.getUserList();
      } else if (value == 2) {
        this.getAllRole();
        this.getRole();
      } else if (value == 3) {
        this.getRoleList();
      }
    },
    group() {
      if (this.active == 2) {
        this.getRole();
      }
    }
  },
  created() {
    this.getAllRole();
    //  this.permission = this.$utils.getStorage('PERMISSION');
    if (this.$utils.getStorage('PERMISSION')) {
       var permissionArr = this.$utils.getStorage('PERMISSION').split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    confirmbtn() {
      this.permission = this.$refs.tree.getCheckedKeys().join(",");
      this.updateRole();
    },
    serchKey() {
      if (this.active == 1) {
        this.currentPage = 1;
        this.getUserList();
      } else if (this.active == 2) {
        this.getAllRole();
      } else if (this.active == 3) {
        this.currentPage2 = 1;
        this.getRoleList();
      }
    },
    getAllRole() {
      //获取角色分组下拉框
      this.$api.admin.getAllRole().then(res => {
        this.roleData = res.data;
        if (res.data.length > 0) {
          this.group = res.data[0].id;
        }
      });
    },
    getRole() {
      //获取角色分组详情
      if (this.group == "") {
        return;
      }
      this.$api.admin.getRole(this.group).then(res => {
        if (res.data.permission) {
          this.groupName = res.data.roleName;
          this.permission = res.data.permission;
        } else {
          this.groupName = res.data.roleName;
          this.permission = "";
        }
        this.$refs.tree.setCheckedKeys(this.permission.split(","));
      });
    },
    updateRole() {
      //编辑角色分组
      this.$api.admin
        .updateRole(this.group, this.groupName, this.permission)
        .then(res => {
          if (res.code == 200) {
            this.$toaster.ok(res.msg);
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getUserList();
    },
    getUserList() {
      //获取平台用户列表
      this.isloading = true;
      this.$api.admin
        .getUserList(this.currentPage, this.pagesize, this.account, this.roleId)
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getUserList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    handleCurrentChange2: function(currentPage) {
      this.currentPage2 = currentPage;
      this.getRoleList();
    },
    getRoleList() {
      //获取角色分组列表
      this.isloading2 = true;
      this.$api.admin
        .getRoleList(this.currentPage2, this.pagesize, this.roleName)
        .then(res => {
          if (this.currentPage2 != 1 && res.data.length == 0) {
            this.currentPage2 = this.currentPage2 - 1;
            this.getRoleList();
          } else {
            this.total2 = res.pageInfo.total;
            this.tableData2 = res.data;
          }
          this.isloading2 = false;
        });
    },
    operation(id, type, operationType, name) {
      if (type == "disable") {
        this.$confirm("是否确定禁用【" + name + "】？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(res => {
            this.$api.admin.disableAndEnableUser(id).then(res => {
              if (res.code == 200) {
                this.getUserList();
                this.$toaster.ok("禁用成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {});
      } else if (type == "enable") {
        this.$confirm("是否确定重新启用【" + name + "】？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(res => {
          this.$api.admin.disableAndEnableUser(id).then(res => {
            if (res.code == 200) {
              this.getUserList();
              this.$toaster.ok("启用成功");
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "del") {
        this.$confirm("是否确定删除【" + name + "】分组？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        }).then(() => {
          this.$api.admin.delfun("pc/role/delRole", id).then(res => {
            if (res.code == 200) {
              this.getRoleList();
              this.getAllRole();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "edit") {
        this.showbox(1, operationType, id);
      } else if (type == "editpassword") {
        this.id2 = id;
        this.showaddeditbox2 = true;
      }
    },
    close(rouleForm) {
      this.$refs[rouleForm].resetFields();
      var name = "show" + rouleForm;
      this[name] = false;
    },
    showbox(type, operationType, id) {
      if (operationType == "user") {
        this.type = type;
        this.id = id;
        if (type == 0) {
          this.title = "新增平台用户";
        } else {
          this.title = "编辑平台用户";
          this.$api.admin.getUserInfoById(id).then(res => {
            this.addeditbox.nickName = res.data.nickName;
            this.addeditbox.account = res.data.account;
            this.addeditbox.roleId = res.data.roleId;
          });
        }
        this.showaddeditbox = true;
      } else {
        this.type1 = type;
        this.id1 = id;
        if (type == 0) {
          this.title1 = "新增分组";
        } else {
          this.title1 = "编辑分组";
          this.$api.admin.getRole(id).then(res => {
            this.addeditbox1.roleName = res.data.roleName;
          });
        }
        this.showaddeditbox1 = true;
      }
    },
    confirm(ruleForm) {
      if (ruleForm == "addeditbox") {
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var addeditbox = this.addeditbox;
            if (this.type == 1) {
              this.$api.admin
                .updateUser(
                  this.id,
                  addeditbox.account,
                  undefined,
                  addeditbox.nickName,
                  addeditbox.roleId
                )
                .then(res => {
                  if (res.code == 200) {
                    this.$toaster.ok(res.msg);
                    this.getUserList();
                    this.close("addeditbox");
                  } else {
                    this.$toaster.error(res.msg);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.admin
                .addUser(
                  addeditbox.account,
                  this.$utils.calcuMD5(addeditbox.password),
                  addeditbox.nickName,
                  addeditbox.roleId
                )
                .then(res => {
                  if (res.code == 200) {
                    this.$toaster.ok(res.msg);
                    this.getUserList();
                    this.close("addeditbox");
                  } else {
                    this.$toaster.error(res.msg);
                  }
                })
                .catch(() => {});
            }
          } else {
            // this.$toaster.error("请确认验证项格式");
            return false;
          }
        });
      } else if (ruleForm == "addeditbox1") {
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var addeditbox = this.addeditbox1;
            if (this.type1 == 1) {
              this.$api.admin
                .updateRole(
                  this.id1,
                  addeditbox.roleName,
                  addeditbox.permission
                )
                .then(res => {
                  if (res.code == 200) {
                    this.$toaster.ok(res.msg);
                    this.getRoleList();
                    this.getAllRole();
                    this.close("addeditbox1");
                  } else {
                    this.$toaster.error(res.msg);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.admin
                .addRole(addeditbox.roleName)
                .then(res => {
                  if (res.code == 200) {
                    this.$toaster.ok(res.msg);
                    this.getRoleList();
                    this.getAllRole();
                    this.close("addeditbox1");
                  } else {
                    this.$toaster.error(res.msg);
                  }
                })
                .catch(() => {});
            }
          } else {
            // this.$toaster.error("请确认验证项格式");
            return false;
          }
        });
      } else if (ruleForm == "addeditbox2") {
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var addeditbox2 = this.addeditbox2;
            this.$api.admin
              .updateUser(
                this.id2,
                addeditbox2.account,
                this.$utils.calcuMD5(addeditbox2.password),
                addeditbox2.nickName,
                addeditbox2.roleId
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getUserList();
                  this.close("addeditbox2");
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            // this.$toaster.error("请确认验证项格式");
            return false;
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.adminmanagement {
  height: 100%;
  overflow: hidden;
  .search-box {
    height: 40px !important;
  }
  .el-scrollbar__wrap {
    overflow: auto !important;
  }
  .el-tabs {
    height: 41px;
  }
  .adminmanagement-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    height: auto !important;
    .adminmanagement-content {
      table {
        th,
        td {
          text-align: center;
          .cell {
            white-space: nowrap;
            width: 100%; /* IE6 需要定义宽度 */
            overflow: hidden;
            p {
              white-space: nowrap;
              width: 100%; /* IE6 需要定义宽度 */
              overflow: hidden;
              text-overflow: ellipsis;
            }
            img {
              height: 23px;
              width: 23px;
            }
          }
        }
      }
      .pageTap {
        margin-top: 15px;
        position: absolute;
        right: 0;
      }
    }
  }
}
.el-tree-node__children {
  .el-tree-node__children {
    .el-tree-node {
      display: inline-block;
    }
  }
}
// .el-tree-node__content > .el-tree-node__expand-icon,.el-tree-node__expand-icon.expanded{
//   display: none;
// }
.el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
.el-tree-node__content:hover {
  background-color: transparent !important;
}
.el-tree > .el-tree-node > .el-tree-node__content {
  font-weight: bold;
  line-height: 50px;
  height: 50px;
}
</style>
