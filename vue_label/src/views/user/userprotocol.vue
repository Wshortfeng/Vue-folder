<template>
  <div class="userprotocol">
    <user-nav/>
    <div class="main">
      <div class="content">
        <p class="title">用户协议</p>
        <p class="content-title">
          一、用户帐号
        </p>
        <p>
          1.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。保宝网有权对会员的权限设计进行变
        </p>
        <p class="content-title">
          二、隐私保护
        </p>
        <p>
          2.1 本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：
        </p>
        <p>
          (1)事先获得用户的明确授权；
        </p>
        <p>
          (2)根据有关的法律法规要求；
        </p>
        <p>
          (3)按照相关政府主管部门的要求；
        </p>
        <p>
          (4)为维护社会公众的利益。
        </p>
        <p>
          2.2 本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。
        </p>
        <p>
          2.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
        </p>
        <p class="content-title">
          三、版权声明
        </p>
        <p>
          3.1 本站的文字、图片、音频、视频等版权均归永兴元科技有限公司享有或与作者共同享有，未经本站许可，不得任意转载。
        </p>
        <p>
          3.2 本站特有的标识、版面设计、编排方式等版权均属永兴元科技有限公司享有，未经本站许可，不得任意复制或转载。
        </p>
        <p>
          3.3 使用本站的任何内容均应注明“来源于保宝网”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本站及作者及支付稿酬，并独立承担一切法律责任。
        </p>
        <p>
          3.4 本站享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。
        </p>
        <p>
          3.5 本站所有内容仅代表作者自己的立场和观点，与本站无关，由作者本人承担一切法律责任。
        </p>
        <p>
          3.6 恶意转载本站内容的，本站保留将其诉诸法律的权利。
        </p>
        <p class="content-title">
          四、责任声明
        </p>
        <p>
          4.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，保宝网对此不承担任何责任。
        </p>
        <p>
          4.2 本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。
        </p>
        <p>
          4.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。
        </p>
        <p>
          4.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
        </p>
        <p>
          4.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：
        </p>
        <p>
          (1)本站向用户免费提供的各项网络服务；
        </p>
        <p>
          (2)本站向用户赠送的任何产品或者服务。
        </p>
        <p>
          5.6 本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。
        </p>
        <p class="content-title">
          五、附则
        </p>
        <p>
          5.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
        </p>
        <p>
          5.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
        </p>
        <p>
          5.3 本协议解释权及修订权归深圳永兴元科技有限公司所有。
        </p>
        <p>
          <br/>
        </p>
        <div class="return-box">
          <el-button type="primary" class="return" @click="goto()">返回</el-button>
        </div>
      </div>
    </div>
    <footer-bottom/>
  </div>
</template>

<script>
import userNav from "../../components/usernav";
import footerBottom from "../../components/footerbottom";
export default {
  name: "userprotocol",
  components: { userNav, footerBottom },
  data() {
    return {
      msg: "Welcome to Your Vue.js usernav"
    };
  },
  methods: {
    goto(){
       this.$router.push({
          name: 'Register',
          params: {
            isRead:true
          }
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.userprotocol {
  margin: 0 !important;
  .main {
    margin: 0;
    background: white;
    .content {
      .title {
        text-align: center;
        font-size: 25px;
        line-height: 90px;
        // font-weight: bold;
        letter-spacing: 10px;
      }
      p {
        line-height: 30px;
      }
      .content-title {
        font-size: 15px;
      }
      .return-box{
        text-align: center;
        height: 80px;
        .return{
          width: 150px;
        }
      }
    }
  }
}
</style>
