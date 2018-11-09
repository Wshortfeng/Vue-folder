<template>
  <div id="home-page">
    <div class="headerclass" id="dialogue_box">
      <div class="bg-img">
        <img src="../assets/img/login_bg.jpg" alt="">
        <ul class="text">
          <li>用最聪慧的大脑</li>
          <li>打造最温暖的健康</li>
        </ul>
      </div>
      <div class="nav-header">
        <div class="header-header">
          <img src="../assets/homelogo.png" alt="logo">
          <div class="login-btn opreat-btn" @click="goTo('Login')">
            <img src="../assets/img/login-icon1.png"> 登录
          </div>
          <div class="register-btn opreat-btn" @click="goTo('Register')">
            <img src="../assets/img/register-icon1.png"> 注册
          </div>
        </div>
      </div>
    </div>
    <div class="home-content" >
      <el-row>
        <el-col :span="6" class="home-content-nav">
          <div>
            <div class="title" ref="content">
              <div class="left-title">
                Our Platform
              </div>
              <img src="../assets/img/home-bottom.png">
            </div>
            <ul>
              <li v-for="(item,index) in lidata" :key="index" :class="{active:item.active}" @click="selctLi(index)">{{item.name}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18" class="home-content-content">
          <el-row v-if="acitve==0">
            <el-col :span="12" class="img-content">
              <img src="../assets/img/aboutus1.png" alt="">
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h5>医素简介</h5>
                <p>医素标注系统是国内首家以“开放，共享”为宗旨的大型医学数据标注平台，旨在促进“数据，标注，算法，应用”的高效衔接，开创医学人工智能研发新模式。</p>
                <p>在这个平台上，拥有数据和想法的机构可以方便的找到优秀医师进行高质量的医学标注，对接优秀的算法团队开发AI应用。资深医学专家可以轻松的找到同道和团队，将毕生医学思想打造成专属的AI工具，造福临床。年资尚浅的医生可以通过参与各种医学标注任务锤炼技能，增长经验，变现医学知识。计算机专家可以一举获得高质量的标注数据和基于临床的开发需求，不再为算法落地烦恼。</p>
                <p>资源需要汇聚融合，应用要求精准和多样化。医素致力于打通将资源隔离开来的行业壁垒，知识壁垒，数据壁垒，让资源流动起来，共享起来，从而支撑起各个资源方个性化的诉求和需求，打造一个医学人工智能全产业链服务共同体。</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="acitve==2">
            <el-col :span="12" class="img-content">
              <img src="../assets/img/operationflow1.png" alt="">
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h5>业务流程</h5>
                <p>平台提供规范的标注流程和质量审核管理机制，保证各方基本权益，并对争议问题提供仲裁。</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="acitve==1">
            <el-col :span="12" class="img-content">
              <img src="../assets/img/platformstructure1.png" alt="">
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h5>平台结构</h5>
                <p>医素标注系统1.0是一个双向平台，主要由项目方和标注方构成。</p>
                <div style="padding-left:2em;padding:10px;color:gray;">
                  <span>1）拥有数据，寻求标注服务的项目方可以在平台上发布标注任务，上传数据，定制审核标准，在平台协助下进行项目管理和验收。</span><br>
                  <span>2）拥有相应医学资质和技能的标注方则可以在项目大厅中寻找合适项目，申请任务，在工作台上进行标注，接受审核验收，并获得报酬。其中符合要求的标注人还可应邀担任特定项目审核方，对标注方提交的标注结果进行审核和疑难会诊。</span><br>
                  <span>3）医素平台则为项目方和标注方提供交易平台，流程管理，以及相关的数据预处理和算法对接服务。</span><br>
                </div>
                <p>随着项目经验和数据不断积累，医素标注系统还将推出2.0版本，开放算法开发，应用开发等第三方服务接口，实现从数据到应用的完整的医学人工智能服务产业链。</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="acitve==3">
            <el-col :span="12" class="img-content">
              <img src="../assets/img/businesssolution1.png" alt="">
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h5>商务方案</h5>
                <p>医素平台提供标准化的商务解决方案，包括若干定制选项，供项目方选择。</p>
                <p>项目总价由众包任务总价和平台佣金两部分组成。众包总价是由通过验收的任务数和相应的任务单价（标注/审核/会审）相乘并加总得出。平台佣金则在任务众包总价基础上加成计算得出，用来支付平台运营，管理，和仲裁成本。</p>
                <p>项目金由项目方在项目上架发布之前托管到平台指定账号，项目金的支付则在项目方验收数据后由平台组织支付给相关标注/审核人员。</p>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="acitve==4">
            <el-col :span="12" class="img-content">
              <img src="../assets/img/markingtoolbench1.png" alt="">
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h5>工作台示例</h5>
                <p>工作台是标注师进行标注，审核师进行审核，以及项目方进行验收查看的核心页面，功能众多，由三大部分组成。</p>
                <div style="padding-left:2em;padding:10px;color:gray;">
                  <span>1）左面的文档栏可以批量读入相关医学图像数据和关联的病历文本，并自动记录和更新相关操作和工作状态。</span><br>
                  <span>2）中间为标注工作区，上半部分展示医学图像，并提供一系列点，线，框等标注工具，有标注师根据实际需要选用，对图像细节进行标注。下半部分为诊断字幕标注区，由标注师对图像整体进行医学判断，通过回答选择题和自由文本两种字幕标注方式记录下来。</span><br>
                  <span>3）右面为标注结果展示区。工作区生成的标注元素自动在右边列表展示，并可添加备注，与中间工作区的图标一一对应，方便查看编辑。</span><br>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <footer-bottom />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import footerBottom from "./../components/footerbottom";
export default {
  components: { footerBottom },
  data() {
    return {
      isLogin: false,
      role: 1,
      acitve: 0,
      lidata: [
        {
          active: true,
          name: "医素简介"
        },
        {
          active: false,
          name: "平台结构"
        },
        {
          active: false,
          name: "业务流程"
        },
        {
          active: false,
          name: "商务方案"
        },
        {
          active: false,
          name: "工作台示例"
        }
      ]
    };
  },
  created() {
    if (this.$utils.getToken() == "" || this.$utils.getToken() == undefined) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  computed: {
    ...mapState("common", ["labelnavVal"]),
    ...mapState("user", ["nickName"]),
    ...mapState("user", ["userType"])
  },
  mounted() {},
  methods: {
    goTo(name) {
      this.$router.push({
        name: name
      });
    },
    selctLi(index) {
      this.lidata.map((item, i) => {
        item.active = false;
        this.acitve = index;
        if (i == index) {
          item.active = true;
        }
        return item;
      });
    }
  }
};
</script>
<style lang="less" scope>
#home-page {
  background: white;
  .headerclass {
    width: 100%;
    position: relative;
    .bg-img {
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        top: 30%;
        left: 18%;
        color: white;
        li {
          text-align: center;
          line-height: 180%;
          font-size: 4vw !important;
        }
      }
    }
    .nav-header {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      img {
        height: 6vw;
        float: left;
        margin-left: 6%;
      }
      .logo-title {
        margin-left: 10px;
        height: 80px;
        display: inline-block;
        line-height: 80px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 5px;
      }
      .opreat-btn {
        color: white;
        position: absolute;
        display: inline-block;
        top: 40px;
        width: 2vw;
        text-align: center;
        cursor: pointer;
        img {
          width: 2vw;
          height: 2vw;
        }
      }
      .login-btn {
        right: 10%;
      }
      .register-btn {
        right: 6%;
      }
    }
  }
  .home-content {
    border-bottom: 5px solid #eff3f5;
    .home-content-nav {
      padding-bottom: 6vw;
      background: #11253f;
      .title {
        margin-top: -7vw;
        background: #023568;
        color: white;
        .left-title {
          display: inline-block;
          width: 67.5%;
          text-align: right;
          font-size: 1.5vw;
          height: 5vw;
          line-height: 5vw;
        }
        img {
          width: 22%;
          float: right;
        }
      }
      ul {
        background: #11253f;
        padding-left: 30%;
        li {
          width: 100%;
          color: white;
          font-size: 1.5vw;
          height: 5vw;
          line-height: 5vw;
          text-align: left;
          cursor: pointer;
        }
        li.active,
        li:hover {
          color: #488cdc;
        }
      }
    }
    .home-content-content {
      background: white;
      .img-content {
        padding-top: 2.2vw;
        padding-left: 2vw;
        img {
          width: 90%;
        }
      }
      .grid-content {
        padding-right: 20px;
        h5 {
          text-align: center;
          line-height: 300%;
          font-size: 1.5vw;
        }
        p,
        span {
          text-indent: 2em;
          line-height: 180%;
          font-size: 0.9vw;
        }
      }
    }
  }
}
@media screen and (max-width: 2000px) {
  #home-page {
    .headerclass {
      .opreat-btn {
        top: 38px;
      }
    }
     .home-content-nav {
      padding-bottom: 5vw;
      }
    .home-content {
      .home-content-content {
        .img-content {
          padding-top: 3.5vw;
          padding-left: 1.5vw;
          img {
            width: 95%;
          }
        }
        .grid-content {
          h5 {
            font-size: 1.4vw;
          }
          p,
          span {
            font-size: 0.9vw;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1800px) {
  #home-page {
    .headerclass {
      .opreat-btn {
        top: 35px;
      }
    }
      .home-content-nav {
      padding-bottom: 4vw;
      }
    .home-content {
      .home-content-content {
        .img-content {
          padding-top: 3.5vw;
          padding-left: 1.8vw;
          img {
            width: 95%;
          }
        }
        .grid-content {
          h5 {
            font-size: 1.5vw;
          }
          p,
          span {
            font-size: 1vw;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  #home-page {
    .headerclass {
      .bg-img {
        .text {
          li {
            font-size: 50px !important;
          }
        }
      }
      .nav-header {
        img {
          height: 90px;
        }
        .opreat-btn {
          top: 30px;
          width: 30px;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    .home-content {
      .home-content-nav {
         padding-bottom: 20px !important;
        background: #11253f;
        .title {
          margin-top: -90px;
          .left-title {
            font-size: 18px;
            height: 80px;
            line-height: 80px;
          }
          img {
            width: 80px;
            height: 80px;
          }
        }
        ul {
          li {
            font-size: 18px;
            height: 80px;
            line-height: 80px;
          }
        }
      }
      .home-content-content {
        .img-content {
          padding-top: 50px;
          padding-left: 15px;
          img {
            width: 100%;
          }
        }
        .grid-content {
          padding-bottom: 15px;
          h5 {
            font-size: 20px;
          }
          p,
          span {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
