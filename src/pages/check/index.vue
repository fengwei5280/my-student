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
          <uni-forms-item label="打卡时间">
            <uni-datetime-picker
              type="date"
              return-type="date"
              v-model="checkdate"
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
        </uni-forms>
      </view>
    </uni-section>
  </view>
</template>
<script>
export default {
  data() {
    return {
      // 基础表单数据
      baseFormData: {
        name: "",
        age: "",
        introduction: "",
        sex: 0,
        imageValue: [],
        number: "",
        phone: "",
        address: "",
        datetimesingle: 1627529992399,
        xingchen:""
      },
      checkdate: "",
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
  onShow() {
    const checkdate = uni.getStorageSync("checkdate");
    if (checkdate) {
      this.checkdate = checkdate;
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
        .then((res) => {
          console.log("success", res);
          uni.showToast({
            title: `校验通过`,
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
</style>
