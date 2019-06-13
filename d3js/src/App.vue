<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">01-Face</router-link>
      <router-link to="/barchart">02-Barchart</router-link>
      <router-link to="/03-barchart">03-Barchart_Custom</router-link>
      <router-link to="/04-circular-bar">04-circular-bar</router-link>
      <router-link to="/05-basic">05-basic</router-link>
      <router-link to="/05-basic-line">05-basic-line</router-link>
      <router-link to="/05-basic-area">05-basic-area</router-link>
      <router-link to="/05-basic-area-1">05-basic-area-1</router-link>
      <router-link to="/06-arc">06-arc</router-link>
      <router-link to="/06-clickEvent">06-clickEvent</router-link>
      <router-link to="/06-clickEvent-1">06-clickEvent-1</router-link>
      <router-link to="/07-worldMap">07-worldMap</router-link>
      <router-link to="/07-worldMap-1">07-worldMap-1</router-link>

      <router-link to="/100-test">100-test</router-link>
      <router-link to="/08-arc">08-arc</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
 #nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-left:8px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
