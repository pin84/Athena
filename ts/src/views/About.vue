<template>
  <div class="about">
    <h1 @click="tt">This is an about page</h1>
  </div>
</template>

<script>
export default {
  mounted() {},

  methods: {
    tt() {
      this.$confirm({
        type: "提示",
        msg:
          "确定删除此条信息？确定删除此条信息？确定删除此条信息？确定删除此条信息？确定删除此条信息？确定删除此条信息？",
        btn: {
          ok: "yes",
          no: "no"
        }
      })
        .then(() => {
          console.log("ok");
        })
        .catch(() => {
          console.log("no");
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.about
  font-size 0.28rem
</style>
