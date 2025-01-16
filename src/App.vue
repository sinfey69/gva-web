<template>
  <RouterView />
</template>

<style lang="scss">
// 引入初始化样式
@use '@/style/main.scss';
@use '@/style/base.scss';
@use '@/style/mobile.scss';
#app {
  background: #eee;
  height: 100vh;
  overflow: hidden;
  font-weight: 400 !important;
}
.el-button{
  font-weight: 400 !important;
}
</style>