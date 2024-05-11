<template>
  <div>
     <router-view v-slot="{ Component }">
       <transition :name="transitionName">
         <keep-alive>
           <component v-if="$route.meta.keepAlive" :is="Component"></component>
         </keep-alive>
       </transition>
       <transition :name="transitionName">
         <component v-if="!$route.meta.keepAlive" :is="Component" :key="$route.path"></component>
       </transition>
     </router-view>
  </div>
</template>

<script setup>
  import { RouterView, useRouter } from "vue-router";
  import {onActivated, onMounted, ref} from "vue";

  const router = useRouter();
  const transitionName = ref('fade')

  router.beforeEach((to, from) => {
    recordScrollTop(to, from)

    setTransitionName(to, from)

    console.log('to: ', to)
    console.log('from: ', from)
  })

  function setTransitionName(to, from) {
    /**
     * 設定 過渡動畫 的 滑動方向
     * index越小 -> 頁面層級越高
     * 從 index=0 到 index=1 -> 向左滑
     * 從 index=1 到 index=0 -> 向右滑
     * index 相同 -> 不加動畫
     */
    if (from.meta.index < to.meta.index) {
      transitionName.value = 'slide-left'
    }
    else if (from.meta.index > to.meta.index) {
      transitionName.value = 'slide-right'
    }
    else {
      transitionName.value = ''
    }
  }

  const scrollTop = ref(0)
  function recordScrollTop(to, from) {
    /**
     * 紀錄／設定 頁面滾動位置
     * 從 Home 頁面跳轉時，儲存scrollTop
     * 到 Home 頁面時，設定route內params屬性：scrollTop.value
     */
    if (from.name === 'Home') {
      scrollTop.value = window.scrollY
    }
    if (to.name === 'Home') {
      to.params.scrollTop = scrollTop.value
    }
  }


</script>

<style>
.animation-bg {
  background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 55%, #FFBAC3 100%);
  background-size: 200% 200%;
  background-position: center;
  animation: bg-animate 8s ease-in-out infinite;
}
@keyframes bg-animate {
    0% {background-position: 0 0;}
    50% {background-position: 100% 100%;}
    100% {background-position: 0 0;}
}

.slide-left-enter-active {
  animation: slide-left-in 0.6s;
}
.slide-left-leave-active {
  animation: slide-left-out 0.6s;
}
.slide-right-enter-active {
  animation: slide-right-in 0.6s;
}
.slide-right-leave-active {
  animation: slide-right-out 0.6s;
}
@keyframes slide-left-in {
  0% { transform: translateX(100%);} 100% { transform: translateX(0%) }
}
@keyframes slide-left-out {
  0% { transform: translateX(0%);} 100% { transform: translateX(-100%) }
}
@keyframes slide-right-in {
  0% { transform: translateX(-100%);} 100% { transform: translateX(0%) }
}
@keyframes slide-right-out {
  0% { transform: translateX(0%);} 100% { transform: translateX(100%) }
}

</style>
