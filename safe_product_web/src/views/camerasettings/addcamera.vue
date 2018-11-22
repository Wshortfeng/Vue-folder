<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <!-- <span class="back-box">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span> -->
        <span class="conten-title">
          加入摄像机
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <el-radio-group v-model="type">
            <el-radio-button label="1"><i class="el-icon-safetyproduction-dvr"></i>分组DVR</el-radio-button>|
            <el-radio-button label="2"><i class="el-icon-safetyproduction-vcr"></i>数码摄像机</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="container-content tablecontent">
        <transition name="fade" mode="out-in">
          <div v-if="type==1" class="group-dvr-content">
            <div class="search-box">
              <div class="search-item">
                <span>摄像机ID：</span>
                <el-input v-model="deviceCode" placeholder="请输入摄像机ID" class="keyword" maxlength="50" @change="filteremojifun($event,'deviceCode')"></el-input>
                <el-button type="primary" @click="serchKey" class="mg_right1" style="position:relative;right:5px;">搜索</el-button>
              </div>
              <div class="title">
                <span> DVR组别：</span>
              </div>
            </div>
            <ul class="group-tree">
              <li v-for="(item,index) in allDvrIp" :key="index" :class="{checkColor:item.checked}" @click="check($event,index,item.ip)"><i class="el-icon-safetyproduction-nochecked"></i>IP{{item.ip}}</li>
            </ul>
            <div class="group-content" v-if="deviceIp">
              <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading" class="imgtable">
                <el-table-column label="序号" width="100px;">
                  <template slot-scope="scope">
                    <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="摄像机">
                  <template slot-scope="scope">
                    <p><img src="../../assets/img/camera.png"></p>
                  </template>
                </el-table-column>
                <el-table-column label="摄像机ID">
                  <template slot-scope="scope">
                    <p>{{scope.row.deviceCode}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="摄像机名称">
                  <template slot-scope="scope">
                    <p>{{scope.row.deviceName}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="摄像机位置">
                  <template slot-scope="scope">
                    <p>{{scope.row.address}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="摄像机状态">
                  <template slot-scope="scope">
                    <p class="warnColor">{{scope.row.state|enterStatusFormat}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="operation(scope.row.Id,'join')">加入</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
              </el-pagination>
            </div>
            <div class="clear"></div>
          </div>
          <div v-if="type==2">
            <div class="search-box">
              <div class="search-item">
                <span>摄像机ID：</span>
                <el-input v-model="deviceCode1" placeholder="请输入摄像机ID" class="keyword" maxlength="50" @change="filteremojifun($event,'deviceCode1')"></el-input>
                <el-button type="primary" @click="serchKey" class="mg_right1" style="position:relative;right:5px;">搜索</el-button>
              </div>
              <div class="search-item">
                <el-button type="primary" @click="goTo('AddEditdigitalVideoCamera',false)">新增</el-button>
              </div>
            </div>
            <el-table :data="tableData1" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading" class="imgtable">
              <el-table-column label="序号" width="100px;">
                <template slot-scope="scope">
                  <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
                </template>
              </el-table-column>
              <el-table-column label="摄像机">
                <template slot-scope="scope">
                  <p><img src="../../assets/img/camera.png"></p>
                </template>
              </el-table-column>
              <el-table-column label="摄像机ID">
                <template slot-scope="scope">
                  <p>{{scope.row.deviceCode}}</p>
                </template>
              </el-table-column>
              <el-table-column label="摄像机名称">
                <template slot-scope="scope">
                  <p>{{scope.row.deviceName}}</p>
                </template>
              </el-table-column>
              <el-table-column label="摄像机位置">
                <template slot-scope="scope">
                  <p>{{scope.row.address}}</p>
                </template>
              </el-table-column>
              <el-table-column label="摄像机状态">
                <template slot-scope="scope">
                  <p class="warnColor">{{scope.row.state|enterStatusFormat}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220px">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="operation(scope.row.Id,'join')">加入</el-button>
                   <el-button size="mini" type="primary" @click="operation(scope.row.Id,'edit')">修改</el-button>
                    <el-button size="mini" type="primary" @click="operation(scope.row.Id,'del')">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination v-show="total1>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pagesize" :total="total1">
            </el-pagination>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alarmslist",
  data() {
    return {
      isloading: true,
      type: "",
      deviceCode: "",
      deviceCode1: "",
      deviceIp: "",
      allDvrIp: [], //IP列表\
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
      currentPage1: 1, //初始页
      total1: 0, //总数
      tableData1: []
    };
  },
  created() {},
  mounted() {
    this.type = this.$route.query.TYPE;
    this.detAllDvrIp();
  },
  watch: {
    type(value) {
      this.serchKey();
    }
  },
  methods: {
     filteremojifun(e,name){//限制输入表情
      this[name] = this.$utils.filteremoji(e);
    },
    serchKey() {
      if(this.type==1){
        this.currentPage = 1;
      }else if(this.type==2){
        this.currentPage1 = 1;
      }
      this.deviceList();
    },
    handleCurrentChange: function(currentPage) {
      if(this.type==1){
        this.currentPage = currentPage;
      }else if(this.type==2){
        this.currentPage1 = currentPage;
      }
      this.deviceList();
    },
    check(e, index, ip) {
      //选择IP
      var liArr =
        e.currentTarget.offsetParent.firstChild.children[1].childNodes;
      for (var j = 0; j < liArr.length; j++) {
        liArr[j].firstChild.className = "el-icon-safetyproduction-nochecked";
      }
      e.currentTarget.firstChild.className = "el-icon-safetyproduction-checked";
      for (var i = 0; i < this.allDvrIp.length; i++) {
        this.allDvrIp[i].checked = false;
      }
      this.allDvrIp[index].checked = true;
      this.deviceIp = ip;
      this.deviceList();
    },
    detAllDvrIp() {
      //获取DVR摄像机ip
      this.$api.camerasetup.detAllDvrIp().then(res => {
        if (res.code == 200) {
          var arr = res.data;
          var arr1 = [];
          for (var i = 0; i < arr.length; i++) {
            var obj = {};
            obj.ip = arr[i].ip;
            obj.checked = false;
            arr1.push(obj);
          }
          this.allDvrIp = arr1;
        }
      });
    },
    deviceList() {
      //获取摄像机
      this.isloading = true;
      if (this.type == 1) {
        var deviceCode = this.deviceCode;
      } else if (this.type == 2) {
        var deviceCode = this.deviceCode1;
      }
      this.$api.camerasetup
        .deviceList(
          this.currentPage,
          this.pagesize,
          this.deviceIp,
          deviceCode,
          this.type,
          2
        )
        .then(res => {
          if (this.type == 1) {
            if (this.currentPage != 1 && res.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.deviceList();
            } else {
              this.total = res.pageInfo.total;
              this.tableData = res.data;
            }
          } else {
            if (this.currentPage1 != 1 && res.data.length == 0) {
              this.currentPage1 = this.currentPage1 - 1;
              this.deviceList();
            } else {
              this.total1 = res.pageInfo.total;
              this.tableData1 = res.data;
            }
          }
          this.isloading = false;
        });
    },
    operation(id, type) {//操作
      if (type == "join") {
        this.$confirm("是否确定该摄像机加入？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(res => {
          this.$api.camerasetup.deviceJoinOrRemove(id).then(res => {
            if (res.code == 200) {
              this.deviceList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      }else if(type=='del'){
        this.$confirm("是否确定删除该数码摄像机？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          this.$api.camerasetup.removeDvCamera(id).then(res => {
            if (res.code == 200) {
              this.deviceList();
              this.$toaster.ok("删除成功");
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      }else if(type=='edit'){
        this.goTo('AddEditdigitalVideoCamera',true,id)
      }
    },
    goTo(name,edit,id){//新增、编辑数码摄像机
      this.$router.push({
        name:name,
        query:{
          EDIT:edit,
          DEVICE_ID:id,
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
