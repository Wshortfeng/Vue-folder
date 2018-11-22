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
          摄像机状态
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>摄 像 机 ID：</span>
          <el-input v-model="deviceCode" placeholder="请输入摄像机ID" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'deviceCode')"></el-input>
        </div>
         <div class="search-item">
          <span>摄像机名称：</span>
          <el-input v-model="deviceName" placeholder="请输入摄像机名称" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'deviceName')"></el-input>
        </div>
        <div class="search-item">
          <span>摄像机状态：</span>
          <el-select v-model="onlineStatus" filterable placeholder="请选择摄像机状态" class="mg_right1 " maxlength="50">
            <el-option label="全部" value=""></el-option>
           <el-option label="已加入" value="1"></el-option>
            <el-option label="未加入" value="2"></el-option>
          </el-select>
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
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading" class="imgtable">
         <el-table-column label="摄像机">
            <template slot-scope="scope">
             <p><img src="../../assets/img/camera.png" ></p>
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
              <p :class="{greenColor:scope.row.onlineStatus==1,redColor:scope.row.onlineStatus==2}">{{scope.row.onlineStatus|enterStatusFormat}}</p>
            </template>
          </el-table-column>
           <el-table-column label="布控状态">
            <template slot-scope="scope">
              <p class="warnColor">{{scope.row.controlStatus|controlStatusFormat}}</p>
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
  name: "controlstate",
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
      onlineStatus: "",
      controlStatus:'',
    };
  },
  created() {},
  mounted() {
    this.getDeviceStatusList();
  },
  watch:{
    onlineStatus(){
      this.serchKey();
    },
    controlStatus(){
      this.serchKey();
    }
  },
  methods: {
     filteremojifun(e,name){//限制输入表情
      this[name] = this.$utils.filteremoji(e);
    },
    serchKey() {
      this.currentPage = 1;
      this.getDeviceStatusList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getDeviceStatusList();
    },
    getDeviceStatusList() {
      this.isloading = true;
      this.$api.status
        .getDeviceStatusList(
          this.currentPage,
          this.pagesize,
          this.deviceCode,
          this.deviceName,
          this.address,
          this.onlineStatus,
          this.controlStatus
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getDeviceStatusList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
