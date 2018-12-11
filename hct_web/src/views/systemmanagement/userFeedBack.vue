<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>投诉内容：</span>
          <el-input v-model="content" placeholder="请输入投诉内容" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'content')"></el-input>
        </div>
        <div class="search-item mg_right1">
           <el-button type="primary" @click="serchKey()" >搜索</el-button>
        </div>
        <!-- <div class="search-item">
           <el-button type="primary" @click="show('addeditbox',0)" >新增</el-button>
        </div> -->
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="100px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
           <el-table-column label="来源手机号" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
           <el-table-column label="来源门店编号" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.number}}</p>
            </template>
          </el-table-column>
          <el-table-column label="投诉内容">
            <template slot-scope="scope">
               <el-popover trigger="hover" placement="top-start" :content="scope.row.content" >
                <p slot="reference">{{scope.row.content}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
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
  name: "userFeedBack",
  data() {
    return {
      isloading: true,
      name: "",
      currentPage: 1, //初始页
      pagesize: 15, //    每页的数据
      total: 0, //总数
      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.getFeedbackList();
  },
  methods: {
    filteremojifun(e, name, ruleForm) {
      this.$utils.filteremojifun(this, e, name, ruleForm);
    },
    serchKey() {
      this.currentPage = 1;
      this.getFeedbackList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getFeedbackList();
    },
    getFeedbackList() {
      this.isloading = true;
      this.$api.systemmanagement.getFeedbackList(this.currentPage, this.pagesize,this.content).then(res => {
        if (this.currentPage != 1 && res.data.length == 0) {
          this.currentPage = this.currentPage - 1;
          this.getFeedbackList();
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
