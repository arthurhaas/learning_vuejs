<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Sample msg="Welcome to my Vue.js Sample App"/>
  </div>
</template>

<script>
import Sample from './components/Sample.vue'

export default {
  name: 'App',
  components: {
    Sample
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
