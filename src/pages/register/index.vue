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
      <uni-forms-item label="身份" required>
        <uni-data-checkbox v-model="user.teacher" :localdata="teachers" />
      </uni-forms-item>
      <uni-forms-item label="班级" required name="number">
        <!-- <uni-easyinput v-model="user.class" placeholder="请输入班级" /> -->
        <uni-data-picker
          placeholder="请选择班级"
          popup-title="请选择所在班级"
          :localdata="dataTree"
          v-model="user.class"
        >
        </uni-data-picker>
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
    //班级信息
    class: "",
    teachers: [
      {
        text: "教师",
        value: 1,
      },
      {
        text: "学生",
        value: 2,
      },
    ],
    dataTree: [
      {
        text: "19级",
        value: "1-0",
        children: [
          {
            text: "计算机网络",
            value: "19级-计算机网络",
          },
          {
            text: "电子商务",
            value: "19级-电子商务",
          },
          {
            text: "财务管理",
            value: "19级-财务管理",
          },
        ],
      },
      {
        text: "20级",
        value: "2-0",
        children: [
          {
            text: "计算机网络",
            value: "20级-计算机网络",
          },
          {
            text: "电子商务",
            value: "20级-电子商务",
          },
          {
            text: "财务管理",
            value: "20级-财务管理",
          },
        ],
      },
      {
        text: "21级",
        value: "3-0",
        children: [
          {
            text: "计算机网络",
            value: "21级-计算机网络",
          },
          {
            text: "电子商务",
            value: "21级-电子商务",
          },
          {
            text: "财务管理",
            value: "21级-财务管理",
          },
        ],
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
      class: "",
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
        const res = uni.getSystemInfoSync();
        // "http://127.0.0.1:7000/api/addUser"
        let url = res.SDKVersion
          ? "http://127.0.0.1:7000/api/addUser"
          : "/api/addUser";
        console.log(res);
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
            console.log(res.data);
            if (res.data && res.data.data.exsit == 1) {
              //用户已注册，轻微
              uni.showToast({
                title: "用户已注册！",
                duration: 2000,
                icon: "fail",
              });
            }
            uni.showToast({
              title: "注册成功！",
              duration: 2000,
            });
            uni.redirectTo({
              url: "./../../pages/login/index",
              fail: (e) => {
                console.log(1202321);
                console.log(e);
              },
            });
            // uni.setStorageSync("user", this.user);
            // Vue.prototype.user = this.user;
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