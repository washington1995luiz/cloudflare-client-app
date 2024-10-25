<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="container">
    <UploadScreen></UploadScreen>
    <DownloadScreen></DownloadScreen>
  </div>
  
</template>
<script>
import DownloadScreen from './components/DownloadScreen.vue';
import UploadScreen from './components/UploadScreen.vue';

export default {
  name: 'App',
  components: {
    UploadScreen,
    DownloadScreen
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
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
