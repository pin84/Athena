<!-- 这是企业认证提示的页面 s -->
<template>
  <!-- 这是企业认证中的页面 s -->
  <com-pop
    :my-index="'cert-ing'"
    class="certing"
  >
    <!-- @close="maskShow(item)" -->
    <template v-slot:pop-content>
      <!-- 这里是中间内容插槽 -->
      <div
        class="con-title"
        v-if="false"
      >企业认证</div>
      <div
        class="con-title"
        v-else
      >添加并认证我的企业</div>
      <form class="con-content certing-content">
        <div class="con-group">
          <div class="con-name">企业名称:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.name"
          />
        </div>
        <div class="con-group">
          <div class="con-name">统一社会信用代码:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.code"
          />
        </div>
        <div class="con-group">
          <div class="con-name">上传营业执照:(文件大小不超过2MB)</div>
          <!-- <input class="val" type="text" v-model="certingVal.code"/> -->
          <!-- 文件上传 s -->
          <div
            class="weui-cells weui-cells_form"
            id="uploader"
          >
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <!-- <p class="weui-uploader__title">图片上传</p> -->
                    <div class="weui-uploader__info"><span id="uploadCount">0</span>/5</div>
                  </div>
                  <div class="weui-uploader__bd">
                    <ul
                      class="weui-uploader__files"
                      id="uploaderFiles"
                    ></ul>
                    <div class="weui-uploader__input-box">
                      <input
                        id="uploaderInput"
                        class="weui-uploader__input"
                        name=""
                        type="file"
                        accept="image/*"
                        capture="camera"
                        multiple=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 文件上传 e -->
        </div>
        <div class="con-group">
          <div class="con-name">联系人:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.contacts"
            placeholder="请输入联系人名称"
          />
        </div>
        <div class="con-group">
          <div class="con-name">联系电话:</div>
          <input
            class="con-val"
            name=""
            type="text"
            v-model="certingVal.phone"
            placeholder="请输入联系电话"
          />
        </div>
        <div class="con-group">
          <div class="con-name">认证费用:<span class="cost">200年/年</span></div>
          <div class="des">上下链的认证审核时间为1-2个工作日，请耐心等待。</div>
        </div>
      </form>
    </template>
    <template v-slot:flex-left>
    </template>
    <template v-slot:flex-right>
      <foot-btn>
        <div
          class="radiusBtn"
          @click="submit"
        >
          交提
        </div>
      </foot-btn>
    </template>
  </com-pop>
  <!-- 这是企业认证中的页面 e -->
</template>

<script>
import ComPop from "@/components/common/ComPop";
import FootBtn from "@/components/common/FootBtn";

export default {
  name: "setMyEnterprise",
  components: {
    ComPop,
    FootBtn
  },
  data() {
    return {
      certingVal: {
        name: "", 
        code: "",
        contacts:'',
        phone:'',
        avatar_obj:undefined,
      }
    };
  },
  methods: {
    submit() {
      
      alert("暂未开启相应功能 敬请期待");
    }
  }
};
</script>

<style scoped lang="scss">
</style>
