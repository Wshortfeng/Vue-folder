<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <span class="conten-title">
          布控设置
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>摄 像 机 ID：</span>
          <el-input v-model="deviceCode" placeholder="请输入摄像机ID" class="keyword mg_right1" maxlength="50"  @change="filteremojifun($event,'deviceCode')"></el-input>
        </div>
        <div class="search-item">
          <span>摄像机名称：</span>
          <el-input v-model="deviceName" placeholder="请输入摄像机名称" class="keyword mg_right1" maxlength="50"  @change="filteremojifun($event,'deviceName')"></el-input>
        </div>
          <div class="search-item">
          <span>摄像机位置：</span>
          <el-input v-model="address" placeholder="请输入摄像机位置" class="keyword mg_right1" maxlength="50"  @change="filteremojifun($event,'address')"></el-input>
        </div>
        <div class="search-item">
          <span>布 控 状 态：</span>
          <el-select v-model="controlStatus" filterable placeholder="请选择布控状态" class="mg_right1 " maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="未布控" value="1"></el-option>
            <el-option label="已布控" value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="serchKey">搜索</el-button>
        </div>
      </div>
      <div class="container-content tablecontent ">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading" class="imgtable" >
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
          <el-table-column label="布控状态">
            <template slot-scope="scope">
              <p class="warnColor">{{scope.row.controlStatus|controlStatusFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="加入系统时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" class="grayBackground" v-if="scope.row.controlStatus==2">布控</el-button>
              <el-button size="mini" type="primary" @click="operation('control',scope.row.Id)"  v-if="scope.row.controlStatus==1">布控</el-button>
              <el-button size="mini" type="primary"  class="grayBackground" v-if="scope.row.controlStatus==1">移除</el-button>
              <el-button size="mini" type="primary" @click="operation('del',scope.row.Id)"  v-if="scope.row.controlStatus==2">移除</el-button>
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
  name: "clothcontrolsetting",
  data() {
    return {
      isloading: true,
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
      address: "",
      deviceCode: "",
      deviceName: "",
      controlStatus: ""
    };
  },
  created() {},
  mounted() {
    this.getControlList();
  },
  watch: {
    onlineStatus() {
      this.serchKey();
    },
    controlStatus() {
      this.serchKey();
    }
  },
  methods: {
     filteremojifun(e,name){//限制输入表情
      this[name] = this.$utils.filteremoji(e);
    },
    serchKey() {
      this.currentPage = 1;
      this.getControlList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getControlList();
    },
    getControlList() {
      this.isloading = true;
      this.$api.clothcontrolsetup
        .getControlList(
          this.currentPage,
          this.pagesize,
          this.deviceCode,
          this.deviceName,
          this.address,
          this.controlStatus
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getControlList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    operation(type, id) {
      if (type == "del") {
        this.$confirm("是否确定移除对该摄像机的布控？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          this.$api.clothcontrolsetup.deleteControl(id).then(res => {
            if (res.code == 200) {
              this.getControlList();
              this.$toaster.ok("移除成功");
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "control") {
        this.$router.push({
          name:'AddClothControl',
          query:{
            DEVICE_ID:id
          }
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
