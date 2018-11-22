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
          告警列表
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <el-radio-group v-model="alarmStatus" >
            <el-radio-button label="2"><i class="el-icon-safetyproduction-yichuli"></i>已处理告警</el-radio-button>|
            <el-radio-button label="1"><i class="el-icon-safetyproduction-weichulidingdan"></i>未处理告警</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="100px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="告警图标">
            <template slot-scope="scope">
              <p>
                <img src="../../assets/img/warn1.png" v-if="scope.row.alarmColor==1">
                <img src="../../assets/img/warn2.png" v-if="scope.row.alarmColor==2">
                <img src="../../assets/img/warn3.png" v-if="scope.row.alarmColor==3">
              </p>
            </template>
          </el-table-column>
          <el-table-column label="告警类型">
             <template slot-scope="scope">
              <p>{{scope.row.alarmType|alarmTypeFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="优先级">
            <template slot-scope="scope">
              <p>{{scope.row.priority|priorityFormat}}</p>
            </template>
          </el-table-column>
           <el-table-column label="告警文字">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.alarmText">
                <p slot="reference">{{scope.row.alarmText}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="状态">
             <template slot-scope="scope">
              <p>{{scope.row.alarmStatus|alarmStatusFormat}}</p>
            </template>
          </el-table-column>
           <el-table-column :label="alarmStatus==2?'处理人':'发送人'">
             <template slot-scope="scope">
              <p>{{scope.row.username}}</p>
            </template>
          </el-table-column>
          <el-table-column label="告警时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
           <el-table-column label="操作" v-if="alarmStatus==1">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.Id,'handle')">处理</el-button>
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
      alarmStatus:1,
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
    };
  },
  created() {
  },
  mounted() {
    this.alarmStatus=this.$route.query.TYPE
  },
  watch: {
    alarmStatus() {
      this.total=0;
      this.tableData=[];
      this.serchKey();
    }
  },
  methods: {
    serchKey() {
      this.currentPage = 1;
      this.getAlarmStatusList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getAlarmStatusList();
    },
    getAlarmStatusList() {
      this.isloading = true;
      this.$api.status
        .getAlarmStatusList(
          this.currentPage,
          this.pagesize,
          this.alarmStatus,
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getAlarmStatusList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    operation(id, type) {
      if (type == "handle") {
        this.$confirm("是否确定处理该警告？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(res => {
            this.$api.status.updateAlarm(id).then(res => {
              if (res.code == 200) {
                this.getAlarmStatusList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
