<template>
  <view class="content">
    <uni-card
      :title="userInfo.name"
      :sub-title="userInfo.teacher == 1 ? '教师1' : '学生'"
      :extra="new Date().toLocaleDateString()"
      style="width: 100%"
      :thumbnail="
        userInfo.teacher == 1 ? '/static/teacher.png' : '/static/student.png'
      "
      @click="goDetail"
    >
      <text>{{
        userInfo.teacher == 1 ? userInfo.desc : "好好学习，天天向上"
      }}</text>
    </uni-card>
    <template v-if="userInfo.teacher == 1">
      <!-- <uni-grid :column="3" :square="false" :highlight="false">
        <uni-grid-item
          v-for="(item, index) in list"
          :index="index"
          :key="index"
        >
          <view class="grid-item-box">
            <image :src="item.url" class="image" mode="aspectFill" />
            <text class="text">{{ item.text }}</text>
            <view class="grid-dot">
              <uni-badge :text="item.badge" :type="item.type" />
            </view>
          </view>
        </uni-grid-item>
      </uni-grid> -->

      <view class="uni-padding-wrap uni-common-mt">
        <uni-segmented-control
          :current="current"
          :values="items"
          :style-type="styleType"
          :active-color="activeColor"
          @clickItem="onClickItem"
        />
      </view>
      <uni-section style="width: 100%" title="学生打卡信息列表" type="line">
        <uni-list>
          <template v-for="(item, index) in userList">
            <uni-list-item
              v-if="current == 0 || current == item.normal"
              :key="index"
              :title="item.name"
              :note="item.class"
              :thumb="item.icon"
              thumb-size="base"
              :rightText="item.normal == 1 ? '正常打卡' : '异常打卡'"
            />
          </template>
        </uni-list>
      </uni-section>
    </template>
    <template v-else>
      <student-info />
    </template>
  </view>
</template>

<script>
import studentInfo from "./components/list.vue";
export default {
  components: { studentInfo },
  data() {
    return {
      userInfo: {
        name: "东山再起",
        title: "班主任老师",
        extInfo: "高级教授",
        desc: "学高为师，身正为范",
      },
      current: 0,
      activeColor: "#456fff",
      styleType: "button",
      userList: [],
      items: ["全部人数:", "未报人数:", "异常人数:"],
      list: [
        {
          url: "/static/c1.png",
          text: "上报人数",
          badge: 45,
          type: "success",
        },
        {
          url: "/static/c2.png",
          text: "未报人数",
          badge: 2,
          type: "warning",
        },
        {
          url: "/static/c3.png",
          text: "异常人数",
          badge: 1,
          type: "error",
        },
      ],
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
    const user = this.user || uni.getStorageSync("user");
    if (user && user.tel) {
      Object.assign(this.userInfo, user);
    } else {
      uni.redirectTo({
        url: "./../pages/login/index",
        fail: (e) => {
          console.log(e);
        },
      });
    }
    // 获取真实用户数据
    this.getUserList();
    this.getRealList();
  },
  onLoad() {},
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    getRealList() {
      const res = uni.getSystemInfoSync();
      //判断是h5还是小程序场景
      let url = res.SDKVersion
        ? "http://127.0.0.1:7000/api/getCheckList"
        : "/api/getCheckList";
      uni.request({
        url, //仅为示例，并非真实接口地址。
        success: (res) => {
          console.log(res);
          if (res.data.code == 0 && res.data.data)
            res.data.data.forEach((element) => {
              element.icon =
                "/static/userIcon/" + Math.ceil(Math.random() * 10) + ".png";
            });
          this.userList = [...res.data.data, ...this.userList];
          this.items[0] = "全部人数:" + this.userList.length;
          this.items[1] =
            "正常人数:" +
            this.userList.filter((item) => item.normal == 1).length;
          this.items[2] =
            "异常人数:" +
            this.userList.filter((item) => item.normal == 2).length;
          this.items = [...this.items];
          // 正常获取到用户登陆信息
        },
      });
    },
    getMoble() {
      var prefixArray = new Array(
        "130",
        "131",
        "132",
        "133",
        "135",
        "137",
        "138",
        "170",
        "187",
        "189"
      );
      var i = parseInt(10 * Math.random());
      var prefix = prefixArray[i];
      for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
      }
      return prefix;
    },
    getRandomClass() {
      //随机生成一个班级名称
      let classes = [
        "19级-计算机网络",
        "19级-电子商务",
        "19级-财务管理",
        "20级-计算机网络",
        "20级-电子商务",
        "20级-财务管理",
        "21级-计算机网络",
        "21级-电子商务",
        "21级-财务管理",
      ];
      return classes[Math.ceil(Math.random() * 10) - 1];
    },
    getUserList() {
      for (var i = 1; i < 19; i++) {
        this.userList.push({
          icon: "/static/userIcon/" + i + ".png",
          name: "学生" + i,
          tel: this.getMoble(),
          normal: Math.round(Math.random(0, 1)) == 1 ? 1 : 2,
          class: this.userInfo.class,
        });
      }
    },
    goDetail() {
      console.log(1212);
      uni.redirectTo({
        url: "./../login/index",
        fail: (e) => {
          console.log("11", e);
        },
      });
    },
  },
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
<style lang="scss">
.image {
  width: 25px;
  height: 25px;
}

.text {
  font-size: 14px;
  margin-top: 5px;
}

.grid-dynamic-box {
  margin-bottom: 15px;
}

.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.grid-item-box-row {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.grid-dot {
  position: absolute;
  top: 5px;
  right: 15px;
}

/* #endif */
</style>

<style lang="scss">
.uni-common-mt {
  margin-top: 0px;
}

.uni-padding-wrap {
  width: 90%;
}
.uni-list-item__content-title {
  font-size: 14px;
}
</style>
