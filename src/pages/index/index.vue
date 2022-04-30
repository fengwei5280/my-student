<template>
  <view class="content">
    <uni-card
      :title="userInfo.name"
      :sub-title="userInfo.title"
      :extra="userInfo.extInfo"
      style="width: 100%"
      :thumbnail="userInfo.icon"
    >
      <text>{{ userInfo.desc }}</text>
    </uni-card>
    <user-list />
  </view>
</template>

<script>
import UserList from './components/list.vue'
export default {
  components: { UserList },
  data() {
    return {
      userInfo: {
        name: "东山再起",
        title: "班主任老师",
        extInfo: "高级教授",
        icon: "/static/teacher.png",
        desc: "学高为师 身正为范",
      },
      note: {
        //日期
        date: "2022-04-26",
        //是否已打开
        check: 1,
        //是否有异常
        normal: 1,
      },
    
    };
  },
  mounted() {
    console.log("123131");
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
