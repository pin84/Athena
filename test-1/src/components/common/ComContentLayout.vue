<template>
  <div class="com-info-layout">
    <slot name="layou-title">
      <div class="info-title">
        {{infoTitle}}:
      </div>
    </slot>
    <slot name="layout-content">
      <template v-if="infoList.length !== 0 ">
        <div
          class="info-list"
          v-for="items in infoList"
          :key="items.id"
        >
          <div
            class="info-item"
            v-for="(item,key) in items"
            :key="key"
          >
            <template v-if="key!=='isAuth'">
              <div class="item-name">
                {{key}}
              </div>
              <div class="item-value">
                {{item}}
              </div>
            </template>
          </div>
        </div>
      </template>
      <div
        class="gd-content info-list"
        v-else
      >
        <h3>暂无记录</h3>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    getInfoList: {
      type: Array,
      default: () => {
        return [
          {
            name: "",
            value: ""
          }
        ];
      }
    },
    getInfoTitle: {
      default: ""
    },
    myIndex: {
      default: 0
    }
  },
  data: function() {
    return {
      infoList: this.getInfoList, //内容
      infoTitle: this.getInfoTitle
    };
  },
  watch: {
    getInfoList() {
      this.$set(this, "infoList", this.getInfoList);
    },
    getInfoTitle() {
      this.infoTitle = this.getInfoTitle;
    }
  },
  methods: {}
};
</script>

