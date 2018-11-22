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
          移除摄像机
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <el-radio-group v-model="type">
            <el-radio-button label="1"><i class="el-icon-safetyproduction-dvr"></i>模拟摄像机</el-radio-button>|
            <el-radio-button label="2"><i class="el-icon-safetyproduction-vcr"></i>数码摄像机</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="container-content tablecontent">
            <div class="search-box">
              <div class="search-item">
                <span>摄像机ID：</span>
                <el-input v-model="deviceCode" placeholder="请输入摄像机ID" class="keyword" maxlength="50" @change="filteremojifun($event,'deviceCode')"></el-input>
                <el-button type="primary" @click="serchKey" class="mg_right1" style="position:relative;right:5px;">搜索</el-button>
              </div>
            </div>
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
                  <p class="greenColor">{{scope.row.state|enterStatusFormat}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="operation(scope.row.Id,'remove')">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
            </el-pagination>

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
      deviceIp: "",
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.type = this.$route.query.TYPE;
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
      this.currentPage = 1;
      this.deviceList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.deviceList();
    },
    deviceList() {
      //获取摄像机
      this.isloading = true;
      this.$api.camerasetup
        .deviceList(
          this.currentPage,
          this.pagesize,
          this.deviceIp,
          this.deviceCode,
          this.type,
          1
        )
        .then(res => {
         if (this.currentPage != 1 && res.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.deviceList();
            } else {
              this.total = res.pageInfo.total;
              this.tableData = res.data;
            }
          this.isloading = false;
        });
    },
    operation(id, type) {
      if (type == "remove") {
        this.$confirm("是否确定移除该摄像机？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
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
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
