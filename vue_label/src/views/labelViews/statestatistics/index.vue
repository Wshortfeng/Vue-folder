<template>
  <div class="statestatistics  content-padding">
    <div class="operation_box">
      <el-radio-group v-model="active">
        <el-radio-button label="1">标注任务</el-radio-button>
        <el-radio-button label="2">审核任务</el-radio-button>
      </el-radio-group>
      <div class="search-box">
        <el-date-picker class="mg_right" v-model="daterange" type="daterange" :default-time="['00:00:00', '23:59:59']" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" @click="serchKey()">搜索</el-button>
      </div>
    </div>
    <div class="statestatistics-main">
      <div class="statestatistics-content tablecontent" v-if="active==1">
        <el-table :data="labelTaskList" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading1">
          <el-table-column label="已申请任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item1}}</p>
            </template>
          </el-table-column>
          <el-table-column label="已提交任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item2}}</p>
            </template>
          </el-table-column>
          <el-table-column label="完成任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item3}}</p>
            </template>
          </el-table-column>
          <el-table-column label="失败任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item4}}</p>
            </template>
          </el-table-column>
          <el-table-column label="放弃任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item5}}</p>
            </template>
          </el-table-column>
          <el-table-column label="过期任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item6}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="statestatistics-content tablecontent" v-else>
        <el-table :data="reviewTaskList" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading2">
          <el-table-column label="已分配任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item1}}</p>
            </template>
          </el-table-column>
          <el-table-column label="已提交任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item2}}</p>
            </template>
          </el-table-column>
          <el-table-column label="已通过任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item3}}</p>
            </template>
          </el-table-column>
          <el-table-column label="未通过任务数">
            <template slot-scope="scope">
              <p>{{scope.row.item4}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statestatistics",
  data() {
    return {
      isloading1: false,
      isloading2: false,
      active: "1",
      labelTaskList: [], //标注任务
      reviewTaskList: [], //审核任务
      daterange: [
        new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),
        new Date()
      ], //最近一周
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
      }
    };
  },
  mounted() {
    this.getLabelTaskStatistics();
  },
  watch: {
    active(value) {
      if (value == 1) {
        this.getLabelTaskStatistics();
      } else {
        this.getReviewTaskStatistics();
      }
    }
  },
  methods: {
    serchKey() {
      if (this.active == 1) {
        this.getLabelTaskStatistics();
      } else {
        this.getReviewTaskStatistics();
      }
    },
    getLabelTaskStatistics() {
      this.isloading1 = true;
      if (this.daterange == undefined || this.daterange == null) {
        var beginDate = "";
        var endDate = "";
      } else {
        var beginDate = this.$utils.zhDatetime(this.daterange[0]);
        var endDate = this.$utils.zhDatetime(this.daterange[1]);
      }
      this.$api.label.getLabelTaskStatistics(beginDate, endDate).then(res => {
        if (res.code == 200) {
          this.isloading1 = false;
          var obj = {};
          obj.item1 = res.data[0];
          obj.item2 = res.data[1];
          obj.item3 = res.data[2];
          obj.item4 = res.data[3];
          obj.item5 = res.data[4];
          obj.item6 = res.data[5];
          this.labelTaskList.splice(0, 1, obj);
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    getReviewTaskStatistics() {
      this.isloading2 = true;
      if (this.daterange == undefined || this.daterange == null) {
        var beginDate = "";
        var endDate = "";
      } else {
        var beginDate = this.$utils.zhDatetime(this.daterange[0]);
        var endDate = this.$utils.zhDatetime(this.daterange[1]);
      }
      this.$api.label.getReviewTaskStatistics(beginDate, endDate).then(res => {
        if (res.code == 200) {
          this.isloading2 = false;
          var obj = {};
          obj.item1 = res.data[0];
          obj.item2 = res.data[1];
          obj.item3 = res.data[2];
          obj.item4 = res.data[3];
          this.reviewTaskList.splice(0, 1, obj);
        } else {
          this.$toaster.error(res.msg);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.statestatistics {
  .el-tabs {
    height: 41px;
  }
  .statestatistics-main {
    height: 560px;
    border-top: none;
    position: relative;
    margin-top: 19px;
    .statestatistics-content {
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
    }
  }
  .operation_box {
    position: relative;
    .search-box {
      margin: 0;
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;

    }
  }
}
</style>
