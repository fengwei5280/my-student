<template>
  <uni-section title="我的打卡" type="line">
    <uni-card padding="0" spacing="0">
      <template v-slot:cover>
        <view class="custom-cover">
          <image class="cover-image" mode="aspectFill" :src="cover"> </image>
          <view class="cover-content">
            <text class="uni-subtitle uni-white">打卡情况</text>
          </view>
        </view>
      </template>
      <view class="card-actions no-border">
        <view class="card-actions-item" @click="actionsClick('分享')">
          <uni-icons type="chatboxes" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">上报</text>
        </view>
        <view class="card-actions-item" @click="actionsClick('点赞')">
          <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
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
				<uni-popup-dialog type="success" cancelText="关闭" confirmText="同意" title="通知" content="欢迎使用 uni-popup!" @confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
  </uni-section>
</template>

<script>
import {
  uniCard,
  uniList,
  uniIcons,
  uniListItem,
  uniCalendar,
  uniPopup,
  uniTransition,
  uniPopupDialog
} from "@dcloudio/uni-ui";
export default {
  props: {},
  components: { uniCard, uniList, uniIcons, uniListItem, uniCalendar,uniPopup,uniPopupDialog,uniTransition },
  data() {
    return {
      info: {
        lunar: true,
        range: true,
        insert: false,
      },
      selected: [{date: '2022-05-01', info: '签到'}],
      cover: "/static/hesuan.jpeg",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled",
      },
    };
  },
  methods: {
    dialogConfirm(){

    },
    change(e) {
      this.$refs.alertDialog.open()
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
  font-size: 12px;
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

<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}
</style>
