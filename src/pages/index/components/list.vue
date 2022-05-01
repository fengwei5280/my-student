<template>
  <uni-section title="我的打卡" type="line">
    <uni-card padding="0" spacing="0">
      <template v-slot:cover>
        <view class="custom-cover">
          <image class="cover-image" mode="aspectFill" :src="cover"> </image>
          <!-- <view class="cover-content">
            <text class="uni-subtitle uni-white">打卡情况</text>
          </view> -->
        </view>
      </template>
      <view class="card-actions no-border">
        <view class="card-actions-item" @click="actionsClick('分享')">
          <uni-icons type="chatboxes" size="23" color="#999"></uni-icons>
          <text class="card-actions-item-text">上报</text>
        </view>
        <view class="card-actions-item" @click="actionsClick('点赞')">
          <uni-icons type="chatbubble" size="23" color="#999"></uni-icons>
          <text class="card-actions-item-text">请假</text>
        </view>
      </view>
    </uni-card>
    <view>
      <!-- 插入模式 -->
      <uni-calendar
        class="uni-calendar--hook"
        :selected="selected"
        :showMonth="false"
        :lunar="info.lunar"
        @change="change"
        @monthSwitch="monthSwitch"
      />
    </view>
    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog
          type="success"
          cancelText="取消"
          confirmText="确定"
          title="打卡"
          :content="confirmDesc"
          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </uni-section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      info: {
        lunar: true,
        range: true,
        insert: false,
      },
      selected: [
        { date: "2022-04-03", info: "异常", normal:2, data: { custom: "122" } },
        { date: "2022-05-01", info: "签到" },
      ],
      cover: "/static/hesuan.jpeg",
      date: "",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled",
      },
    };
  },
  computed: {
    confirmDesc() {
      return `确认要对` + this.date + `进行打卡`;
    },
  },
  methods: {
    dialogConfirm() {
      uni.setStorageSync('checkdate',this.date)
      uni.switchTab({
        url: "/pages/check/index",
      });
    },
    change(e) {
      this.date = e.fulldate;
      let dates = this.selected.map((item) => item.date);
      // 如果点中的日期在已签到中，则不进行签到
      if (dates.indexOf(this.date) == -1) {
        this.$refs.alertDialog.open();
      }
      // 打卡、异常
      console.log("change 返回:", e);
      // 模拟动态打卡
      // if (this.selected.length > 5) return;
      // this.selected.push({
      //   date: e.fulldate,
      //   info: "打卡",
      // });
    },
    monthSwitch(e) {
      console.log("monthSwitchs 返回:", e);
    },
    actionsClick(action) {
      console.log(action);
    },
  },
};
</script>
<style lang="scss">
.container {
  overflow: hidden;
}

.custom-cover {
  flex: 1;
  flex-direction: row;
  position: relative;
}

.cover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: rgba($color: #000000, $alpha: 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  color: #fff;
}

.card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px #eee solid;
}

.card-actions-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-actions-item-text {
  font-size: 16px;
  color: #666;
  margin-left: 5px;
}

.cover-image {
  flex: 1;
  height: 150px;
}

.no-border {
  border-width: 0;
}
</style>
