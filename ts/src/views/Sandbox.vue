<template>
  <div>sandboxTest</div>
</template>
<script>
export default {
  created() {},

  methods: {
    compileCode(src) {
      src = `with (exposeObj) { ${src} }`;
      return new Function("exposeObj", src);
    },

    proxyObj(originObj) {
      let exposeObj = new Proxy(originObj, {
        has: (target, key) => {
          if (["console", "Math", "Date"].indexOf(key) >= 0) {
            return target[key];
          }
          if (!target.hasOwnProperty(key)) {
            throw new Error(`Illegal operation for key ${key}`);
          }
          return target[key];
        }
      });
      return exposeObj;
    },

    createSandbox(src, obj) {
      let proxy = proxyObj(obj);
      compileCode(src).call(proxy, proxy); //绑定this 防止this访问window
    }
  }
};
</script>