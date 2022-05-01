<template>
  <view class="login-view">
    <!-- 基础用法，不包含校验规则 -->
    <uni-forms
      ref="baseForm"
      :rules="customRules"
      label-position="top"
      :modelValue="user"
    >
      <uni-forms-item label="姓名" required name="name">
        <uni-easyinput v-model="user.name" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="手机号" required name="tel">
        <uni-easyinput
          type="number"
          v-model="user.tel"
          placeholder="请输入手机号"
        />
      </uni-forms-item>
      <uni-forms-item label="性别" required>
        <uni-data-checkbox v-model="user.sex" :localdata="sexs" />
      </uni-forms-item>
      <uni-forms-item label="岗位" required>
        <uni-data-checkbox v-model="user.teacher" :localdata="teachers" />
      </uni-forms-item>
      <uni-forms-item label="密码" required name="password">
        <uni-easyinput v-model="user.password" placeholder="请输入密码" />
      </uni-forms-item>
      <uni-forms-item label="确认密码" required>
        <uni-easyinput v-model="password" placeholder="请输入密码" />
      </uni-forms-item>
      <uni-forms-item label="学号" required name="number">
        <uni-easyinput v-model="user.number" placeholder="请输入年龄" />
      </uni-forms-item>
      <uni-forms-item label="居住地址" required>
        <uni-easyinput v-model="user.address" placeholder="请输入年龄" />
      </uni-forms-item>
    </uni-forms>
    <view class="button-group">
      <!-- <button type="primary" size="mini" @click="add">新增</button> -->
      <button type="primary" class="btn" @click="submit">注册</button>
    </view>
  </view>
</template>

<script>
import Vue from "vue";
export default {
  components: {},
  data: () => ({
    // 自定义表单校验规则
    password: "",
    // 单选数据源
    sexs: [
      {
        text: "男",
        value: 0,
      },
      {
        text: "女",
        value: 1,
      },
    ],
    teachers:[
      {
        text: "教师",
        value: 1,
      },
      {
        text: "学生",
        value: 2,
      },
    ],
    customRules: {
      name: {
        rules: [
          {
            required: true,
            errorMessage: "姓名不能为空",
          },
        ],
      },
      tel: {
        rules: [
          {
            required: true,
            errorMessage: "电话不能为空",
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
      name: "",
      password: "",
      icon: "",
      // 1是老师，2是学生
      teacher: 1,
      tel: "",
      introduction: "",
      sex: 1,
    },
  }),
  computed: {},
  mounted() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    console.log("readyyyxxy");
    console.log(this.$refs.baseForm);
    setTimeout(() => {
      this.$refs.baseForm.setRules(this.customRules);
    }, 200);
  },
  methods: {
    submit() {
      this.$refs["baseForm"].validate().then(() => {
        uni.request({
          url: "/api/addUser", //仅为示例，并非真实接口地址。
          data: {
            user: this.user,
          },
          method: "post",
          header: {
            "content-type": "application/json", //自定义请求头信息
          },
          success: (res) => {
            console.log(res.data);
            if (res.data && res.data.data.exsit == 1) {
              //用户已注册，轻微
              uni.showToast({
                title: "用户已注册！",
                duration: 2000,
              });
            }
            uni.switchTab({
              url: "./../../pages/index/index",
              fail: (e) => {
                console.log(1202321);
                console.log(e);
              },
            });
            uni.setStorageSync("user", this.user);
            Vue.prototype.user = this.user;
            this.text = "request success";
          },
        });
      });
    },
    register() {
      console.log(121212);
      uni.navigateTo({
        url: "pages/register/index",
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
  }
}
</style>