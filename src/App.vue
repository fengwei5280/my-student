<script>
import Vue from "vue";
export default {
  onLaunch: function () {
    let user = uni.getStorageSync("user");
    if (!user) {
      uni.redirectTo({
        url: "pages/login/index",
      });
    } else {
      Vue.prototype.user = this.user;
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";
@import "@/static/customicons.css";
</style>
