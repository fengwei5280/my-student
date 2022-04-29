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
          <uni-forms-item label="姓名" required>
            <uni-easyinput
              v-model="baseFormData.name"
              placeholder="请输入姓名"
            />
          </uni-forms-item>
          <uni-forms-item label="年龄" required>
            <uni-easyinput
              v-model="baseFormData.age"
              placeholder="请输入年龄"
            />
          </uni-forms-item>
          <uni-forms-item label="性别" required>
            <uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
          </uni-forms-item>
          <uni-forms-item label="学号" required>
            <uni-easyinput
              v-model="baseFormData.number"
              placeholder="请输入年龄"
            />
          </uni-forms-item>
          <uni-forms-item label="手机号" required>
            <uni-easyinput
              v-model="baseFormData.phone"
              placeholder="请输入年龄"
            />
          </uni-forms-item>
          <uni-forms-item label="居住地址" required>
            <uni-easyinput
              v-model="baseFormData.address"
              placeholder="请输入年龄"
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
        </uni-forms>
      </view>
    </uni-section>
  </view>
</template>
<script>
import {
  uniCard,
  uniForms,
  uniFormsItem,
  uniEasyinput,
  uniDataCheckbox,
  uniFilePicker,
} from "@dcloudio/uni-ui";
export default {
  components: {
    uniCard,
    uniForms,
    uniFormsItem,
    uniEasyinput,
    uniDataCheckbox,
    uniFilePicker,
  },
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
		address:"",
        datetimesingle: 1627529992399,
      },
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
      // 表单数据
      alignmentFormData: {
        name: "",
        age: "",
      },
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
      // 多选数据源
      hobbys: [
        {
          text: "跑步",
          value: 0,
        },
        {
          text: "游泳",
          value: 1,
        },
        {
          text: "绘画",
          value: 2,
        },
        {
          text: "足球",
          value: 3,
        },
        {
          text: "篮球",
          value: 4,
        },
        {
          text: "其他",
          value: 5,
        },
      ],
      // 分段器数据
      current: 0,
      items: ["左对齐", "顶部对齐"],
      // 校验规则
      rules: {
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
            {
              format: "number",
              errorMessage: "年龄只能输入数字",
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
  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
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
