<template>
  <view class="login-view">
    <!-- 基础用法，不包含校验规则 -->
    <uni-forms
      ref="baseForm"
      :rules="customRules"
      label-position="top"
      :modelValue="user"
    >
      <uni-forms-item label="手机号" required>
        <uni-easyinput
          type="number"
          v-model="user.tel"
          placeholder="请输入手机号"
        />
      </uni-forms-item>
      <uni-forms-item label="密码" required>
        <uni-easyinput
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
    </uni-forms>
    <view class="button-group">
      <!-- <button type="primary" size="mini" @click="add">新增</button> -->
      <button type="primary" class="btn" @click="submit">登录</button>
      <button @click="register" class="btn">注册校园账号</button>
    </view>
  </view>
</template>

<script>
import Vue from "vue";
export default {
  components: {},
  data: () => ({
    // 自定义表单校验规则
    customRules: {
      name: {
        rules: [
          {
            required: true,
            errorMessage: "姓名不能为空",
          },
        ],
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "密码不能为空",
          },
        ],
      },
    },
    user: {
      tel: "",
      password: "",
    },
    userInfo: {
      name: "",
      password: "",
      age: "",
      icon: "",
      // 1是老师，2是学生
      teacher: 1,
      introduction: "",
      sex: 1,
    },
  }),
  computed: {},
  methods: {
    submit() {
      //获取系统信息
      const res = uni.getSystemInfoSync();
      //判断是h5还是小程序场景
      let url = res.SDKVersion
        ? "http://127.0.0.1:7000/api/login"
        : "/api/login";
      uni.request({
        url, //仅为示例，并非真实接口地址。
        data: {
          user: this.user,
        },
        method: "post",
        header: {
          "content-type": "application/json", //自定义请求头信息
        },
        success: (res) => {
          // 正常获取到用户登陆信息
          console.log(res.data)
          if (res.data && res.data.code == 0 && res.data.data.tel) {
            const user = res.data.data;
            uni.setStorageSync("user", user);
            Vue.prototype.user = user;
             console.log('12121212')
            uni.switchTab({
              url: "./../../pages/index/index",
              fail: (e) => {
                console.log(e);
              },
            });
          } else {
            // 用户信息异常，返回错误提示
            uni.showToast({
              title: res.data.data.msg,
              duration: 2000,
              icon: "error"
            });
          }
        },
      });
    },
    register() {
      console.log(121212);
      uni.redirectTo({
        url: "./../register/index",
        fail: (e) => {
          console.log("11", e);
        },
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
.login-view {
  padding: 18px;
}
.button-group {
  .btn {
    width: 275px;
    height: 62px;
    border-radius: 30px;
    margin-bottom: 20px;
    line-height: 62px;
    font-weight: 800;
    &::after {
      border: unset;
    }
  }
}
</style>