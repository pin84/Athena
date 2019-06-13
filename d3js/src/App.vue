<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">01-Face</router-link>
      <router-link to="/barchart">02-Barchart</router-link>
      <router-link to="/03-barchart">03-Barchart</router-link>
      <router-link to="/04-ScatterBlot">04-ScatterBlot</router-link>
<<<<<<< HEAD
      <router-link to="/100-test">100-test</router-link>
      <router-link to="/08-arc">08-arc</router-link>
=======
      <router-link to="/05-CartScatterBlot">05-CartScatterBlot</router-link>
      <router-link to="/06-arc">06-arc</router-link>
      <router-link to="/07-radial">07-Radial</router-link>
>>>>>>> 4f5d1df939d8a84edd388a9560421ae9c4bfde6e
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
/*
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
