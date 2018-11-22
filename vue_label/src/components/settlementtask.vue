<template>
  <div class="settlementtask">
    <el-dialog :title="title" :visible.sync="settlementtaskFormVisible" width="600px" @close="close" class="deepbackground" center>
      <el-form class="demo-form-inline settlementtaskForm" label-width="100px">
        <el-form-item label="标注报酬：">
          <el-input v-model="settlementtaskForm.totalTagging" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="初审报酬：">
          <el-input v-model="settlementtaskForm.totalFirstReview" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="复审报酬：">
          <el-input v-model="settlementtaskForm.totalSecondReview" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="会诊报酬：" v-if="showconsultation">
          <el-input v-model="settlementtaskForm.totalConsultation" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="总计：">
          <el-input v-if="showconsultation" :value="settlementtaskForm.totalTagging+settlementtaskForm.totalFirstReview+settlementtaskForm.totalSecondReview+settlementtaskForm.totalConsultation" maxlength="50" disabled></el-input>
          <el-input v-else :value="settlementtaskForm.totalTagging+settlementtaskForm.totalFirstReview+settlementtaskForm.totalSecondReview" maxlength="50" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="settlementtask()">确 定</el-button>
        <el-button type="primary" @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "settlementtask",
  props: {
    // route object
    settlementtaskFormVisible: false,
    showconsultation: false,
    settlementtaskId: 0,
    title: ""
  },
  data() {
    return {
      settlementtaskForm: {
        totalTagging: 0,
        totalFirstReview: 0,
        totalSecondReview: 0,
        totalConsultation: 0
      }
    };
  },
  watch: {
    settlementtaskFormVisible(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.settlementtaskFormVisible = newValue;
      if (this.settlementtaskFormVisible) {
        this.getsettlementtask();
      }
    }
  },
  methods: {
    close() {
      this.$emit("closesettlementtaskForm");
    },
    settlementtask() {
      if (this.showconsultation) {
        this.$api.project.settlePuzzleTask(this.settlementtaskId).then(res => {
          if (res.code == 200) {
            this.$toaster.ok("结算成功");
            this.close();
          } else {
            this.$toaster.error(res.msg);
          }
        });
      } else {
        this.$api.project
          .settleProjectBatch(this.settlementtaskId)
          .then(res => {
            if (res.code == 200) {
              this.$toaster.ok("结算成功");
              this.close();
            } else {
              this.$toaster.error(res.msg);
            }
          });
      }
    },
    getsettlementtask() {
      if (this.showconsultation) {
        this.$api.project
          .getPuzzleTaskAmount(this.settlementtaskId)
          .then(res => {
            if (res.code == 200) {
              this.settlementtaskForm = res.data;
            }
          });
      } else {
        this.$api.project
          .getProjectBatchAmount(this.settlementtaskId)
          .then(res => {
            if (res.code == 200) {
              this.settlementtaskForm = res.data;
            }
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.settlementtaskForm {
  width: 500px;
  margin: 0 auto;
  .el-input.is-disabled .el-input__inner {
    color: white;
  }
}
</style>
