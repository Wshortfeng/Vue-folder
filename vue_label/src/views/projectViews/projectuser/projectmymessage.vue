<template>
  <div class="projectmessage  content-padding">
    <div class="search-box">
      <span>标题：</span>
      <el-input v-model="title" placeholder="请输入标题" class="keyword3 mg_right6" maxlength="50"></el-input>
      <span>状态：</span>
      <el-select v-model="isRead" placeholder="请选择状态" class="mg_right6" style="width:100px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span>创建时间：</span>
      <el-date-picker class="mg_right6" v-model="tradingtime" type="daterange" :default-time="['00:00:00', '23:59:59']"   align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
      </el-date-picker>

      <el-button type="primary" @click="serchKey()" class="mg_right7">搜索</el-button>
      <el-button @click.native="setAllNotificationRead()" style="padding:12px 10px;" class="item-right">全部标记已读</el-button>
    </div>

    <div class="projectmessage-list tablecontent ">
      <el-table :data="tableData" style="width: 1650px" v-loading="isloading" show-overflow-tooltip="true" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}">
        <el-table-column prop="title" label="标题" width="200px">
        </el-table-column>
        <el-table-column label="内容" >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top-start" :content="scope.row.content">
              <p slot="reference">{{scope.row.content}}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="单据号" width="220px">
          <template slot-scope="scope">
            <p @click="goTo(scope.row.objectId,scope.row.billType,scope.row.status,scope.row.projectId)" class="underlineColor">{{scope.row.billNo}}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope="scope">
            <p @click="setNotificationRead(scope.row.isRead,scope.row.id)" :class="{readColor:scope.row.isRead==1,noreadColor:scope.row.isRead==2}">{{scope.row.isRead|formatStatus}}</p>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160px">
          <template slot-scope="scope">
            <p>{{scope.row.createDate|zhDatetime}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectmessage",
  data() {
    return {
      isloading: true,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "未读"
        },
        {
          value: "2",
          label: "已读"
        }
      ],
      isRead: "",
      title: "",
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
      pickerOptions: {
         shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // tradingtime: [
      //   new Date(
      //     new Date().getFullYear(),
      //     new Date().getMonth() + 1,
      //     new Date().getDate(),
      //     0,
      //     0
      //   ),
      //   new Date(
      //     new Date().getFullYear(),
      //     new Date().getMonth() + 1,
      //     new Date().getDate(),
      //     23,
      //     59
      //   )
      // ]
      tradingtime: ["", ""]
    };
  },
  filters: {
    formatStatus(value) {
      if (value == 1) {
        return "未读";
      } else if (value == 2) {
        return "已读";
      }
    }
  },
  watch: {
    // title() {
    //   this.isloading = true;
    //   this.currentPage = 1;
    //   this.getNotificationList();
    // },
    isRead() {
      this.isloading = true;
      this.currentPage = 1;
      this.getNotificationList();
    },
    // tradingtime() {
    //   this.isloading = true;
    //   this.currentPage = 1;
    //   this.getNotificationList();
    // }
  },
  created() {
    this.getNotificationList();
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.isloading = true;
      this.getNotificationList();
    },
    serchKey() {
      this.currentPage = 1;
      this.isloading = true;
      this.getNotificationList();
    },
    chooseTimeRange(t) {},
    getNotificationList() {
      this.$store.dispatch("user/getNotReadMessageCount");
      if (this.tradingtime == undefined || this.tradingtime == null) {
        var beginTime = "";
        var endTime = "";
      } else {
        var beginTime = this.$utils.zhDatetime(this.tradingtime[0]);
        var endTime = this.$utils.zhDatetime(this.tradingtime[1]);
      }
      this.$api.project
        .getNotificationList(
          this.currentPage,
          this.pagesize,
          this.title,
          this.isRead,
          beginTime,
          endTime
        )
        .then(res => {
          this.total = res.pageInfo.total;
          this.tableData = res.data;
          this.isloading = false;
        });
    },
    setAllNotificationRead() {
      this.$api.project.setAllNotificationRead().then(res => {
        if (res.code == 200) {
          this.getNotificationList();
          this.$toaster.ok(res.msg);
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    setNotificationRead(isRead, id) {
      if (isRead == 2) {
        return;
      } else {
        this.$api.project.setNotificationRead(id).then(res => {
          if (res.code == 200) {
            this.getNotificationList();
            this.$toaster.ok(res.msg);
          } else {
            this.$toaster.error(res.msg);
          }
        });
      }
    },
    goTo(objectId, billType, status, projectId) {
      if (billType == 1) {
        this.$utils.setSession("projectId", objectId);
        this.$router.push({
          name: "ProjectMyMessageDetail"
        });
      } else if (billType == 2) {
        if (status <= 2 || status > 7) {
          this.$utils.setSession("projectId", projectId);
          if (status == 0) {
            this.$utils.setSession("batchId", 0);
          } else {
            this.$utils.setSession("batchId", objectId);
          }
          this.$router.push({
            name: "MessageBatchDetail"
          });
        } else {
          this.$router.push({
            name: "MessageProjectViewsMarkingTool"
          });
        }
      } else if (billType == 3) {
        this.$router.push({
          name: "MessageProjectViewsMarkingTool"
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.projectmessage {
  .surplusamount-box {
    line-height: 30px;
    margin-bottom: 15px;
  }
  .projectmessage-list {
    margin-top: 15px;
    height: 600px;
    position: relative;

    table {
      th,
      td {
        text-align: center;
        .cell {
          line-height: 23px !important;
          white-space: nowrap;
          width: 100%; /* IE6 需要定义宽度 */
          overflow: hidden;
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
</style>
