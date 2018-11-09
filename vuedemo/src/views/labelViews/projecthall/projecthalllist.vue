<template>
  <div class="projecthall ">
    <el-card class="search-box " shadow="never" style="height:80px;">
      <span class="mg_right">排序方式：</span>
      <span class="sort-btn mg_right">
        <a href="javascript:;" @click="sortselect1(1,$event)" ></a>
        <span class="title">截止时间</span>
        <i class="el-icon-label-top" @click="sortselect($event,1,1)"></i>
        <i class="el-icon-label-bottom" @click="sortselect($event,2,1)"></i>
      </span>
      <span class="sort-btn mg_right">
        <a href="javascript:;" @click="sortselect1(2,$event)" ></a>
        <span class="title">剩余任务数</span>
        <i class="el-icon-label-top" @click="sortselect($event,1,2)"></i>
        <i class="el-icon-label-bottom" @click="sortselect($event,2,2)"></i>
      </span>
      <span class="sort-btn mg_right2">
        <a href="javascript:;" @click="sortselect1(3,$event)" ></a>
        <span class="title">报酬价格</span>
        <i class="el-icon-label-top" @click="sortselect($event,1,3)"></i>
        <i class="el-icon-label-bottom" @click="sortselect($event,2,3)"></i>
      </span>
      <!-- <span>关键字：</span> -->
      <el-input placeholder="根据项目方、项目号、项目标题、项目关键字搜索" v-model="keyWord" class="keyword1 mg_right" maxlength="50">
      </el-input>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
    </el-card>
    <div class="projecthall-list" v-loading="isloading">
      <el-row :gutter="12" class="projecthall-item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="16" class="item-left">
          <el-card shadow="hover">
            <div class="item-left-box">
              <div class="title">
                <span @click="goTo('ProjectHallDetail',item.id)">{{item.projectName}}</span>
              </div>
              <div class="content-content">
                <p class="graycolor"><span class="titlename">项目号：</span><span class="bottomcolor" @click="goTo('ProjectHallDetail',item.id)">{{item.projectNumber}}</span> </p>
                 <p class="graycolor"><span class="titlename">项目方：</span>{{item.company}}</p>
                <p class="graycolor"><span class="titlename">关键字：</span>{{item.productKey}}</p>
                <p class="graycolor"><span class="titlename">项目简介：</span>{{item.productContent|read}}</p>
                <p class="graycolor"><span class="titlename">剩余任务数：</span>{{item.residualTask}}</p>
                <p class="graycolor"><span class="titlename">截止时间：</span>{{item.endTime|zhDatetime}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" class="item-right">
          <el-card shadow="hover">
            <div class="content-content">
              <h1>报酬明细</h1>
              <ul>
                <li>标注报酬：{{item.labelPrice}}元</li>
                <li>审核报酬：{{item.reviewPrice}}元</li>
                <li>疑难杂症报酬：{{item.consultationPrice}}元</li>
                <li class="btn">
                  <el-button type="primary" @click="showapplybox(item.id,item.endTime)">申请项目</el-button>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
      </el-pagination>
      <div class="nocontent" v-if="total==0">
        <img :src="blankContent" v-show="showImg">
      </div>
    </div>
    <!-- 申请项目 -->
    <el-dialog title="申请项目" :visible.sync="showApplyProject" width="500px" class="deepbackground" center>
      <el-form :model="applyproject" class="demo-form-inline applyproject" label-width="150px">
        <el-form-item label="本批次项目任务数：">
          <div class="inputClass">{{applyproject.batchTaskAmount}}</div>
        </el-form-item>
        <el-form-item label="本批次截止时间：">
          <div class="inputClass">{{applyproject.endTime|zhDatetime}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applyprojectconfirm()">确 定</el-button>
        <el-button type="primary" @click="showApplyProject=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "projecthalllist",
  data() {
    return {
      isloading: false,
      keyWord: "",
      currentPage: 1, //初始页
      pagesize: 3, //    每页的数据
      total: 0, //总数
      itemType: "", // 	排序类型（1:截止时间，2：剩余任务数，3：报酬价格）
      type: "", //正序倒序（1:正序，2：倒序）
      tableData: [],
      showImg:false,
      id: 0,
      showApplyProject: false,
      applyproject: {
        batchTaskAmount: 0,
        endTime: ""
      },
      blankContent: require("../../../assets/img/blank_icon.png")
    };
  },
  watch: {
    // keyWord() {
    //   this.currentPage = 1;
    //   this.getLabelProjectList();
    // }
  },
  mounted() {
    this.getLabelProjectList();
  },
  methods: {
    serchKey() {
      this.currentPage = 1;
      this.getLabelProjectList();
    },
    sortselect1(itemType, e) {
      var type = 1;
      if (this.itemType == itemType) {
        if (this.type == 1) {
          type = 2;
          jQuery(e.target)
            .parent()
            .addClass("sortSelect")
            .siblings()
            .removeClass("sortSelect");
          jQuery(e.target)
            .parent()
            .find(".el-icon-label-bottom")
            .addClass("sortSelect1")
            .siblings()
            .removeClass("sortSelect1")
            .parent()
            .siblings()
            .find("i")
            .removeClass("sortSelect1");
        } else if (this.type == 2) {
          type = 1;
          jQuery(e.target)
            .parent()
            .addClass("sortSelect")
            .siblings()
            .removeClass("sortSelect");
          jQuery(e.target)
            .parent()
            .find(".el-icon-label-top")
            .addClass("sortSelect1")
            .siblings()
            .removeClass("sortSelect1")
            .parent()
            .siblings()
            .find("i")
            .removeClass("sortSelect1");
        }
      } else {
        type = 1;
        jQuery(e.target)
          .parent()
          .addClass("sortSelect")
          .siblings()
          .removeClass("sortSelect");
        jQuery(e.target)
          .parent()
          .find(".el-icon-label-top")
          .addClass("sortSelect1")
          .parent()
          .siblings()
          .find("i")
          .removeClass("sortSelect1");
      }
      this.itemType = itemType;
      this.type = type;
       this.currentPage = 1;
      this.getLabelProjectList();
    },
    sortselect(e, type, itemType) {
      jQuery(e.target)
        .parent()
        .addClass("sortSelect")
        .siblings()
        .removeClass("sortSelect");
      jQuery(e.target)
        .parent()
        .siblings()
        .find("i")
        .removeClass("sortSelect1");
      jQuery(e.target)
        .addClass("sortSelect1")
        .siblings()
        .removeClass("sortSelect1");
      this.type = type;
      this.itemType = itemType;
      this.currentPage = 1;
      this.getLabelProjectList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getLabelProjectList();
    },
    getLabelProjectList() {
      this.isloading = true;
      this.$api.label
        .getLabelProjectList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.itemType,
          this.type
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getLabelProjectList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading = false;
          }
          if(res.data.length==0){
            this.showImg=true;
          }else{
            this.showImg=false;
          }
        });
    },
    showapplybox(id, endTime) {
      this.id = id;
      this.applyBatchTaskAmount();
    },
    applyBatchTaskAmount() {
      this.$api.label
        .applyBatchTaskAmount(this.id)
        .then(res => {
          if (res.code == 200) {
            this.applyproject.batchTaskAmount = res.data.amount;
            this.applyproject.endTime = res.data.expireDate;
            this.showApplyProject = true;
          } else {
            this.showApplyProject = false;
            this.$toaster.error(res.msg);
          }
        })
        .catch(err => {
          this.$toaster.error(res.msg);
        });
    },
    applyprojectconfirm() {
      this.$api.label.applyProjectBatch(this.id).then(res => {
        if (res.code == 200) {
          this.getLabelProjectList();
          this.$toaster.ok(res.msg);
          this.showApplyProject = false;
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    goTo(name, id) {
      this.$utils.setSession("PROJECTID", id);
      this.$router.push({
        name: name
      });
    }
  },
  beforeRouteLeave (to, from, next) {//离开页面时
    // console.log(to.name)
    // console.log(from.name)
    if(to.name==='ProjectHallDetail'){
      from.meta.keepAlive=true;
    }else{
       from.meta.keepAlive=false;
    }
    next()//执行
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.projecthall {
  .deepbackground {
    .inputClass {
      height: 40px;
      color: white;
    }
    .el-dialog__body {
    padding: 20px 30px 20px 10px;
    }
  }

  background: #eff3f5;
  .search-box {
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 30px;
    .sort-btn {
      position: relative;
      padding-left: 15px;
      padding-right: 35px;
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid rgb(192, 196, 204);
      border-radius: 5px;
      cursor: pointer;
      color: gray;
      a{
        width:90%;height:100%;z-index:11;position:absolute;left:0px;top:1px;
      }
    }
    .el-icon-label-bottom {
      position: absolute;
      right: 5px;
      bottom: 6px;
    }
    .el-icon-label-top {
      position: absolute;
      right: 5px;
      top: 6px;
    }
  }
  .el-card{
    border-radius: 2px;
  }
  .projecthall-list {
    margin-bottom: 60px;
    min-height: 560px;
    .nocontent {
      height: 560px;
      background: white;
      text-align: center;
      padding-top: 60px;
    }
    .projecthall-item {
      margin-top: 10px;
      .item-left {
        .item-left-box {
          border: 1px solid #eeeeee;
          padding-left: 60px;
          padding-right: 15px;
          min-height: 233px;
          word-break:break-all;
          .title {
            span {
              font-size: 18px;
              line-height: 250%;
              border-bottom: 2px solid #5a7cd0;
              cursor: pointer;
            }
          }
          .content-content {
            width: 100%;
            p {
              line-height: 185%;
            }
            .bottomcolor {
              border-bottom: 1px solid #5a7cd0;
              cursor: pointer;
            }
            .graycolor {
              color: gray;
            }
            .titlename {
              color: black;
            }
          }
        }
      }
      .item-right {
        height: 275px;
        .content-content {
          width: 100%;
          h1 {
            font-size: 20px;
            text-align: center;
            line-height: 60px;
          }
          li {
            text-align: center;
            line-height: 36px;
            .el-button {
              margin-top: 12px;
            }
          }
          .btn{
             line-height: 65px;
          }
        }
      }
    }
  }
}
</style>
