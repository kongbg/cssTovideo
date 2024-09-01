<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <!-- fix:解决vue3中使用transition以及keep-alive，切换页面白屏问题 -->
      <!-- https://blog.csdn.net/weixin_47239456/article/details/138581603 -->
      <Suspense>
        <keep-alive :include="keepAliveComponents" :max="10">
          <component :is="Component" />
        </keep-alive>
      </Suspense>
    </transition>
  </router-view>
</template>

<script setup>
import useKeepAliveStore from '@/store/modules/keepAliveStore.js'
const KeepAliveStore = useKeepAliveStore();
const keepAliveComponents = KeepAliveStore.getKeepAliveComponents;
</script>
<style lang="scss" scoped></style>