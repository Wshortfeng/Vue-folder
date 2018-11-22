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
          系统日志
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>标题：</span>
          <el-input v-model="title" placeholder="请输入标题" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'title')"></el-input>
        </div>
        <div class="search-item">
          <span>类型：</span>
          <el-select v-model="type" filterable placeholder="请选择类型" class="mg_right1 " maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="PC" value="1"></el-option>
            <el-option label="APP" value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>创建时间：</span>
          <el-date-picker
          class="mg_right1"
          v-model="datetime"
          type="datetimerange"
          align="right"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions"
           :default-time="['00:00:00', '23:59:590']">
          </el-date-picker>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="serchKey">搜索</el-button>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="100px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="标题">
            <template slot-scope="scope">
              <p>{{scope.row.title}}</p>
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
             <el-popover trigger="hover" placement="top-start" :content="scope.row.content">
              <p slot="reference">{{scope.row.content}}</p>
            </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="scope">
              <p>{{scope.row.createBy}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
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
  name: "systemlog",
  data() {
    return {
      isloading: true,
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
      title: "",
      type: "",
      datetime: ["", ""],
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
  created() {},
  mounted() {
    this.getSysLogList();
  },
  watch:{
    type(){
      this.serchKey();
    }
  },
  methods: {
     filteremojifun(e,name){//限制输入表情
      this[name] = this.$utils.filteremoji(e);
    },
    serchKey() {
      this.currentPage = 1;
      this.getSysLogList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getSysLogList();
    },
    getSysLogList() {
      this.isloading = true;
      if (this.datetime == undefined || this.datetime == null) {
        var startTime = "";
        var endTime = "";
      } else {
        var startTime = this.$utils.zhDatetime(this.datetime[0]);
        var endTime = this.$utils.zhDatetime(this.datetime[1]);
      }
      this.$api.systemsetup
        .getSysLogList(
          this.currentPage,
          this.pagesize,
          this.title,
          this.type,
          this.startTime,
          this.endTime
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getSysLogList();
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
