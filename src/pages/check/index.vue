<template>
  <view class="content">
    <uni-card :is-shadow="false" is-full>
      <text class="uni-h6">同学们，记得每日上报形成信息哦</text>
    </uni-card>
    <uni-section title="基本用法" type="line">
      <view class="example">
        <!-- 基础用法，不包含校验规则 -->
        <uni-forms
          ref="baseForm"
          :rules="customRules"
          :modelValue="baseFormData"
        >
          <uni-forms-item label="学生名称">
            <view class="tag-view">
              <uni-easyinput
                disabled
                :value="user.name"
                placeholder="请输入内容"
              ></uni-easyinput>
              <!-- <uni-tag :text="user.name" :inverted="true" type="default" /> -->
            </view>
          </uni-forms-item>
          <uni-forms-item label="学生性别">
            <view class="tag-view">
              <uni-easyinput
                disabled
                :value="user.sex == 1 ? '男' : '女'"
                placeholder="请输入内容"
              ></uni-easyinput>
            </view>
          </uni-forms-item>
          <uni-forms-item label="班级">
            <view class="tag-view">
              <uni-easyinput
                disabled
                :value="user.class"
                placeholder="请输入内容"
              ></uni-easyinput>
            </view>
          </uni-forms-item>
          <uni-forms-item label="打卡时间">
            <uni-datetime-picker
              type="date"
              return-type="string"
              v-model="baseFormData.date"
            />
          </uni-forms-item>
          <uni-forms-item label="三码合一" required>
            <uni-file-picker
              v-model="baseFormData.imageValue"
              fileMediatype="image"
              mode="grid"
              @select="select"
              @progress="progress"
              @fail="fail"
            />
          </uni-forms-item>
          <uni-forms-item label="行程码" required>
            <uni-file-picker
              v-model="baseFormData.xingchen"
              fileMediatype="image"
              mode="grid"
              @select="select"
              @progress="progress"
              @fail="fail"
            />
          </uni-forms-item>
          <uni-forms-item label="是否异常" required>
            <uni-data-checkbox
              v-model="baseFormData.normal"
              :localdata="normals"
            />
          </uni-forms-item>
        </uni-forms>
        <view class="button-group">
          <!-- <button type="primary" size="mini" @click="add">新增</button> -->
          <button type="primary" class="btn" @click="submit('baseForm')">
            打卡
          </button>
        </view>
      </view>
    </uni-section>
  </view>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      // 基础表单数据
      baseFormData: {
        imageValue: [],
        normal: 1,
        xingchen: [],
        date: "",
      },
      checkdate: "",
      normals: [
        {
          text: "正常",
          value: 1,
        },
        {
          text: "异常",
          value: 2,
        },
      ],
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
        age: {
          rules: [
            {
              required: true,
              errorMessage: "年龄不能为空",
            },
          ],
        },
        hobby: {
          rules: [
            {
              format: "array",
            },
            {
              validateFunction: function (rule, value, data, callback) {
                if (value.length < 2) {
                  callback("请至少勾选两个兴趣爱好");
                }
                return true;
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    // 处理表单排列切换
    alignment() {
      if (this.current === 0) return "left";
      if (this.current === 1) return "top";
      return "left";
    },
  },
  mounted() {
    const user = uni.getStorageSync("user");
    console.log(user, "=-=-=");
    if (user && user.tel) {
      this.user = user;
    } else {
      uni.redirectTo({
        url: "./../pages/login/index",
        fail: (e) => {
          console.log(e);
        },
      });
    }
  },
  onShow() {
    const checkdate = uni.getStorageSync("checkdate");
    if (checkdate) {
      this.user.date = checkdate;
    }
  },
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    console.log("readyyyy");
    this.$refs.baseForm.setRules(this.customRules);
  },
  methods: {
    // 获取上传状态
    select(e) {
      console.log("选择文件：", e);
    },
    // 获取上传进度
    progress(e) {
      console.log("上传进度：", e);
    },

    // 上传成功
    success(e) {
      console.log("上传成功");
    },

    // 上传失败
    fail(e) {
      console.log("上传失败：", e);
    },
    onClickItem(e) {
      console.log(e);
      this.current = e.currentIndex;
    },
    add() {
      this.dynamicLists.push({
        label: "域名",
        rules: [
          {
            required: true,
            errorMessage: "域名项必填",
          },
        ],
        id: Date.now(),
      });
    },
    del(id) {
      let index = this.dynamicLists.findIndex((v) => v.id === id);
      this.dynamicLists.splice(index, 1);
    },
    submit(ref) {
      this.$refs[ref]
        .validate()
        .then(() => {
          let checkInfo = Object.assign(this.user, this.baseFormData);
          console.log("用户打卡信息" + JSON.stringify(checkInfo));
          const res = uni.getSystemInfoSync();
          // "http://127.0.0.1:7000/api/addUser"
          let url = res.SDKVersion
            ? "http://127.0.0.1:7000/api/addCheckInfo"
            : "/api/addCheckInfo";
          console.log(res);
          uni.request({
            url, //仅为示例，并非真实接口地址。
            data: {
              checkInfo,
            },
            method: "post",
            header: {
              "content-type": "application/json", //自定义请求头信息
            },
            success: (res) => {
              uni.showToast({
                title: "恭喜你打开成功!",
                duration: 2000,
              });
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/index/index",
                  fail: (e) => {
                    console.log(1202321);
                    console.log(e);
                  },
                });
              }, 1000);

              // uni.redirectTo({
              //   url: "./../../pages/login/index",
              //   fail: (e) => {
              //     console.log(1202321);
              //     console.log(e);
              //   },
              // });
            },
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss">
.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
.tag-view {
  width: 90%;
  margin-top: 0px;
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
