<template>
  <div class="projectstatestatistics  content-padding">
    <span>进行中的项目：</span>
    <el-select v-model="active" filterable placeholder="请搜索或选择项目">
      <el-option v-for="item in options" :key="item.id" :label="item.projectName" :value="item.id">
      </el-option>
    </el-select>
    <div id="myChart" :style="{ height: '600px'}"></div>
    <ul class="data-box" v-if="sum>0">
       <li v-for="(item,index) in dataArray" :key="index" >{{((item/sum)*100).toFixed(2)}}%</li>
    </ul>
     <ul class="data-box"  v-else>
       <li v-for="(item,index) in dataArray" :key="index" >{{0.00}}%</li>
    </ul>
    <ul class="data-box1">
      <li v-for="(item,index) in dataArray" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "projectstatestatistics",
  data() {
    return {
      options: [],
      active: "",
      dataArray: [],
      projectArray: [],
      sum: 0
    };
  },
  computed: {
    ...mapState("common", ["projectnavVal"])
  },
  watch: {
    projectnavVal() {
      this.getProjectTaskStatistics();
    },
    active(value) {
      if (value == "") {
        return;
      }
      this.projectArray.forEach(item => {
        if (item.id == value) {
          this.projectName = item.projectName;
        }
      });
      this.getProjectTaskStatistics();
    }
  },
  created() {
    this.getProgressProjectList();
  },
  mounted() {},
  methods: {
    getProgressProjectList() {
      this.$api.project.getProgressProjectList().then(res => {
        if (res.code == 200) {
          this.options = res.data;
          this.active = res.data[0].id;
          this.projectName = res.data[0].projectName;
          this.projectArray = res.data;
          this.getProjectTaskStatistics();
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    getProjectTaskStatistics() {
      this.$api.project.getProjectTaskStatistics(this.active).then(res => {
        if (res.code == 200) {
          this.dataArray = res.data;
          var total = 0;
          this.dataArray.forEach(i => {
            total = i + total;
          });
          this.sum = total;
          this.drawLine(this.projectName);
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    drawLine(projectName) {
      var dataArray = this.dataArray;
      var dataTitle = [
        "    待分配   ",
        "    进行中   ",
        "    待验收   ",
        " 验收不通过",
        "    待仲裁   ",
        "    待结算   ",
        "    已完成   "
      ];
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart")); // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: [
          "#CEDAF8",
          "#3AA0FF",
          "#4ECB73",
          "#FBD337",
          "#F04864",
          "#975FE4",
          "#36CBCB"
        ],
        legend: {
          orient: "vertical",
          right: 380,
          top: 100,
          bottom: 20,
          itemGap: 25,
          selectedMode: false, //取消图例上的点击事件
          data: [
            {
              name: dataTitle[0],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            },
            {
              name: dataTitle[1],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            },
            {
              name: dataTitle[2],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            },
            {
              name: dataTitle[3],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            },
            {
              name: dataTitle[4],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            },
            {
              name: dataTitle[5],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            },
            {
              name: dataTitle[6],
              icon: "circle",
              textStyle: {
                lineHeight: 50
              }
            }
          ],
          formatter: function(name) {
            var index = dataTitle.indexOf(name);
            return "  " + name + " ";
          },
          textStyle: {
            fontSize: 15,
            height: 80
          }
        },
        calculable: true,
        series: [
          {
            name: this.projectName,
            type: "pie",
            radius: ["35%", "45%"],
            center: ["32%", "40%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: dataArray[0], name: dataTitle[0] },
              { value: dataArray[1], name: dataTitle[1] },
              { value: dataArray[2], name: dataTitle[2] },
              { value: dataArray[3], name: dataTitle[3] },
              { value: dataArray[4], name: dataTitle[4] },
              { value: dataArray[5], name: dataTitle[5] },
              { value: dataArray[6], name: dataTitle[6] }
            ]
          }
        ]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.projectstatestatistics {
  color: #666;
  position: relative;
  .data-box {
    position: absolute;
    right: 340px;
    top: 164px;
    li {
      width:90px;
      text-align: center;
      line-height: 25px;
      height: 25px;
      margin: 15px 0 15px 0;
      border-left: 1px solid #a2a2a54d;
      color:#666;
    }
  }
  .data-box1 {
    position: absolute;
    right: 270px;
    top: 164px;
    li {
      width:60px;
      text-align: center;
      line-height: 25px;
      height: 25px;
      margin: 15px 0 15px 0;
      border-right: 1px solid #a2a2a54d;
    }
  }
}
</style>
