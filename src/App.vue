<template>
  <div id="app">
    <keep-alive v-if='$route.meta&&$route.meta.keepAlive'>
        <router-view />
    </keep-alive>
    <router-view v-else/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style  lang='scss'>
html,body,#app{
  width:100%;
  height:100%;
  margin:0;
  padding:0;
}
p{
  margin:0;
  padding:0;
}
.mint-indicator-wrapper{
  z-index:99999999 !important;
}
</style>